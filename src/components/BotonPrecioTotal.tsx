import {useState} from 'react';

type CalcularPrecio = {
    productos: number[];
    tarjeta: number;
}

export default function BotonPrecioTotal({ productos, tarjeta }: CalcularPrecio) {
    const [errors, setErrors] = useState<string>();
    const [total, setTotal] = useState();

    const precioTotal = async () => {
      setErrors("")

      if(tarjeta == undefined) {
        tarjeta = 0;
      }
  
      const productosUrl = productos.map((id) => `productos=${id}`).join('&');
        try {
            const res = await fetch(`http://localhost:8080/venta?${productosUrl}&idTarjeta=${tarjeta}`);

            if (!res.ok) {
              const errorMessage = await res.text();
              setErrors(errorMessage);
            }

            const data = await res.json();
            setTotal(data);

          } catch (error: any) {
            console.log(error)
          }
    }
  
    return (
    <div style={{ marginTop: "2vh"}}>
      <button onClick={precioTotal}>Precio Total</button>
      {errors && <span style={{ color: 'red' }}>Error: {errors}</span>}
      {total && <span style={{ color: 'green' }}>Total: {total}</span>}
    </div>
  );
}

