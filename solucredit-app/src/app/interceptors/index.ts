import { HTTP_INTERCEPTORS } from '@angular/common/http';

import {AuthorizeInterceptor} from './authorize-interceptor'
export const interceptors = [
    
     { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true} 
];