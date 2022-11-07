function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["forms-empresa-puntoacta-empresa-puntoacta-empresa-module"], {
  /***/
  "./src/app/forms/empresa/puntoacta-empresa/puntoacta-empresa.component.ts":
  /*!********************************************************************************!*\
    !*** ./src/app/forms/empresa/puntoacta-empresa/puntoacta-empresa.component.ts ***!
    \********************************************************************************/

  /*! exports provided: PuntoactaEmpresaComponent */

  /***/
  function srcAppFormsEmpresaPuntoactaEmpresaPuntoactaEmpresaComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PuntoactaEmpresaComponent", function () {
      return PuntoactaEmpresaComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");

    var PuntoactaEmpresaComponent =
    /*#__PURE__*/
    function () {
      function PuntoactaEmpresaComponent() {
        _classCallCheck(this, PuntoactaEmpresaComponent);
      }

      _createClass(PuntoactaEmpresaComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
      }]);

      return PuntoactaEmpresaComponent;
    }();

    PuntoactaEmpresaComponent.ɵfac = function PuntoactaEmpresaComponent_Factory(t) {
      return new (t || PuntoactaEmpresaComponent)();
    };

    PuntoactaEmpresaComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: PuntoactaEmpresaComponent,
      selectors: [["app-puntoacta-empresa"]],
      decls: 8,
      vars: 0,
      consts: [[1, "row"], [1, "col-sm-12"], [1, "card"], [1, "card-header", "bg-dark"], [1, "card-title", "mb-0", "text-white"], [1, "card-body"], [1, "card-block"]],
      template: function PuntoactaEmpresaComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "h4", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Punto de Acta");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "div", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      },
      styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2Zvcm1zL2VtcHJlc2EvcHVudG9hY3RhLWVtcHJlc2EvcHVudG9hY3RhLWVtcHJlc2EuY29tcG9uZW50LmNzcyJ9 */"]
    });
    /*@__PURE__*/

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PuntoactaEmpresaComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
          selector: 'app-puntoacta-empresa',
          templateUrl: './puntoacta-empresa.component.html',
          styleUrls: ['./puntoacta-empresa.component.css']
        }]
      }], function () {
        return [];
      }, null);
    })();
    /***/

  },

  /***/
  "./src/app/forms/empresa/puntoacta-empresa/puntoacta-empresa.module.ts":
  /*!*****************************************************************************!*\
    !*** ./src/app/forms/empresa/puntoacta-empresa/puntoacta-empresa.module.ts ***!
    \*****************************************************************************/

  /*! exports provided: PuntoactaEmpresaModule */

  /***/
  function srcAppFormsEmpresaPuntoactaEmpresaPuntoactaEmpresaModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PuntoactaEmpresaModule", function () {
      return PuntoactaEmpresaModule;
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


    var _puntoacta_empresa_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./puntoacta-empresa.component */
    "./src/app/forms/empresa/puntoacta-empresa/puntoacta-empresa.component.ts");

    var routes = [{
      path: '',
      data: {
        title: 'Punto de Acta',
        urls: [{
          title: 'Punto de Acta',
          url: '/puntoacta-empresa'
        }, {
          title: 'Formulario'
        }]
      },
      component: _puntoacta_empresa_component__WEBPACK_IMPORTED_MODULE_5__["PuntoactaEmpresaComponent"]
    }];

    var PuntoactaEmpresaModule = function PuntoactaEmpresaModule() {
      _classCallCheck(this, PuntoactaEmpresaModule);
    };

    PuntoactaEmpresaModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: PuntoactaEmpresaModule
    });
    PuntoactaEmpresaModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
      factory: function PuntoactaEmpresaModule_Factory(t) {
        return new (t || PuntoactaEmpresaModule)();
      },
      imports: [[_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes), _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModule"]]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](PuntoactaEmpresaModule, {
        declarations: [_puntoacta_empresa_component__WEBPACK_IMPORTED_MODULE_5__["PuntoactaEmpresaComponent"]],
        imports: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModule"]]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PuntoactaEmpresaModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
          imports: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes), _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModule"]],
          declarations: [_puntoacta_empresa_component__WEBPACK_IMPORTED_MODULE_5__["PuntoactaEmpresaComponent"]]
        }]
      }], null, null);
    })();
    /***/

  }
}]);
//# sourceMappingURL=forms-empresa-puntoacta-empresa-puntoacta-empresa-module-es5.js.map