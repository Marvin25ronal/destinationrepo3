function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["forms-empresa-solicitud-empresa-solicitud-empresa-module"], {
  /***/
  "./src/app/forms/empresa/solicitud-empresa/solicitud-empresa.component.ts":
  /*!********************************************************************************!*\
    !*** ./src/app/forms/empresa/solicitud-empresa/solicitud-empresa.component.ts ***!
    \********************************************************************************/

  /*! exports provided: SolicitudEmpresaComponent */

  /***/
  function srcAppFormsEmpresaSolicitudEmpresaSolicitudEmpresaComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SolicitudEmpresaComponent", function () {
      return SolicitudEmpresaComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
    /* harmony import */


    var _services_mysql_mysql_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../../../services/mysql/mysql.service */
    "./src/app/services/mysql/mysql.service.ts");
    /* harmony import */


    var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ngx-toastr */
    "./node_modules/ngx-toastr/__ivy_ngcc__/fesm2015/ngx-toastr.js");
    /* harmony import */


    var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! rxjs/operators */
    "./node_modules/rxjs/_esm2015/operators/index.js");
    /* harmony import */


    var _services_formularios_individua_solicitud_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ../../../services/formularios/individua/solicitud.service */
    "./src/app/services/formularios/individua/solicitud.service.ts");
    /* harmony import */


    var _services_helper_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ../../../services/helper.service */
    "./src/app/services/helper.service.ts");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
    /* harmony import */


    var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! rxjs */
    "./node_modules/rxjs/_esm2015/index.js");
    /* harmony import */


    var ngx_spinner__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! ngx-spinner */
    "./node_modules/ngx-spinner/__ivy_ngcc__/fesm2015/ngx-spinner.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
    /* harmony import */


    var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
    /*! @ng-bootstrap/ng-bootstrap */
    "./node_modules/@ng-bootstrap/ng-bootstrap/__ivy_ngcc__/fesm2015/ng-bootstrap.js");

    function SolicitudEmpresaComponent_div_287_option_63_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "option", 153);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
      }

      if (rf & 2) {
        var country_r13 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngValue", country_r13.country_id);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????textInterpolate"](country_r13.name);
      }
    }

    var _c0 = function _c0() {
      return {
        standalone: true
      };
    };

    function SolicitudEmpresaComponent_div_287_Template(rf, ctx) {
      if (rf & 1) {
        var _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????getCurrentView"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](1, "div", 10);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](2, "h4", 11);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](3, "Datos del representante legal");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](4, "div", 21);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](5, "div", 27);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](6, "label", 118);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](7, "Nombre");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](8, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](9, "input", 125);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_287_Template_input_ngModelChange_9_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r15);

          var legal_r9 = ctx.$implicit;
          return legal_r9.name = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](10, "div", 21);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](11, "div", 41);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](12, "label", 118);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](13, "Tel\xE9fono");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](14, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](15, "input", 126);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_287_Template_input_ngModelChange_15_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r15);

          var legal_r9 = ctx.$implicit;
          return legal_r9.phone = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](16, "div", 44);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](17, "label", 118);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](18, "NIT");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](19, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](20, "input", 127);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_287_Template_input_ngModelChange_20_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r15);

          var legal_r9 = ctx.$implicit;
          return legal_r9.nit = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](21, "div", 21);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](22, "div", 27);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](23, "label", 128);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](24, "Direcci\xF3n particular");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](25, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](26, "input", 129);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_287_Template_input_ngModelChange_26_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r15);

          var legal_r9 = ctx.$implicit;
          return legal_r9.address = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](27, "div", 21);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](28, "div", 22);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](29, "label", 130);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](30, "Fecha de nacimiento");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](31, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](32, "div", 131);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](33, "input", 132, 133);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_287_Template_input_ngModelChange_33_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r15);

          var ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]();

          return ctx_r19.model = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](35, "div", 134);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](36, "button", 135);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function SolicitudEmpresaComponent_div_287_Template_button_click_36_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r15);

          var _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????reference"](34);

          return _r11.toggle();
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](37, "i", 136);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](38, "input", 137);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](39, "div", 22);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](40, "label", 138);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](41, "Profesi\xF3n");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](42, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](43, "input", 139);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_287_Template_input_ngModelChange_43_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r15);

          var legal_r9 = ctx.$implicit;
          return legal_r9.profession = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](44, "div", 21);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](45, "div", 22);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](46, "label", 140);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](47, "No. de DPI");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](48, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](49, "input", 141);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_287_Template_input_ngModelChange_49_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r15);

          var legal_r9 = ctx.$implicit;
          return legal_r9.dpi_num = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](50, "div", 22);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](51, "label", 142);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](52, "Extendido en");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](53, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](54, "input", 143);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_287_Template_input_ngModelChange_54_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r15);

          var legal_r9 = ctx.$implicit;
          return legal_r9.dpi_extended = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](55, "div", 21);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](56, "div", 41);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](57, "label", 144);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](58, "Nacionalidad");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](59, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](60, "select", 145);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_287_Template_select_ngModelChange_60_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r15);

          var legal_r9 = ctx.$implicit;
          return legal_r9.nationality = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](61, "option");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](62, "Selecione una opcion");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](63, SolicitudEmpresaComponent_div_287_option_63_Template, 2, 2, "option", 146);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](64, "div", 44);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](65, "label", 147);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](66, "Estado Civil");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](67, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](68, "input", 148);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_287_Template_input_ngModelChange_68_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r15);

          var legal_r9 = ctx.$implicit;
          return legal_r9.civil_status = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](69, "div", 21);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](70, "div", 41);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](71, "label", 149);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](72, "Cargo que se le nombro");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](73, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](74, "input", 150);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_287_Template_input_ngModelChange_74_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r15);

          var legal_r9 = ctx.$implicit;
          return legal_r9.position = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](75, "div", 44);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](76, "label", 151);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](77, "Vigencia");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](78, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](79, "input", 152);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_287_Template_input_ngModelChange_79_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r15);

          var legal_r9 = ctx.$implicit;
          return legal_r9.validity = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
      }

      if (rf & 2) {
        var legal_r9 = ctx.$implicit;

        var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](9);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", legal_r9.name);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", legal_r9.phone);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", legal_r9.nit);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", legal_r9.address);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](7);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx_r0.model);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](10);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", legal_r9.profession);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", legal_r9.dpi_num);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", legal_r9.dpi_extended);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", legal_r9.nationality)("ngModelOptions", _angular_core__WEBPACK_IMPORTED_MODULE_0__["????pureFunction0"](14, _c0));

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](3);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngForOf", ctx_r0.countries);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", legal_r9.civil_status);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", legal_r9.position);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", legal_r9.validity);
      }
    }

    function SolicitudEmpresaComponent_div_292_option_20_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "option", 153);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
      }

      if (rf & 2) {
        var country_r32 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngValue", country_r32.country_id);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????textInterpolate"](country_r32.name);
      }
    }

    function SolicitudEmpresaComponent_div_292_div_31_Template(rf, ctx) {
      if (rf & 1) {
        var _r35 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????getCurrentView"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div", 159);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](1, "button", 160);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function SolicitudEmpresaComponent_div_292_div_31_Template_button_click_1_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r35);

          var i_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().index;

          var ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]();

          return ctx_r33.quitarSocio(i_r29);
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](2, "i", 161);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
      }
    }

    function SolicitudEmpresaComponent_div_292_Template(rf, ctx) {
      if (rf & 1) {
        var _r37 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????getCurrentView"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](1, "div", 21);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](2, "div", 22);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](3, "label", 118);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](4, "Nombre");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](5, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](6, "input", 154);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_292_Template_input_ngModelChange_6_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r37);

          var member_r28 = ctx.$implicit;
          return member_r28.name = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](7, "div", 22);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](8, "label", 118);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](9, "Cargo que desempe\xF1a");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](10, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](11, "input", 155);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_292_Template_input_ngModelChange_11_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r37);

          var member_r28 = ctx.$implicit;
          return member_r28.postion = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](12, "div", 21);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](13, "div", 44);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](14, "label", 118);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](15, "Nacionalidad");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](16, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](17, "select", 145);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_292_Template_select_ngModelChange_17_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r37);

          var member_r28 = ctx.$implicit;
          return member_r28.nationality = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](18, "option");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](19, "Selecione una opcion");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](20, SolicitudEmpresaComponent_div_292_option_20_Template, 2, 2, "option", 146);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](21, "div", 44);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](22, "label", 118);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](23, "NIT");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](24, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](25, "input", 156);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_292_Template_input_ngModelChange_25_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r37);

          var member_r28 = ctx.$implicit;
          return member_r28.nit = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](26, "div", 59);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](27, "label", 118);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](28, "% de participaci\xF3n accionaria");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](29, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](30, "input", 157);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_292_Template_input_ngModelChange_30_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r37);

          var member_r28 = ctx.$implicit;
          return member_r28.share_participation = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](31, SolicitudEmpresaComponent_div_292_div_31_Template, 3, 0, "div", 158);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
      }

      if (rf & 2) {
        var member_r28 = ctx.$implicit;

        var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", member_r28.name);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", member_r28.postion);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", member_r28.nationality)("ngModelOptions", _angular_core__WEBPACK_IMPORTED_MODULE_0__["????pureFunction0"](8, _c0));

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](3);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngForOf", ctx_r1.countries);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", member_r28.nit);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", member_r28.share_participation);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngIf", member_r28.member_id || ctx_r1.membersCount > 1);
      }
    }

    function SolicitudEmpresaComponent_div_302_div_23_Template(rf, ctx) {
      if (rf & 1) {
        var _r47 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????getCurrentView"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div", 159);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](1, "button", 160);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function SolicitudEmpresaComponent_div_302_div_23_Template_button_click_1_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r47);

          var i_r43 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().index;

          var ctx_r45 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]();

          return ctx_r45.quitarDirectiva(i_r43);
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](2, "i", 161);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
      }
    }

    function SolicitudEmpresaComponent_div_302_Template(rf, ctx) {
      if (rf & 1) {
        var _r49 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????getCurrentView"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](1, "div", 21);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](2, "div", 22);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](3, "label", 118);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](4, "Nombre");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](5, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](6, "input", 162);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_302_Template_input_ngModelChange_6_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r49);

          var direc_r42 = ctx.$implicit;
          return direc_r42.name = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](7, "div", 22);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](8, "label", 118);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](9, "Cargo que desempe\xF1a");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](10, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](11, "input", 163);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_302_Template_input_ngModelChange_11_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r49);

          var direc_r42 = ctx.$implicit;
          return direc_r42.position = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](12, "div", 21);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](13, "div", 22);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](14, "label", 118);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](15, "NIT");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](16, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](17, "input", 164);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_302_Template_input_ngModelChange_17_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r49);

          var direc_r42 = ctx.$implicit;
          return direc_r42.nit = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](18, "div", 165);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](19, "label", 118);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](20, "Es Pep's");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](21, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](22, "input", 166);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_302_Template_input_ngModelChange_22_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r49);

          var direc_r42 = ctx.$implicit;
          return direc_r42.peps = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](23, SolicitudEmpresaComponent_div_302_div_23_Template, 3, 0, "div", 158);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
      }

      if (rf & 2) {
        var direc_r42 = ctx.$implicit;

        var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", direc_r42.name);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", direc_r42.position);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", direc_r42.nit);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", direc_r42.peps);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngIf", direc_r42.director_id || ctx_r2.directorsCount > 1);
      }
    }

    function SolicitudEmpresaComponent_div_312_div_1_div_17_Template(rf, ctx) {
      if (rf & 1) {
        var _r59 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????getCurrentView"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div", 159);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](1, "button", 160);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function SolicitudEmpresaComponent_div_312_div_1_div_17_Template_button_click_1_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r59);

          var i_r54 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"](2).index;

          var ctx_r57 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]();

          return ctx_r57.quitarEmpresa(i_r54);
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](2, "i", 161);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
      }
    }

    function SolicitudEmpresaComponent_div_312_div_1_Template(rf, ctx) {
      if (rf & 1) {
        var _r62 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????getCurrentView"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](1, "div", 21);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](2, "div", 44);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](3, "label", 28);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](4, "Nombre");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](5, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](6, "input", 168);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_312_div_1_Template_input_ngModelChange_6_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r62);

          var company_r53 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit;

          return company_r53.name = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](7, "div", 44);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](8, "label", 28);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](9, "Sector al que pertenece");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](10, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](11, "input", 168);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_312_div_1_Template_input_ngModelChange_11_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r62);

          var company_r53 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit;

          return company_r53.business = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](12, "div", 59);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](13, "label", 28);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](14, "Nombre de la Holding / Pa\xEDs");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](15, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](16, "input", 168);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_312_div_1_Template_input_ngModelChange_16_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r62);

          var i_r54 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().index;

          var ctx_r65 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]();

          return ctx_r65.requestForm.companys[i_r54].holding_name = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](17, SolicitudEmpresaComponent_div_312_div_1_div_17_Template, 3, 0, "div", 158);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
      }

      if (rf & 2) {
        var ctx_r67 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]();

        var i_r54 = ctx_r67.index;
        var company_r53 = ctx_r67.$implicit;

        var ctx_r55 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "comp-name", i_r54, "");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", company_r53.name);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "comp-business", i_r54, "");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", company_r53.business);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "comp-holding_name", i_r54, "");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx_r55.requestForm.companys[i_r54].holding_name);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngIf", company_r53.company_id || ctx_r55.companiesCount > 1);
      }
    }

    function SolicitudEmpresaComponent_div_312_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](1, SolicitudEmpresaComponent_div_312_div_1_Template, 18, 7, "div", 167);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
      }

      if (rf & 2) {
        var company_r53 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngIf", company_r53.remove != true);
      }
    }

    function SolicitudEmpresaComponent_div_322_div_1_div_33_Template(rf, ctx) {
      if (rf & 1) {
        var _r74 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????getCurrentView"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div", 159);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](1, "button", 160);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function SolicitudEmpresaComponent_div_322_div_1_div_33_Template_button_click_1_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r74);

          var i_r69 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"](2).index;

          var ctx_r72 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]();

          return ctx_r72.quitarCuenta(i_r69);
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](2, "i", 161);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
      }
    }

    function SolicitudEmpresaComponent_div_322_div_1_Template(rf, ctx) {
      if (rf & 1) {
        var _r77 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????getCurrentView"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](1, "div", 21);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](2, "div", 44);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](3, "label", 169);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](4, "Banco");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](5, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](6, "input", 168);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_322_div_1_Template_input_ngModelChange_6_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r77);

          var aco_r68 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit;

          return aco_r68.bank = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](7, "div", 44);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](8, "label", 170);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](9, "No. Cuenta");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](10, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](11, "input", 168);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_322_div_1_Template_input_ngModelChange_11_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r77);

          var aco_r68 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit;

          return aco_r68.account_number = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](12, "div", 44);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](13, "label", 171);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](14, "Tipo de Cuenta");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](15, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](16, "input", 168);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_322_div_1_Template_input_ngModelChange_16_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r77);

          var aco_r68 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit;

          return aco_r68.account_type = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](17, "div", 21);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](18, "div", 44);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](19, "label", 172);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](20, "Moneda");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](21, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](22, "input", 173);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_322_div_1_Template_input_ngModelChange_22_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r77);

          var aco_r68 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit;

          return aco_r68.currency = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](23, "div", 44);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](24, "label", 28);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](25, "Nombre de la cuenta");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](26, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](27, "input", 168);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_322_div_1_Template_input_ngModelChange_27_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r77);

          var aco_r68 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit;

          return aco_r68.name_account = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](28, "div", 59);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](29, "label", 28);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](30, "Promedio mensual en Dep\xF3sitos");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](31, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](32, "input", 174);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_322_div_1_Template_input_ngModelChange_32_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r77);

          var aco_r68 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit;

          return aco_r68.monthly_average_deposit = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](33, SolicitudEmpresaComponent_div_322_div_1_div_33_Template, 3, 0, "div", 158);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
      }

      if (rf & 2) {
        var ctx_r88 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]();

        var i_r69 = ctx_r88.index;
        var aco_r68 = ctx_r88.$implicit;

        var ctx_r70 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "aco-banck", i_r69, "");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", aco_r68.bank);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "aco-accoun-number", i_r69, "");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", aco_r68.account_number);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "aco-account-type", i_r69, "");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", aco_r68.account_type);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "aco-currency", i_r69, "");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", aco_r68.currency);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "aco-name-account", i_r69, "");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", aco_r68.name_account);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "aco-monthly-avera-depo", i_r69, "");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", aco_r68.monthly_average_deposit);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngIf", aco_r68.account_id || ctx_r70.bank_accountCount > 1);
      }
    }

    function SolicitudEmpresaComponent_div_322_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](1, SolicitudEmpresaComponent_div_322_div_1_Template, 34, 13, "div", 167);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
      }

      if (rf & 2) {
        var aco_r68 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngIf", aco_r68.remove != true);
      }
    }

    function SolicitudEmpresaComponent_div_331_div_1_div_33_Template(rf, ctx) {
      if (rf & 1) {
        var _r95 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????getCurrentView"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div", 159);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](1, "button", 160);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function SolicitudEmpresaComponent_div_331_div_1_div_33_Template_button_click_1_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r95);

          var i_r90 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"](2).index;

          var ctx_r93 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]();

          return ctx_r93.quitarPrestamo(i_r90);
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](2, "i", 161);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
      }
    }

    function SolicitudEmpresaComponent_div_331_div_1_Template(rf, ctx) {
      if (rf & 1) {
        var _r98 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????getCurrentView"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](1, "div", 21);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](2, "div", 44);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](3, "label", 28);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](4, "Banco");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](5, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](6, "input", 168);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_331_div_1_Template_input_ngModelChange_6_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r98);

          var loan_r89 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit;

          return loan_r89.bank = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](7, "div", 44);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](8, "label", 28);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](9, "No. Pr\xE9stamo");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](10, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](11, "input", 168);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_331_div_1_Template_input_ngModelChange_11_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r98);

          var loan_r89 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit;

          return loan_r89.loan_number = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](12, "div", 44);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](13, "label", 28);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](14, "Garant\xEDa");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](15, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](16, "input", 168);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_331_div_1_Template_input_ngModelChange_16_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r98);

          var loan_r89 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit;

          return loan_r89.warranty = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](17, "div", 21);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](18, "div", 44);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](19, "label", 28);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](20, "Monto Otorgado");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](21, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](22, "input", 174);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_331_div_1_Template_input_ngModelChange_22_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r98);

          var loan_r89 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit;

          return loan_r89.amount_awarded = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](23, "div", 44);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](24, "label", 28);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](25, "Plazo");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](26, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](27, "input", 174);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_331_div_1_Template_input_ngModelChange_27_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r98);

          var loan_r89 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit;

          return loan_r89.time = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](28, "div", 59);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](29, "label", 28);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](30, "Saldo");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](31, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](32, "input", 174);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_331_div_1_Template_input_ngModelChange_32_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r98);

          var loan_r89 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit;

          return loan_r89.balance = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](33, SolicitudEmpresaComponent_div_331_div_1_div_33_Template, 3, 0, "div", 158);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
      }

      if (rf & 2) {
        var ctx_r109 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]();

        var i_r90 = ctx_r109.index;
        var loan_r89 = ctx_r109.$implicit;

        var ctx_r91 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "loan.bank", i_r90, "");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", loan_r89.bank);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "loan-loannum", i_r90, "");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", loan_r89.loan_number);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "loan-warranty", i_r90, "");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", loan_r89.warranty);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "loan-amount-awarded", i_r90, "");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", loan_r89.amount_awarded);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "loan-time", i_r90, "");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", loan_r89.time);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "loan.balance", i_r90, "");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", loan_r89.balance);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngIf", loan_r89.loan_id || ctx_r91.bank_loansCount > 1);
      }
    }

    function SolicitudEmpresaComponent_div_331_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](1, SolicitudEmpresaComponent_div_331_div_1_Template, 34, 13, "div", 167);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
      }

      if (rf & 2) {
        var loan_r89 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngIf", loan_r89.remove != true);
      }
    }

    function SolicitudEmpresaComponent_div_341_div_1_div_28_Template(rf, ctx) {
      if (rf & 1) {
        var _r116 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????getCurrentView"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div", 159);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](1, "button", 160);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function SolicitudEmpresaComponent_div_341_div_1_div_28_Template_button_click_1_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r116);

          var i_r111 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"](2).index;

          var ctx_r114 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]();

          return ctx_r114.quitarDescuento(i_r111);
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](2, "i", 161);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
      }
    }

    function SolicitudEmpresaComponent_div_341_div_1_Template(rf, ctx) {
      if (rf & 1) {
        var _r119 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????getCurrentView"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](1, "div", 21);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](2, "div", 22);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](3, "label", 28);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](4, "Entidad");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](5, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](6, "input", 168);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_341_div_1_Template_input_ngModelChange_6_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r119);

          var fact_r110 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit;

          return fact_r110.entity = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](7, "div", 22);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](8, "label", 28);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](9, "Garant\xEDa");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](10, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](11, "input", 168);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_341_div_1_Template_input_ngModelChange_11_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r119);

          var fact_r110 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit;

          return fact_r110.warranty = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](12, "div", 21);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](13, "div", 44);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](14, "label", 28);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](15, "Monto Otorgado");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](16, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](17, "input", 174);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_341_div_1_Template_input_ngModelChange_17_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r119);

          var fact_r110 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit;

          return fact_r110.amount_awarded = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](18, "div", 44);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](19, "label", 28);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](20, "Monto Utilizado");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](21, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](22, "input", 174);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_341_div_1_Template_input_ngModelChange_22_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r119);

          var fact_r110 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit;

          return fact_r110.amount_used = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](23, "div", 59);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](24, "label", 28);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](25, "Saldo");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](26, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](27, "input", 174);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_341_div_1_Template_input_ngModelChange_27_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r119);

          var fact_r110 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit;

          return fact_r110.balance = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](28, SolicitudEmpresaComponent_div_341_div_1_div_28_Template, 3, 0, "div", 158);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
      }

      if (rf & 2) {
        var ctx_r128 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]();

        var i_r111 = ctx_r128.index;
        var fact_r110 = ctx_r128.$implicit;

        var ctx_r112 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "fact-entity", i_r111, "");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", fact_r110.entity);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "fac-warranty", i_r111, "");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", fact_r110.warranty);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "fact-amount-awarded", i_r111, "");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", fact_r110.amount_awarded);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "fact-amount-used", i_r111, "");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", fact_r110.amount_used);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "fact-balance", i_r111, "");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", fact_r110.balance);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngIf", fact_r110.factoring_id || ctx_r112.factoringsCount > 1);
      }
    }

    function SolicitudEmpresaComponent_div_341_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](1, SolicitudEmpresaComponent_div_341_div_1_Template, 29, 11, "div", 167);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
      }

      if (rf & 2) {
        var fact_r110 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngIf", fact_r110.remove != true);
      }
    }

    function SolicitudEmpresaComponent_div_350_div_1_div_33_Template(rf, ctx) {
      if (rf & 1) {
        var _r135 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????getCurrentView"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div", 159);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](1, "button", 160);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function SolicitudEmpresaComponent_div_350_div_1_div_33_Template_button_click_1_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r135);

          var i_r130 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"](2).index;

          var ctx_r133 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]();

          return ctx_r133.quitarProveedor(i_r130);
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](2, "i", 161);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
      }
    }

    function SolicitudEmpresaComponent_div_350_div_1_Template(rf, ctx) {
      if (rf & 1) {
        var _r138 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????getCurrentView"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](1, "div", 21);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](2, "div", 44);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](3, "label", 28);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](4, "Nombre");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](5, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](6, "input", 168);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_350_div_1_Template_input_ngModelChange_6_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r138);

          var sup_r129 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit;

          return sup_r129.name = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](7, "div", 44);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](8, "label", 28);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](9, "Promedio mensual en compras");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](10, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](11, "input", 174);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_350_div_1_Template_input_ngModelChange_11_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r138);

          var sup_r129 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit;

          return sup_r129.average_monthly_purchase = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](12, "div", 44);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](13, "label", 28);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](14, "Monto m\xE1ximo de cr\xE9dito");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](15, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](16, "input", 174);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_350_div_1_Template_input_ngModelChange_16_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r138);

          var sup_r129 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit;

          return sup_r129.max_credit = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](17, "div", 21);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](18, "div", 44);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](19, "label", 28);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](20, "Pa\xEDs\t");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](21, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](22, "input", 168);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_350_div_1_Template_input_ngModelChange_22_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r138);

          var sup_r129 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit;

          return sup_r129.country = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](23, "div", 44);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](24, "label", 28);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](25, "Contacto");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](26, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](27, "input", 168);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_350_div_1_Template_input_ngModelChange_27_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r138);

          var sup_r129 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit;

          return sup_r129.contact = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](28, "div", 59);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](29, "label", 28);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](30, "Tel\xE9fono");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](31, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](32, "input", 168);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_350_div_1_Template_input_ngModelChange_32_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r138);

          var sup_r129 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit;

          return sup_r129.phone = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](33, SolicitudEmpresaComponent_div_350_div_1_div_33_Template, 3, 0, "div", 158);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
      }

      if (rf & 2) {
        var ctx_r149 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]();

        var i_r130 = ctx_r149.index;
        var sup_r129 = ctx_r149.$implicit;

        var ctx_r131 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "sup-name", i_r130, "");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", sup_r129.name);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "sup-average_monthly_purchase", i_r130, "");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", sup_r129.average_monthly_purchase);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "sup-max_credit", i_r130, "");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", sup_r129.max_credit);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "sup.country", i_r130, "");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", sup_r129.country);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "sup-contact", i_r130, "");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", sup_r129.contact);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "sup-phone", i_r130, "");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", sup_r129.phone);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngIf", sup_r129.supplier_id || ctx_r131.suppliersCount > 1);
      }
    }

    function SolicitudEmpresaComponent_div_350_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](1, SolicitudEmpresaComponent_div_350_div_1_Template, 34, 13, "div", 167);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
      }

      if (rf & 2) {
        var sup_r129 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngIf", sup_r129.remove != true);
      }
    }

    function SolicitudEmpresaComponent_div_359_div_1_div_43_Template(rf, ctx) {
      if (rf & 1) {
        var _r156 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????getCurrentView"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div", 159);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](1, "button", 160);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function SolicitudEmpresaComponent_div_359_div_1_div_43_Template_button_click_1_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r156);

          var i_r151 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"](2).index;

          var ctx_r154 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]();

          return ctx_r154.quitarCliente(i_r151);
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](2, "i", 161);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
      }
    }

    function SolicitudEmpresaComponent_div_359_div_1_Template(rf, ctx) {
      if (rf & 1) {
        var _r159 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????getCurrentView"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](1, "div", 21);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](2, "div", 44);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](3, "label", 28);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](4, "Nombre");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](5, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](6, "input", 168);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_359_div_1_Template_input_ngModelChange_6_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r159);

          var client_r150 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit;

          return client_r150.name = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](7, "div", 175);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](8, "label", 28);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](9, "Promedio mensual");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](10, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](11, "input", 174);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_359_div_1_Template_input_ngModelChange_11_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r159);

          var client_r150 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit;

          return client_r150.monthly_average = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](12, "div", 175);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](13, "label", 28);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](14, "D\xEDas Cr\xE9dito");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](15, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](16, "input", 174);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_359_div_1_Template_input_ngModelChange_16_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r159);

          var client_r150 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit;

          return client_r150.credit_days = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](17, "div", 175);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](18, "label", 28);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](19, "Forma de Pago");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](20, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](21, "input", 168);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_359_div_1_Template_input_ngModelChange_21_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r159);

          var client_r150 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit;

          return client_r150.pay_form = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](22, "div", 175);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](23, "label", 28);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](24, "Tiempo de relaci\xF3n");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](25, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](26, "input", 174);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_359_div_1_Template_input_ngModelChange_26_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r159);

          var client_r150 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit;

          return client_r150.relation_time = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](27, "div", 21);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](28, "div", 59);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](29, "label", 28);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](30, "Producto o servicio");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](31, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](32, "input", 168);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_359_div_1_Template_input_ngModelChange_32_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r159);

          var client_r150 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit;

          return client_r150.product_service = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](33, "div", 59);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](34, "label", 28);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](35, "Contacto");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](36, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](37, "input", 168);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_359_div_1_Template_input_ngModelChange_37_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r159);

          var client_r150 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit;

          return client_r150.contact = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](38, "div", 59);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](39, "label", 28);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](40, "Tel\xE9fono");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](41, "div", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](42, "input", 168);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_div_359_div_1_Template_input_ngModelChange_42_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r159);

          var client_r150 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit;

          return client_r150.phone = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](43, SolicitudEmpresaComponent_div_359_div_1_div_43_Template, 3, 0, "div", 158);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
      }

      if (rf & 2) {
        var ctx_r174 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]();

        var i_r151 = ctx_r174.index;
        var client_r150 = ctx_r174.$implicit;

        var ctx_r152 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "client-name", i_r151, "");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", client_r150.name);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "client-monthly-average", i_r151, "");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", client_r150.monthly_average);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "client-credit-days", i_r151, "");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", client_r150.credit_days);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "client-pay-form", i_r151, "");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", client_r150.pay_form);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "client-relation-name", i_r151, "");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", client_r150.relation_time);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "client-product-service", i_r151, "");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", client_r150.product_service);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "client-contact", i_r151, "");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", client_r150.contact);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "client-phone", i_r151, "");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", client_r150.phone);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngIf", client_r150.client_id || ctx_r152.clientsCount > 1);
      }
    }

    function SolicitudEmpresaComponent_div_359_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](1, SolicitudEmpresaComponent_div_359_div_1_Template, 44, 17, "div", 167);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
      }

      if (rf & 2) {
        var client_r150 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngIf", client_r150.remove != true);
      }
    }

    var SolicitudEmpresaComponent =
    /*#__PURE__*/
    function () {
      //-----------------
      function SolicitudEmpresaComponent(mysqlService, toastr, solicitudService, serviciosAuxiliares, spinner, route, router) {
        _classCallCheck(this, SolicitudEmpresaComponent);

        this.mysqlService = mysqlService;
        this.toastr = toastr;
        this.solicitudService = solicitudService;
        this.serviciosAuxiliares = serviciosAuxiliares;
        this.spinner = spinner;
        this.route = route;
        this.router = router;
        this.requestForm = {};
        this.valuesType = [1, 2, 3];
        this.valuesWarranty = [1, 2, 3];
        this.isIVA = [1, 0];
        this.isISR = [1, 0];
        this.companiesCount = 0;
        this.bank_accountCount = 0;
        this.bank_loansCount = 0;
        this.suppliersCount = 0;
        this.clientsCount = 0;
        this.factoringsCount = 0;
        this.membersCount = 0;
        this.directorsCount = 0;
        this.myForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormGroup"]({
          inputType: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
          inputMonto: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
          inputDestino: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
          inputPlazo: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
          inputGarantia: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
          inputRazonSocial: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
          inputNombreComercial: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
          inputNit: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
          inputSector: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
          inputDireccion: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
          inputTelefono: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
          inputNombreContacto: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
          inputCargoContacto: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
          inputEmailSolicitarInfo: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
          inputNombreSolicitarInfo: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
          inputTelefonoSolicitarInfo: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
          inputEmailContabilidad: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
          inputNombreContabilidad: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
          inputTelefonoContabilidad: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
          inputEmailCobros: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
          inputNombreCobros: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
          inputTelefonoCobros: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
          inputEmailFactura: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
          inputNombreFactura: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
          inputTelefonoFactura: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
          inputEmailRetencion: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
          inputNombreRetencion: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
          inputTelefonoRetencion: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
          inputActividadPrincipal: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
          inputTiempoMercado: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
          inputVentasAnuales: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
          inputAgenteIVA: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
          inputPorcentajeRetencionIVA: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
          inputAgenteISR: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
          inputPorcentajeRetencionISR: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
          inputWeb: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
          inputGroup: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
          inputNombreRepresentate: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
          nitRepresentante: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
          inputTelefonoRepresentante: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
          inputDireccionParticular: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
          inputFechaNacimiento: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
          inputProfesion: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
          inputDPI: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
          inputExtendido: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
          inputNacionalidadRepresentante: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
          inputEstadoCivil: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
          inputCargoRepresentante: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
          inputVigencia: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
          Directiva: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormArray"]([new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormGroup"]({
            nombre: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
            cargo: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
            nit: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
            peps: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"]()
          })]),
          Socios: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormArray"]([new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormGroup"]({
            nombre: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
            cargo: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
            nacionalidad: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
            nit: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
            porcentaje: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"]()
          })]),
          EmpresasGrupo: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormArray"]([new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormGroup"]({
            nombre: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
            sector: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
            holdingPais: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"]()
          })]),
          Cuenta: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormArray"]([new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormGroup"]({
            banco: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
            cuenta: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
            tipo: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
            moneda: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
            nombre: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
            promedioDeposito: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"]()
          })]),
          Prestamos: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormArray"]([new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormGroup"]({
            banco: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
            no: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
            garantia: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
            monto: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
            plazo: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
            saldo: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"]()
          })]),
          Descuentos: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormArray"]([new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormGroup"]({
            entidad: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
            garantia: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
            montoOtorgado: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
            montoUtilizado: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
            saldo: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"]()
          })]),
          Proveedores: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormArray"]([new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormGroup"]({
            nombre: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
            promedio: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
            montoMax: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
            pais: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
            contacto: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
            telefono: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"]()
          })]),
          Clientes: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormArray"]([new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormGroup"]({
            nombre: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
            promedio: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
            diasCredito: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
            formaPago: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
            tiempoRelacion: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
            productoServicio: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
            contacto: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](),
            telefono: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"]()
          })])
        });
        this.Directiva = this.myForm.get('Directiva');
        this.Socios = this.myForm.get('Socios');
        this.Cuenta = this.myForm.get('Cuenta');
        this.EmpresasGrupo = this.myForm.get('EmpresasGrupo');
        this.Prestamos = this.myForm.get('Prestamos');
        this.Descuentos = this.myForm.get('Descuentos');
        this.Proveedores = this.myForm.get('Proveedores');
        this.Clientes = this.myForm.get('Clientes');
      }

      _createClass(SolicitudEmpresaComponent, [{
        key: "onSubmitComplete",
        value: function onSubmitComplete() {
          var _this = this;

          if (this.model) {
            var fe = "".concat(this.model.year, "-").concat(this.model.month, "-").concat(this.model.day);
            console.log('FECHA ENTATIVA: ' + fe);
            this.requestForm.legal_representatives[0].date_of_birth = new Date(fe);
          }

          this.requestForm.finish_date = new Date();
          var suscription = this.solicitudService.saveForm(this.requestForm, this.requestID, 1).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (resp) {
            //console.log(resp);
            _this.spinner.hide();

            _this.toastr.success('Guardar', 'Tu progreso fue guardado con ??xito');

            if (!resp) {
              _this.requestForm = {};
              _this.requestForm.legal_representatives = [];

              _this.requestForm.legal_representatives.push({});

              _this.requestForm.members = [];

              _this.requestForm.members.push({});

              _this.membersCount = 1;
              _this.requestForm.director_boards = [];

              _this.requestForm.director_boards.push({});

              _this.directorsCount = 1;
              _this.requestForm.companys = [];

              _this.requestForm.companys.push({});

              _this.companiesCount = 1;
              _this.requestForm.bank_accounts = [];

              _this.requestForm.bank_accounts.push({});

              _this.bank_accountCount = 1;
              _this.requestForm.bank_loans = [];

              _this.requestForm.bank_loans.push({});

              _this.bank_loansCount = 1;
              _this.requestForm.factorings = [];

              _this.requestForm.factorings.push({});

              _this.factoringsCount = 1;
              _this.requestForm.suppliers = [];

              _this.requestForm.suppliers.push({});

              _this.suppliersCount = 1;
              _this.requestForm.clients = [];

              _this.requestForm.clients.push({});

              _this.clientsCount = 1;
              return;
            }

            _this.requestForm = resp;

            if (_this.requestForm.legal_representatives.length == 0) {
              _this.requestForm.legal_representatives.push({});
            } else {
              if (_this.requestForm.legal_representatives[0].date_of_birth) {
                _this.requestForm.legal_representatives[0].date_of_birth = _this.requestForm.legal_representatives[0].date_of_birth + '';

                var datestr = _this.requestForm.legal_representatives[0].date_of_birth.substring(0, 10).split('-');

                datestr = datestr[1] + '-' + datestr[2] + '-' + datestr[0];
                _this.requestForm.legal_representatives[0].date_of_birth = new Date(datestr);
                _this.model = {
                  year: _this.requestForm.legal_representatives[0].date_of_birth.getFullYear(),
                  month: _this.requestForm.legal_representatives[0].date_of_birth.getMonth() + 1,
                  day: _this.requestForm.legal_representatives[0].date_of_birth.getDate()
                };
              }
            }

            if (_this.requestForm.members.length == 0) {
              _this.requestForm.members.push({});
            }

            _this.membersCount = _this.requestForm.members.length;

            if (_this.requestForm.director_boards.length == 0) {
              _this.requestForm.director_boards.push({});
            }

            _this.directorsCount = _this.requestForm.director_boards.length;

            if (_this.requestForm.companys.length == 0) {
              _this.requestForm.companys.push({});
            }

            _this.companiesCount = _this.requestForm.companys.length;

            if (_this.requestForm.bank_accounts.length == 0) {
              _this.requestForm.bank_accounts.push({});
            }

            _this.bank_accountCount = _this.requestForm.bank_accounts.length;

            if (_this.requestForm.bank_loans.length == 0) {
              _this.requestForm.bank_loans.push({});
            }

            _this.bank_loansCount = _this.requestForm.bank_loans.length;

            if (_this.requestForm.factorings.length == 0) {
              _this.requestForm.factorings.push({});
            }

            _this.factoringsCount = _this.requestForm.factorings.length;

            if (_this.requestForm.suppliers.length == 0) {
              _this.requestForm.suppliers.push({});
            }

            _this.suppliersCount = _this.requestForm.suppliers.length;

            if (_this.requestForm.clients.length == 0) {
              _this.requestForm.clients.push({});
            }

            _this.clientsCount = _this.requestForm.clients.length;
          }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(function (err) {
            _this.spinner.hide();

            _this.toastr.error('error', 'Tu progreso no fue guardado');

            console.log(err);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])();
          })).subscribe(function () {
            return suscription.unsubscribe();
          });
        }
      }, {
        key: "onSubmit",
        value: function onSubmit() {
          var _this2 = this;

          // console.log(this.createCustomer.value);
          //this.toastr.success('Guardar', 'Hiciste click en guardar');
          console.log(this.myForm.value);
          console.log(this.model);
          console.log(this.date); //this.spinner.show();

          if (this.model) {
            var fe = "".concat(this.model.year, "-").concat(this.model.month, "-").concat(this.model.day);
            console.log('FECHA ENTATIVA: ' + fe);
            this.requestForm.legal_representatives[0].date_of_birth = new Date(fe);
          }

          var suscription = this.solicitudService.saveForm(this.requestForm, this.requestID, 1).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (resp) {
            //console.log(resp);
            _this2.spinner.hide();

            _this2.toastr.success('Guardar', 'Tu progreso fue guardado con ??xito');

            if (!resp) {
              _this2.requestForm = {};
              _this2.requestForm.legal_representatives = [];

              _this2.requestForm.legal_representatives.push({});

              _this2.requestForm.members = [];

              _this2.requestForm.members.push({});

              _this2.membersCount = 1;
              _this2.requestForm.director_boards = [];

              _this2.requestForm.director_boards.push({});

              _this2.directorsCount = 1;
              _this2.requestForm.companys = [];

              _this2.requestForm.companys.push({});

              _this2.companiesCount = 1;
              _this2.requestForm.bank_accounts = [];

              _this2.requestForm.bank_accounts.push({});

              _this2.bank_accountCount = 1;
              _this2.requestForm.bank_loans = [];

              _this2.requestForm.bank_loans.push({});

              _this2.bank_loansCount = 1;
              _this2.requestForm.factorings = [];

              _this2.requestForm.factorings.push({});

              _this2.factoringsCount = 1;
              _this2.requestForm.suppliers = [];

              _this2.requestForm.suppliers.push({});

              _this2.suppliersCount = 1;
              _this2.requestForm.clients = [];

              _this2.requestForm.clients.push({});

              _this2.clientsCount = 1;
              return;
            }

            _this2.requestForm = resp;

            if (_this2.requestForm.legal_representatives.length == 0) {
              _this2.requestForm.legal_representatives.push({});
            } else {
              if (_this2.requestForm.legal_representatives[0].date_of_birth) {
                _this2.requestForm.legal_representatives[0].date_of_birth = _this2.requestForm.legal_representatives[0].date_of_birth + '';

                var datestr = _this2.requestForm.legal_representatives[0].date_of_birth.substring(0, 10).split('-');

                datestr = datestr[1] + '-' + datestr[2] + '-' + datestr[0];
                _this2.requestForm.legal_representatives[0].date_of_birth = new Date(datestr);
                _this2.model = {
                  year: _this2.requestForm.legal_representatives[0].date_of_birth.getFullYear(),
                  month: _this2.requestForm.legal_representatives[0].date_of_birth.getMonth() + 1,
                  day: _this2.requestForm.legal_representatives[0].date_of_birth.getDate()
                };
              }
            }

            if (_this2.requestForm.members.length == 0) {
              _this2.requestForm.members.push({});
            }

            _this2.membersCount = _this2.requestForm.members.length;

            if (_this2.requestForm.director_boards.length == 0) {
              _this2.requestForm.director_boards.push({});
            }

            _this2.directorsCount = _this2.requestForm.director_boards.length;

            if (_this2.requestForm.companys.length == 0) {
              _this2.requestForm.companys.push({});
            }

            _this2.companiesCount = _this2.requestForm.companys.length;

            if (_this2.requestForm.bank_accounts.length == 0) {
              _this2.requestForm.bank_accounts.push({});
            }

            _this2.bank_accountCount = _this2.requestForm.bank_accounts.length;

            if (_this2.requestForm.bank_loans.length == 0) {
              _this2.requestForm.bank_loans.push({});
            }

            _this2.bank_loansCount = _this2.requestForm.bank_loans.length;

            if (_this2.requestForm.factorings.length == 0) {
              _this2.requestForm.factorings.push({});
            }

            _this2.factoringsCount = _this2.requestForm.factorings.length;

            if (_this2.requestForm.suppliers.length == 0) {
              _this2.requestForm.suppliers.push({});
            }

            _this2.suppliersCount = _this2.requestForm.suppliers.length;

            if (_this2.requestForm.clients.length == 0) {
              _this2.requestForm.clients.push({});
            }

            _this2.clientsCount = _this2.requestForm.clients.length;
          }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(function (err) {
            _this2.spinner.hide();

            _this2.toastr.error('error', 'Tu progreso no fue guardado');

            console.log(err);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])();
          })).subscribe(function () {
            return suscription.unsubscribe();
          });
        }
      }, {
        key: "agregarDirectiva",
        value: function agregarDirectiva() {
          this.requestForm.director_boards.push({});
          this.directorsCount++;
        }
      }, {
        key: "quitarDirectiva",
        value: function quitarDirectiva(i) {
          //console.log('SE VA A QUITAR EL INDICE ' + i);
          if (!this.requestForm.director_boards[i].director_id) {
            //console.log('SE VA A QUITAR UNA COMPANIA QUE NO EXISTE EN BACKEND');
            this.requestForm.director_boards = this.requestForm.director_boards.filter(function (_, k) {
              return k != i;
            });
          } else {
            this.requestForm.director_boards[i].remove = true;
          }

          this.directorsCount--;

          if (this.directorsCount == 0) {
            this.agregarDirectiva();
          } //console.log('QuitarEmpresa: '+this.companiesCount);

        }
      }, {
        key: "agregarSocio",
        value: function agregarSocio() {
          this.requestForm.members.push({});
          this.membersCount++;
        }
      }, {
        key: "quitarSocio",
        value: function quitarSocio(i) {
          //console.log('SE VA A QUITAR EL INDICE ' + i);
          if (!this.requestForm.members[i].member_id) {
            //console.log('SE VA A QUITAR UNA COMPANIA QUE NO EXISTE EN BACKEND');
            this.requestForm.members = this.requestForm.members.filter(function (_, k) {
              return k != i;
            });
          } else {
            this.requestForm.members[i].remove = true;
          }

          this.membersCount--;

          if (this.membersCount == 0) {
            this.agregarSocio();
          } //console.log('QuitarEmpresa: '+this.companiesCount);

        }
      }, {
        key: "agregarEmpresa",
        value: function agregarEmpresa() {
          this.requestForm.companys.push({});
          this.companiesCount++; //console.log('AgregarEmpresa: ' + this.companiesCount);
        }
      }, {
        key: "quitarEmpresa",
        value: function quitarEmpresa(i) {
          //console.log('SE VA A QUITAR EL INDICE ' + i);
          if (!this.requestForm.companys[i].company_id) {
            //console.log('SE VA A QUITAR UNA COMPANIA QUE NO EXISTE EN BACKEND');
            this.requestForm.companys = this.requestForm.companys.filter(function (_, k) {
              return k != i;
            });
          } else {
            this.requestForm.companys[i].remove = true;
          }

          this.companiesCount--;

          if (this.companiesCount == 0) {
            this.agregarEmpresa();
          } //console.log('QuitarEmpresa: '+this.companiesCount);

        }
      }, {
        key: "agregarCuenta",
        value: function agregarCuenta() {
          this.requestForm.bank_accounts.push({});
          this.bank_accountCount++;
        }
      }, {
        key: "quitarCuenta",
        value: function quitarCuenta(i) {
          if (!this.requestForm.bank_accounts[i].account_id) {
            //console.log('SE VA A QUITAR UNA COMPANIA QUE NO EXISTE EN BACKEND');
            this.requestForm.bank_accounts = this.requestForm.bank_accounts.filter(function (_, k) {
              return k != i;
            });
          } else {
            this.requestForm.bank_accounts[i].remove = true;
          }

          this.bank_accountCount--;

          if (this.bank_accountCount == 0) {
            this.agregarCuenta();
          }
        }
      }, {
        key: "agregarPrestamo",
        value: function agregarPrestamo() {
          this.requestForm.bank_loans.push({});
          this.bank_loansCount++;
        }
      }, {
        key: "quitarPrestamo",
        value: function quitarPrestamo(i) {
          if (!this.requestForm.bank_loans[i].loan_id) {
            //console.log('SE VA A QUITAR UNA COMPANIA QUE NO EXISTE EN BACKEND');
            this.requestForm.bank_loans = this.requestForm.bank_loans.filter(function (_, k) {
              return k != i;
            });
          } else {
            this.requestForm.bank_loans[i].remove = true;
          }

          this.bank_loansCount--;

          if (this.bank_loansCount == 0) {
            this.agregarPrestamo();
          }
        }
      }, {
        key: "agregarDescuento",
        value: function agregarDescuento() {
          this.requestForm.factorings.push({});
          this.factoringsCount++;
        }
      }, {
        key: "quitarDescuento",
        value: function quitarDescuento(i) {
          if (!this.requestForm.factorings[i].factoring_id) {
            //console.log('SE VA A QUITAR UNA COMPANIA QUE NO EXISTE EN BACKEND');
            this.requestForm.factorings = this.requestForm.factorings.filter(function (_, k) {
              return k != i;
            });
          } else {
            this.requestForm.factorings[i].remove = true;
          }

          this.factoringsCount--;

          if (this.factoringsCount == 0) {
            this.agregarDescuento();
          }
        }
      }, {
        key: "agregarProveedor",
        value: function agregarProveedor() {
          this.requestForm.suppliers.push({});
          this.suppliersCount++;
        }
      }, {
        key: "quitarProveedor",
        value: function quitarProveedor(i) {
          if (!this.requestForm.suppliers[i].supplier_id) {
            //console.log('SE VA A QUITAR UNA COMPANIA QUE NO EXISTE EN BACKEND');
            this.requestForm.suppliers = this.requestForm.suppliers.filter(function (_, k) {
              return k != i;
            });
          } else {
            this.requestForm.suppliers[i].remove = true;
          }

          this.suppliersCount--;

          if (this.suppliersCount == 0) {
            this.agregarProveedor();
          }
        }
      }, {
        key: "agregarCliente",
        value: function agregarCliente() {
          this.requestForm.clients.push({});
          this.clientsCount++;
        }
      }, {
        key: "quitarCliente",
        value: function quitarCliente(i) {
          if (!this.requestForm.clients[i].client_id) {
            //console.log('SE VA A QUITAR UNA COMPANIA QUE NO EXISTE EN BACKEND');
            this.requestForm.clients = this.requestForm.clients.filter(function (_, k) {
              return k != i;
            });
          } else {
            this.requestForm.clients[i].remove = true;
          }

          this.clientsCount--;

          if (this.clientsCount == 0) {
            this.agregarCliente();
          }
        }
      }, {
        key: "ngOnInit",
        value: function ngOnInit() {
          var _this3 = this;

          this.previousUrl = localStorage.getItem('cutomer-previous-url');
          this.getCountries();
          this.requestID = parseInt(this.route.snapshot.params.idsolicitud); //console.log(this.route.snapshot.paramMap.get('requestIdSelected'));

          this.spinner.show();
          this.solicitudService.getForm(this.requestID).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (resp) {
            _this3.requestForm = resp;
            console.log(resp);

            if (!resp) {
              _this3.requestForm = {};
              _this3.requestForm.legal_representatives = [];

              _this3.requestForm.legal_representatives.push({});

              _this3.requestForm.members = [];

              _this3.requestForm.members.push({});

              _this3.membersCount = 1;
              _this3.requestForm.director_boards = [];

              _this3.requestForm.director_boards.push({});

              _this3.directorsCount = 1;
              _this3.requestForm.companys = [];

              _this3.requestForm.companys.push({});

              _this3.companiesCount = 1;
              _this3.requestForm.bank_accounts = [];

              _this3.requestForm.bank_accounts.push({});

              _this3.bank_accountCount = 1;
              _this3.requestForm.bank_loans = [];

              _this3.requestForm.bank_loans.push({});

              _this3.bank_loansCount = 1;
              _this3.requestForm.factorings = [];

              _this3.requestForm.factorings.push({});

              _this3.factoringsCount = 1;
              _this3.requestForm.suppliers = [];

              _this3.requestForm.suppliers.push({});

              _this3.suppliersCount = 1;
              _this3.requestForm.clients = [];

              _this3.requestForm.clients.push({});

              _this3.clientsCount = 1;
              return;
            }

            if (_this3.requestForm.legal_representatives.length == 0) {
              _this3.requestForm.legal_representatives.push({});
            } else {
              if (_this3.requestForm.legal_representatives[0].date_of_birth) {
                _this3.requestForm.legal_representatives[0].date_of_birth = _this3.requestForm.legal_representatives[0].date_of_birth + '';

                var datestr = _this3.requestForm.legal_representatives[0].date_of_birth.substring(0, 10).split('-');

                datestr = datestr[1] + '-' + datestr[2] + '-' + datestr[0];
                _this3.requestForm.legal_representatives[0].date_of_birth = new Date(datestr);
                _this3.model = {
                  year: _this3.requestForm.legal_representatives[0].date_of_birth.getFullYear(),
                  month: _this3.requestForm.legal_representatives[0].date_of_birth.getMonth() + 1,
                  day: _this3.requestForm.legal_representatives[0].date_of_birth.getDate()
                };
              }
            }

            if (_this3.requestForm.members.length == 0) {
              _this3.requestForm.members.push({});
            }

            _this3.membersCount = _this3.requestForm.members.length;

            if (_this3.requestForm.director_boards.length == 0) {
              _this3.requestForm.director_boards.push({});
            }

            _this3.directorsCount = _this3.requestForm.director_boards.length;

            if (_this3.requestForm.companys.length == 0) {
              _this3.requestForm.companys.push({});
            }

            _this3.companiesCount = _this3.requestForm.companys.length;

            if (_this3.requestForm.bank_accounts.length == 0) {
              _this3.requestForm.bank_accounts.push({});
            }

            _this3.bank_accountCount = _this3.requestForm.bank_accounts.length;

            if (_this3.requestForm.bank_loans.length == 0) {
              _this3.requestForm.bank_loans.push({});
            }

            _this3.bank_loansCount = _this3.requestForm.bank_loans.length;

            if (_this3.requestForm.factorings.length == 0) {
              _this3.requestForm.factorings.push({});
            }

            _this3.factoringsCount = _this3.requestForm.factorings.length;

            if (_this3.requestForm.suppliers.length == 0) {
              _this3.requestForm.suppliers.push({});
            }

            _this3.suppliersCount = _this3.requestForm.suppliers.length;

            if (_this3.requestForm.clients.length == 0) {
              _this3.requestForm.clients.push({});
            }

            _this3.clientsCount = _this3.requestForm.clients.length;
          }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(function (err) {
            //this.notifier.notify('error', 'Ocurrio un problema con la eliminacion' + err);
            console.log(err);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])();
          })).subscribe(function (x) {
            _this3.spinner.hide();
          });
        }
      }, {
        key: "getCountries",
        value: function getCountries() {
          var _this4 = this;

          this.serviciosAuxiliares.getCountries().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (response) {
            _this4.countries = response;
          })).subscribe();
        }
      }, {
        key: "returnPreviusPage",
        value: function returnPreviusPage() {
          console.log('RETURN:: ' + this.previousUrl);
          if (this.previousUrl) this.router.navigate([this.previousUrl]);
        }
      }]);

      return SolicitudEmpresaComponent;
    }();

    SolicitudEmpresaComponent.??fac = function SolicitudEmpresaComponent_Factory(t) {
      return new (t || SolicitudEmpresaComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["????directiveInject"](_services_mysql_mysql_service__WEBPACK_IMPORTED_MODULE_2__["MysqlService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["????directiveInject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["????directiveInject"](_services_formularios_individua_solicitud_service__WEBPACK_IMPORTED_MODULE_5__["SolicitudService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["????directiveInject"](_services_helper_service__WEBPACK_IMPORTED_MODULE_6__["AuxService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["????directiveInject"](ngx_spinner__WEBPACK_IMPORTED_MODULE_9__["NgxSpinnerService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["????directiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["????directiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]));
    };

    SolicitudEmpresaComponent.??cmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????defineComponent"]({
      type: SolicitudEmpresaComponent,
      selectors: [["app-solicitud-empresa"]],
      decls: 389,
      vars: 69,
      consts: [[1, "row", "mt-4"], ["bdColor", "rgba(51,51,51,0.8)", "size", "medium", "color", "#759ee0", "type", "ball-scale-multiple"], [2, "font-size", "20px", "color", "#fff"], [1, "col-md-6"], ["src", "/assets/images/logo.png", "alt", "solucredits", "width", "auto", "height", "80%", 1, "ml-5"], [1, "col-sm-12"], [1, "card"], [1, "card-header", 2, "background-color", "#3473da"], [1, "card-title", "mb-0", "text-white"], [1, "form-horizontal"], [1, "card-body"], [1, "card-title"], [1, "row", "form-group", "mt-4", "pl-2"], [1, "col-lg-4", "col-md-4", "col-sm-12"], [1, "custom-control", "custom-radio"], ["type", "radio", "id", "customRadio1", "name", "inputType", "name", "request-credit_type_id", 1, "custom-control-input", 3, "value", "ngModel", "ngModelChange"], ["for", "customRadio1", 1, "custom-control-label", "custom-label"], ["type", "radio", "id", "customRadio2", "name", "inputType", "name", "request-prorroga", 1, "custom-control-input", 3, "value", "ngModel", "ngModelChange"], ["for", "customRadio2", 1, "custom-control-label", "custom-label"], ["type", "radio", "id", "customRadio3", "name", "inputType", "name", "request-ampliacion", 1, "custom-control-input", 3, "value", "ngModel", "ngModelChange"], ["for", "customRadio3", 1, "custom-control-label", "custom-label"], [1, "row", "form-group"], [1, "col-lg-6"], ["for", "inputMonto", 1, "col-sm-12", "custom-label"], ["type", "number", "aria-label", "Monto", "id", "inputMonto", "required", "", "name", "amount", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputDestino", 1, "col-sm-12", "custom-label"], ["type", "text", "aria-label", "Destino", "id", "inputDestino", "required", "", "name", "destination", 1, "form-control", 3, "ngModel", "ngModelChange"], [1, "col-lg-12"], ["for", "inputNombre", 1, "col-sm-12", "custom-label"], ["type", "number", "aria-label", "Plazo", "id", "inputPlazo", "required", "", "name", "month_duration", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputGarantia", 1, "col-sm-12", "custom-label"], [1, "row", "pl-4"], ["type", "radio", "id", "customRadio11", "name", "inputGarantia", 1, "custom-control-input", 3, "value", "ngModel", "ngModelChange"], ["for", "customRadio11", 1, "custom-control-label", "custom-label"], ["type", "radio", "id", "customRadio12", "name", "inputGarantia", 1, "custom-control-input", 3, "value", "ngModel", "ngModelChange"], ["for", "customRadio12", 1, "custom-control-label", "custom-label"], ["type", "radio", "id", "customRadio13", "name", "inputGarantia", 1, "custom-control-input", 3, "value", "ngModel", "ngModelChange"], ["for", "customRadio13", 1, "custom-control-label", "custom-label"], [1, "row", "form-group", "mt-4"], ["for", "inputRazonSocial", 1, "col-sm-12"], ["type", "text", "aria-label", "Nombre propietario", "id", "inputRazonSocial", "required", "", "name", "business_reason", 1, "form-control", 3, "ngModel", "ngModelChange"], [1, "col-lg-8"], ["for", "inputNombreComercial", 1, "col-sm-12", "custom-label"], ["type", "text", "aria-label", "Nombre comercial", "id", "inputNombreComercial", "required", "", "name", "comercial_name", 1, "form-control", 3, "ngModel", "ngModelChange"], [1, "col-lg-4"], ["for", "inputNit", 1, "col-sm-12", "custom-label"], ["type", "text", "maxlength", "13", "minlength", "8", "aria-label", "NIT", "id", "inputNit", "required", "", "name", "nit", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputSector", 1, "col-sm-12", "custom-label"], ["type", "text", "aria-label", "Sector econ\xF3mico", "id", "inputSector", "required", "", "name", "economic_sector", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputDireccion", 1, "col-sm-12", "custom-label"], ["type", "text", "aria-label", "Direccion", "required", "", "name", "address", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputTelefono", 1, "col-sm-12", "custom-label"], ["type", "tel", "aria-label", "Tel\xE9fonos", "required", "", "name", "phones", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputNombreContacto", 1, "col-sm-12", "custom-label"], ["type", "text", "aria-label", "Nombre del cont\xE1cto", "required", "", "name", "contact_comercial_name", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputCargoContacto", 1, "col-sm-12", "custom-label"], ["type", "text", "aria-label", "Nombre del cont\xE1cto", "required", "", "name", "position", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputEmailSolicitarInfo", 1, "col-sm-12", "custom-label"], ["type", "email", "aria-label", "Email para solicitar informacion", "required", "", "name", "records_info_email", 1, "form-control", 3, "ngModel", "ngModelChange"], [1, "col-lg-3"], ["for", "inputNombreSolicitarInfo", 1, "col-sm-12", "custom-label"], ["type", "text", "aria-label", "Nombre para solicitar informacion", "required", "", "name", "records_info_name", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputTelefonoSolicitarInfo", 1, "col-sm-12", "custom-label"], ["type", "tel", "aria-label", "Telefono para solicitar informacion", "required", "", "name", "records_info_phone", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputEmailContabilidad", 1, "col-sm-12", "custom-label"], ["type", "email", "aria-label", "Email", "required", "", "name", "accounting_email", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputNombreContabilidad", 1, "col-sm-12", "custom-label"], ["type", "text", "aria-label", "Nombre", "required", "", "name", "accounting_name", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputTelefonoContabilidad", 1, "col-sm-12", "custom-label"], ["type", "tel", "aria-label", "Telefono de contabilidad", "required", "", "name", "accounting_phone", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputEmailCobros", 1, "col-sm-12", "custom-label"], ["type", "email", "aria-label", "Corre", "required", "", "name", "charges_email", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputNombreCobros", 1, "col-sm-12", "custom-label"], ["type", "text", "aria-label", "Nombre", "required", "", "name", "charges_name", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputTelefonoCobros", 1, "col-sm-12", "custom-label"], ["type", "tel", "aria-label", "Telefono", "required", "", "name", "charges_phone", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputEmailFactura", 1, "col-sm-12", "custom-label"], ["type", "email", "aria-label", "email", "required", "", "name", "bill_send_email", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputNombreFactura", 1, "col-sm-12", "custom-label"], ["type", "text", "aria-label", "Nombre", "required", "", "name", "bill_send_name", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputTelefonoFactura", 1, "col-sm-12", "custom-label"], ["type", "tel", "aria-label", "Telefono", "required", "", "name", "bill_send_phone", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputEmailRetencion", 1, "col-sm-12", "custom-label"], ["type", "email", "aria-label", "Email", "required", "", "name", "isr_email", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputNombreRetencion", 1, "col-sm-12", "custom-label"], ["type", "text", "aria-label", "Nombre", "required", "", "name", "isr_name", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputTelefonoRetencion", 1, "col-sm-12", "custom-label"], ["type", "tel", "aria-label", "Telefono", "required", "", "name", "isr_phone", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputActividadPrincipal", 1, "col-sm-12", "custom-label"], ["type", "text", "aria-label", "Actividad principal", "required", "", "name", "core_business", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputTiempoMercado", 1, "col-sm-12", "custom-label"], ["type", "number", "aria-label", "Tiempo en el mercado", "required", "", "name", "time_in_business", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputVentasAnuales", 1, "col-sm-12", "custom-label"], ["type", "number", "aria-label", "Ventas Anuales", "required", "", "name", "last_year_sales", 1, "form-control", 3, "ngModel", "ngModelChange"], [1, "form-check", "form-check-inline"], ["type", "radio", "id", "agenteIVATrue", "name", "iva_holder", 1, "custom-control-input", 3, "value", "ngModel", "ngModelChange"], ["for", "agenteIVATrue", 1, "custom-control-label", "custom-label"], ["type", "radio", "id", "agenteIVAFlase", "name", "iva_holder", 1, "custom-control-input", 3, "value", "ngModel", "ngModelChange"], ["for", "agenteIVAFlase", 1, "custom-control-label", "custom-label"], ["for", "inputPorcentajeRetencionIVA", 1, "col-sm-12", "custom-label"], ["type", "number", "aria-label", "Porcentaje", "required", "", "name", "iva_percentage", 1, "form-control", 3, "ngModel", "ngModelChange"], ["type", "radio", "id", "agenteISRTrue", "name", "isr_holder", 1, "custom-control-input", 3, "value", "ngModel", "ngModelChange"], ["for", "agenteISRTrue", 1, "custom-control-label", "custom-label"], ["type", "radio", "id", "agenteISRFalse", "name", "isr_holder", 1, "custom-control-input", 3, "value", "ngModel", "ngModelChange"], ["for", "agenteISRFalse", 1, "custom-control-label", "custom-label"], ["for", "inputPorcentajeRetencionISR", 1, "col-sm-12", "custom-label"], ["type", "number", "aria-label", "Porcentaje ISR", "required", "", "name", "isr_percentage", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputWeb", 1, "col-sm-12", "custom-label"], ["type", "text", "aria-label", "URL", "required", "", "name", "web_page", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputGroup", 1, "col-sm-12", "custom-label"], ["type", "radio", "id", "inputGroupTrue", 1, "custom-control-input", 3, "value", "ngModel", "ngModelOptions", "ngModelChange"], ["for", "inputGroupTrue", 1, "custom-control-label", "custom-label"], ["type", "radio", "id", "inputGroupFlase", 1, "custom-control-input", 3, "value", "ngModel", "ngModelOptions", "ngModelChange"], ["for", "inputGroupFlase", 1, "custom-control-label", "custom-label"], [4, "ngFor", "ngForOf"], [1, "row"], [1, "offset-lg-9", "col-lg-3"], [1, "btn", "btn-info", "ml-auto", "btn-color-solucredit", 3, "click"], ["for", "inputNombre", 1, "col-sm-12"], [1, "btn", "btn", "btn-info", "ml-auto", "btn-color-solucredit", 3, "click"], [1, "col-lg-3", "offset-lg-9"], [1, "row", "mb-4"], [1, "text-justify"], [1, "form-group", "m-b-0", "text-right"], [1, "btn", "btn", "btn-info", "ml-auto", "btn-color-solucredit-secondary", 3, "click"], ["type", "text", "aria-label", "RazonSocial", "id", "inputNombreRepresentate", "required", "", "name", "legal-name{i}", 1, "form-control", 3, "ngModel", "ngModelChange"], ["type", "text", "aria-label", "Username", "name", "legal-phone{i}", 1, "form-control", 3, "ngModel", "ngModelChange"], ["type", "text", "maxlength", "13", "minlength", "8", "aria-label", "Username", "name", "legal-nit{i}", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputDireccionParticular", 1, "col-sm-12"], ["type", "text", "aria-label", "Direccion", "name", "legal-address{i}", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputFechaNacimiento", 1, "col-sm-12"], [1, "input-group"], ["placeholder", "yyyy-mm-dd", "name", "dp2", "ngbDatepicker", "", 1, "form-control", 3, "ngModel", "ngModelChange"], ["d3", "ngbDatepicker"], [1, "input-group-append"], ["type", "button", 1, "btn", "btn-outline-secondary", "no-shadow", 3, "click"], [1, "fa", "fa-calendar"], ["type", "text", "aria-label", "Username", 1, "form-control"], ["for", "inputProfesion", 1, "col-sm-12"], ["type", "text", "aria-label", "Username", "name", "legal-profession{i}", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputDPI", 1, "col-sm-12"], ["type", "text", "aria-label", "Username", "name", "legal-dpi{i}", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputExtendido", 1, "col-sm-12"], ["type", "text", "aria-label", "Username", "name", "legal-dpi-extended{i}", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputNacionalidadRepresentante", 1, "col-sm-12"], [1, "form-control", "custom-select", 3, "ngModel", "ngModelOptions", "ngModelChange"], [3, "ngValue", 4, "ngFor", "ngForOf"], ["for", "inputEstadoCivil", 1, "col-sm-12"], ["type", "text", "aria-label", "Username", "name", "legal-civil{i}", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputCargoRepresentante", 1, "col-sm-12"], ["type", "text", "aria-label", "Username", "name", "legal-position{i}", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputVigencia", 1, "col-sm-12"], ["type", "text", "aria-label", "Username", "name", "legal-validiti{i}", 1, "form-control", 3, "ngModel", "ngModelChange"], [3, "ngValue"], ["type", "text", "aria-label", "Username", "name", "member-name{i}", 1, "form-control", 3, "ngModel", "ngModelChange"], ["type", "text", "aria-label", "Username", "name", "member-position{i}", 1, "form-control", 3, "ngModel", "ngModelChange"], ["type", "text", "maxlength", "13", "minlength", "8", "aria-label", "Username", "name", "member-nit{i}", 1, "form-control", 3, "ngModel", "ngModelChange"], ["type", "text", "aria-label", "Username", "name", "member-partici{i}", 1, "form-control", 3, "ngModel", "ngModelChange"], ["class", "col-lg-1 align-self-end", 4, "ngIf"], [1, "col-lg-1", "align-self-end"], [1, "btn", "btn-danger", "btn-raised", "mr-1", 3, "click"], [1, "far", "fa-window-close"], ["type", "text", "aria-label", "Username", "name", "direc-name{i}", 1, "form-control", 3, "ngModel", "ngModelChange"], ["type", "text", "aria-label", "Username", "name", "direc-position{i}", 1, "form-control", 3, "ngModel", "ngModelChange"], ["type", "text", "maxlength", "13", "minlength", "8", "aria-label", "Username", "name", "direc-nit{i}", 1, "form-control", 3, "ngModel", "ngModelChange"], [1, "col-lg-5"], ["type", "text", "aria-label", "Username", "name", "direc-peps{i}", 1, "form-control", 3, "ngModel", "ngModelChange"], [4, "ngIf"], ["type", "text", "aria-label", "Username", "required", "", 1, "form-control", 3, "ngModel", "name", "ngModelChange"], ["for", "inputBanco", 1, "col-sm-12", "custom-label"], ["for", "inputCuenta", 1, "col-sm-12", "custom-label"], ["for", "inputTipo", 1, "col-sm-12", "custom-label"], ["for", "inputMoneda", 1, "col-sm-12", "custom-label"], ["type", "text", "aria-label", "Username", "i", "", "required", "", 1, "form-control", 3, "ngModel", "name", "ngModelChange"], ["type", "number", "aria-label", "Username", "required", "", 1, "form-control", 3, "ngModel", "name", "ngModelChange"], [1, "col-lg-2"]],
      template: function SolicitudEmpresaComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div", 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](1, "ngx-spinner", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](2, "p", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](3, "Cargando Informaci\xF3n...");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](4, "div", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](5, "img", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](6, "div", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](7, "h2");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](8, "SOLUCIONES CREDITICIAS S.A.");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](9, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](10, " Avenida Las Am\xE9ricas, 8-42 Zona 13, Edificio Am\xE9ricas 10, Nivel 9, Oficina 902 ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](11, "br");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](12, " Guatemala, Guatemala ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](13, "br");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](14, " PBX.: 2301 4400 ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](15, "div", 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](16, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](17, "div", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](18, "div", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](19, "h3", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](20, "Solicitud Empresarial");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](21, "form", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](22, "div", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](23, "div", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](24, "h4", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](25, "CR\xC9DITO SOLICITADO");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](26, "div", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](27, "div", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](28, "div", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](29, "input", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_Template_input_ngModelChange_29_listener($event) {
            return ctx.requestForm.credit_type_id = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](30, "label", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](31, "Nueva Solicitud");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](32, "div", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](33, "div", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](34, "input", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_Template_input_ngModelChange_34_listener($event) {
            return ctx.requestForm.credit_type_id = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](35, "label", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](36, "Pr\xF3rroga");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](37, "div", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](38, "div", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](39, "input", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_Template_input_ngModelChange_39_listener($event) {
            return ctx.requestForm.credit_type_id = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](40, "label", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](41, "Ampliac\xEDon o modificac\xEDon");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](42, "div", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](43, "div", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](44, "label", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](45, "Monto");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](46, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](47, "input", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_Template_input_ngModelChange_47_listener($event) {
            return ctx.requestForm.amount = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](48, "div", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](49, "label", 25);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](50, "Destino");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](51, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](52, "input", 26);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_Template_input_ngModelChange_52_listener($event) {
            return ctx.requestForm.destination = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](53, "div", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](54, "div", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](55, "label", 28);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](56, "Plazo en meses");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](57, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](58, "input", 29);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_Template_input_ngModelChange_58_listener($event) {
            return ctx.requestForm.month_duration = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](59, "div", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](60, "div", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](61, "label", 30);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](62, "Garant\xEDa");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](63, "div", 31);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](64, "div", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](65, "div", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](66, "input", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_Template_input_ngModelChange_66_listener($event) {
            return ctx.requestForm.warranty_type_id = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](67, "label", 33);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](68, "Hipotecario");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](69, "div", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](70, "div", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](71, "input", 34);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_Template_input_ngModelChange_71_listener($event) {
            return ctx.requestForm.warranty_type_id = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](72, "label", 35);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](73, "Prendario");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](74, "div", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](75, "div", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](76, "input", 36);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_Template_input_ngModelChange_76_listener($event) {
            return ctx.requestForm.warranty_type_id = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](77, "label", 37);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](78, "Fiduciario en Cta. Corriente");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](79, "div", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](80, "div", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](81, "h4", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](82, "DATOS GENERALES DE LA EMPRESA");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](83, "div", 38);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](84, "div", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](85, "label", 39);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](86, "Razon Social");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](87, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](88, "input", 40);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_Template_input_ngModelChange_88_listener($event) {
            return ctx.requestForm.business_reason = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](89, "div", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](90, "div", 41);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](91, "label", 42);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](92, "Nombre comercial de su empresa");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](93, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](94, "input", 43);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_Template_input_ngModelChange_94_listener($event) {
            return ctx.requestForm.comercial_name = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](95, "div", 44);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](96, "label", 45);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](97, "NIT");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](98, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](99, "input", 46);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_Template_input_ngModelChange_99_listener($event) {
            return ctx.requestForm.nit = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](100, "div", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](101, "div", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](102, "label", 47);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](103, "Sector econ\xF3mico");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](104, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](105, "input", 48);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_Template_input_ngModelChange_105_listener($event) {
            return ctx.requestForm.economic_sector = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](106, "div", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](107, "div", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](108, "label", 49);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](109, "Direcci\xF3n");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](110, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](111, "input", 50);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_Template_input_ngModelChange_111_listener($event) {
            return ctx.requestForm.address = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](112, "div", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](113, "div", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](114, "label", 51);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](115, "Tel\xE9fonos");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](116, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](117, "input", 52);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_Template_input_ngModelChange_117_listener($event) {
            return ctx.requestForm.phones = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](118, "div", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](119, "div", 41);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](120, "label", 53);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](121, "Nombre del cont\xE1cto");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](122, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](123, "input", 54);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_Template_input_ngModelChange_123_listener($event) {
            return ctx.requestForm.contact_comercial_name = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](124, "div", 44);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](125, "label", 55);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](126, "Cargo");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](127, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](128, "input", 56);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_Template_input_ngModelChange_128_listener($event) {
            return ctx.requestForm.position = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](129, "div", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](130, "div", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](131, "label", 57);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](132, "Correo electr\xF3nico para solicitar informaci\xF3n para el expediente");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](133, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](134, "input", 58);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_Template_input_ngModelChange_134_listener($event) {
            return ctx.requestForm.records_info_email = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](135, "div", 59);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](136, "label", 60);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](137, "Nombre");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](138, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](139, "input", 61);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_Template_input_ngModelChange_139_listener($event) {
            return ctx.requestForm.records_info_name = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](140, "div", 59);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](141, "label", 62);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](142, "Tel\xE9fono directo");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](143, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](144, "input", 63);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_Template_input_ngModelChange_144_listener($event) {
            return ctx.requestForm.records_info_phone = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](145, "div", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](146, "div", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](147, "label", 64);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](148, "Correo electr\xF3nico de contabilidad");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](149, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](150, "input", 65);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_Template_input_ngModelChange_150_listener($event) {
            return ctx.requestForm.accounting_email = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](151, "div", 59);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](152, "label", 66);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](153, "Nombre");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](154, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](155, "input", 67);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_Template_input_ngModelChange_155_listener($event) {
            return ctx.requestForm.accounting_name = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](156, "div", 59);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](157, "label", 68);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](158, "Tel\xE9fono directo");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](159, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](160, "input", 69);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_Template_input_ngModelChange_160_listener($event) {
            return ctx.requestForm.accounting_phone = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](161, "div", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](162, "div", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](163, "label", 70);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](164, "Correo electr\xF3nico para cobros");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](165, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](166, "input", 71);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_Template_input_ngModelChange_166_listener($event) {
            return ctx.requestForm.charges_email = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](167, "div", 59);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](168, "label", 72);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](169, "Nombre");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](170, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](171, "input", 73);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_Template_input_ngModelChange_171_listener($event) {
            return ctx.requestForm.charges_name = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](172, "div", 59);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](173, "label", 74);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](174, "Tel\xE9fono directo");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](175, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](176, "input", 75);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_Template_input_ngModelChange_176_listener($event) {
            return ctx.requestForm.charges_phone = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](177, "div", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](178, "div", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](179, "label", 76);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](180, "Correo electr\xF3nico para enviar factura");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](181, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](182, "input", 77);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_Template_input_ngModelChange_182_listener($event) {
            return ctx.requestForm.bill_send_email = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](183, "div", 59);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](184, "label", 78);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](185, "Nombre");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](186, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](187, "input", 79);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_Template_input_ngModelChange_187_listener($event) {
            return ctx.requestForm.bill_send_name = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](188, "div", 59);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](189, "label", 80);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](190, "Tel\xE9fono directo");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](191, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](192, "input", 81);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_Template_input_ngModelChange_192_listener($event) {
            return ctx.requestForm.bill_send_phone = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](193, "div", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](194, "div", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](195, "label", 82);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](196, "Correo electr\xF3nico para solicitar retenci\xF3n de ISR");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](197, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](198, "input", 83);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_Template_input_ngModelChange_198_listener($event) {
            return ctx.requestForm.isr_email = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](199, "div", 59);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](200, "label", 84);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](201, "Nombre");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](202, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](203, "input", 85);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_Template_input_ngModelChange_203_listener($event) {
            return ctx.requestForm.isr_name = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](204, "div", 59);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](205, "label", 86);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](206, "Tel\xE9fono directo");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](207, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](208, "input", 87);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_Template_input_ngModelChange_208_listener($event) {
            return ctx.requestForm.isr_phone = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](209, "div", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](210, "div", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](211, "label", 88);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](212, "Actividad principal");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](213, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](214, "input", 89);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_Template_input_ngModelChange_214_listener($event) {
            return ctx.requestForm.core_business = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](215, "div", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](216, "div", 41);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](217, "label", 90);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](218, "Tiempo en el mercado");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](219, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](220, "input", 91);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_Template_input_ngModelChange_220_listener($event) {
            return ctx.requestForm.time_in_business = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](221, "div", 44);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](222, "label", 92);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](223, "Ventas anuales \xFAltimo a\xF1o");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](224, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](225, "input", 93);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_Template_input_ngModelChange_225_listener($event) {
            return ctx.requestForm.last_year_sales = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](226, "div", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](227, "div", 59);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](228, "label", 28);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](229, "Agente retenedor de IVA");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](230, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](231, "div", 94);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](232, "div", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](233, "input", 95);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_Template_input_ngModelChange_233_listener($event) {
            return ctx.requestForm.iva_holder = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](234, "label", 96);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](235, "Si");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](236, "div", 94);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](237, "div", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](238, "input", 97);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_Template_input_ngModelChange_238_listener($event) {
            return ctx.requestForm.iva_holder = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](239, "label", 98);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](240, "No");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](241, "div", 59);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](242, "label", 99);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](243, "Porcentaje de retenci\xF3n IVA");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](244, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](245, "input", 100);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_Template_input_ngModelChange_245_listener($event) {
            return ctx.requestForm.iva_percentage = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](246, "div", 59);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](247, "label", 28);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](248, "Agente retenedor de ISR");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](249, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](250, "div", 94);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](251, "div", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](252, "input", 101);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_Template_input_ngModelChange_252_listener($event) {
            return ctx.requestForm.isr_holder = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](253, "label", 102);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](254, "Si");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](255, "div", 94);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](256, "div", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](257, "input", 103);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_Template_input_ngModelChange_257_listener($event) {
            return ctx.requestForm.isr_holder = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](258, "label", 104);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](259, "No");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](260, "div", 59);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](261, "label", 105);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](262, "Porcentaje de retenci\xF3n ISR");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](263, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](264, "input", 106);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_Template_input_ngModelChange_264_listener($event) {
            return ctx.requestForm.isr_percentage = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](265, "div", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](266, "div", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](267, "label", 107);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](268, "P\xE1gina Web");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](269, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](270, "input", 108);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_Template_input_ngModelChange_270_listener($event) {
            return ctx.requestForm.web_page = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](271, "div", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](272, "div", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](273, "label", 109);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](274, "\xBFPertenece a un grupo de empresas?");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](275, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](276, "div", 94);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](277, "div", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](278, "input", 110);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_Template_input_ngModelChange_278_listener($event) {
            return ctx.requestForm.holding = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](279, "label", 111);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](280, "Si");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](281, "div", 94);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](282, "div", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](283, "input", 112);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudEmpresaComponent_Template_input_ngModelChange_283_listener($event) {
            return ctx.requestForm.holding = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](284, "label", 113);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](285, "No");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](286, "div", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](287, SolicitudEmpresaComponent_div_287_Template, 80, 15, "div", 114);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](288, "div", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](289, "div", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](290, "h4", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](291, "Nombre de los socios");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](292, SolicitudEmpresaComponent_div_292_Template, 32, 9, "div", 114);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](293, "div", 115);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](294, "div", 116);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](295, "label", 28);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](296, "button", 117);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function SolicitudEmpresaComponent_Template_button_click_296_listener() {
            return ctx.agregarSocio();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](297, "Agregar otra socio");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](298, "div", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](299, "div", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](300, "h4", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](301, "Junta directiva");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](302, SolicitudEmpresaComponent_div_302_Template, 24, 5, "div", 114);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](303, "div", 115);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](304, "div", 116);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](305, "label", 118);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](306, "button", 119);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function SolicitudEmpresaComponent_Template_button_click_306_listener() {
            return ctx.agregarDirectiva();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](307, "Agregar");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](308, "div", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](309, "div", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](310, "h4", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](311, "Empresas del grupo / holding");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](312, SolicitudEmpresaComponent_div_312_Template, 2, 1, "div", 114);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](313, "div", 115);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](314, "div", 116);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](315, "label", 118);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](316, "button", 119);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function SolicitudEmpresaComponent_Template_button_click_316_listener() {
            return ctx.agregarEmpresa();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](317, "Agregar otra empresa");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](318, "div", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](319, "div", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](320, "h4", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](321, "Cuentas bancarias de la empresa ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](322, SolicitudEmpresaComponent_div_322_Template, 2, 1, "div", 114);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](323, "div", 115);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](324, "div", 120);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](325, "button", 119);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function SolicitudEmpresaComponent_Template_button_click_325_listener() {
            return ctx.agregarCuenta();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](326, "Agregar Cuenta");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](327, "div", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](328, "div", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](329, "h4", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](330, "Pr\xE9stamos bancarios");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](331, SolicitudEmpresaComponent_div_331_Template, 2, 1, "div", 114);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](332, "div", 115);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](333, "div", 116);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](334, "button", 119);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function SolicitudEmpresaComponent_Template_button_click_334_listener() {
            return ctx.agregarPrestamo();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](335, "Agregar");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](336, "div", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](337, "div", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](338, "h4", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](339, "Descuento de documentos (Factoraje)");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](340, "div", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](341, SolicitudEmpresaComponent_div_341_Template, 2, 1, "div", 114);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](342, "div", 115);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](343, "div", 116);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](344, "button", 119);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function SolicitudEmpresaComponent_Template_button_click_344_listener() {
            return ctx.agregarDescuento();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](345, "Agregar");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](346, "div", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](347, "div", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](348, "h4", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](349, "Referencias comerciales principales proveedores");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](350, SolicitudEmpresaComponent_div_350_Template, 2, 1, "div", 114);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](351, "div", 115);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](352, "div", 116);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](353, "button", 119);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function SolicitudEmpresaComponent_Template_button_click_353_listener() {
            return ctx.agregarProveedor();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](354, "Agregar");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](355, "div", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](356, "div", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](357, "h4", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](358, "Principales clientes");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](359, SolicitudEmpresaComponent_div_359_Template, 2, 1, "div", 114);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](360, "div", 115);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](361, "div", 116);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](362, "button", 119);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function SolicitudEmpresaComponent_Template_button_click_362_listener() {
            return ctx.agregarCliente();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](363, "Agregar");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](364, "div", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](365, "div", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](366, "div", 121);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](367, "div", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](368, "p", 122);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](369, " Declaro que los datos y cifras anotadas anteriormente son ciertas, dejando a criterio de SOLUCIONES CREDITICIAS, S.A. la confirmaci\xF3n de la informaci\xF3n, por los medios que considere convenientes. ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](370, "b");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](371, "Conozco las consecuencias legales en caso no ser cierto y veraz lo declarado.");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](372, "div", 121);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](373, "div", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](374, "p", 122);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](375, " Autorizo voluntariamente que la informaci\xF3n recopilada y/o proporcionada por entidades p\xFAblicas o privadas y la generada de relaciones contractuales, crediticias o comerciales, sea reportada a centrales de riesgo o bur\xF3s de cr\xE9dito para ser tratada, almacenada o transferida; y autorizo expresamente a las entidades que prestan servicios de informaci\xF3n, centrales de riesgo y bur\xF3s de cr\xE9dito, a recopilar, difundir o comercializar reportes o estudios que contengan informaci\xF3n sobre mi persona y mi representada. ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](376, "div", 121);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](377, "div", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](378, "p", 122);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](379, " As\xED mismo autorizo a Soluciones Crediticias, para que pueda realizar consultas las veces que sean necesarias, durante la vigencia de la relaci\xF3n financiera. ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](380, "div", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](381, "div", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](382, "div", 123);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](383, "button", 117);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function SolicitudEmpresaComponent_Template_button_click_383_listener() {
            return ctx.onSubmitComplete();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](384, "Guardar y marcar como completado");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](385, "button", 119);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function SolicitudEmpresaComponent_Template_button_click_385_listener() {
            return ctx.onSubmit();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](386, "Guardar");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](387, "button", 124);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function SolicitudEmpresaComponent_Template_button_click_387_listener() {
            return ctx.returnPreviusPage();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](388, "Regresar");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](29);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("value", ctx.valuesType[0])("ngModel", ctx.requestForm.credit_type_id);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("value", ctx.valuesType[1])("ngModel", ctx.requestForm.credit_type_id);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("value", ctx.valuesType[2])("ngModel", ctx.requestForm.credit_type_id);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.requestForm.amount);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.requestForm.destination);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.requestForm.month_duration);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("value", ctx.valuesWarranty[0])("ngModel", ctx.requestForm.warranty_type_id);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("value", ctx.valuesWarranty[1])("ngModel", ctx.requestForm.warranty_type_id);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("value", ctx.valuesWarranty[2])("ngModel", ctx.requestForm.warranty_type_id);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](12);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.requestForm.business_reason);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.requestForm.comercial_name);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.requestForm.nit);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.requestForm.economic_sector);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.requestForm.address);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.requestForm.phones);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.requestForm.contact_comercial_name);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.requestForm.position);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.requestForm.records_info_email);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.requestForm.records_info_name);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.requestForm.records_info_phone);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.requestForm.accounting_email);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.requestForm.accounting_name);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.requestForm.accounting_phone);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.requestForm.charges_email);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.requestForm.charges_name);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.requestForm.charges_phone);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.requestForm.bill_send_email);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.requestForm.bill_send_name);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.requestForm.bill_send_phone);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.requestForm.isr_email);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.requestForm.isr_name);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.requestForm.isr_phone);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.requestForm.core_business);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.requestForm.time_in_business);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.requestForm.last_year_sales);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("value", ctx.isIVA[0])("ngModel", ctx.requestForm.iva_holder);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("value", ctx.isIVA[1])("ngModel", ctx.requestForm.iva_holder);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.requestForm.iva_percentage);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("value", ctx.isISR[0])("ngModel", ctx.requestForm.isr_holder);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("value", ctx.isISR[1])("ngModel", ctx.requestForm.isr_holder);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.requestForm.isr_percentage);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.requestForm.web_page);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("value", ctx.isISR[0])("ngModel", ctx.requestForm.holding)("ngModelOptions", _angular_core__WEBPACK_IMPORTED_MODULE_0__["????pureFunction0"](67, _c0));

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("value", ctx.isISR[1])("ngModel", ctx.requestForm.holding)("ngModelOptions", _angular_core__WEBPACK_IMPORTED_MODULE_0__["????pureFunction0"](68, _c0));

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngForOf", ctx.requestForm.legal_representatives);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngForOf", ctx.requestForm.members);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngForOf", ctx.requestForm.director_boards);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngForOf", ctx.requestForm.companys);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngForOf", ctx.requestForm.bank_accounts);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](9);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngForOf", ctx.requestForm.bank_loans);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngForOf", ctx.requestForm.factorings);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](9);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngForOf", ctx.requestForm.suppliers);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](9);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngForOf", ctx.requestForm.clients);
        }
      },
      directives: [ngx_spinner__WEBPACK_IMPORTED_MODULE_9__["NgxSpinnerComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["??angular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgForm"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["RadioControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgModel"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NumberValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["RequiredValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["MaxLengthValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["MinLengthValidator"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["NgForOf"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_11__["NgbInputDatepicker"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["SelectControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgSelectOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["??angular_packages_forms_forms_x"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["NgIf"]],
      styles: [".btn-color-solucredit[_ngcontent-%COMP%] {\r\n    background-color: #2061C4;\r\n    color: white;\r\n}\r\n\r\n.btn-color-solucredit-secondary[_ngcontent-%COMP%] {\r\n    background-color: #6C6C6C;\r\n    color: white;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZm9ybXMvZW1wcmVzYS9zb2xpY2l0dWQtZW1wcmVzYS9zb2xpY2l0dWQtZW1wcmVzYS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0kseUJBQXlCO0lBQ3pCLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSx5QkFBeUI7SUFDekIsWUFBWTtBQUNoQiIsImZpbGUiOiJzcmMvYXBwL2Zvcm1zL2VtcHJlc2Evc29saWNpdHVkLWVtcHJlc2Evc29saWNpdHVkLWVtcHJlc2EuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5idG4tY29sb3Itc29sdWNyZWRpdCB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjA2MUM0O1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG59XHJcblxyXG4uYnRuLWNvbG9yLXNvbHVjcmVkaXQtc2Vjb25kYXJ5IHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICM2QzZDNkM7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbn0iXX0= */"]
    });
    /*@__PURE__*/

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["??setClassMetadata"](SolicitudEmpresaComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
          selector: 'app-solicitud-empresa',
          templateUrl: './solicitud-empresa.component.html',
          styleUrls: ['./solicitud-empresa.component.css']
        }]
      }], function () {
        return [{
          type: _services_mysql_mysql_service__WEBPACK_IMPORTED_MODULE_2__["MysqlService"]
        }, {
          type: ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"]
        }, {
          type: _services_formularios_individua_solicitud_service__WEBPACK_IMPORTED_MODULE_5__["SolicitudService"]
        }, {
          type: _services_helper_service__WEBPACK_IMPORTED_MODULE_6__["AuxService"]
        }, {
          type: ngx_spinner__WEBPACK_IMPORTED_MODULE_9__["NgxSpinnerService"]
        }, {
          type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]
        }, {
          type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]
        }];
      }, null);
    })();
    /***/

  },

  /***/
  "./src/app/forms/empresa/solicitud-empresa/solicitud-empresa.module.ts":
  /*!*****************************************************************************!*\
    !*** ./src/app/forms/empresa/solicitud-empresa/solicitud-empresa.module.ts ***!
    \*****************************************************************************/

  /*! exports provided: SolicitudEmpresaModule */

  /***/
  function srcAppFormsEmpresaSolicitudEmpresaSolicitudEmpresaModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SolicitudEmpresaModule", function () {
      return SolicitudEmpresaModule;
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


    var _solicitud_empresa_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./solicitud-empresa.component */
    "./src/app/forms/empresa/solicitud-empresa/solicitud-empresa.component.ts");
    /* harmony import */


    var ngx_spinner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ngx-spinner */
    "./node_modules/ngx-spinner/__ivy_ngcc__/fesm2015/ngx-spinner.js");

    var routes = [{
      path: '',
      data: {
        title: 'Solicitud para empresa',
        urls: [{
          title: 'Clientes',
          url: '/list-customer'
        }, {
          title: 'clientes'
        }]
      },
      component: _solicitud_empresa_component__WEBPACK_IMPORTED_MODULE_5__["SolicitudEmpresaComponent"]
    }, {
      path: 'cliente/:idsolicitud',
      data: {
        title: 'cliente',
        urls: [{
          title: 'Mi perfil',
          url: '/my-profile'
        }, {
          title: 'Mi Perfil'
        }]
      },
      component: _solicitud_empresa_component__WEBPACK_IMPORTED_MODULE_5__["SolicitudEmpresaComponent"]
    }];

    var SolicitudEmpresaModule = function SolicitudEmpresaModule() {
      _classCallCheck(this, SolicitudEmpresaModule);
    };

    SolicitudEmpresaModule.??mod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????defineNgModule"]({
      type: SolicitudEmpresaModule
    });
    SolicitudEmpresaModule.??inj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????defineInjector"]({
      factory: function SolicitudEmpresaModule_Factory(t) {
        return new (t || SolicitudEmpresaModule)();
      },
      imports: [[_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes), _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModule"], ngx_spinner__WEBPACK_IMPORTED_MODULE_6__["NgxSpinnerModule"]]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["????setNgModuleScope"](SolicitudEmpresaModule, {
        declarations: [_solicitud_empresa_component__WEBPACK_IMPORTED_MODULE_5__["SolicitudEmpresaComponent"]],
        imports: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModule"], ngx_spinner__WEBPACK_IMPORTED_MODULE_6__["NgxSpinnerModule"]]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["??setClassMetadata"](SolicitudEmpresaModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
          imports: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes), _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModule"], ngx_spinner__WEBPACK_IMPORTED_MODULE_6__["NgxSpinnerModule"]],
          declarations: [_solicitud_empresa_component__WEBPACK_IMPORTED_MODULE_5__["SolicitudEmpresaComponent"]]
        }]
      }], null, null);
    })();
    /***/

  },

  /***/
  "./src/app/services/helper.service.ts":
  /*!********************************************!*\
    !*** ./src/app/services/helper.service.ts ***!
    \********************************************/

  /*! exports provided: AuxService */

  /***/
  function srcAppServicesHelperServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AuxService", function () {
      return AuxService;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/common/http */
    "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
    /* harmony import */


    var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! src/environments/environment */
    "./src/environments/environment.ts");
    /* harmony import */


    var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! rxjs/operators */
    "./node_modules/rxjs/_esm2015/operators/index.js");

    var httpOptions = {
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
        'Content-Type': 'application/json'
      }),
      responseType: 'json',
      //withCredentials: true as const,  
      observe: 'response'
    };

    var AuxService =
    /*#__PURE__*/
    function () {
      function AuxService(http) {
        _classCallCheck(this, AuxService);

        this.http = http;
      }

      _createClass(AuxService, [{
        key: "getCountries",
        value: function getCountries() {
          var uri = "".concat(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].urlgetCountries);
          return this.http.get(uri).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            return response.data;
          }));
        }
      }]);

      return AuxService;
    }();

    AuxService.??fac = function AuxService_Factory(t) {
      return new (t || AuxService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["????inject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]));
    };

    AuxService.??prov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????defineInjectable"]({
      token: AuxService,
      factory: AuxService.??fac,
      providedIn: 'root'
    });
    /*@__PURE__*/

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["??setClassMetadata"](AuxService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
          providedIn: 'root'
        }]
      }], function () {
        return [{
          type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]
        }];
      }, null);
    })();
    /***/

  }
}]);
//# sourceMappingURL=forms-empresa-solicitud-empresa-solicitud-empresa-module-es5.js.map