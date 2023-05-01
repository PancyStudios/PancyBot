import { Model } from "mongoose";

export class SecuritySystem {
    constructor () {

    }

    async saveData (Schema: Model<any>, SystemName: string, findData: {}, newData: {}, {  }) {
        try {
            const data = await Schema.findOne(findData)
            if(!data) {
                Promise.reject(`No existe informacion con la condicion findData, usa createData()`)
                console.warn(`No existe informacion con la condicion findData, usa createData()`)
            }

            await Schema.findOneAndUpdate(newData)
            Promise.resolve({ response: `Se guardo con exito la informacion de ${SystemName}`})
        } catch (error) {
            console.error(`SecuritySystem Error: ${error}`)
        }
    }

    async getData (Schema: Model<any>, SystemName: string, findData: {}, { returnJson = true }) {
        try {
            const data = await Schema.findOne(findData)
            if(!data) {
                console.warn(`SecuritySystem`)
            }
            return data 
        } catch (error) {
            return false
        }
    }

    async getDataById (Schema: Model<any>, SystemName: string, findDataId: string, { returnJson = true }) {
        try {
            const data = await Schema.findById(findDataId)
            if(!data) return false
            return data
        } catch (error) {
            return false
        }
    }

    async createData () {

    }
}