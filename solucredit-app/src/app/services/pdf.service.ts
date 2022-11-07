import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { UploaddocumentscaService } from './analysis/uploaddocumentsca.service';
import { map, catchError, filter } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(
    private _UploadDocumentsService: UploaddocumentscaService,
    private toastr: ToastrService,
  ) { }
  createReportHTMLSave(data, analysis_type, analysis_id, comment,callback?) {
    let date = new Date()
    let dia = date.getDay();
    let mes = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    html2canvas(data as any).then(canvas => {
      const image = { type: 'jpeg', quality: 0.98 };
      const margin = [0.5, 0.5];

      var imgWidth = 8.5;
      var pageHeight = 11;

      var innerPageWidth = imgWidth - margin[0] * 2;
      var innerPageHeight = pageHeight - margin[1] * 2;

      // Calculate the number of pages.
      var pxFullHeight = canvas.height;
      var pxPageHeight = Math.floor(canvas.width * (pageHeight / imgWidth));
      var nPages = Math.ceil(pxFullHeight / pxPageHeight);

      // Define pageHeight separately so it can be trimmed on the final page.
      var pageHeight = innerPageHeight;

      // Create a one-page canvas to split up the full image.
      var pageCanvas = document.createElement('canvas');
      var pageCtx = pageCanvas.getContext('2d');
      pageCanvas.width = canvas.width;
      pageCanvas.height = pxPageHeight;

      // Initialize the PDF.
      var pdf = new jsPDF('p', 'in', [8.5, 11]);

      for (var page = 0; page < nPages; page++) {
        // Trim the final page to reduce file size.
        if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
          pageCanvas.height = pxFullHeight % pxPageHeight;
          pageHeight = (pageCanvas.height * innerPageWidth) / pageCanvas.width;
        }

        // Display the page.
        var w = pageCanvas.width;
        var h = pageCanvas.height;
        pageCtx.fillStyle = 'white';
        pageCtx.fillRect(0, 0, w, h);
        pageCtx.drawImage(canvas, 0, page * pxPageHeight, w, h, 0, 0, w, h);

        // Add the page to the PDF.
        if (page > 0) pdf.addPage();
        debugger;
        var imgData = pageCanvas.toDataURL('image/' + image.type, image.quality);
        pdf.addImage(imgData, image.type, margin[1], margin[0], innerPageWidth, pageHeight);
      }

      // var imgHeight = canvas.height * imgWidth / canvas.width;
      // const contentDataURL = canvas.toDataURL('image/png');
      // var heightLeft = imgHeight

      // //Formto PDF en Oficio Americano
      // let pdfData = new jsPDF('p', 'mm', 'a4');
      // var position = 0;
      // pdfData.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      // heightLeft -= pageHeight;
      // while (heightLeft >= 0) {
      //   position = heightLeft - imgHeight
      //   pdfData.addPage()
      //   pdfData.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      //   heightLeft -= pageHeight
      // }
      //Nombre Documento

      let filename = `Informe${analysis_type}_${dia}${mes}${year}_${hour}${min}_${sec}.pdf`
      console.log(filename)
      pdf.save(filename)
      let blobPDF = new Blob([pdf.output('blob')], { type: 'application/pdf' })
      var reader = new FileReader();
      reader.readAsDataURL(blobPDF);
      //Conversión Blob to Base64
      reader.onloadend = () => {
        var base64String = reader.result;
        //Data para el servicio de S3 y BD
        let data = {
          document: base64String,
          namedoc: filename,
          type: blobPDF.type,
          typedoc: 3,
          id_commercialanalysis: analysis_id,
          comment: comment
        };
        console.log(data.id_commercialanalysis, data.typedoc)
        let check = this._UploadDocumentsService.getCheck(data.id_commercialanalysis, data.typedoc).pipe(map((resp) => {
          if (resp == false) {
            let sub = this._UploadDocumentsService.uploadDocsCA(data).pipe(map((response) => {
              this.toastr.success('El Informe ha sido Agregado', 'Éxito')
              console.log(response)
              if(callback){
                callback()
              }
            }),
              catchError((err) => {
                this.toastr.error('Error', 'Ni idea de por que no funciona')
                console.log(err);
                if(callback){
                  callback()
                }
                return of();
              })
            ).subscribe(() => sub.unsubscribe())
          }
          else {
            console.log('Si hay documento')
            console.log(resp)
            let data = {
              id_commercialanalysis: analysis_id,
              id_uploaddocsca: resp,
              document: base64String,
              uploaddocsca_namedoc: filename,
              type: blobPDF.type,
              typedoc: 3
            }
            let sub = this._UploadDocumentsService.updateInform(data).pipe(map((response) => {
              console.log(response)
              this.toastr.success('El Informe ha sido Actualizado', 'Éxito')
              if(callback){
                callback()
              }
            }),
              catchError((e) => {
                console.log(e)
                if(callback){
                  callback()
                }
                return of()
              })
            ).subscribe(() => sub.unsubscribe)
            console.log(data)
          }
        }),
          catchError((e) => {
            console.log(e)
            if(callback){
              callback()
            }
            return of()
          })
        ).subscribe(() => check.unsubscribe())

      }
      this.toastr.success('Documento Descargado', `Se ha descargado el informe ${analysis_type}`)
    })
  }
  createReportDownload(data,filename){
    html2canvas(data as any).then(canvas => {
      const image = { type: 'jpeg', quality: 0.98 };
      const margin = [0.5, 0.5];

      var imgWidth = 8.5;
      var pageHeight = 11;

      var innerPageWidth = imgWidth - margin[0] * 2;
      var innerPageHeight = pageHeight - margin[1] * 2;

      // Calculate the number of pages.
      var pxFullHeight = canvas.height;
      var pxPageHeight = Math.floor(canvas.width * (pageHeight / imgWidth));
      var nPages = Math.ceil(pxFullHeight / pxPageHeight);

      // Define pageHeight separately so it can be trimmed on the final page.
      var pageHeight = innerPageHeight;

      // Create a one-page canvas to split up the full image.
      var pageCanvas = document.createElement('canvas');
      var pageCtx = pageCanvas.getContext('2d');
      pageCanvas.width = canvas.width;
      pageCanvas.height = pxPageHeight;

      // Initialize the PDF.
      var pdf = new jsPDF('p', 'in', [8.5, 11]);

      for (var page = 0; page < nPages; page++) {
        // Trim the final page to reduce file size.
        if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
          pageCanvas.height = pxFullHeight % pxPageHeight;
          pageHeight = (pageCanvas.height * innerPageWidth) / pageCanvas.width;
        }

        // Display the page.
        var w = pageCanvas.width;
        var h = pageCanvas.height;
        pageCtx.fillStyle = 'white';
        pageCtx.fillRect(0, 0, w, h);
        pageCtx.drawImage(canvas, 0, page * pxPageHeight, w, h, 0, 0, w, h);

        // Add the page to the PDF.
        if (page > 0) pdf.addPage();
        debugger;
        var imgData = pageCanvas.toDataURL('image/' + image.type, image.quality);
        pdf.addImage(imgData, image.type, margin[1], margin[0], innerPageWidth, pageHeight);
      }
      pdf.save(filename)
    })
  }
}
