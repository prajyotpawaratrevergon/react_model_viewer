import {Suspense, useEffect, useRef, useState} from 'react'
import {Canvas , useFrame} from '@react-three/fiber'
import {OrbitControls, useGLTF} from '@react-three/drei'
import { MeshBasicMaterial, MeshPhongMaterial } from 'three';
import { SketchPicker } from 'react-color';


function useColorPicker(initialColor = '#ffffff') {
    const [selectedColor, setSelectedColor] = useState(initialColor); 
  
    const handleColorChange = (color) => {
      setSelectedColor(color.hex); 
    };
  
    const setColorToNode = (nodeRef) => {
      if (nodeRef.current) {
        nodeRef.current.material.color.setHex(selectedColor);
      } else {
        console.warn('Node reference is not available.');
      }
    };
  
    return { selectedColor, handleColorChange, setColorToNode };
  }
  
function ColorPickerNodeSelector({ nodes, onColorChange }) {
    const selectedNodeRef = useRef(null); // Stores the currently selected node reference
    const [selectedColor, setSelectedColor] = useState('#ffffff');
    const handleClick = (nodeRef) => {
      selectedNodeRef.current = nodeRef; // Update selected node on click
    };
  
    const handleColorSelection = (color) => {    
      if (selectedNodeRef.current) {
        const material = new MeshBasicMaterial({ color: color.hex }); 
        selectedNodeRef.current.material = material; 
      } else {
        console.warn('Please select a node first.');
      }
  
      onColorChange(color); 
    };
    
    return ( 
      <div>
        <h2>Select Node to Change Color:</h2>
        <ul>
          {Object.entries(nodes).map(([nodeName, node]) => (
            <li key={nodeName}>
              <button onClick={() => handleClick(node.ref)}>{nodeName}</button>
            </li>
          ))}
        </ul>
        <SketchPicker color={selectedColor} onChange={handleColorSelection} />
      </div>
      
    );
    
  }
  