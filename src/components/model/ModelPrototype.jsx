
import {Suspense, useEffect, useRef, useState} from 'react'
import {Canvas , useFrame} from '@react-three/fiber'
import {OrbitControls, useGLTF} from '@react-three/drei'
import { MeshBasicMaterial, MeshPhongMaterial } from 'three';
import { SketchPicker } from 'react-color';

import React from 'react'

const ModelPrototype = ({ ...props }) => {
  const {selectedPart, selectedColor, changeColor } = props 
    const groupRef = useRef()
    const { nodes, materials } = useGLTF('/chair.glb');
    const INITIAL_MTL = new MeshPhongMaterial( { color: "white", shininess: 100 } );
    const nodesMap = {
      back: {
        geometry: nodes['back'].geometry,
        material: new MeshPhongMaterial({ color: '#ffffff', shininess: 100 }), // Initial color, shininess
      },
      base: {
        geometry: nodes['base'].geometry,
        material: new MeshPhongMaterial({ color: '#cccccc', shininess: 100 }),
      },
      cushions: {
        geometry: nodes['cushions'].geometry,
        material: new MeshPhongMaterial({ color: '#ff0000', shininess: 100 }),
      },
      legs: {
        geometry: nodes['legs'].geometry,
        material: new MeshPhongMaterial({ color: '#808080', shininess: 100 }),
      },
    };
    const nodesRefMap = { 
      back: { geometry: nodes['back'].geometry, ref: useRef() ,material : selectedPart == "back"? new MeshPhongMaterial( { color: selectedColor, shininess: 100 } ):INITIAL_MTL},
      base: { geometry: nodes['base'].geometry, ref: useRef(),material :  selectedPart == "base"? new MeshPhongMaterial( { color: selectedColor, shininess: 100 } ):INITIAL_MTL },
      cushions: { geometry: nodes['cushions'].geometry, ref: useRef() ,material : selectedPart == "cushions"? new MeshPhongMaterial( { color: selectedColor, shininess: 100 } ): INITIAL_MTL},
      legs: { geometry: nodes['legs'].geometry, ref: useRef() ,material :  selectedPart == "legs"? new MeshPhongMaterial( { color: selectedColor, shininess: 100 } ):INITIAL_MTL},
    };
    const finalRefMap = {
      back: { geometry: nodes['back'].geometry, ref: useRef() ,material : selectedPart == "back"? new MeshPhongMaterial( { color: selectedColor, shininess: 100 } ):INITIAL_MTL},
    };
    return (
      <group ref={groupRef} {...props} dispose={null}>
          <mesh ref={nodesRefMap.back.ref} geometry={nodesRefMap.back.geometry} material={nodesRefMap.back.material} position={[0,0,0]} scale={1}  />
          <mesh ref={nodesRefMap.base.ref} geometry={nodesRefMap.base.geometry} material={nodesRefMap.base.material} position={[0,0,0]} scale={1} />
          <mesh ref={nodesRefMap.cushions.ref} geometry={nodesRefMap.cushions.geometry} material={nodesRefMap.cushions.material} position={[0,0,0]} scale={1} />
          <mesh ref={nodesRefMap.legs.ref} geometry={nodesRefMap.legs.geometry} material={nodesRefMap.legs.material} position={[0,0,0]} scale={1} />
     </group>
  
    );
}

export default ModelPrototype
