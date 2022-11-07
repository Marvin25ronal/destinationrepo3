export interface GetFolderResponse {
    success: boolean;
    data: Folder
}
export interface GetFoldersResponse {
    success: boolean
    data: Folder[]
}
export interface GetDocumentResponse {
    success: boolean
    data: Document
}
export interface DocumentsPagination {
    count: number;
    documents: Document[]
}
export interface GetDocumentsResponse {
    success: boolean
    data: DocumentsPagination
}
export interface GetFmRolSharedFolder {
    success: boolean
    data: FmRolSharedFolder
}

export interface GetFmRolSharedDocument {
    success: boolean
    data: FmRolSharedDocument
}
export interface GetSharedPermissions {
    success: boolean
    data: any[]
}
export interface GetFMSharedFolders {
    success: boolean
    data: Folder[]
}
export interface GetNumberOfDocuments {
    success: boolean
    data: number
}
export class Folder {
    folder_id?: number;
    user_id: number;
    name: string;
    read_only: number;
    creation_date: Date;
    last_mod: Date;
    folder_key?: string;
    father_id: number;
    user_name?: string;
    children?: Folder[]
    constructor(
        id: number,
        name: string,
        user: number,
        read_only: number, //solo lectura 1, 0 escritura y lectura
        creation_date: Date,
        last_mod: Date,
        folder_key: string,
        father_id: number
    ) {
        this.folder_id = id
        this.user_id = user
        this.name = name
        this.read_only = read_only
        this.creation_date = creation_date
        this.last_mod = last_mod
        this.folder_key = folder_key
        this.father_id = father_id
    }

}

export class Document {
    document_id?: number;
    document_name: string;
    document_key: string;
    creation_date: Date;
    last_mod: Date;
    type?: string;
    url?: string;
    constructor(
        id: number,
        name: string,
        key: string,
        creation_date: Date,
        last_mod: Date,
        type: string,
        url: string
    ) {
        this.document_id = id
        this.document_name = name
        this.document_key = key
        this.creation_date = creation_date
        this.last_mod = last_mod
        this.type = type
        this.url = url
    }
}


export class FmRolSharedFolder {
    id?: number;
    folder_id: number;
    rol_id: string;
    permission: string;
    expiration_date: Date;
    short_link?: string;
    constructor(id: number,
        folder: number,
        rol_id: string,
        permission: string,
        expiration_date: Date,
        short_link: string
    ) {
        this.id = id
        this.folder_id = folder
        this.rol_id = rol_id
        this.permission = permission
        this.expiration_date = expiration_date
        this.short_link = short_link
    }
}

export class FmUserSharedFolder {
    id?: number;
    folder_id: number;
    user_id: number;
    permission: string;
    expiration_date: Date;
    short_link?: string;
    constructor(id: number,
        folder: number,
        user_id: number,
        permission: string,
        expiration_date: Date,
        short_link: string
    ) {
        this.id = id
        this.folder_id = folder
        this.user_id = user_id
        this.permission = permission
        this.expiration_date = expiration_date
        this.short_link = short_link
    }
}


export class FmRolSharedDocument {
    id?: number;
    document_id: number;
    rol_id: string;
    permission: string;
    expiration_date: Date;

    constructor(id: number,
        document: number,
        rol_id: string,
        permission: string,
        expiration_date: Date,
        short_link: string
    ) {
        this.id = id
        this.document_id = document
        this.rol_id = rol_id
        this.permission = permission
        this.expiration_date = expiration_date
    }
}

export class FmUserSharedDocument {
    id?: number;
    document_id: number;
    user_id: number;
    permission: string;
    expiration_date: Date;
    constructor(id: number,
        document: number,
        user_id: number,
        permission: string,
        expiration_date: Date,
        short_link: string
    ) {
        this.id = id
        this.document_id = document
        this.user_id = user_id
        this.permission = permission
        this.expiration_date = expiration_date
    }
}
