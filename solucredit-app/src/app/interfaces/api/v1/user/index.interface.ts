import { Rol } from "src/app/models/rol.model";

export interface getUserRolsResp {
    success: boolean;
    data: Rol[];
}