function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-analysis-compliance-verification-compliance-verification-module"], {
  /***/
  "./src/app/pages/analysis/compliance-verification/compliance-verification.module.ts":
  /*!******************************************************************************************!*\
    !*** ./src/app/pages/analysis/compliance-verification/compliance-verification.module.ts ***!
    \******************************************************************************************/

  /*! exports provided: ComplianceVerificationModule */

  /***/
  function srcAppPagesAnalysisComplianceVerificationComplianceVerificationModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ComplianceVerificationModule", function () {
      return ComplianceVerificationModule;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
    /* harmony import */


    var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @ng-bootstrap/ng-bootstrap */
    "./node_modules/@ng-bootstrap/ng-bootstrap/__ivy_ngcc__/fesm2015/ng-bootstrap.js");
    /* harmony import */


    var ngx_currency__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ngx-currency */
    "./node_modules/ngx-currency/__ivy_ngcc__/fesm2015/ngx-currency.js");
    /* harmony import */


    var ngx_quill__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ngx-quill */
    "./node_modules/ngx-quill/__ivy_ngcc__/fesm2015/ngx-quill.js");
    /* harmony import */


    var ngx_spinner__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ngx-spinner */
    "./node_modules/ngx-spinner/__ivy_ngcc__/fesm2015/ngx-spinner.js");
    /* harmony import */


    var src_app_pipes_pipes_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! src/app/pipes/pipes.module */
    "./src/app/pipes/pipes.module.ts");
    /* harmony import */


    var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! src/app/shared/shared.module */
    "./src/app/shared/shared.module.ts");
    /* harmony import */


    var _compliance_verification_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! ./compliance-verification.component */
    "./src/app/pages/analysis/compliance-verification/compliance-verification.component.ts");

    var routes = [{
      path: "",
      data: {
        title: "Verifiación de Cumplimiento",
        urls: [{
          title: "Verificación de Cumplimiento",
          url: "/compliance-verification"
        }, {
          title: "Detalle"
        }]
      },
      component: _compliance_verification_component__WEBPACK_IMPORTED_MODULE_10__["ComplianceVerificationComponent"]
    }];

    var ComplianceVerificationModule = function ComplianceVerificationModule() {
      _classCallCheck(this, ComplianceVerificationModule);
    };

    ComplianceVerificationModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: ComplianceVerificationModule
    });
    ComplianceVerificationModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
      factory: function ComplianceVerificationModule_Factory(t) {
        return new (t || ComplianceVerificationModule)();
      },
      imports: [[_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], src_app_pipes_pipes_module__WEBPACK_IMPORTED_MODULE_8__["PipesModule"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes), _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModule"], ngx_spinner__WEBPACK_IMPORTED_MODULE_7__["NgxSpinnerModule"], src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_9__["SharedModule"], ngx_currency__WEBPACK_IMPORTED_MODULE_5__["NgxCurrencyModule"], ngx_quill__WEBPACK_IMPORTED_MODULE_6__["QuillModule"].forRoot()]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](ComplianceVerificationModule, {
        imports: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], src_app_pipes_pipes_module__WEBPACK_IMPORTED_MODULE_8__["PipesModule"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModule"], ngx_spinner__WEBPACK_IMPORTED_MODULE_7__["NgxSpinnerModule"], src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_9__["SharedModule"], ngx_currency__WEBPACK_IMPORTED_MODULE_5__["NgxCurrencyModule"], ngx_quill__WEBPACK_IMPORTED_MODULE_6__["QuillModule"]]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ComplianceVerificationModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
          declarations: [],
          imports: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], src_app_pipes_pipes_module__WEBPACK_IMPORTED_MODULE_8__["PipesModule"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes), _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModule"], ngx_spinner__WEBPACK_IMPORTED_MODULE_7__["NgxSpinnerModule"], src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_9__["SharedModule"], ngx_currency__WEBPACK_IMPORTED_MODULE_5__["NgxCurrencyModule"], ngx_quill__WEBPACK_IMPORTED_MODULE_6__["QuillModule"].forRoot()],
          schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["CUSTOM_ELEMENTS_SCHEMA"]]
        }]
      }], null, null);
    })();
    /***/

  }
}]);
//# sourceMappingURL=pages-analysis-compliance-verification-compliance-verification-module-es5.js.map