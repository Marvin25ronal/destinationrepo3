export interface WF_DocumentPagination {
    count: number,
    wf_document: WF_Document[]
}

export interface GetWF_DocumentResponse {
    success: boolean;
    data: WF_Document
}

export interface GetWF_DocumentsResponse {
    success: boolean;
    data: WF_DocumentPagination
}
export interface GetActivityResposne {
    success: boolean;
    data: WFActivity
}
export interface GetButtonsResponse {
    success: boolean
    data: WFActivityInterfaceAction[]
}

export interface GetOptionsResponse {
    success: Boolean
    data: WFActivityInterfaceOption[]
}

export interface GetViewsActivityResponse {
    success: boolean
    data: WFActivityView[]
}
export interface GetWorkflowResponse {
    success: boolean
    data: WFWorkflow
}

export interface GetTransitionsResponse {
    success: boolean
    data: WFTransition[]
}

export interface GetTransitionTargetEvent {
    success: boolean
    data: [{
        eventt: WFTransitionTargetEventType,
        wgTTE: WFTransitionTargetEvent
    }]
}
export interface GetTransitionTarget {
    success: boolean
    data: WFTransitionTargetInterface[]
}
export class WF_Document {
    wf_document_id?: number;
    id_customer?: number;
    id_request?: number;
    wf_activity_id?: number;
    wf_activity_status?: number;
    wf_status_id?: number;
    wf_document_serie_id?: number;
    document_number?: string;
    comments?: string;
    status?: number;
    creation_date?: Date;
    last_mod?: Date;
    constructor(
        wf_document_id?: number,
        id_customer?: number,
        id_request?: number,
        wf_activity_id?: number,
        wf_activity_status?: number,
        wf_status_id?: number,
        wf_document_serie_id?: number,
        document_number?: string,
        comments?: string,
        status?: number,
        creation_date?: Date,
        last_mod?: Date
    ) {
        this.wf_document_id = wf_document_id;
        this.id_customer = id_customer;
        this.id_request = id_request;
        this.wf_activity_id = wf_activity_id;
        this.wf_activity_status = wf_activity_status;
        this.wf_status_id = wf_status_id;
        this.wf_document_serie_id = wf_document_serie_id;
        this.document_number = document_number;
        this.comments = comments;
        this.status = status;
        this.creation_date = creation_date;
        this.last_mod = last_mod;
    }

}


export class WFActivity {
    wf_activity_id?: number;
    name: string
    description: string
    wf_workflow_id: number
    value: number
    sort: number
    status: number
    creation_date: Date
    last_mod: Date
    constructor(
        name: string,
        description: string,
        wf_workflow_id: number,
        value: number,
        sort: number,
        status: number,
        creation_date: Date,
        last_mod: Date
    ) {
        this.description = description;
        this.name = name;
        this.wf_workflow_id = wf_workflow_id;
        this.value = value
        this.sort = sort
        this.status = status
        this.creation_date = creation_date
        this.last_mod = last_mod
    }
}
export class WFActivityInterfaceAction {
    wf_activity_interface_action_id?: number
    wf_activity_id: number
    name: string
    description: string
    function_name: string
    class_name: string
    wf_action_type_id: number
    status: number
    creation_date: Date
    last_mod: Date
    sort:number
    constructor(
        wf_activity_interface_action_id: number,
        wf_activity_id: number,
        name: string,
        description: string,
        function_name: string,
        class_name: string,
        wf_action_type_id: number,
        status: number,
        creation_date: Date,
        last_mod: Date,
        sort:number
    ) {
        this.description = description;
        this.wf_action_type_id = wf_action_type_id
        this.name = name;
        this.wf_activity_interface_action_id = wf_activity_interface_action_id
        this.wf_activity_id = wf_activity_id
        this.function_name = function_name
        this.class_name = class_name
        this.status = status
        this.creation_date = creation_date
        this.last_mod = last_mod
        this.sort = sort
    }
}

export class WFTransition {
    wf_transition_id: number;
    wf_activity_id: number;
    wf_transition_type_id: number;
    name: string;
    description: string;
    status: number;
    creation_date?: Date;
    last_mod?: Date;
    constructor(
        wf_transition_id: number,
        wf_activity_id: number,
        wf_transition_type_id: number,
        name: string,
        description: string,
        status: number,
        creation_date?: Date,
        last_mod?: Date,
    ) {
        this.wf_transition_id = wf_transition_id
        this.wf_activity_id = wf_activity_id
        this.wf_transition_type_id = wf_transition_type_id
        this.name = name
        this.description = description
        this.status = status
        this.creation_date = creation_date
        this.last_mod = last_mod
    }
}

