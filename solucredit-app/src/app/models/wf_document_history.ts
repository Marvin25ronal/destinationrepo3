export interface DocumentHistoryPagination{
    count: number,
    data:  WFDocumentHistory[]
}

export interface GetDocumentHistoryResponse{
    success: boolean;
    data: WFDocumentHistory
}

export interface GetDocumentsHistoryResponse{
    success: boolean;
    data: DocumentHistoryPagination
}

export class WFDocumentHistory {
    wf_document_history_id: number;
    wf_worflow_id: number;
    wf_worflow_name: string;
    wf_status_id: number;
    wf_status_name: string;
    wf_activity_id: number;
    wf_activity_name: string;
    wf_activity_status: number;
    wf_document_id: number;
    wf_document_number: string;
    event_name: string;
    event_description: string;
    event_type: string;
    event_result: string;
    event_result_type: string;
    event_is_mandatory: number;
    note: string;
    email_owner: string;
    email_responsable: string;
    status: number;
    creation_date?: Date;
    last_mod?: Date;
    constructor(
        wf_document_history_id: number,
        wf_worflow_id: number,
        wf_worflow_name: string,
        wf_status_id: number,
        wf_status_name: string,
        wf_activity_id: number,
        wf_activity_name: string,
        wf_activity_status: number,
        wf_document_id: number,
        wf_document_number: string,
        event_name: string,
        event_description: string,
        event_type: string,
        event_result: string,
        event_result_type: string,
        event_is_mandatory: number,
        note: string,
        email_owner: string,
        email_responsable: string,
        status: number,
        creation_date?: Date,
        last_mod?: Date
    ) {
        this.wf_document_history_id = wf_document_history_id
        this.wf_worflow_id = wf_worflow_id
        this.wf_worflow_name = wf_worflow_name
        this.wf_status_id = wf_status_id
        this.wf_status_name = wf_status_name
        this.wf_activity_id = wf_activity_id
        this.wf_activity_name = wf_activity_name
        this.wf_activity_status = wf_activity_status
        this.wf_document_id = wf_document_id
        this.wf_document_number = wf_document_number
        this.event_name = event_name
        this.event_description = event_description
        this.event_type = event_type
        this.event_result = event_result
        this.event_result_type = event_result_type
        this.event_is_mandatory = event_is_mandatory
        this.note = note
        this.email_owner = email_owner
        this.email_responsable = email_responsable
        this.status = status
        this.creation_date = creation_date
        this.last_mod = last_mod
    }
}