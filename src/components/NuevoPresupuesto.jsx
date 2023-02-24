import { useState } from "react";
import { Mensaje } from "./Mensaje";

export const NuevoPresupuesto = ({presupuesto, setPresupuesto, setIsValidPresupuesto}) => {
  
  const [mensaje, setMensaje] = useState('');
  
  const handlePresupuesto = (e) =>{
    e.preventDefault();

    if(!presupuesto || presupuesto < 0){
      setMensaje('No es un presupuesto válido')
      return
    }
    setMensaje('');
    setIsValidPresupuesto(true);
  }
  
  return (
    <div className='contenedor-presupuesto contenedor sombra'>
      <form onSubmit={handlePresupuesto} className='formulario'>
        <div className='campo'>
          <label htmlFor="" className="presupuesto">Definir Presupuesto</label>
            <input 
              className='nuevo-presupuesto'
              type="number"
              placeholder='Añade tu Presupuesto'
              value={presupuesto}
              onChange={(e) => {setPresupuesto(Number(e.target.value))}}
            />
            <input type="submit" value="añadir" />
            {mensaje && <Mensaje type="error">{mensaje}</Mensaje>}
        </div>
      </form>
    </div>
  )
}
