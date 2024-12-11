import { Environment } from "@react-three/drei"





const Lights = () =>{
    return (<>
        <Environment preset='dawn' background backgroundBlurriness={0.5} environmentIntensity={0.5}/>
        <directionalLight  position={[30,30 ,30 ]} castShadow/>
    </>)
}

export default Lights