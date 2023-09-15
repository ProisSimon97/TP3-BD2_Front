import {useState} from 'react';

type CalcularPrecio = {
    productos: number[];
    tarjeta: number;
}

export default function BotonComprar({ productos, tarjeta }: CalcularPrecio) {
    const [errors, setErrors] = useState<string>();
    const [venta, setVenta] = useState<string>();
    
    const realizarCompra = async () => {
      setErrors("")
      setVenta("")

      if(tarjeta == undefined) {
        tarjeta = 0;
      }
  
      const productosUrl = productos.map((id) => `productos=${id}`).join('&');
    
        try {
            const res = await fetch(`http://localhost:8080/venta?idCliente=1&${productosUrl}&idTarjeta=${tarjeta}`, {
                method: 'POST'
              });

            if (!res.ok) {
              const errorMessage = await res.text();
              setErrors(errorMessage);
            }

            const data = await res.text();
            setVenta(data);

          } catch (error: any) {
            console.log(error)
          }
    }
  
    return (
    <div style={{ marginTop: "2vh"}}>
      <button onClick={realizarCompra}>Comprar</button>
      {errors && <span style={{ color: 'red' }}>Error: {errors}</span>}
      {venta && <span style={{ color: 'green' }}>{venta}</span>}
    </div>
  );
}

