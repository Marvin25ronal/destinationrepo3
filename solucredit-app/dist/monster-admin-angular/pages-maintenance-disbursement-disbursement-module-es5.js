function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-maintenance-disbursement-disbursement-module"], {
  /***/
  "./src/app/pages/maintenance/disbursement/disbursement.module.ts":
  /*!***********************************************************************!*\
    !*** ./src/app/pages/maintenance/disbursement/disbursement.module.ts ***!
    \***********************************************************************/

  /*! exports provided: DisbursementModule */

  /***/
  function srcAppPagesMaintenanceDisbursementDisbursementModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "DisbursementModule", function () {
      return DisbursementModule;
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


    var _disbursement_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./disbursement.component */
    "./src/app/pages/maintenance/disbursement/disbursement.component.ts");
    /* harmony import */


    var ngx_spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ngx-spinner */
    "./node_modules/ngx-spinner/__ivy_ngcc__/fesm2015/ngx-spinner.js");
    /* harmony import */


    var src_app_pipes_pipes_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! src/app/pipes/pipes.module */
    "./src/app/pipes/pipes.module.ts");
    /* harmony import */


    var angular_notifier__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! angular-notifier */
    "./node_modules/angular-notifier/__ivy_ngcc__/fesm2015/angular-notifier.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
    /* harmony import */


    var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! @ng-bootstrap/ng-bootstrap */
    "./node_modules/@ng-bootstrap/ng-bootstrap/__ivy_ngcc__/fesm2015/ng-bootstrap.js");
    /* harmony import */


    var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! src/app/shared/shared.module */
    "./src/app/shared/shared.module.ts");

    var routes = [{
      path: "",
      data: {
        title: "Forma de desembolso",
        urls: [{
          title: "Creación de desembolso",
          url: '/forma-desembolso'
        }]
      },
      component: _disbursement_component__WEBPACK_IMPORTED_MODULE_3__["DisbursementComponent"]
    }];

    var DisbursementModule = function DisbursementModule() {
      _classCallCheck(this, DisbursementModule);
    };

    DisbursementModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: DisbursementModule
    });
    DisbursementModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
      factory: function DisbursementModule_Factory(t) {
        return new (t || DisbursementModule)();
      },
      imports: [[ngx_spinner__WEBPACK_IMPORTED_MODULE_4__["NgxSpinnerModule"], src_app_pipes_pipes_module__WEBPACK_IMPORTED_MODULE_5__["PipesModule"], angular_notifier__WEBPACK_IMPORTED_MODULE_6__["NotifierModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ReactiveFormsModule"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__["NgbModule"], src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_9__["SharedModule"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](DisbursementModule, {
        imports: [ngx_spinner__WEBPACK_IMPORTED_MODULE_4__["NgxSpinnerModule"], src_app_pipes_pipes_module__WEBPACK_IMPORTED_MODULE_5__["PipesModule"], angular_notifier__WEBPACK_IMPORTED_MODULE_6__["NotifierModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ReactiveFormsModule"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__["NgbModule"], src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_9__["SharedModule"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DisbursementModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
          declarations: [],
          imports: [ngx_spinner__WEBPACK_IMPORTED_MODULE_4__["NgxSpinnerModule"], src_app_pipes_pipes_module__WEBPACK_IMPORTED_MODULE_5__["PipesModule"], angular_notifier__WEBPACK_IMPORTED_MODULE_6__["NotifierModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ReactiveFormsModule"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__["NgbModule"], src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_9__["SharedModule"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)]
        }]
      }], null, null);
    })();
    /***/

  }
}]);
//# sourceMappingURL=pages-maintenance-disbursement-disbursement-module-es5.js.map