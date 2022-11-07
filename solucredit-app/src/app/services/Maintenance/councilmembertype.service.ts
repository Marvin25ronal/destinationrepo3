import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { GetCouncilMemberTypePaginationArrayResponse } from '../../models/councilmembertype.model';
import { environment } from 'src/environments/environment';
const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
      /* 'Access-Control-Allow-Credentials': 'true' */
    }),
  responseType: 'json' as const,
  //withCredentials: true as const,  
  observe: 'response' as const
};
@Injectable({
  providedIn: 'root'
})
export class CouncilmembertypeService {

  constructor(private http: HttpClient) { }
  getCouncilMemberType() {
    debugger
    const uri = `${environment.urlCouncilMemberType}/councilmembert`
    return this.http.get<GetCouncilMemberTypePaginationArrayResponse>(uri, httpOptions).pipe(
      map((response) => {
        console.log(response)
        return response.body.data
      })
    )
  }
}
