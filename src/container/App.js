import React, { useEffect, useMemo, useState } from 'react';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Rank from '../components/Rank/Rank';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import SignIn from '../components/SignIn/SignIn';
import Register from '../components/Register/Register';
import './App.css';

const App = () => {
  const [init, setInit] = useState(false);
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [route, setRoute] = useState('signin');

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [entries, setEntries] = useState(0);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
    
    setImageUrl('https://media.licdn.com/dms/image/v2/D4D12AQFYAwqCnVPChg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1691045078079?e=1733356800&v=beta&t=l3y1Lcy2Wu8UPW_bV4_O5Td3SCa72muBX4k1mxrutaQ')

  }, []);

  const loadUser = (data) => {
    setId(data.id);
    setName(data.name);
    setEntries(data.entries);
  }

  const onRouteChange = (route) => {
    if(route === "signin"){
      setImageUrl('https://media.licdn.com/dms/image/v2/D4D12AQFYAwqCnVPChg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1691045078079?e=1733356800&v=beta&t=l3y1Lcy2Wu8UPW_bV4_O5Td3SCa72muBX4k1mxrutaQ')
    }
    setRoute(route)
  }

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 4,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 180,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  const onInputChange = (event) => {
    setInput(event.target.value)
  }

  const addBoundingBox = (data) => {
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    const parentDiv = document.getElementById('boundingBox');
    const newDiv = document.createElement('div');
    newDiv.className = 'bounding-box';
    newDiv.style.inset = `${data.topRow * height}px ${width - (data.rightCol * width)}px ${height - (data.bottomRow * height)}px ${data.leftCol * width}px`;
    parentDiv.appendChild(newDiv);
  }

  const removeBoundingBox = () => {
    const parentDiv = document.getElementById('boundingBox');
    const childDivs = parentDiv.querySelectorAll('div');
    childDivs.forEach((div) => div.remove());
  }

  const onButtonSubmit = () => {
    setImageUrl(input)
    
    fetch('https://face-recognition-api-k1mn.onrender.com/image', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          id: id,
          imageUrl: input
      })
    })
    .then(response => response.json())
    .then(data => {
      setEntries(data.count);
      removeBoundingBox();
      data.faceBox.forEach(fb => {
        addBoundingBox(fb)
      });
    }).catch(console.log)

  }

  if (init) {
    return (
      <div className="App">
        <Particles className='particles' id="tsparticles" options={options} />
        { 
         route === 'home' ?
            <div>
              <Navigation onRouteChange={onRouteChange} />
              <Logo />
              <Rank name={name} entries={entries} />
              <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} />
              <FaceRecognition imageUrl={imageUrl} />
            </div>
            :
            (
              route === 'signin' ?
              <SignIn loadUser={loadUser} onRouteChange={onRouteChange} /> 
              :
              <Register loadUser={loadUser} onRouteChange={onRouteChange} /> 
            )
        }
      </div>
    );
  }

}

export default App;
