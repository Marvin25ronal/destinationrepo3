function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-maintenance-councilmembers-councilmembers-module"], {
  /***/
  "./src/app/pages/maintenance/councilmembers/councilmembers.module.ts":
  /*!***************************************************************************!*\
    !*** ./src/app/pages/maintenance/councilmembers/councilmembers.module.ts ***!
    \***************************************************************************/

  /*! exports provided: CouncilmembersModule */

  /***/
  function srcAppPagesMaintenanceCouncilmembersCouncilmembersModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "CouncilmembersModule", function () {
      return CouncilmembersModule;
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


    var _councilmembers_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./councilmembers.component */
    "./src/app/pages/maintenance/councilmembers/councilmembers.component.ts");
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
        title: "Miembros del Consejo",
        urls: [{
          title: "Miembros del Consejo",
          url: '/council-members'
        }]
      },
      component: _councilmembers_component__WEBPACK_IMPORTED_MODULE_3__["CouncilmembersComponent"]
    }];

    var CouncilmembersModule = function CouncilmembersModule() {
      _classCallCheck(this, CouncilmembersModule);
    };

    CouncilmembersModule.??mod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????defineNgModule"]({
      type: CouncilmembersModule
    });
    CouncilmembersModule.??inj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????defineInjector"]({
      factory: function CouncilmembersModule_Factory(t) {
        return new (t || CouncilmembersModule)();
      },
      imports: [[ngx_spinner__WEBPACK_IMPORTED_MODULE_4__["NgxSpinnerModule"], src_app_pipes_pipes_module__WEBPACK_IMPORTED_MODULE_5__["PipesModule"], angular_notifier__WEBPACK_IMPORTED_MODULE_6__["NotifierModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ReactiveFormsModule"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__["NgbModule"], src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_9__["SharedModule"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["????setNgModuleScope"](CouncilmembersModule, {
        imports: [ngx_spinner__WEBPACK_IMPORTED_MODULE_4__["NgxSpinnerModule"], src_app_pipes_pipes_module__WEBPACK_IMPORTED_MODULE_5__["PipesModule"], angular_notifier__WEBPACK_IMPORTED_MODULE_6__["NotifierModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ReactiveFormsModule"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__["NgbModule"], src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_9__["SharedModule"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["??setClassMetadata"](CouncilmembersModule, [{
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
//# sourceMappingURL=pages-maintenance-councilmembers-councilmembers-module-es5.js.map