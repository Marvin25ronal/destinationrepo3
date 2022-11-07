import { Rol } from './rol.model';
export interface UserPagination {
    count: number,
    data: User[]
}
export interface GetUsersResponse {
    success: boolean;
    data: UserPagination
}

export interface GetUserResponse {
    success: boolean;
    data: User;
}

export interface SaveUserResponse {
    success: boolean;
    data: User;
}


export interface GetUsersArrayResponse {
    success: boolean
    data: User[]
}



export class User {

    user_id: number;
    firstname: string;
    lastname: string;

    email: string;
    gender: number;
    mobile_phone: string;
    address: string;
    /* birthdate: string; */
    rols: any[]
    /* home_phone: string;
    office_home: string;
     */
    img: string;

    constructor(
        user_id: number,
        firstname: string,
        lastname: string,
        email: string,
        gender: number,
        mobile_phone: string,
        address: string,
        rols: any[],
        img: string = '/assets/images/users/noImage.png',
    ) {

        this.user_id = user_id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.gender = gender;
        this.img = img;
        this.rols = rols;
        this.mobile_phone = mobile_phone;

        this.address = address;


    }

}