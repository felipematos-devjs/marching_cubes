import * as THREE from 'three'

import { Environment, OrbitControls, PerspectiveCamera, RoundedBox } from "@react-three/drei"
import { Canvas, extend} from "@react-three/fiber"
import { useEffect, useRef } from "react"
import MarchingCubes from '../marchingcubes/MarchingCubes'
import { useControls } from 'leva'
import Lights from './Lights'

//world is 9 x 9 x 9 chunks
const WORLD = 1


const Experience = () => {

    const {res} = useControls({res: {
        value: 32,
        step: 1,
        min: 8,
        max: 50
    }})

    var worldArray : {x: number, y: number, z: number}[] = [];
    
    for (let i = 0; i < WORLD; i++) {
        for (let j = 0; j < WORLD; j++) {
            for (let k = 0; k < WORLD; k++) {
                worldArray.push({x: i, y: j, z: k})
            }
        }  
    }

    return (
        <Canvas shadows>
            <OrbitControls />
            <Lights />
            <PerspectiveCamera makeDefault position={[30, 30, 30]}/>
            <MarchingCubes resolution={res} chunkPosition={[0, 0, 0]}/>
            <RoundedBox args={[res + 3, 1, res + 3]} radius={0.1}>
                <meshStandardMaterial />
            </RoundedBox>
            
        </Canvas>
    )
}


export default Experience