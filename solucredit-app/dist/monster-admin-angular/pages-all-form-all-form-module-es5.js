function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-all-form-all-form-module"], {
  /***/
  "./src/app/pages/all-form/all-form.module.ts":
  /*!***************************************************!*\
    !*** ./src/app/pages/all-form/all-form.module.ts ***!
    \***************************************************/

  /*! exports provided: AllFormModule */

  /***/
  function srcAppPagesAllFormAllFormModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AllFormModule", function () {
      return AllFormModule;
    });
    /* harmony import */


    var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @ng-bootstrap/ng-bootstrap */
    "./node_modules/@ng-bootstrap/ng-bootstrap/__ivy_ngcc__/fesm2015/ng-bootstrap.js");
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


    var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var ngx_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ngx-spinner */
    "./node_modules/ngx-spinner/__ivy_ngcc__/fesm2015/ngx-spinner.js");
    /* harmony import */


    var _pipes_pipes_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ../../pipes/pipes.module */
    "./src/app/pipes/pipes.module.ts");
    /* harmony import */


    var ngx_currency__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ngx-currency */
    "./node_modules/ngx-currency/__ivy_ngcc__/fesm2015/ngx-currency.js");
    /* harmony import */


    var _shared_shared_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! ../../shared/shared.module */
    "./src/app/shared/shared.module.ts");
    /* harmony import */


    var _all_form_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! ./all-form.component */
    "./src/app/pages/all-form/all-form.component.ts");

    var routes = [{
      path: "",
      data: {
        title: "Información general",
        urls: [{
          title: "",
          url: ""
        }]
      },
      component: _all_form_component__WEBPACK_IMPORTED_MODULE_9__["AllFormComponent"]
    }];

    var AllFormModule = function AllFormModule() {
      _classCallCheck(this, AllFormModule);
    };

    AllFormModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
      type: AllFormModule
    });
    AllFormModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
      factory: function AllFormModule_Factory(t) {
        return new (t || AllFormModule)();
      },
      imports: [[_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes), _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_0__["NgbModule"], _pipes_pipes_module__WEBPACK_IMPORTED_MODULE_6__["PipesModule"], ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerModule"], ngx_currency__WEBPACK_IMPORTED_MODULE_7__["NgxCurrencyModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_8__["SharedModule"]]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](AllFormModule, {
        imports: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_0__["NgbModule"], _pipes_pipes_module__WEBPACK_IMPORTED_MODULE_6__["PipesModule"], ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerModule"], ngx_currency__WEBPACK_IMPORTED_MODULE_7__["NgxCurrencyModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_8__["SharedModule"]]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵsetClassMetadata"](AllFormModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["NgModule"],
        args: [{
          imports: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes), _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_0__["NgbModule"], _pipes_pipes_module__WEBPACK_IMPORTED_MODULE_6__["PipesModule"], ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerModule"], ngx_currency__WEBPACK_IMPORTED_MODULE_7__["NgxCurrencyModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_8__["SharedModule"]],
          declarations: [],
          schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["CUSTOM_ELEMENTS_SCHEMA"]]
        }]
      }], null, null);
    })();
    /***/

  }
}]);
//# sourceMappingURL=pages-all-form-all-form-module-es5.js.map