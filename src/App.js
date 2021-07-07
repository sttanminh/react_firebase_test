
import Events from './Events';
import './App.css';
import { useState,useEffect, useRef } from 'react';
import firebase from './firebase'
import { v1 as uuidv1 } from 'uuid'
function App() {
  
  // console.log(store)
  // const eventRef = db.ref("events")
  // const eventsss = 
  const [events, setEvent] = useState([])
  const eventNameRef = useRef()
  const db = firebase.database()
  const eventRef = db.ref("events")

  // Restore data from firebase
  useEffect(()=>{
    eventRef.on('value',(snapshot)=>{
      const data = snapshot.val();

      if (data !== null){
      setEvent(data)
      }
      else{
        setEvent([])
      }
    })
  },[])

  
  // Add new event
  function addEvent(){
    const name = eventNameRef.current.value
    if (name !== ""){
      setEvent([...events,{id:uuidv1()   ,name: name}] )
    }
  }

  // Delete event function
  function deleteEvent(id){
    console.log("ditme")
    let list = events
    for ( let i =0; i < list.length;i++){
        if (list[i].id === id){
            list.splice(i,1)
            console.log(list)
            setEvent([...list])
            break
        }
    }
}


  // Sent new data to firebase
  useEffect(()=>{
    if (events.length !== 0 ){
      eventRef.set(events);
    }
  },[events])

  // Return event
  return (
    <div className="App">
      <input ref={eventNameRef} type="text"/>
      <button onClick= {addEvent}> Add events</button>
      <Events events = {events} deleteEvent = {deleteEvent}></Events>
    </div>
  );
}

export default App;
