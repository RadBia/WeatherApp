import { RegionType } from "./RegionType"

export interface City { 
    name: string
    region: string
    type: RegionType
    latitude: number
    longitude: number
}