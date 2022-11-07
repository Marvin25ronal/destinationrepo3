export class Log {
    log_id: number;
    status: number;
    name: string;
    method: string;
    url: string;
    ip: string;
    body: any;
    queryparams: any;
    errors: any;

    constructor(
    log_id: number,
    status: number,
    name: string,
    method: string,
    url: string,
    ip: string,
    body: any,
    queryparams: any,
        errors: any,
    ) {
        this.log_id = log_id;
        this.status = status;
        this.name = name;
        this.method = method;
        this.url = url;
        this.ip = ip;
        this.body = body;
        this.queryparams = queryparams;

    }

 }