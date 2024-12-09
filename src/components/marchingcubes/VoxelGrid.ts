class VoxelGrid {
    
    data : Float32Array | null = null
    resolution : number = 8
    constructor(resolution: number)
    {
        this.resolution = resolution
        this.data = new Float32Array(resolution * resolution * resolution).fill(1)
    }

    readVoxel(x: number, y: number, z: number)
    {
        if (this.data) {
            return this.data[x + this.resolution * (y + this.resolution * z)]
        }
        return 1
    }

    writeVoxel(x: number, y: number, z: number, value: number)
    {
        if (this.data) {

            this.data[x + this.resolution * y + this.resolution * this.resolution* z] = value
        }
    }
}

export default VoxelGrid