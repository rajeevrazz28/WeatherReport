import React from 'react'
import Clock from './Clock';
import './new.css'

const api = {
  key: '60f0b5d37920ccd59b796d0a3d0b6191',
  base:'https://api.openweathermap.org/geo/1.0/',
  baseUrl: 'https://api.openweathermap.org/data/2.5/',
}

function New() {

const [name,setName]=React.useState('');
const [weatherdata, setWeatherdata]=React.useState([]);
const [buttonClicked,setButtonClicked]=React.useState(false);

const search=(e)=>{
  e.preventDefault();
  if(name!==''){
  fetch(`${api.base}direct?q=${name}&limit=1&appid=${api.key}`)
    .then((res)=>res.json())
    .then((data)=>{
      
      fetch(`${api.baseUrl}weather?lat=${data[0].lat}&lon=${data[0].lon}&units=metric&appid=${api.key}`)
      .then((res)=>res.json())
      .then((result)=>{
        setWeatherdata(result);
        console.log(result);
        setButtonClicked(true);
      })
    }).catch((err)=>{
      return;
    });
}}


  return (
    <div className='container'>
      <div className='searchcontainer'>
        <form on onSubmit={search}>
         <input className='inputbox' type='text'  placeholder='Enter a city name...' value={name} onChange={(e)=>setName(e.target.value)}></input>
        <button className='button' >Search</button>
        </form>
      </div>
     {buttonClicked && weatherdata && ( 
      <div className='weathercontainer'>
        <div className='topcontainer'>
          <h1>{weatherdata.name}</h1>
          <Clock />
        </div>
        <div className='secondcontainer'>
            
              <h1>{weatherdata.main.temp} °C</h1>
              
                       
        </div>
        <div>
           <h2>{weatherdata.weather[0].main}</h2>
           <h3>Feels like {weatherdata.main.feels_like} °C</h3>
        </div>
        <div className='bottomcontainer'>
          
          <div className='smallpoints'>
          <h3 className='points'>Pressure</h3>
          <h3>{(weatherdata.main.pressure)/1000} Bar</h3>
          </div>
          <div className='smallpoints'>
          <h3 className='points'>Humidity</h3>
          <h3> {weatherdata.main.humidity} %</h3>  
          </div>
          <div className='smallpoints'>
          <h3 className='points'>Wind Speed </h3>
          <h3>{weatherdata.wind.speed} m/s</h3>
          </div>
          <div className='smallpoints'>
          <h3 className='points'>Wind Direction  </h3>
          <h3>{weatherdata.wind.deg} °</h3>
          </div>
          <div className='smallpoints'>
          <h3 className='points'>Cloudiness </h3>
          {weatherdata.clouds.all} %
          </div>
          <div className='smallpoints'>
          <h3 className='points'>Altitude  </h3>
          <h3>{weatherdata.main.grnd_level} m</h3>
          </div>
        </div>
      </div>
      )}
    </div>
  )
}

export default New
