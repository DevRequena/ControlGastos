import { useEffect, useState } from 'react';
import {Mensaje} from './Mensaje'
import CerrarBtn from '../img/cerrar.svg'

export const Modal = ({
  setModal, 
  animarModal, 
  setAnimarModal, 
  guardarGastos, 
  gastoEditar,
  setGastoEditar
}) => {

  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState(0);
  const [categoria, setCategoria] = useState('');
  const [fecha, setFecha] = useState('');
  const [id, setId] = useState('');
  
  const [error, setError] = useState('');

  useEffect(() => {
    if(Object.keys(gastoEditar).length){
      setNombre(gastoEditar.nombre);
      setCantidad(gastoEditar.cantidad);
      setCategoria(gastoEditar.categoria);
      setId(gastoEditar.id)
      setFecha(gastoEditar.fecha)
    }
  
  }, [])
  
  const ocultarModal = () =>{
    setGastoEditar({})
    setAnimarModal(false)
    
    setTimeout(() =>{
      setModal(false)

    }, 500)
  }
  

  const handleSubmit = (e) =>{
    e.preventDefault();

    if([nombre, cantidad, categoria].includes("")){
      setError("Todos los Campos son Obligatorios")

      setTimeout(() => {
        setError('')
      }, 3000);
      return
    }
    guardarGastos({nombre, cantidad, categoria, id, fecha})
  }



  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img 
          src={CerrarBtn} 
          alt="cerrar modal"
          onClick={ocultarModal} 
        />
      </div>

      <form 
        onSubmit={handleSubmit}
        className={`formulario ${animarModal ? "animar" : 'cerrar'}`}>
        <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
        {error && <Mensaje type="error">{error}</Mensaje>}

        <div className="campo">
          <label htmlFor="nombre">Nombre Gasto</label>

          <input
            id='nombre' 
            type="text"
            placeholder='Añade el Nombre del Gasto'
            value={nombre}
            onChange={(e) => {setNombre(e.target.value)}}
          />
        </div>
        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>

          <input
            id='cantidad' 
            type="number"
            placeholder='Añade la cantidad del gasto'
            value={cantidad}
            onChange={(e) => {setCantidad(Number(e.target.value))}}
          />
        </div>
        <div className="campo">
          <label htmlFor="cantegoria">Categorías</label>

          <select 
            id="categoria"
            value={categoria}
            onChange={(e) => {setCategoria(e.target.value)}}
          >
            <option value="">-- Seleccione --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos Varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>

        <input 
          type="submit"
          value={gastoEditar.nombre ? 'Guardar Cambios' : 'Añadir Gasto'}
        />
      </form>
    </div>
  )
}
