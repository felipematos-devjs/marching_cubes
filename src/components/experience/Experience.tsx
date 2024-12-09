import * as THREE from 'three'

import { OrbitControls } from "@react-three/drei"
import { Canvas, extend} from "@react-three/fiber"
import { useEffect, useRef } from "react"
import MarchingCubes from '../marchingcubes/MarchingCubes'


const Experience = () => {


    return (
        <Canvas>
            <OrbitControls />
            <MarchingCubes resolution={8} />
        </Canvas>
    )
}

export default Experience