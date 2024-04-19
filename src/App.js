import {Suspense, useEffect, useRef, useState} from 'react'
import {Canvas , useFrame} from '@react-three/fiber'
import {OrbitControls, useGLTF} from '@react-three/drei'
import './index.css';
import { SketchPicker } from 'react-color';
import './components/model/ModelPrototype'
import ModelPrototype from './components/model/ModelPrototype';
import { MeshPhongMaterial } from 'three';



function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const [selectedColor, setSelectedColor] = useState('#ffffff'); // Initial color  
  const [selectedPart, setSelectedPart] = useState("all");  
  // const [partsMaterialMap, setPartsMaterialMap] = useState({
  //   back: {
  //     material: new MeshPhongMaterial({ color: '#ffffff', shininess: 100 }),
  //   },
  //   base: {
  //     material: new MeshPhongMaterial({ color: '#ffffff', shininess: 100 }),
  //   },
  //   cushions: {
  //     material: new MeshPhongMaterial({ color: '#ffffff', shininess: 100 }), 
  //   },
  //   legs: {
  //     material: new MeshPhongMaterial({ color: '#ffffff', shininess: 100 }), 
  //   },
  // });
  const partsMaterialMap = {
      back: new MeshPhongMaterial({ color: '#ffffff', shininess: 100 }),
      base:new MeshPhongMaterial({ color: '#ffffff', shininess: 100 }),
      cushions:new MeshPhongMaterial({ color: '#ffffff', shininess: 100 }),
      legs:new MeshPhongMaterial({ color: '#ffffff', shininess: 100 }),
    }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  
  
  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
    const currentMaterial = new MeshPhongMaterial({ color: color, shininess: 100 });
    updateMaterialPartMap(selectedPart,selectedColor,currentMaterial);
  };

  const updateMaterialPartMap = (part, color) => {
    partsMaterialMap[part].material =   new MeshPhongMaterial({ color: color, shininess: 100 })
  };

  

  function PartOptionsList({ selectedPart, onPartChange }) {
    const [options, setOptions] = useState([ // Array of options
      { name: 'Back', part: 'back' },
      { name: 'Base', part: 'base' },
      { name: 'Cushions', part: 'cushions' },
      { name: 'Legs', part: 'legs' },
    ]);
  
    const handleChange = (event) => {
      console.log(event);
      onPartChange(event); 
      console.log("part selected:" + selectedPart);
      console.log("updated map is : " + JSON.stringify(partsMaterialMap));
    };
  
    return (
      <ul  className="options-list">
        {options.map((option) => (
          <li key={option.part}>
            <button
              onClick={() => handleChange(option.part)}
              className={selectedPart === option.part ? 'active' : ''}
              >
              {option.name}
            </button>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
    <div className="wrapper">
    <div className="viewport">
      <h2>Viewport</h2>
      <Canvas  camera={{ fov:100, position: [0,0,15]}} style={{ width: windowWidth*0.7, height:windowHeight*0.8 }}>
        <Suspense fallback={null}>
          <ambientLight />
          <directionalLight intensity={2} position={[0,0,50]} />
          <ModelPrototype  
          selectedPart={selectedPart}
            selectedColor={selectedColor}
            onColorChange={handleColorChange}/>
          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        </Suspense>
      </Canvas>
      </div>
        <div className='selectionpanel' >
          <h2>Selection Panel</h2>
      <SketchPicker color={selectedColor} onChange={handleColorChange} /> 
      <PartOptionsList selectedPart={selectedPart} onPartChange={setSelectedPart} />
   </div>
 </div>
    </>
  );
}

export default App;
