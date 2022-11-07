import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Supplier, GetSupplierResponse, GetSuppliersResponse, SuppliersPagination, SaveSupplierResponse, SupplierMap, SupplierDocMap,SupplierDocDetailMap, SupplierLogMap } from '../../../models/supplier.model';



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
export class SuppliersService {

  constructor(private http: HttpClient) { }


  public changeDocState(doc: SupplierDocMap): Observable<HttpResponse<any>> {
    const uri = `${environment.urlSupplierDocs}`;
    return this.http.put(uri,doc,httpOptions).pipe(
      map((response) => {
        return response;
      })
    )
  }

  public getSuppliers(limit: number, offset: number, searchItem: string[], searchField: string[]): Observable<SuppliersPagination> {
    let uri = `${environment.urlSupplier}?limit=${limit}&offset=${offset}`;
    if (searchItem.length != 0) { for (let i = 0; i < searchItem.length; i++) { uri = uri + `&searchItem=${searchItem[i]}`; } }
    if (searchField.length != 0) { for (let i = 0; i < searchField.length; i++) { uri = uri + `&searchField=${searchField[i]}`; } }
    
    return this.http.get<GetSuppliersResponse>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data;
      })
    )
  }

  public getOneDoc(idDoc:number): Observable<SupplierDocDetailMap> {
    const uri = `${environment.urlSupplierDocs}/${idDoc}?flag=${true}`;
    return this.http.get<any>(uri, httpOptions).pipe(
      map((response) => {
        console.log('LOS DATOS DEl DOCUMENTOS::');
        console.log(response);
        return response.body.data;
      })
    )
  }
  public delOneDoc(idDoc: number): Observable<HttpResponse<any>> {
    const uri = `${environment.urlSupplierDocs}/${idDoc}`;
    return this.http.delete(uri, httpOptions).pipe(
      map((response) => {
        console.log('LOS DATOS DEl DOCUMENTOS::');
        console.log(response);
        return response
      })
    )
  }
  public getSupplierDocs(idsupplier: number): Observable<SupplierDocMap[]> {
    console.log('SE VAN A TRAER LOS DOCUMENTOS DE idsupplier:: '+idsupplier);
    const uri = `${environment.urlSupplierDocs}/${idsupplier}`;
    return this.http.get<any>(uri, httpOptions).pipe(
      map((response) => {
        console.log('LOS DATOS DE LOS DOCUMENTOS::');
        console.log(response);
        return response.body.data;
      })
    )
  }

  public getSupplierLogss(idsupplier: number): Observable<SupplierLogMap[]> {
    const uri = `${environment.urlSupplierLogs}/${idsupplier}`;
    return this.http.get<any>(uri, httpOptions).pipe(
      map((response) => {
        console.log('LOS DATOS DE LOS LOGS::');
        console.log(response);
        return response.body.data;
      })
    )
  }

  public deleteSupplier(idSupplier: number): Observable<HttpResponse<any>> {
    const uri = `${environment.urlSupplier}/${idSupplier}`;
    return this.http.delete<GetSuppliersResponse>(uri, httpOptions).pipe(
      map((response) => {
        return response
      })
    )
  }

  modSupplier(supplier: SupplierMap): Observable<Supplier> {
    const uri = `${environment.urlSupplier}`;
    
    return this.http.put<SaveSupplierResponse>(uri, supplier, httpOptions).pipe(
      map((response) => {
        //console.log(response);
        return response.body.data;
      })
    )

  }

  public searchSuppliers(searchFlag: string[], searchItem: string[]): Observable<SuppliersPagination> { 

    let queryparams = new URLSearchParams();
    searchFlag.forEach(item => queryparams.append('searchFlag', item));
    searchItem.forEach(item => queryparams.append('searchItem', item));
    console.log(queryparams.toString())
    const uri = `${environment.urlSupplier}?${queryparams.toString()}`;
    return this.http.get<GetSuppliersResponse>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data;
      })
    )


  }


  saveSupplier(supplier: SupplierMap): Observable<Supplier> {
    const uri = `${environment.urlSupplier}`;

    return this.http.post<SaveSupplierResponse>(uri, supplier, httpOptions).pipe(
      map((response) => {
        return response.body.data;
      })
    )

  }

}
