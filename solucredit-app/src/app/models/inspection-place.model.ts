export interface InspectionPlacePagination {
    count: number,
    inspection_place: InspectionPlace[]
}
export interface GetInspectionPlaceResponse {
    success: boolean,
    data: InspectionPlace
}
export interface GetInspectionPlacesResponse {
    success: boolean,
    data: InspectionPlacePagination
}
export class InspectionPlace {
    id_place?: number;
    name_place: string;
    creation_date?: Date;
    last_mod?: Date;
    constructor(
        id: number,
        name: string,
        creation_date: Date,
        last_mod: Date,
    ) {
        this.id_place = id;
        this.name_place = name;
        this.creation_date = creation_date;
        this.last_mod = last_mod;
    }
}