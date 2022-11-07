import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, GetProductResponse, GetProductsResponse, ProductPagination } from '../../models/product.model';
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
export class ProductService {

  constructor(private http: HttpClient) { }
  saveProduct(product: Product): Observable<Product> {
    const uri = `${environment.urlProduct}`;
    const format_product = {
      product: product
    };
    return this.http
      .post<GetProductResponse>(uri, format_product, httpOptions)
      .pipe(
        map((response) => {
          return response.body.data;
        })
      )
  }
  getProducts(
    limit: number,
    offset: number,
    searchItem: string[]
  ): Observable<ProductPagination> {
    let uri = `${environment.urlProductList}?limit=${limit}&offset=${offset}`;
    if (searchItem.length != 0) {
      uri = `${environment.urlProductList}?limit=${limit}&offset=${offset}&searchItem=${searchItem}`;
    }
    return this.http.get<GetProductsResponse>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data;
      })
    )
  }
  updateProduct(product: Product): Observable<HttpResponse<any>> {
    const uri = `${environment.urlProduct}`;
    const format_product = {
      product: product
    };
    return this.http.put(uri, format_product, httpOptions).pipe(
      map((response) => {
        return response
      })
    )
  }
  deleteProduct(product: Product, comment: string): Observable<HttpResponse<any>> {
    const uri = `${environment.urlProduct}/${product.id_product}`;
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
