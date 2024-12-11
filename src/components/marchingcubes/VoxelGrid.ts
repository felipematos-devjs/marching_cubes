class VoxelGrid {
    
    data : Float32Array | null = null
    resolution : number
    constructor(resolution: number)
    {
        this.resolution = resolution
        this.data = new Float32Array(this.resolution * this.resolution * this.resolution).fill(1)
    }

    readVoxel(x: number, y: number, z: number)
    {
        if (this.data) {
            const index = x + this.resolution * (y  + this.resolution * z)
            if (index >= this.data.length || index < 0)
            {
                return 1
            }
            return this.data[x + this.resolution * (y  + this.resolution * z)]
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