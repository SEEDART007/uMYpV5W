import React, { useEffect, useState } from 'react'
import Design from './Design.css'
import axios from 'axios'
import fan from './fan.jpg'

function App() {
  const[fetchedData,setFetchedData]=useState([])
  const[bulbData,setBulbData]=useState({teamid:"uMYpV5W",device:"bulb",value:0})
const[isBulbOn,setIsBulbOn]=useState(false)
const[speedOfFan,setSpeedOfFan]=useState(0)
const[isAcOn,setIsAcOn]=useState(false)
const[tempOfAc,setTempOfAc]=useState(0)
const[LedColor,setLedColor]=useState('')
useEffect(()=>{
    
    getData()
  
},[])
const getData=async()=>{
  let data=await axios.get('https://kodessphere-api.vercel.app/devices/uMYpV5W')
   setFetchedData(data.data)
  console.log("fetcheddata=>",fetchedData)
  
}

const handleFan=async(e)=>{
  setSpeedOfFan(e.target.value)
  let data={
    teamid:"uMYpV5W",
    device:"fan",
    value:speedOfFan+1,}

  const res=await axios.post('https://kodessphere-api.vercel.app/devices',data)
  if(speedOfFan>5){
    alert("speed of fan should be less than")
  }


}

const handleBulb=async()=>{
 let data={
    teamid:"uMYpV5W",
    device:"bulb",
    value:0
  }


  if(isBulbOn){
    let data={
      teamid:"uMYpV5W",
      device:"bulb",
      value:0,
    }
    const res=await axios.post('https://kodessphere-api.vercel.app/devices',data)
    console.log("post",res)
    setIsBulbOn(false)
    console.log("bulb is on")
    window.location.reload()
    
  }else{
    let data={
      teamid:"uMYpV5W",
      device:"bulb",
      value:1,
    }
    const res=await axios.post('https://kodessphere-api.vercel.app/devices',data)  
    console.log("post",res)
    setIsBulbOn(true)
    console.log("bulb is off")
    window.location.reload()
  }

}
  return (

  <div>
    {
      fetchedData!=0?(fetchedData&&<div className='megabox'>
        <div className='head'>
        <h2>Simulation page for Bytes</h2>
        <p>This page listens to the changes in the database and updates the UI in real time</p>
        </div>
      <div className='superbox'>
      <div className='box1'>
        <h2>Fan</h2>
        <p>Control the speed of the fan</p>
        <h1>☢</h1>
        
       <input placeholder='speed'  className='faninput' value={fetchedData.fan&&speedOfFan} type='number' onChange={handleFan}></input>

      </div>
      <div className='box2'>
      <h2>Bulb</h2>
        <p>Turn on or off the bulb</p>
        <h1>💡</h1>
        <button className='btn-fan' onClick={handleBulb}>{fetchedData.bulb===0?"off":"on"}</button>

      </div>
      <div className='box3'>
      <h2>LED</h2>
        <p>Control the color of the led</p>
        <h1>🚨</h1>
       <input className='led-input' value={fetchedData.led&&LedColor} type='text' onChange={e=>setLedColor(e.target.value)}></input>

      </div>
      <div className='box4'>
      <h2>AC</h2>
        <p>Control state & temp of Ac</p>
        <h1>❄️</h1>
       <button className='ac-btn' onClick={handleFan}>{fetchedData.ac.state===0?"off":"on"}</button>
       <input className='ac-input' value={fetchedData.ac.temp&&tempOfAc} type='number' onChange={e=>setTempOfAc(e.target.value)}></input>
      </div>
      </div>
    </div>):(<h1>loading</h1>)
}
  </div>
 
  )
}

export default App

