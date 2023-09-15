import { useState, useEffect } from 'react';
import Descuento from '../domain/Descuento';

export default function Descuentos() {
  const [descuentos, setDescuentos] = useState<[]>([]);
  
  const fechaActual = new Date();
  const year = fechaActual.getFullYear();
  const month = String(fechaActual.getMonth() + 1).padStart(2, '0'); 
  const day = String(fechaActual.getDate()).padStart(2, '0');
  
  const fechaFormateada = `${year}-${month}-${day}`;
  

const getProductos = async function fetchData() {
    try {
      const res = await fetch(`http://localhost:8080/descuento?fecha=${fechaFormateada}`);
      if (res.ok) {
        const data = await res.json();

        console.log(data)
        setDescuentos(data);
      } else {
        console.error('Error al cargar los descuentos');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  }

  useEffect(() => {
    getProductos();
  }, []);

  return (
    <div>
      <div>
      <h3>Descuentos:</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha de Inicio</th>
            <th>Fecha de Fin</th>
            <th>Descuento (%)</th>
            <th>Marca</th>
            <th>Tarjeta</th>
          </tr>
        </thead>
        <tbody>
          {descuentos.map((descuento: Descuento) => (
            <tr key={descuento.id}>
              <td>{descuento.id}</td>
              <td>{descuento.fechaInicio}</td>
              <td>{descuento.fechaFin}</td>
              <td>{descuento.descuento}%</td>
              <td>{descuento.marca || '-'}</td>
              <td>{descuento.tarjeta || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}
