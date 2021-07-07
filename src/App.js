
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
  const [roomName, setRoomName] = useState([])
  const eventNameRef = useRef()
  const userName = useRef()
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
 
  function check(name){
    let list = events
    if (list.length ==0){return true}
    for ( let i =0; i < list.length;i++){
      if(list[i].name == name){
        console.log("inn")
        return false
      }
    return true
  }
}
  // Add new event
  function addEvent(){
    const name = eventNameRef.current.value
    if (name !== "" && check(name) ){
      setEvent([...events,{id:uuidv1(),name: name,chat: ["test"]}] )
    }
    eventNameRef.current.value = null
  }

  // Delete event function
  function deleteEvent(id){
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
 function Room(){
  const roomName = userName.current.value
  setRoomName(roomName)

 }
 function Chat(id,chat){
  let list = events
  for ( let i =0; i < list.length;i++){
      if (list[i].id === id){
          list[i].chat.push(chat)
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
      <input ref={userName} type ="text"/>  
      <button onClick= {Room}> Room </button>
      <Events Chat= {Chat} events = {events} deleteEvent = {deleteEvent} roomName = {roomName} ></Events>
    </div>
  );
}

export default App;
