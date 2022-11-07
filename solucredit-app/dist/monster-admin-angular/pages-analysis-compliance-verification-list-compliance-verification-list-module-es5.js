function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-analysis-compliance-verification-list-compliance-verification-list-module"], {
  /***/
  "./src/app/pages/analysis/compliance-verification-list/compliance-verification-list.module.ts":
  /*!****************************************************************************************************!*\
    !*** ./src/app/pages/analysis/compliance-verification-list/compliance-verification-list.module.ts ***!
    \****************************************************************************************************/

  /*! exports provided: ComplianceVerificationListModule */

  /***/
  function srcAppPagesAnalysisComplianceVerificationListComplianceVerificationListModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ComplianceVerificationListModule", function () {
      return ComplianceVerificationListModule;
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


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
    /* harmony import */


    var _compliance_verification_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./compliance-verification-list.component */
    "./src/app/pages/analysis/compliance-verification-list/compliance-verification-list.component.ts");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
    /* harmony import */


    var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @ng-bootstrap/ng-bootstrap */
    "./node_modules/@ng-bootstrap/ng-bootstrap/__ivy_ngcc__/fesm2015/ng-bootstrap.js");
    /* harmony import */


    var angular_notifier__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! angular-notifier */
    "./node_modules/angular-notifier/__ivy_ngcc__/fesm2015/angular-notifier.js");
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

    var routes = [{
      path: "",
      data: {
        title: "Verificación de Cumplimiento",
        urls: [{
          title: "Listado",
          url: '/compliance-verification-list'
        }]
      },
      component: _compliance_verification_list_component__WEBPACK_IMPORTED_MODULE_3__["ComplianceVerificationListComponent"]
    }];

    var ComplianceVerificationListModule = function ComplianceVerificationListModule() {
      _classCallCheck(this, ComplianceVerificationListModule);
    };

    ComplianceVerificationListModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: ComplianceVerificationListModule
    });
    ComplianceVerificationListModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
      factory: function ComplianceVerificationListModule_Factory(t) {
        return new (t || ComplianceVerificationListModule)();
      },
      imports: [[ngx_spinner__WEBPACK_IMPORTED_MODULE_7__["NgxSpinnerModule"], src_app_pipes_pipes_module__WEBPACK_IMPORTED_MODULE_8__["PipesModule"], angular_notifier__WEBPACK_IMPORTED_MODULE_6__["NotifierModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModule"], src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_9__["SharedModule"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](ComplianceVerificationListModule, {
        imports: [ngx_spinner__WEBPACK_IMPORTED_MODULE_7__["NgxSpinnerModule"], src_app_pipes_pipes_module__WEBPACK_IMPORTED_MODULE_8__["PipesModule"], angular_notifier__WEBPACK_IMPORTED_MODULE_6__["NotifierModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModule"], src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_9__["SharedModule"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ComplianceVerificationListModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
          declarations: [],
          imports: [ngx_spinner__WEBPACK_IMPORTED_MODULE_7__["NgxSpinnerModule"], src_app_pipes_pipes_module__WEBPACK_IMPORTED_MODULE_8__["PipesModule"], angular_notifier__WEBPACK_IMPORTED_MODULE_6__["NotifierModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModule"], src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_9__["SharedModule"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)]
        }]
      }], null, null);
    })();
    /***/

  }
}]);
//# sourceMappingURL=pages-analysis-compliance-verification-list-compliance-verification-list-module-es5.js.map