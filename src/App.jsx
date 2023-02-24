import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { Filtros } from './components/Filtros'
import { ListadoGastos } from './components/ListadoGastos'
import { Modal } from './components/Modal'
import { generarId } from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {
  
  //Determina el presupuesto inicial de la Aplicación.
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  )

  //Determina el total de gastos de la App en un array de objetos
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )
  // Realiza las comprobaciones para determinar el el presupuesto es válido.
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  // Sirve para poner o quitar la pantalla de agregar nuevo gasto.
  const [modal, setModal] = useState(false);

  // 
  const [animarModal, setAnimarModal] = useState(false)

  //Editar Gastos
  const [gastoEditar, setGastoEditar] = useState({})

  //State para Filtros
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  //
  useEffect(() => {    
    if(Object.keys(gastoEditar).length){
      setModal(true);

    setTimeout(() => {
      setAnimarModal(true)
    }, 500)
    }
  }, [gastoEditar]);

  //Local Storage
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])

  }, [presupuesto, gastos])
  
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])

  }, [gastos])
  
  useEffect(() => {    
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;

    if(presupuestoLS > 0){
      setIsValidPresupuesto(true)  // Detecta que es un presupuesto válido y va a la siguiente ventana.
    }
  }, [])

  // UseEffect para filtros
  useEffect(() => {
    if(filtro){
      // Filtrar gastos por categorias
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados);
    }

  }, [filtro])
  
  
  
  const handleNuevoGasto = () =>{
    setModal(true);
    setGastoEditar({});
    
    setTimeout(() => {
      setAnimarModal(true)
    }, 500)
  }

  const eliminarGasto = id =>{
    const gastosActualizados = gastos.filter(gasto => 
      gasto.id !== id);
      setGastos(gastosActualizados);
  }

  const guardarGastos = (gasto) =>{
    if(gasto.id){
      // Actualizar gasto
      const gastosActualizados = gastos.map(gastoState => (
        gastoState.id === gasto.id ? gasto : gastoState))

      setGastos(gastosActualizados)
      setGastoEditar({});
    }else{
      //Nuevo gasto
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto])
    }

    setAnimarModal(false)
    
    setTimeout(() =>{
      setModal(false)

    }, 500)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        gastos={gastos}
        setGastos={setGastos}
      />

      
      {
        isValidPresupuesto && (
          <>
            <main>
              <Filtros
                filtro={filtro}
                setFiltro={setFiltro}
              />
              <ListadoGastos
                gastos={gastos}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
                gastosFiltrados={gastosFiltrados}
                filtro={filtro}
              />
            </main>            
            <div className="nuevo-gasto">
              <img 
                src={IconoNuevoGasto} 
                alt="icono nuevo gasto"
                onClick={handleNuevoGasto}         
              />
            </div>
          </>
        ) 
      }

      {modal && <Modal
                setModal={setModal}
                animarModal={animarModal}
                setAnimarModal={setAnimarModal}
                guardarGastos={guardarGastos}
                gastoEditar={gastoEditar}
                setGastoEditar={setGastoEditar}
                />
      }
    </div>
  )
}

export default App
