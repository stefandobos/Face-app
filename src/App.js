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
    for (let i = 0; i < predictions.length; i++) {
        const start = predictions[i].topLeft;
        const end = predictions[i].bottomRight;
        const size = [end[0] - start[0], end[1] - start[1]];
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'red';
        ctx.rect(start[0], start[1], size[0], size[1]);
        ctx.stroke();
    }
  }

  const onButtonSubmit = () => {
    faceDetect();
  }

  const loadImg = () => {
    let imgInput = document.getElementById('face-image');
    if(imgInput){
      imgInput.addEventListener('change', function(e){
        if(e.target.files){
          let imageFile = e.target.files[0];
          var reader = new FileReader();
          console.log(imageFile)
          if(imageFile){
            console.log(imageFile)
            reader.readAsDataURL(imageFile);
          }
          reader.onloadend = (e) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = (ev) => {
              var c = document.getElementById("myCanvas");
              var ctx = c.getContext("2d");
              c.width = image.width;
              c.height = image.height; 
              ctx.drawImage(image,0,0); 
            }
          }
        }
      })
    }
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
            onButtonSubmit={onButtonSubmit}
            loadImg={loadImg}
            name={user.name}
            />
            <FaceRecognition/>
          </div>
        : (
          route === 'signin' 
          ? <Signin onRouteChange={onRouteChange} loadUser={loadUser} loadImg={loadImg}/>
          : <Register loadUser={loadUser} onRouteChange={onRouteChange} loadImg={loadImg}/>
        )
     }
    </div>
  );
}

export default App;
