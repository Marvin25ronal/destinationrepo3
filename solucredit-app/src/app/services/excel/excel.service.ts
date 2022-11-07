import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HTTPOPTIONS } from 'src/Utils/constants';
import { map } from 'rxjs/operators';
import { GetInitResponse } from '../analysis/legal-analysis.service';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(private http: HttpClient) { }


  downloadExcel(id_request: number, callback?) {
    const uri = `${environment.urlExcel}/conditionsheet/${id_request}`
    return this.http.get<GetInitResponse>(uri, {
      responseType: "blob" as "json",
    }).toPromise().then((response: any) => {
      debugger
      let filename = 'Carta_Condiciones'
      let datatype = response.type;
      let binaryData = []
      binaryData.push(response)
      let downloadLink = document.createElement("a")
      downloadLink.href = window.URL.createObjectURL(
        new Blob(binaryData, { type: datatype })
      )
      downloadLink.setAttribute("download", filename);
      document.body.appendChild(downloadLink);
      downloadLink.click()
      if (callback)
        callback()
    })
  }
}
