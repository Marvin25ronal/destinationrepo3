function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["forms-individual-registro-deudores-individual-registro-deudores-individual-module"], {
  /***/
  "./src/app/forms/individual/registro-deudores-individual/registro-deudores-individual.component.ts":
  /*!*********************************************************************************************************!*\
    !*** ./src/app/forms/individual/registro-deudores-individual/registro-deudores-individual.component.ts ***!
    \*********************************************************************************************************/

  /*! exports provided: RegistroDeudoresIndividualComponent */

  /***/
  function srcAppFormsIndividualRegistroDeudoresIndividualRegistroDeudoresIndividualComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "RegistroDeudoresIndividualComponent", function () {
      return RegistroDeudoresIndividualComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");

    var RegistroDeudoresIndividualComponent =
    /*#__PURE__*/
    function () {
      function RegistroDeudoresIndividualComponent() {
        _classCallCheck(this, RegistroDeudoresIndividualComponent);
      }

      _createClass(RegistroDeudoresIndividualComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
      }]);

      return RegistroDeudoresIndividualComponent;
    }();

    RegistroDeudoresIndividualComponent.??fac = function RegistroDeudoresIndividualComponent_Factory(t) {
      return new (t || RegistroDeudoresIndividualComponent)();
    };

    RegistroDeudoresIndividualComponent.??cmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????defineComponent"]({
      type: RegistroDeudoresIndividualComponent,
      selectors: [["app-registro-deudores-individual"]],
      decls: 8,
      vars: 0,
      consts: [[1, "row"], [1, "col-sm-12"], [1, "card"], [1, "card-header", "bg-dark"], [1, "card-title", "mb-0", "text-white"], [1, "card-body"], [1, "card-block"]],
      template: function RegistroDeudoresIndividualComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div", 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](1, "div", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](2, "div", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](3, "div", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](4, "h4", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](5, "Registro de deudores");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](6, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](7, "div", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        }
      },
      styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2Zvcm1zL2luZGl2aWR1YWwvcmVnaXN0cm8tZGV1ZG9yZXMtaW5kaXZpZHVhbC9yZWdpc3Ryby1kZXVkb3Jlcy1pbmRpdmlkdWFsLmNvbXBvbmVudC5jc3MifQ== */"]
    });
    /*@__PURE__*/

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["??setClassMetadata"](RegistroDeudoresIndividualComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
          selector: 'app-registro-deudores-individual',
          templateUrl: './registro-deudores-individual.component.html',
          styleUrls: ['./registro-deudores-individual.component.css']
        }]
      }], function () {
        return [];
      }, null);
    })();
    /***/

  },

  /***/
  "./src/app/forms/individual/registro-deudores-individual/registro-deudores-individual.module.ts":
  /*!******************************************************************************************************!*\
    !*** ./src/app/forms/individual/registro-deudores-individual/registro-deudores-individual.module.ts ***!
    \******************************************************************************************************/

  /*! exports provided: RegistroDeudoresIndividualModule */

  /***/
  function srcAppFormsIndividualRegistroDeudoresIndividualRegistroDeudoresIndividualModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "RegistroDeudoresIndividualModule", function () {
      return RegistroDeudoresIndividualModule;
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


    var _registro_deudores_individual_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./registro-deudores-individual.component */
    "./src/app/forms/individual/registro-deudores-individual/registro-deudores-individual.component.ts");

    var routes = [{
      path: '',
      data: {
        title: 'Registro de deudores',
        urls: [{
          title: 'Registro de deudores',
          url: '/registro-deudores-individual'
        }, {
          title: 'Formulario'
        }]
      },
      component: _registro_deudores_individual_component__WEBPACK_IMPORTED_MODULE_5__["RegistroDeudoresIndividualComponent"]
    }];

    var RegistroDeudoresIndividualModule = function RegistroDeudoresIndividualModule() {
      _classCallCheck(this, RegistroDeudoresIndividualModule);
    };

    RegistroDeudoresIndividualModule.??mod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????defineNgModule"]({
      type: RegistroDeudoresIndividualModule
    });
    RegistroDeudoresIndividualModule.??inj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????defineInjector"]({
      factory: function RegistroDeudoresIndividualModule_Factory(t) {
        return new (t || RegistroDeudoresIndividualModule)();
      },
      imports: [[_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes), _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModule"]]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["????setNgModuleScope"](RegistroDeudoresIndividualModule, {
        declarations: [_registro_deudores_individual_component__WEBPACK_IMPORTED_MODULE_5__["RegistroDeudoresIndividualComponent"]],
        imports: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModule"]]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["??setClassMetadata"](RegistroDeudoresIndividualModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
          imports: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes), _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModule"]],
          declarations: [_registro_deudores_individual_component__WEBPACK_IMPORTED_MODULE_5__["RegistroDeudoresIndividualComponent"]]
        }]
      }], null, null);
    })();
    /***/

  }
}]);
//# sourceMappingURL=forms-individual-registro-deudores-individual-registro-deudores-individual-module-es5.js.map