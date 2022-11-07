import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DownloadxlsService {

  //define URL
  //url = environment.;
  urlXlsx = environment.urlXlsx;
  urlDocx = environment.urlDocx;

  constructor(private _http: HttpClient) { }

  SolicitudJuridica(filename: string = null, idForm, customer): void {
    this._http
      .get(this.urlXlsx+'/juridico/solicitud', {
        responseType: "blob" as "json",
        params: { formid: idForm, customer: customer },
      })
      .subscribe((response: any) => {
        //let filename ='test.xlsx'
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement("a");
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: dataType })
        );
        if (filename) downloadLink.setAttribute("download", filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      });
  }
  

  SolicitudIndividual(filename: string = null, idForm, customer): void{
    this._http
    .get(this.urlXlsx+'/individual/solicitud', {
      responseType: "blob" as "json",
      params: { formid: idForm, customer: customer },
    })
    .subscribe((response: any) => {
      //let filename ='test.xlsx'
      console.log('filename: '+filename);
      let dataType = response.type;
      let binaryData = [];
      binaryData.push(response);
      let downloadLink = document.createElement("a");
      downloadLink.href = window.URL.createObjectURL(
        new Blob(binaryData, { type: dataType })
      );
      if (filename) downloadLink.setAttribute("download", filename);
      document.body.appendChild(downloadLink);
      downloadLink.click();
    });
  }




  PerfilJuridico(filename: string = null, idForm, customer): void {
    this._http
      .get(this.urlXlsx+'/juridico/perfil', {
        responseType: "blob" as "json",
        params: { formid: idForm, customer: customer },
      })
      .subscribe((response: any) => {
        //let filename ='test.xlsx'
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement("a");
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: dataType })
        );
        if (filename) downloadLink.setAttribute("download", filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      });
  }

  PerfilIndividual(filename: string = null, idForm, customer): void {
    this._http
      .get(this.urlXlsx+'/individual/perfil', {
        responseType: "blob" as "json",
        params: { formid: idForm, customer: customer },
      })
      .subscribe((response: any) => {
        //let filename ='test.xlsx'
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement("a");
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: dataType })
        );
        if (filename) downloadLink.setAttribute("download", filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      });
  }


  IveJuridico(filename: string = null, idForm, customer): void {
    this._http
      .get(this.urlXlsx+'/juridico/ive', {
        responseType: "blob" as "json",
        params: { formid: idForm, customer: customer },
      })
      .subscribe((response: any) => {
        //let filename ='test.xlsx'
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement("a");
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: dataType })
        );
        if (filename) downloadLink.setAttribute("download", filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      });
  }

  AnexoProductosJuridico(filename: string = null, idForm, customer,type): void {
    this._http
      .get(this.urlXlsx+'/juridico/anexoproductos', {
        responseType: "blob" as "json",
        params: { formid: idForm, customer: customer,type },
      })
      .subscribe((response: any) => {
        //let filename ='test.xlsx'
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement("a");
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: dataType })
        );
        if (filename) downloadLink.setAttribute("download", filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      });
  }

  CPEJuridico(filename: string = null, idForm, customer): void {
    this._http
      .get(this.urlXlsx+'/juridico/anexocpe', {
        responseType: "blob" as "json",
        params: { formid: idForm, customer: customer },
      })
      .subscribe((response: any) => {
        //let filename ='test.xlsx'
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement("a");
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: dataType })
        );
        if (filename) downloadLink.setAttribute("download", filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      });
  }

  

  CartaBancoJuridico(filename: string = null, idForm, customer,type): void {
    this._http
      .get(this.urlDocx+'/juridico/cartabanco', {
        responseType: "blob" as "json",
        params: { formid: idForm, customer: customer,type },
      })
      .subscribe((response: any) => {
        console.log('filename: '+filename);
        //let filename ='test.xlsx'
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement("a");
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: dataType })
        );
        if (filename) downloadLink.setAttribute("download", filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      });
  }

  PuntoActaJuridico(filename: string = null, idForm, customer): void {
    this._http
      .get(this.urlDocx+'/juridico/puntoacta', {
        responseType: "blob" as "json",
        params: { formid: idForm, customer: customer },
      })
      .subscribe((response: any) => {
        //let filename ='test.xlsx'
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement("a");
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: dataType })
        );
        if (filename) downloadLink.setAttribute("download", filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      });
  }

  DeudoresJuridico(filename: string = null, idForm, customer,type): void {
    console.log(type);
    this._http
      .get(this.urlXlsx+'/juridico/deudores', {
        responseType: "blob" as "json",
        params: { formid: idForm, customer: customer ,type},
      })
      .subscribe((response: any) => {
        //let filename ='test.xlsx'
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement("a");
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: dataType })
        );
        if (filename) downloadLink.setAttribute("download", filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      });
  }



  FEIC(filename: string = null, idForm, customer): Observable<any> {
    return this._http.get(this.urlXlsx+'/juridico/feic', {responseType: "blob" as "json",params: { formid: idForm, customer: customer },
    }).pipe(
      map((response) => {
        //console.log(response);
        return response;
      })
    )
    
    /* this._http
      .get(this.urlXlsx+'/juridico/feic', {
        responseType: "blob" as "json",
        params: { formid: idForm, customer: customer },
      })
      .subscribe((response: any) => {
        //let filename ='test.xlsx'
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement("a");
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: dataType })
        );
        if (filename) downloadLink.setAttribute("download", filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }); */
  }
  



}
