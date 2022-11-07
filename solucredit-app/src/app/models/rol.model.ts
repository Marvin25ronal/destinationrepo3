import { User } from './user.model'
export interface RolPagination {
    count: number,
    data: Rol[]
}

export interface GetRolsResponse {
    success: boolean;
    data: RolPagination;
}
export interface GetRolResponse {
    success: boolean;
    data: Rol;
}
export interface GetRol2Response {
    success: boolean;
    data: Rol[];
}

export interface GetPermissionsResponse {
    success: boolean;
    data: Permission[];
}
export class Permission {
    permission_id: string;
    name: string;
}
export class Rol {

    rol_id: string;
    name: string;
    usercount: number;
    permissioncount: number;
    permissions: Permission[];
    usuarios: User[];

    constructor(
        rol_id: string,
        name: string,
        permissions: Permission[],
        usuarios: User[],
        usercount: number,
        permissioncount: number

    ) {
        this.rol_id = rol_id;
        this.name = name;
        this.permissions = permissions;
        this.usuarios = usuarios;
        this.usercount = usercount;
        this.permissioncount = permissioncount;

    }
}