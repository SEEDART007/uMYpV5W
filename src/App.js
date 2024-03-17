import React, { useEffect, useState } from 'react'
import Design from './Design.css'
import axios from 'axios'
import fan from './fan.jpg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  let explicitSpeedOfFan;
  console.log(explicitSpeedOfFan) 
  const[fetchedData,setFetchedData]=useState([]) 
  const[bulbData,setBulbData]=useState({teamid:"uMYpV5W",device:"bulb",value:fetchedData.bulb})
const[isBulbOn,setIsBulbOn]=useState(false)
const[speedOfFan,setSpeedOfFan]=useState()
const[isAcOn,setIsAcOn]=useState(false)
const[tempOfAc,setTempOfAc]=useState(16) 
const[LedColor,setLedColor]=useState('')
useEffect(()=>{
  
    getData();
  
},[])
const getData=async()=>{
  let data=await axios.get('https://kodessphere-api.vercel.app/devices/uMYpV5W')
   setFetchedData(data.data)
   explicitSpeedOfFan=data.data.fan
   console.log(data.data.fan)
  console.log("fetcheddata=>",fetchedData)
  
}


const handleFan=async(e)=>{
  setSpeedOfFan(e.target.value)
  let data={
    teamid:"uMYpV5W",
    device:"fan",
    value:speedOfFan,}

  const res=await axios.post('https://kodessphere-api.vercel.app/devices',data)
  if(speedOfFan>5){
    toast.error("speed of fan should be less than 5")
    setSpeedOfFan(5)
  }


}
const handleLed=async(e)=>{
 setLedColor(e.target.value)
 let data={
  teamid:"uMYpV5W",
  device:"led",
  value:LedColor,}
 const res= await axios.post('https://kodessphere-api.vercel.app/devices',data)
 const box=document.getElementById('box3')
 box.style.backgroundColor=LedColor
}
const handleAc=async()=>{
if(isAcOn){
  let data={
    teamid:"uMYpV5W",
    device:"ac",
    value:{
      "temp":tempOfAc,
      "state":0,
    },}
    let res=await axios.post('https://kodessphere-api.vercel.app/devices',data)
    console.log("ac",res)
    setIsAcOn(false)
    getData()

  
}else{
  let data={
    teamid:"uMYpV5W",
    device:"ac",
    value:{
      temp:tempOfAc,
      state:1
    },}
    let res=await axios.post('https://kodessphere-api.vercel.app/devices',data)
    setIsAcOn(true)
    getData()

}

}
const handleAcChange=(e)=>{
  setTempOfAc(e.target.value)
  if(tempOfAc>30){
    setTempOfAc(30)
  }
  if(tempOfAc>25){
  const ice=  document.getElementById('ice')
  ice.innerHTML="🌥️"
 
    // toast.error("temp should be less than 30")

  }else{
    const ice=  document.getElementById('ice')
    ice.innerHTML="❄️"
  }
}

const handleBulb=async()=>{



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
    getData()
    
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
    getData()
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
       <ToastContainer />
        <h2>Fan</h2>
        <p>Control the speed of the fan</p>
        <h1>☢</h1>
     
       <input className='faninput' placeholder='speed'  value={speedOfFan} type='number' onChange={handleFan}></input>
    
      </div>
      <div className='box2'>
      <h2>Bulb</h2>
        <p>Turn on or off the bulb</p>
        <h1>💡</h1>
        <button id='bulb'  className='btn-fan'  onClick={handleBulb}>{fetchedData.bulb===0?"off":"on"}</button>

      </div>
      <div id='box3' className='box3'>
      <h2>LED</h2>
        <p>Control the color of the led</p>
        <h1>🚨</h1>
        <div className='led-div'>
       <input className='led-input' value={fetchedData.led&&LedColor} type='color' onChange={handleLed}></input>
       <input value={LedColor}></input>
       </div>

      </div>
      <div className='box4'>
      <h2>AC</h2>
        <p>Control state & temp of Ac</p>
        <h1 id='ice'>❄️</h1>
       
       <button className='ac-btn' onClick={handleAc}>{fetchedData.ac.state===0?"off":"on"}</button>
       <input className='ac-input' value={fetchedData.ac.temp&&tempOfAc} type='number' onChange={handleAcChange}></input>
      </div>
      </div>
    </div>):(<h1>loading</h1>)
}
  </div>
 
  )
}

export default App

