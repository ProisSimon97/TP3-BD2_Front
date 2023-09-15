import { useState, useEffect, ChangeEvent } from 'react';
import Producto from '../domain/Producto';

type ProductoPropType = {
  selectedProductos: number[];
  handleSelect: (selectedIds: number[]) => void;
};

export default function Productos({
  selectedProductos,
  handleSelect,
}: ProductoPropType) {
  const [productos, setProductos] = useState<Producto[]>([]);

  const getProductos = async () => {
    try {
      const res = await fetch('http://localhost:8080/producto');
      if (res.ok) {
        const data = await res.json();
        setProductos(data);
      } else {
        console.error('Error al cargar los productos');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  useEffect(() => {
    getProductos();
  }, []);

  const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedIds: number[] = Array.from(
      e.target.selectedOptions,
      (option) => Number(option.value)
    );
    handleSelect(selectedIds);
  };

  return (
    <div>
      <h3>Productos:</h3>
      <select
        multiple
        value={selectedProductos}
        onChange={handleSelectionChange}
      >
        {productos.map((producto) => (
          <option key={producto.id} value={producto.id}>
            {producto.descripcion} - {producto.marca} - ${producto.precio}
          </option>
        ))}
      </select>
    </div>
  );
}
