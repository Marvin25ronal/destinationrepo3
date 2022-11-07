export interface RequirementObservation {
    requirement_observation_id?: number
    request_id?: number
    sys_w_element_id?: number
    comment?: string
    title?: string
    rwedet_id?: number
    req_requi_id?: number
}

export interface GetRequirementObservations {
    success: boolean
    data: RequirementObservation[]
}