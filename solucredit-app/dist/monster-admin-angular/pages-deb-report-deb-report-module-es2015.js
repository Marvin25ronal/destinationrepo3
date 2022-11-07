(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-deb-report-deb-report-module"],{

/***/ "./src/app/pages/deb-report/deb-report.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/pages/deb-report/deb-report.module.ts ***!
  \*******************************************************/
/*! exports provided: DebReportModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DebReportModule", function() { return DebReportModule; });
/* harmony import */ var _debreport_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./debreport.component */ "./src/app/pages/deb-report/debreport.component.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/__ivy_ngcc__/fesm2015/ngx-spinner.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/__ivy_ngcc__/fesm2015/ng-bootstrap.js");
/* harmony import */ var angular_notifier__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! angular-notifier */ "./node_modules/angular-notifier/__ivy_ngcc__/fesm2015/angular-notifier.js");
/* harmony import */ var _pipes_pipes_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../pipes/pipes.module */ "./src/app/pipes/pipes.module.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/shared.module */ "./src/app/shared/shared.module.ts");












const routes = [
    {
        path: '',
        data: {
            title: 'Reporte de deudores',
            urls: [
                { title: 'Reporte de deudores', url: '/deudores-reporte' },
                { title: 'Reporte de deudores' }
            ]
        },
        component: _debreport_component__WEBPACK_IMPORTED_MODULE_0__["DebreportComponent"]
    }
];
class DebReportModule {
}
DebReportModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: DebReportModule });
DebReportModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function DebReportModule_Factory(t) { return new (t || DebReportModule)(); }, imports: [[_angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbModule"], ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerModule"], angular_notifier__WEBPACK_IMPORTED_MODULE_7__["NotifierModule"], _pipes_pipes_module__WEBPACK_IMPORTED_MODULE_8__["PipesModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_9__["SharedModule"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](DebReportModule, { declarations: [_debreport_component__WEBPACK_IMPORTED_MODULE_0__["DebreportComponent"]], imports: [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbModule"], ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerModule"], angular_notifier__WEBPACK_IMPORTED_MODULE_7__["NotifierModule"], _pipes_pipes_module__WEBPACK_IMPORTED_MODULE_8__["PipesModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_9__["SharedModule"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](DebReportModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                imports: [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbModule"], ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerModule"], angular_notifier__WEBPACK_IMPORTED_MODULE_7__["NotifierModule"], _pipes_pipes_module__WEBPACK_IMPORTED_MODULE_8__["PipesModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_9__["SharedModule"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)],
                declarations: [_debreport_component__WEBPACK_IMPORTED_MODULE_0__["DebreportComponent"]],
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/pages/deb-report/debreport.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/pages/deb-report/debreport.component.ts ***!
  \*********************************************************/
/*! exports provided: DebreportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DebreportComponent", function() { return DebreportComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/__ivy_ngcc__/fesm2015/ngx-spinner.js");
/* harmony import */ var _shared_reportfilters_reportfilters_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/reportfilters/reportfilters.component */ "./src/app/shared/reportfilters/reportfilters.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/__ivy_ngcc__/fesm2015/ng-bootstrap.js");
/* harmony import */ var angular_notifier__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! angular-notifier */ "./node_modules/angular-notifier/__ivy_ngcc__/fesm2015/angular-notifier.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};







function DebreportComponent_th_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const header_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", header_r1, " ");
} }
class DebreportComponent {
    constructor() {
        //-------FILTER-COMPONENT STUFFFF------
        this.valores1 = [
            { value: 0, text: "Factoraje Tradicional" },
            { value: 1, text: "Factoraje Especial" },
            { value: 3, text: "Especiales" },
            { value: 4, text: "Pronto Pago" },
        ];
        this.valores2 = [
            { value: 'NIT', text: "nit" },
            { value: 'NAME', text: "nombre" },
        ];
        this.vals = ['', '', '', '...', null, null,];
        this.config = [
            {
                label: ' Filtrar por Razón social:',
                tipo: 'TEXT',
                range: false,
                labelsAux: []
            },
            {
                label: 'NIT:',
                tipo: 'TEXT',
                range: false,
                labelsAux: []
            },
            {
                tipo: 'OPTIONS',
                options: {
                    restart: true,
                    header: true
                }
            }
        ];
        //-------------
        this.dataList = {
            metadata: [
                "No.",
                "Razón social",
                "Nit",
                "Numero de telefono",
                "Direccion comercial",
                "Direccion para coleccion",
            ],
            data: []
        };
        this.pageSize = 10;
        this.page = 1;
        this.totalData = 0;
    }
    ngOnInit() {
    }
    onChangeCategory1(deviceValue) {
        /*  this.selectedRequestType = deviceValue; */
        /* if (this.selectUser != "") {
          this.getLogs([this.selectUser]);
        }
        else {
          this.getLogs("");
        } */
    }
    onChangeCategory2(deviceValue) {
        /*  this.selectedCustomerFilter = deviceValue; */
        /*  if (this.selectUser != "") {
           this.getLogs([this.selectUser]);
         }
         else {
           this.getLogs("");
         } */
    }
    xlsxDownload(e) {
        return __awaiter(this, void 0, void 0, function* () {
            /*let searchField = [];
            let searchItem = [];
            if (this.model && this.model2) {
              searchField.push('FECINI');
              let fecini = this.model.year + '-' + this.model.month + '-' + this.model.day + ' 00:00:00';
              searchItem.push(fecini);
              searchField.push('FECEND');
              let fecend = this.model2.year + '-' + this.model2.month + '-' + this.model2.day + ' 23:59:59';
              searchItem.push(fecend);
            }
        
        
            if (this.selectedRequestType != "") {
              searchField.push('TYPE');
              searchItem.push(this.selectedRequestType);
            }
            if (this.selectedCustomerFilter != "" && this.selectCustomerSearch != "") {
              searchField.push(this.selectedCustomerFilter);
              searchItem.push('%' + this.selectCustomerSearch + '%');
            }*/
            let searchField = [];
            let searchItem = [];
            console.log('SEARCH:: ');
            console.log(e);
            if (this.vals[4] && this.vals[5]) {
                searchField.push('FECINI');
                let fecini = this.vals[4].year + '-' + this.vals[4].month + '-' + this.vals[4].day + ' 00:00:00';
                searchItem.push(fecini);
                searchField.push('FECEND');
                let fecend = this.vals[5].year + '-' + this.vals[5].month + '-' + this.vals[5].day + ' 23:59:59';
                searchItem.push(fecend);
            }
            if (this.vals[0] != "") {
                searchField.push('TYPE');
                searchItem.push(this.vals[0]);
            }
            if (this.vals[2] != "" && this.vals[3] != "") {
                searchField.push(this.vals[2]);
                searchItem.push('%' + this.vals[3] + '%');
            }
            /* let date = new Date();
            let datestring = this.datepipe.transform(date, 'yyyy-MM-dd HH:MM:ss');
            await this.mysqlService
              .DownloadXlsx('ReporteSolicitudes' + datestring, searchItem, searchField);
         */
        });
    }
    search(e) {
        let searchField = [];
        let searchItem = [];
        console.log('SEARCH:: ');
        console.log(e);
        if (this.vals[4] && this.vals[5]) {
            searchField.push('FECINI');
            let fecini = this.vals[4].year + '-' + this.vals[4].month + '-' + this.vals[4].day + ' 00:00:00';
            searchItem.push(fecini);
            searchField.push('FECEND');
            let fecend = this.vals[5].year + '-' + this.vals[5].month + '-' + this.vals[5].day + ' 23:59:59';
            searchItem.push(fecend);
        }
        if (this.vals[0] != "") {
            searchField.push('TYPE');
            searchItem.push(this.vals[0]);
        }
        if (this.vals[2] != "" && this.vals[3] != "") {
            searchField.push(this.vals[2]);
            searchItem.push('%' + this.vals[3] + '%');
        }
        /*  this._service.getRequests(this.pageSize, (this.page - 1) * this.pageSize, searchItem, searchField).pipe(
           map((data) => {
             this.dataList.data = data.data;
             this.totalData = data.count;
             this.spinner.hide();
     
     
     
           }),
           catchError((err) => {
             this.notifier.notify('error', 'Ocurrio un problema con la conexion' + err);
             console.log(err);
             this.spinner.hide();
             return of();
           })
     
         ).subscribe((data) => {
     
     
     
         }) */
    }
    pageChange(e) {
        //console.log(e);
        this.search(e);
    }
    onfilterChange1(e) {
        console.log('onfilterChange1:' + e);
        console.log(this.vals);
    }
    onfilterChange2(e) {
        console.log('onfilterChange2:' + e);
        console.log(this.vals);
    }
}
DebreportComponent.ɵfac = function DebreportComponent_Factory(t) { return new (t || DebreportComponent)(); };
DebreportComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DebreportComponent, selectors: [["app-debreport"]], decls: 16, vars: 10, consts: [[1, "row"], [1, "col-md-12"], ["bdColor", "rgba(51,51,51,0.8)", "size", "medium", "color", "#759ee0", "type", "ball-scale-multiple"], [2, "font-size", "20px", "color", "#fff"], [1, "card"], [1, "card-body"], [3, "config", "vals", "dataset1", "dataset3", "onFilter", "onCreateExcel", "valsChange", "onChange1", "onChange3"], [1, "table", "table-striped", "border", "mt-4"], [4, "ngFor", "ngForOf"], [1, "d-flex", "justify-content-center", "p-2"], ["aria-label", "Default pagination", 3, "collectionSize", "pageSize", "page", "boundaryLinks", "maxSize", "pageChange"]], template: function DebreportComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "ngx-spinner", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "p", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Cargando Informaci\u00F3n...");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "app-reportfilters", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("onFilter", function DebreportComponent_Template_app_reportfilters_onFilter_7_listener($event) { return ctx.search($event); })("onCreateExcel", function DebreportComponent_Template_app_reportfilters_onCreateExcel_7_listener($event) { return ctx.xlsxDownload($event); })("valsChange", function DebreportComponent_Template_app_reportfilters_valsChange_7_listener($event) { return ctx.vals = $event; })("onChange1", function DebreportComponent_Template_app_reportfilters_onChange1_7_listener($event) { return ctx.onfilterChange1($event); })("onChange3", function DebreportComponent_Template_app_reportfilters_onChange3_7_listener($event) { return ctx.onfilterChange2($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "table", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "thead");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, DebreportComponent_th_11_Template, 2, 1, "th", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "tbody");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "ngb-pagination", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("pageChange", function DebreportComponent_Template_ngb_pagination_pageChange_14_listener($event) { return ctx.page = $event; })("pageChange", function DebreportComponent_Template_ngb_pagination_pageChange_14_listener($event) { return ctx.pageChange($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "notifier-container");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("config", ctx.config)("vals", ctx.vals)("dataset1", ctx.valores1)("dataset3", ctx.valores2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.dataList.metadata);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("collectionSize", ctx.totalData)("pageSize", ctx.pageSize)("page", ctx.page)("boundaryLinks", true)("maxSize", 7);
    } }, directives: [ngx_spinner__WEBPACK_IMPORTED_MODULE_1__["NgxSpinnerComponent"], _shared_reportfilters_reportfilters_component__WEBPACK_IMPORTED_MODULE_2__["ReportfiltersComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbPagination"], angular_notifier__WEBPACK_IMPORTED_MODULE_5__["NotifierContainerComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2RlYi1yZXBvcnQvZGVicmVwb3J0LmNvbXBvbmVudC5jc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DebreportComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-debreport',
                templateUrl: './debreport.component.html',
                styleUrls: ['./debreport.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ })

}]);
//# sourceMappingURL=pages-deb-report-deb-report-module-es2015.js.map