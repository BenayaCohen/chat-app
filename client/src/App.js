import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";
import { uuid } from 'uuidv4';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [copied,setCopied] = useState(false)
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  const generateID = () => {
    const ID = uuid()
    setCopied(true)
    setRoom(ID)
    navigator.clipboard.writeText(ID)
    setTimeout(() => {
      setCopied(false)
    }, 3000);
  }

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Private Chat</h3>
          <div>
            <input
              type="text"
              placeholder="John..."
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <input
              type="text"
              value={room}
              placeholder="Room ID..."
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            />
            <button onClick={joinRoom}>Join A Room</button>
            <button onClick={generateID}>Generate room ID</button>
          </div>
          {copied && <Alert key='success' variant='success'>
        Room ID copied to clipboard!
      </Alert>}
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
      
    </div>
  );
}

export default App;
