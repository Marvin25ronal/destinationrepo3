import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-documentmodal',
  templateUrl: './documentmodal.component.html',
  styleUrls: ['./documentmodal.component.scss']
})
export class DocumentmodalComponent implements OnInit {

  @ViewChild('viewdocuments')
  templateRef: TemplateRef<any>

  @Input()
  imgsrcbase64?

  @Input()
  pdfsrcbase64

  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    console.log('modal importado')
  }

  openModal() {
    this.modalService.open(this.templateRef, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      size: 'xl',
      windowClass: 'my-modal5',
    })

  }

}
