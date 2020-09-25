import React, {useState} from 'react'

//Custom hook!

const useMoneda = (label, stateInicial, opciones) => {

    //State del hook
    const [state, actualizarState] = useState(stateInicial)
    
    const Seleccionar = () => (
        <>
            <label>{label}</label>
            <select onChange={e => actualizarState(e.target.value)} value={state}>
                <option value=''>- Seleccione -</option>
                {opciones.map(opcion => (
                    <option key={opcion.codigo} value={opcion.codigo}>{opcion.nombre}</option>
                ))}
            </select>
        </>
    )

    //Retornar el state del hook, la interfaz y la función que modifica su state.
    return [state, Seleccionar, actualizarState]
}

export default useMoneda