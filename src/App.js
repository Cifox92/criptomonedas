import React, {useState, useEffect} from 'react'
import styled from '@emotion/styled'
import Axios from 'axios'
import imagen from './cryptomonedas.png'
import Formulario from './components/Formulario'
import Cotizacion from './components/Cotizacion'
import Spinner from './components/Spinner'

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`

function App() {

  const [moneda, guardarMoneda] = useState('')
  const [criptomoneda, guardarCriptomoneda] = useState('')
  const [resultado, guardarResultado] = useState({})
  const [cargando, guardarCargando] = useState(false)

  //Segunda llamada a la API para conocer la cotización, se ejecuta cuando los estados de moneda y criptomoneda se actualizan
  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      if(moneda === '') return

      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
  
      const resultado = await Axios.get(url)

      //Mostrar el spinner
      guardarCargando(true)

      setTimeout(() => {
          guardarCargando(false)

          //Debido a que los campos del objeto que devuelve la API cambian según las opciones que el usuario elija, es necesario definir los campos de criptomoneda y moneda de esta manera, para poder acceder a ellos (respuesta de API dinámica)
          guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda])
      }, 3000)  
    }

    cotizarCriptomoneda()

  }, [moneda, criptomoneda])

  const Componente = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado} />

  return (
    <Contenedor>
      <div>
        <Imagen src={imagen} alt='imagen cripto' />
      </div>
      <div>
        <Heading>Cotiza criptomonedas al instante</Heading>

        <Formulario guardarMoneda={guardarMoneda} guardarCriptomoneda={guardarCriptomoneda} />

        {Componente}
      </div>
    </Contenedor>
  )
}

export default App
