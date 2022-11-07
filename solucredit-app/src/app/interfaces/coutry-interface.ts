export interface CountryInterface {
    country_id?:string;
    name?:string;
    iso_code?:string;
    currency?:string;
    status?:string;
    area_code?:string;
    phone_length?:string;
    timezone_id?:string;
}

export interface GetCountriesResponse {
    success: boolean;
    data: CountryInterface;
}