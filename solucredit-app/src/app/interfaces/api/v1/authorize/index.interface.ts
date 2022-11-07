/*AQUI VAN A IR LAS INTERFACES PARA PARSEAR
LAS PETICIONES DE ESTA RUTA, CUANDO NO HAY UN MODELO QUE SE APEGUE
*/

export interface AuthorizeResponse {

    permission_name: string;
    permission_id: string;
    rol_name: string;
    rol_id: string;
    user_name: string;
}

export interface PostAuthorize {
    success: boolean;
    data: AuthorizeResponse[];
}

export interface UserData {
    email: string;
    name: string;
    jwt: string;
}

//[queryParams]="{debug: true}" fragment="education"