export class WFTransitionTargetInterface {
    wf_transition_target_id: number;
    wf_transition_id: number;
    wf_activity_id: number;
    wf_activity_status_id: number;
    name: string;
    description: string;
    status: number;
    creation_date?: Date;
    last_mod?: Date;
    constructor(
        wf_transition_target_id: number,
        wf_transition_id: number,
        wf_activity_id: number,
        wf_activity_status_id: number,
        name: string,
        description: string,
        status: number,
        creation_date?: Date,
        last_mod?: Date,
    ) {
        this.wf_transition_target_id = wf_transition_target_id
        this.wf_transition_id = wf_transition_id
        this.wf_activity_id = wf_activity_id
        this.wf_activity_status_id = wf_activity_status_id
        this.name = name
        this.description = description
        this.status = status
        this.creation_date = creation_date
        this.last_mod = last_mod
    }
}
export class WFTransitionTargetEvent {
    wf_transition_target_event_id: number;
    wf_event_transition_target_type_id: number;
    wf_transition_target_id: number;
    name: string;
    description: string;
    function_name: string;
    priority: number;
    is_mandatory_pass: number;
    sort: number;
    default_value_to_compare: string;
    status: number;
    creation_date?: Date;
    last_mod?: Date;
    rol_id: string
    constructor(
        wf_transition_target_event_id: number,
        wf_event_transition_target_type_id: number,
        wf_transition_target_id: number,
        name: string,
        description: string,
        function_name: string,
        priority: number,
        is_mandatory_pass: number,
        sort: number,
        default_value_to_compare: string,
        status: number,
        creation_date?: Date,
        last_mod?: Date,
    ) {
        this.wf_event_transition_target_type_id = wf_event_transition_target_type_id
        this.wf_transition_target_event_id = wf_transition_target_event_id
        this.wf_transition_target_id = wf_transition_target_id
        this.name = name
        this.description = description
        this.function_name = function_name
        this.priority = priority
        this.is_mandatory_pass = is_mandatory_pass
        this.sort = sort
        this.default_value_to_compare = default_value_to_compare
        this.status = status
        this.creation_date = creation_date
        this.last_mod = last_mod
    }
}
export class WFActivityInterfaceOption {
    wf_activity_interface_option_id?: number
    wf_activity_id: number
    name: string
    description: string
    function_name: string
    class_name: string
    wf_action_type_id: number
    status: number
    creation_date: Date
    last_mod: Date
    rol_id: string
    sort:number
    constructor(
        wf_activity_interface_action_id: number,
        wf_activity_id: number,
        name: string,
        description: string,
        function_name: string,
        class_name: string,
        wf_action_type_id: number,
        status: number,
        creation_date: Date,
        last_mod: Date,
        sort:number
    ) {
        this.description = description;
        this.wf_action_type_id = wf_action_type_id
        this.name = name;
        this.wf_activity_interface_option_id = wf_activity_interface_action_id
        this.wf_activity_id = wf_activity_id
        this.function_name = function_name
        this.class_name = class_name
        this.status = status
        this.creation_date = creation_date
        this.last_mod = last_mod
        this.sort=sort
    }
}

export class WFTransitionTargetEventType {
    wf_event_transition_target_type_id?: number
    name: string
    description: string
    status: number
    creation_date: Date
    last_mod: Date
    constructor(
        wf_event_transition_target_type_id: number,
        name: string,
        description: string,
        status: number,
        creation_date: Date,
        last_mod: Date
    ) {
        this.wf_event_transition_target_type_id = wf_event_transition_target_type_id
        this.name = name
        this.description = description
        this.status = status
        this.creation_date = creation_date
        this.last_mod = last_mod
    }
}

export class WFView {
    wf_view_id?: number;
    name: string
    description: string
    name_enum: string;
    constructor(
        wf_view_id: number,
        name: string,
        description: string,
        name_enum: string
    ) {
        this.description = description
        this.name = name
        this.name_enum = name_enum
        this.wf_view_id = wf_view_id
    }
}
export class WFActivityView {
    wf_activity_view_id: number
    wf_activity_id: number
    wf_view_id: number
    is_default: number;
    view?: WFView
    rol_id: string
    constructor(
        wf_activity_view_id: number,
        wf_activity_id: number,
        wf_view_id: number,
        is_default: number,
    ) {
        this.wf_activity_id = wf_activity_id
        this.wf_activity_view_id = wf_activity_view_id
        this.wf_view_id = wf_view_id
        this.is_default = is_default
    }
}

export class WFWorkflow {
    wf_workflow_id: number
    name: string
    description: string
    status: number
    creation_date: Date
    last_mod: Date
    wf_status?: WFStatus
    constructor(
        wf_workflow_id: number,
        name: string,
        description: string,
        status: number,
        creation_date: Date,
        last_mod: Date
    ) {
        this.wf_workflow_id = wf_workflow_id
        this.name = name
        this.description = description
        this.status = status
        this.creation_date = creation_date
        this.last_mod = last_mod
    }
}
export class WFStatus {
    wf_status_id?: number
    wf_workflow_id: number
    name: string
    description: string
    value: number
    sort: number
    status: number
    creation_date: Date
    last_mod: Date
    constructor(
        wf_status_id: number,
        wf_workflow_id: number,
        name: string,
        description: string,
        value: number,
        sort: number,
        status: number,
        creation_date: Date,
        last_mod: Date
    ) {
        this.wf_workflow_id = wf_workflow_id
        this.wf_status_id = wf_status_id
        this.name = name
        this.description = description
        this.value = value
        this.sort = sort
        this.status = status
        this.creation_date = creation_date
        this.last_mod = last_mod
    }
}