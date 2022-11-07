export interface ButtonModel {
    text: string,
    class: string,
    name_function: string,
    description: string,
    action_type_id: number,
    sort:number
}

export interface OptionsModel {
    text: string
    id: number
    name_function: string
    description: string
    class_name: string
    action_type_id: number
    sort:number
}