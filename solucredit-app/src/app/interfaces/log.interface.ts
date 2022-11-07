import { Log } from '../models/log.model';
export interface DataLogResponse {
    count: number;
    logs: Log[];
}
export interface GetLogsResponse {
    success: boolean;
    data: DataLogResponse;
}