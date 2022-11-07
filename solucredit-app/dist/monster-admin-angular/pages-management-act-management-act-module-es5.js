function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-management-act-management-act-module"], {
  /***/
  "./src/app/pages/management-act/management-act.module.ts":
  /*!***************************************************************!*\
    !*** ./src/app/pages/management-act/management-act.module.ts ***!
    \***************************************************************/

  /*! exports provided: ManagementActModule */

  /***/
  function srcAppPagesManagementActManagementActModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ManagementActModule", function () {
      return ManagementActModule;
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


    var _management_act_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./management-act.component */
    "./src/app/pages/management-act/management-act.component.ts");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
    /* harmony import */


    var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @ng-bootstrap/ng-bootstrap */
    "./node_modules/@ng-bootstrap/ng-bootstrap/__ivy_ngcc__/fesm2015/ng-bootstrap.js");
    /* harmony import */


    var ngx_spinner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ngx-spinner */
    "./node_modules/ngx-spinner/__ivy_ngcc__/fesm2015/ngx-spinner.js");
    /* harmony import */


    var _pipes_pipes_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ../../pipes/pipes.module */
    "./src/app/pipes/pipes.module.ts");
    /* harmony import */


    var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! src/app/shared/shared.module */
    "./src/app/shared/shared.module.ts");
    /* harmony import */


    var ngx_currency__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! ngx-currency */
    "./node_modules/ngx-currency/__ivy_ngcc__/fesm2015/ngx-currency.js");
    /* harmony import */


    var ngx_quill__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! ngx-quill */
    "./node_modules/ngx-quill/__ivy_ngcc__/fesm2015/ngx-quill.js");

    var routes = [{
      path: "",
      data: {
        title: "Reporte de Análisis",
        urls: [{
          title: "Acta de Gerencia",
          url: "/management-act"
        }, {
          title: "Información"
        }]
      },
      component: _management_act_component__WEBPACK_IMPORTED_MODULE_3__["ManagementActComponent"]
    }, {
      path: ":id",
      data: {
        title: "Reporte de Análisis...",
        urls: [{
          title: "Acta de Gerencia",
          url: "/management-act"
        }, {
          title: "Informacion"
        }]
      },
      component: _management_act_component__WEBPACK_IMPORTED_MODULE_3__["ManagementActComponent"]
    }];

    var ManagementActModule = function ManagementActModule() {
      _classCallCheck(this, ManagementActModule);
    };

    ManagementActModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: ManagementActModule
    });
    ManagementActModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
      factory: function ManagementActModule_Factory(t) {
        return new (t || ManagementActModule)();
      },
      imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"], _pipes_pipes_module__WEBPACK_IMPORTED_MODULE_7__["PipesModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes), _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModule"], ngx_spinner__WEBPACK_IMPORTED_MODULE_6__["NgxSpinnerModule"], src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_8__["SharedModule"], ngx_currency__WEBPACK_IMPORTED_MODULE_9__["NgxCurrencyModule"], ngx_quill__WEBPACK_IMPORTED_MODULE_10__["QuillModule"].forRoot()]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](ManagementActModule, {
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"], _pipes_pipes_module__WEBPACK_IMPORTED_MODULE_7__["PipesModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModule"], ngx_spinner__WEBPACK_IMPORTED_MODULE_6__["NgxSpinnerModule"], src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_8__["SharedModule"], ngx_currency__WEBPACK_IMPORTED_MODULE_9__["NgxCurrencyModule"], ngx_quill__WEBPACK_IMPORTED_MODULE_10__["QuillModule"]]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ManagementActModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
          declarations: [],
          schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["CUSTOM_ELEMENTS_SCHEMA"]],
          imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"], _pipes_pipes_module__WEBPACK_IMPORTED_MODULE_7__["PipesModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes), _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModule"], ngx_spinner__WEBPACK_IMPORTED_MODULE_6__["NgxSpinnerModule"], src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_8__["SharedModule"], ngx_currency__WEBPACK_IMPORTED_MODULE_9__["NgxCurrencyModule"], ngx_quill__WEBPACK_IMPORTED_MODULE_10__["QuillModule"].forRoot()]
        }]
      }], null, null);
    })();
    /***/

  }
}]);
//# sourceMappingURL=pages-management-act-management-act-module-es5.js.map