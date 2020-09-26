import React, {useEffect, useState} from 'react'
import styled from '@emotion/styled'
import useMoneda from '../hooks/useMoneda'
import useCriptomoneda from '../hooks/useCriptomoneda'
import Error from './Error'

import Axios from 'axios'

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #fff;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326ac0;
        cursor: pointer;
    }
`

const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {

    const [listaCripto, guardarCripto] = useState([])
    const [error, guardarError] = useState(false)

    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dolar de EEUU'},
        {codigo: 'MXN', nombre: 'Peso Mexicano'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra Esterlina'}
    ]

    //Custom hook useMoneda
    const [moneda, SelectMonedas] = useMoneda('Elige tu moneda', '', MONEDAS)

    //Custom hook useCriptomoneda
    const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu criptomoneda', '', listaCripto)

    //Ejecutar llamada a la API cada vez que se ejecuta el componente para obtener el listado de criptomonedas de la API
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
            const resultado = await Axios.get(url)

            guardarCripto(resultado.data.Data)
        }

        consultarAPI()
    }, [])

    const cotizarMoneda = e => {
        e.preventDefault()

        //No pasa la validación de formulario
        if(moneda === '' || criptomoneda === '') {
            guardarError(true)
            return
        }

        //Pasa la validación de formulario
        guardarError(false)
        guardarMoneda(moneda)
        guardarCriptomoneda(criptomoneda)
    }

    return (
        <form onSubmit={cotizarMoneda}>
            {error ? <Error mensaje='Todos los campos son obligatorios' /> : null}
            <SelectMonedas />
            <SelectCripto />
            <Boton type='submit' value='Calcular' />
        </form>
    )
}
 
export default Formulario