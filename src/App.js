import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

function App() {
  const [ip, setip] = useState("192.168.43.195");
  const [port, setport] = useState("55555");
  const [pingInterval, setpingInterval] = useState(2000);
  const [response, setresponse] = useState([])


  const handleSentEvent = () => {
    console.log("in socket")
    const socket = socketIOClient(`http://${ip}:${port}`);
    // let interval = setInterval(() => {
      socket.emit('client', "data", function (data) {
        console.log(data)
      })
    // }
    //   , pingInterval);
    socket.on("data", data => {
      console.log(data.toString()); // print out data
    });
  }

  return (
    <div style={{ display: "inline-flex" }}>
      <div style={{ margin: '80px' }}>
        <div style={{ margin: '10px' }}><label style={{ fontSize: 25 }}>IP Address {"(Ex: 127.0.0.1)"}</label></div>
        <input style={{ margin: '10px' }} type="text" value={ip} onChange={(e) => setip(e.target.value)} />
        <div style={{ margin: '10px' }}><label style={{ fontSize: 25 }}>Port {"(Ex: 8000)"}</label></div>
        <input style={{ margin: '10px' }} type="text" value={port} onChange={(e) => setport(e.target.value)} />
        <div style={{ margin: '10px' }}><label style={{ fontSize: 25 }}>Interval {"(Note: Intervals should be in millseconds)"}</label></div>
        <input style={{ margin: '10px' }} type="text" value={pingInterval} onChange={(e) => setpingInterval(e.target.value)} />
        <div>
          <button style={{ backgroundColor: '#008CBA', margin: '10px', width: 175, height: 30 }} onClick={() => handleSentEvent()}>Send Event</button>
        </div>
      </div>
      <div style={{ margin: '80px', border: '1px solid', width: 500, boxShadow: '5px 5px', overflow: "auto", maxHeight: 600 }}>
        {
          response.length > 0 && response.map((data, index) => (
            <p style={{ margin: 0, fontSize: 20 }} key={index}>
              {index + 1}{') '}{data}
            </p>
          ))
        }
      </div>
    </div >
  );
}

export default App;