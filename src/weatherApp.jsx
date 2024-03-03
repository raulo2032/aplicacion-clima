import { useState } from "react"
export const WeatherApp = () => {

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = '71cff5fab8bfa210f316e5d1f027f4db'
    const dif_kelvin = 273.15


    // ?q={city name}&appid={API key}'

    const [ciudad, setCiudad] = useState('')
    const [dataClima, setDataClima] = useState(null)

    const handleCambioCiudad = (e) =>{

        setCiudad(e.target.value)

    }

    const handleSubmit = (e)=>{

        e.preventDefault()
        if(ciudad.length > 0) fetchClima()

    }

    const fetchClima = async() => {
        try{
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`)
            const data = await response.json()
            setDataClima(data)

        }catch(error){
            console.error('Ocurrio el siguiente problema:', error)
        }


        }


    
  return (
    <div className="container">
        <h1>Aplicaicon del clima</h1>

        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={ciudad}
                onChange={handleCambioCiudad}
            />
            <button type="submit">Buscar</button>

        </form >
        {
            dataClima && (
                <div>
                    <h2>En la ciudad de {dataClima.name}</h2>
                    La temperatura es de: {parseInt(dataClima?.main?.temp - dif_kelvin)}°C 
                    <p>Principalmente hay {dataClima.weather[0].description} </p>
                    <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}/>

                </div>
            )
        }



    </div>
  )
}
