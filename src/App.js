import './App.css';
import React, { useState } from 'react';
import Navigation from './components/Navigation/Navigation'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import * as blazeface from '@tensorflow-models/blazeface';
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register';
import '@tensorflow/tfjs-backend-webgl';


function App() {
  const [input, setInput] = useState('');
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({name: '', id: '', email: '', joined: ''});

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      joined: data.joined
    })
  }

  async function faceDetect() {

    const model = await blazeface.load();

    var c = document.getElementById('myCanvas');
    var ctx = c.getContext('2d');

    const returnTensors = false; 
    const predictions = await model.estimateFaces(document.getElementById("myCanvas"), returnTensors);
    console.log(predictions)
    if (predictions.length > 0) {
        const start = predictions[0].topLeft;
        const end = predictions[0].bottomRight;
        const size = [end[0] - start[0], end[1] - start[1]];
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'red';
        ctx.rect(start[0], start[1], size[0], size[1]);
        ctx.stroke();
    }
  }

  const onInputChange = (event) => {
    setInput(event.target.value);
  }

  const onButtonSubmit = () => {
    loadImg();
    faceDetect();
  }

  const loadImg = () => {
    var linkImg = new Image();
    linkImg.crossOrigin = '';
    var c = document.getElementById('myCanvas');
    var ctx = c.getContext('2d');
    ctx.clearRect(0, 0, c.width, c.height);
    linkImg.onload = function() {
      c.width = this.naturalWidth;
      c.height = this.naturalHeight;
      ctx.drawImage(this, 0, 0);
    };
      linkImg.src = input;
      console.log(input)
  }

  const onRouteChange = (route) => {
    if(route === 'signin'){
      setIsSignedIn(false)
    } else if (route === 'home'){
      setIsSignedIn(true)
    }
    setRoute(route)
  }

  return (
    <div className="App">
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      { 
        route === 'home' 
        ? <div>
            <ImageLinkForm 
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
            name={user.name}
            />
            <FaceRecognition/>
          </div>
        : (
          route === 'signin' 
          ? <Signin onRouteChange={onRouteChange} loadUser={loadUser}/>
          : <Register loadUser={loadUser} onRouteChange={onRouteChange}/>
        )
     }
    </div>
  );
}

export default App;
