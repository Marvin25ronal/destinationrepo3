(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-analysis-report-analysis-report-module"],{

/***/ "./src/app/pages/analysis-report/analysis-report.module.ts":
/*!*****************************************************************!*\
  !*** ./src/app/pages/analysis-report/analysis-report.module.ts ***!
  \*****************************************************************/
/*! exports provided: AnalysisReportModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnalysisReportModule", function() { return AnalysisReportModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _analysis_report_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./analysis-report.component */ "./src/app/pages/analysis-report/analysis-report.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/__ivy_ngcc__/fesm2015/ng-bootstrap.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/__ivy_ngcc__/fesm2015/ngx-spinner.js");
/* harmony import */ var _pipes_pipes_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../pipes/pipes.module */ "./src/app/pipes/pipes.module.ts");
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var ngx_currency__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-currency */ "./node_modules/ngx-currency/__ivy_ngcc__/fesm2015/ngx-currency.js");
/* harmony import */ var ngx_quill__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-quill */ "./node_modules/ngx-quill/__ivy_ngcc__/fesm2015/ngx-quill.js");














const routes = [
    {
        path: "",
        data: {
            title: "Reporte de Análisis",
            urls: [
                { title: "Reporte Analisis", url: "/analysis-report" },
                { title: "Información" }
            ]
        },
        component: _analysis_report_component__WEBPACK_IMPORTED_MODULE_3__["AnalysisReportComponent"]
    },
    {
        path: ":id",
        data: {
            title: "Reporte de Análisis...",
            urls: [
                { title: "Ficha reporte", url: "/analysis-report" },
                { title: "Informacion" }
            ]
        },
        component: _analysis_report_component__WEBPACK_IMPORTED_MODULE_3__["AnalysisReportComponent"]
    }
];
class AnalysisReportModule {
}
AnalysisReportModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AnalysisReportModule });
AnalysisReportModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AnalysisReportModule_Factory(t) { return new (t || AnalysisReportModule)(); }, imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
            _pipes_pipes_module__WEBPACK_IMPORTED_MODULE_7__["PipesModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes),
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModule"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_6__["NgxSpinnerModule"],
            src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_8__["SharedModule"],
            ngx_currency__WEBPACK_IMPORTED_MODULE_9__["NgxCurrencyModule"],
            ngx_quill__WEBPACK_IMPORTED_MODULE_10__["QuillModule"].forRoot(),
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AnalysisReportModule, { imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
        _pipes_pipes_module__WEBPACK_IMPORTED_MODULE_7__["PipesModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModule"],
        ngx_spinner__WEBPACK_IMPORTED_MODULE_6__["NgxSpinnerModule"],
        src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_8__["SharedModule"],
        ngx_currency__WEBPACK_IMPORTED_MODULE_9__["NgxCurrencyModule"], ngx_quill__WEBPACK_IMPORTED_MODULE_10__["QuillModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AnalysisReportModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [],
                schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["CUSTOM_ELEMENTS_SCHEMA"]],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                    _pipes_pipes_module__WEBPACK_IMPORTED_MODULE_7__["PipesModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
                    _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes),
                    _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModule"],
                    ngx_spinner__WEBPACK_IMPORTED_MODULE_6__["NgxSpinnerModule"],
                    src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_8__["SharedModule"],
                    ngx_currency__WEBPACK_IMPORTED_MODULE_9__["NgxCurrencyModule"],
                    ngx_quill__WEBPACK_IMPORTED_MODULE_10__["QuillModule"].forRoot(),
                ]
            }]
    }], null, null); })();


/***/ })

}]);
//# sourceMappingURL=pages-analysis-report-analysis-report-module-es2015.js.map