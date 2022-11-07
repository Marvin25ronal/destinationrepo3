import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductType, GetProductTypeResponse, GetProductTypesResponse, ProductTypePagination } from '../../models/producttype.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
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
export class ProductTypeService {
  constructor(private http: HttpClient) { }
  saveProductType(producttype: ProductType): Observable<ProductType> {
    const uri = `${environment.urlProductType}`;
    const format_producttype = {
      producttype: producttype
    };
    return this.http
      .post<GetProductTypeResponse>(uri, format_producttype, httpOptions)
      .pipe(
        map((response) => {
          return response.body.data;
        })
      )
  }
  getProductTypes(
    limit: number,
    offset: number,
    searchItem: string[]
  ): Observable<ProductTypePagination> {
    let uri = `${environment.urlProductTypeList}?limit=${limit}&offset=${offset}`;
    if (searchItem.length != 0) {
      uri = `${environment.urlProductTypeList}?limit=${limit}&offset=${offset}&searchItem=${searchItem}`;
    }
    return this.http.get<GetProductTypesResponse>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data;
      })
    )
  }
  updateProductType(producttype: ProductType): Observable<HttpResponse<any>> {
    const uri = `${environment.urlProductType}`;
    const format_producttype = {
      producttype: producttype
    };
    return this.http.put(uri, format_producttype, httpOptions).pipe(
      map((response) => {
        return response
      })
    )
  }
  deleteProductType(producttype: ProductType, comment: string): Observable<HttpResponse<any>> {
    const uri = `${environment.urlProductType}/${producttype.id_producttype}`;
    const format_comment = {
      comment: comment
    }
    const httpOptionsDelete = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          /* 'Access-Control-Allow-Credentials': 'true' */
        }),
      responseType: 'json' as const,
      //withCredentials: true as const,
      body: format_comment,
      observe: 'response' as const
    }
    return this.http.delete(uri, httpOptionsDelete).pipe(
      map((response) => {
        return response
      })
    )
  }
}
