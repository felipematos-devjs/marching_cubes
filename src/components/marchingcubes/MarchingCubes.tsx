import * as THREE from 'three'
import React, { useEffect, useRef } from 'react'
import VoxelGrid from './VoxelGrid'
import { createNoise3D } from 'simplex-noise'
import { march_cube } from './utils'


interface IMarchingCubesProps {
    resolution: number
}


const MarchingCubes = React.forwardRef<THREE.Group, IMarchingCubesProps>((props, ref) => {

    const voxelGrid = useRef(new VoxelGrid(props.resolution))

    const generate = () =>{
        //generate scalar field
        const noise = createNoise3D()
        for (let x = 0; x < props.resolution; x++) {
            for (let y = 0; y < props.resolution; y++) {
                for (let z = 0; z < props.resolution; z++) {
                    const value = noise(x, y, z)
                    console.log(value)
                    voxelGrid.current.writeVoxel(x, y, z, value)
                }
            }
        }

        //march the cubes
        const vertices: THREE.Vector3[]= []
        for (let x = 0; x < props.resolution; x++) {
            for (let y = 0; y < props.resolution; y++) {
                for (let z = 0; z < props.resolution; z++) {
                    march_cube(x, y, z, voxelGrid.current, vertices)
                }
            }
        }

        //generate the mesh
        console.log(vertices)

    }

    useEffect(()=>{
        generate()
    }, [])

    return (
    <group ref={ref}>
        <mesh>
            <boxGeometry />
            <meshNormalMaterial />
        </mesh>
    </group>
    )
})

export default MarchingCubes