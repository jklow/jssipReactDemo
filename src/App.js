import logo from './logo.svg';
import './App.css';
import { useState,useRef } from 'react';

function App(props) {

  const [emotion, setEmotion] = useState("Hmm");


  const txtMood=useRef();

  const handleClick = () => {


    const element = document.getElementById('mood');
    console.log(element);
    console.log(txtMood.current.value);
    setEmotion(element.value);
    setEmotion(txtMood.current.value);

  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <p>
          How's your mood?
        </p>

        <p>
          I am {emotion}
        </p>

        <p>
          <input type="text" id="mood" ref={txtMood} placeholder="my mood now.."></input>
          <button onClick={handleClick}>Update Mood</button>
        </p>
      </header>
    </div>
  );
}

export default App;
