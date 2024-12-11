import * as THREE from 'three'
import React, { useEffect, useMemo, useRef } from 'react'
import VoxelGrid from './VoxelGrid'
import { createNoise3D } from 'simplex-noise'
import { march_cube } from './utils'
import { ThreeEvent } from '@react-three/fiber'


interface IMarchingCubesProps {
    resolution: number,
    chunkPosition: [number, number, number]
}


const MarchingCubes = React.forwardRef<THREE.Group, IMarchingCubesProps>((props, ref) => {

    const voxelGrid = useMemo(()=>{
        return (new VoxelGrid(props.resolution))
    }, [props.resolution])

    const geoRef = useRef<THREE.BufferGeometry>(null!)
    const vertArray = useRef(new Float32Array(300000))

    const generateRandom = () =>{
        //generate scalar field
        const noise = createNoise3D()
        for (let x = 1; x < props.resolution; x++) {
            for (let y = 1; y < props.resolution; y++) {
                for (let z = 1; z < props.resolution; z++) {
                    const length = Math.sqrt(Math.pow(x - props.resolution/2, 2) + Math.pow(z - props.resolution/2, 2))
                    const height = (props.resolution - y * y * 0.025)

                    console.log(height)
                    let value = -1
                    if (length > height * 0.4)
                    {
                        value = 1
                    }
                    
                    value = noise(
                        x * 0.1 + props.chunkPosition[0]* 0.1 * props.resolution, 
                        y * 0.1 + props.chunkPosition[1]* 0.1 * props.resolution, 
                        z * 0.1 + props.chunkPosition[2]* 0.1 * props.resolution
                    )
                    
                    voxelGrid.writeVoxel(x, y, z, value)
                }
            }
        }
    }

    const generateMesh = () =>{
        //march the cubes
        const vertices: number[]= []
        for (let x = 0; x < props.resolution; x++) {
            for (let y = 0; y < props.resolution; y++) {
                for (let z = 0; z < props.resolution; z++) {
                    march_cube(x, y, z, voxelGrid, vertices, props.resolution, props.chunkPosition)
                }
            }
        }

        //generate the mesh
        vertArray.current.fill(0)
        for (let i = 0; i < vertices.length; i++) {
            vertArray.current[i] = vertices[i]
        }

        geoRef.current.setAttribute("position", new THREE.BufferAttribute(vertArray.current, 3))
        geoRef.current.computeVertexNormals()
        geoRef.current.computeBoundingSphere()
    }

    useEffect(()=>{
        generateRandom()
        generateMesh()
    }, [props.resolution])

    const handleClick = (e: ThreeEvent<MouseEvent>) =>{

        const radius = 0.5
        const normal = new THREE.Vector3().copy(e.normal!).multiplyScalar(radius * -1)
        const point = new THREE.Vector3().addVectors(e.point, new THREE.Vector3(props.resolution/2, 0, props.resolution/2)).add(normal)

        for (let x = Math.max(Math.floor(point.x - radius), 1); x <  Math.min(Math.ceil(point.x + radius), props.resolution) ; x++) {
            for (let y = Math.max(Math.floor(point.y - radius), 1); y < Math.min(Math.ceil(point.y + radius), props.resolution) ; y++) {
                for (let z = Math.max(Math.floor(point.z - radius), 1); z < Math.min(Math.ceil(point.z + radius), props.resolution) ; z++) {
                    voxelGrid.writeVoxel(x, y, z, 1)
                }
            }
        }

        generateMesh()
    }

    return (
    <group ref={ref}>
        <group position={[-props.resolution/2, 0, -props.resolution/2]}>
            <mesh onClick={handleClick} castShadow receiveShadow>
                <bufferGeometry ref={geoRef}/>
                <meshNormalMaterial side={THREE.BackSide}/>
            </mesh>
        </group>
    </group>
    )
})

export default MarchingCubes