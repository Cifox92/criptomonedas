import styled from '@emotion/styled'
import React, {useState} from 'react'

const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
`

const Select = styled.select`
    width: 100%;
    display: block;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1.2rem;
`

//Custom hook!
const useMoneda = (label, stateInicial, opciones) => {

    //State del hook
    const [state, actualizarState] = useState(stateInicial)
    
    const SelectMoneda = () => (
        <>
            <Label>{label}</Label>
            <Select onChange={e => actualizarState(e.target.value)} value={state}>
                <option value=''>- Seleccione -</option>
                {opciones.map(opcion => (
                    <option key={opcion.codigo} value={opcion.codigo}>{opcion.nombre}</option>
                ))}
            </Select>
        </>
    )

    //Retornar el state del hook, la interfaz y la función que modifica su state.
    return [state, SelectMoneda, actualizarState]
}

export default useMoneda