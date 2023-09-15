import './App.css'
import { useState } from 'react';
import Descuento from './components/Descuentos'
import Productos from './components/Productos';
import Tarjetas from './components/Tarjetas';
import BotonPrecioTotal from './components/BotonPrecioTotal';
import BotonComprar from './components/BotonComprar';

export default function App() {

  const [selectedProductos, setSelectedProductos] = useState<number[]>([]);
  const [selectedTarjeta, setSelectedTarjeta] = useState<number>();

  const handleSelect = (selectedIds: number[]) => {
    setSelectedProductos(selectedIds);
  };

  return (
    <>
     <Descuento/>
     <Productos selectedProductos={selectedProductos} handleSelect={handleSelect} />
     <Tarjetas setSelectedTarjeta={setSelectedTarjeta}/>
     <BotonPrecioTotal productos={selectedProductos} tarjeta={selectedTarjeta}/>
     <BotonComprar productos={selectedProductos} tarjeta={selectedTarjeta}/>
    </>
  )
}

