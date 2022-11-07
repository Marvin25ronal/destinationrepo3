import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
/* import { NgbDateStruct, NgbCalendar, NgbDateAdapter, NgbDateNativeAdapter, NgbDate } from '@ng-bootstrap/ng-bootstrap'; */
@Component({
  selector: 'app-reportfilters',
  templateUrl: './reportfilters.component.html',
  styleUrls: ['./reportfilters.component.css'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ height: 100, opacity: 0 }),
            animate('1s ease-out',
              style({ height: 50, opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ height: 100, opacity: 1 }),
            animate('1s ease-in',
              style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    ),
    trigger('openClose', [
      // ...
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.5,
        backgroundColor: 'green'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ])

  ]
})
export class ReportfiltersComponent implements OnInit {

  //------------
  showFilters = false;
  // This is for the collapse example
  public isCollapsed = false;

  collapsed = true;
  options = null;
  //-------------
  
  @Input('label1') label1: any = null;
  @Input('label2') label2: any = null;
  @Input('label3') label3: any = null;
  @Input('label4') label4: any = null;
  @Input('label5') label5: any = null;

  @Input('dataset1') dataset1: any[] = null;
  @Input('dataset2') dataset2: any[] = null;
  @Input('dataset3') dataset3: any[] = null;
  @Input('dataset4') dataset4: any[] = null;
  @Input('dataset5') dataset5: any[] = null;
  @Input('dataset6') dataset6: any[] = null;
  @Input('dataset7') dataset7: any[] = null;
  @Input('dataset8') dataset8: any[] = null;
  @Input('dataset9') dataset9: any[] = null;
  @Input('dataset10') dataset10: any[] = null;
  @Input('config') config: any = null;

  @Output('onChange1') onChange1: EventEmitter<any> = new EventEmitter();
  @Output('onChange2') onChange2: EventEmitter<any> = new EventEmitter();
  @Output('onChange3') onChange3: EventEmitter<any> = new EventEmitter();
  @Output('onChange4') onChange4: EventEmitter<any> = new EventEmitter();
  @Output('onChange5') onChange5: EventEmitter<any> = new EventEmitter();
  @Output('onChange6') onChange6: EventEmitter<any> = new EventEmitter();
  @Output('onChange7') onChange7: EventEmitter<any> = new EventEmitter();
  @Output('onChange8') onChange8: EventEmitter<any> = new EventEmitter();
  @Output('onChange9') onChange9: EventEmitter<any> = new EventEmitter();
  @Output('onChange10') onChange10: EventEmitter<any> = new EventEmitter();
  
  @Output('onFilter') onFilter: EventEmitter<any> = new EventEmitter();
  @Output('onCreatePdf') onCreatePdf: EventEmitter<any> = new EventEmitter();
  @Output('onCreateExcel') onCreateExcel: EventEmitter<any> = new EventEmitter();

  @Input('vals')valsNgModel: any[] = [];

  constructor() { }

  change1(e) { 
    this.onChange1.emit(this.valsNgModel[0]);
  }
  change2(e) {
    this.onChange2.emit(this.valsNgModel[1]);
  }
  change3(e) {
    this.onChange3.emit(this.valsNgModel[2]);
  }
  change4(e) {
    this.onChange1.emit(this.valsNgModel[3]);
  }
  change5(e) {
    this.onChange1.emit(this.valsNgModel[4]);
  }
  change6(e) {
    this.onChange1.emit(this.valsNgModel[0]);
  }
  change7(e) {
    this.onChange2.emit(this.valsNgModel[1]);
  }
  change8(e) {
    this.onChange3.emit(this.valsNgModel[2]);
  }
  change9(e) {
    this.onChange1.emit(this.valsNgModel[3]);
  }
  change10(e) {
    this.onChange1.emit(this.valsNgModel[4]);
  }

  filter() { 
    this.onFilter.emit(this.valsNgModel);
  }

  ngOnInit(): void {

    //filtro
    this.options = this.config.filter(item => item.tipo == 'OPTIONS')[0].options;
    this.config = this.config.filter(item => item.tipo != 'OPTIONS');
    /* if (!this.config) { 
      console.log('NO SE ESPECIFICO LA CONFIGURACION');
    } */
  }
  //SE CHECKEA LA ESTRUCTURA DE LA CONFIGURACION
  validateConfig(): boolean {
    
    
    for (let i = 0; i < this.config.length; i++) {
      let element = this.config[i];
      if (
        !element.filterNum ||
        !element.label ||
        !element.type ||
        !element.range
      ) {
        return false
      }
    }
    
    return true;
    
  }

  clickShowFilters() { 
    this.showFilters = !this.showFilters;
  }
  createPdf() { 
    this.onCreatePdf.emit(this.valsNgModel);
  }

  createExcel() { 
    this.onCreateExcel.emit(this.valsNgModel);
  }
  reiniciar() { 
    for (let i = 0; i < this.valsNgModel.length; i++) { 
      this.valsNgModel[i] = "";
    }
    this.onFilter.emit(this.valsNgModel);
  }

}
