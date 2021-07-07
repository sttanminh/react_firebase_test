import React  from "react"
import { useState,useEffect } from "react"
export default function Events({events, deleteEvent}){
    
    return (
        
        events.map(event =>{
            return <div>
                <h1>{event.name}</h1>
                <button onClick= {()=>{
                    deleteEvent(event.id)
                }} >Delete</button>
            </div>
        })
    )
}