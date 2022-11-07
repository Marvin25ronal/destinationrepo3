export interface FormSavePagination{
    count: number,
    formsave: FormSave
}

export interface getFormSave
{
    success: boolean,
    data: FormSave[]
}

export class FormSave{
    id_ss: number;
    form_id: number;
    request_id: number;
    form_namesection: string;
    form_namesub: string;
    form_status: number;
    form_comment: string;
    creation_date: Date;
    last_mod: Date;
    constructor(
        id_ss: number,
        form_id: number,
        request_id: number,
        form_namesection: string,
        form_namesub: string,
        form_status: number,
        form_comment: string,
        creation_date: Date,
        last_mod: Date,
    )
    {
        this.id_ss = id_ss;
        this.form_id = form_id;
        this.request_id = request_id;
        this.form_namesection = form_namesection;
        this.form_namesub = form_namesub;
        this.form_status = form_status;
        this.form_comment = form_comment;
        this.creation_date = creation_date;
        this.last_mod = last_mod;
    }
}