(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["forms-empresa-perfil-empresa-perfil-empresa-module"],{

/***/ "./src/app/forms/empresa/perfil-empresa/perfil-empresa.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/forms/empresa/perfil-empresa/perfil-empresa.component.ts ***!
  \**************************************************************************/
/*! exports provided: PerfilEmpresaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PerfilEmpresaComponent", function() { return PerfilEmpresaComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _services_mysql_mysql_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../services/mysql/mysql.service */ "./src/app/services/mysql/mysql.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/__ivy_ngcc__/fesm2015/ngx-toastr.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _services_formularios_empresa_perfil_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/formularios/empresa/perfil.service */ "./src/app/services/formularios/empresa/perfil.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/__ivy_ngcc__/fesm2015/ngx-spinner.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");

















function PerfilEmpresaComponent_div_33_div_1_div_22_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????getCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](1, "button", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function PerfilEmpresaComponent_div_33_div_1_div_22_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r9); const i_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"](2).index; const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"](); return ctx_r7.quitarSocio(i_r4); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](2, "i", 98);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
} }
function PerfilEmpresaComponent_div_33_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????getCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](1, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](2, "div", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](3, "label", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](4, "Nombre completo");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](5, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](6, "input", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_div_33_div_1_Template_input_ngModelChange_6_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r12); const asso_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit; return asso_r3.name = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](7, "div", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](8, "label", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](9, "Cargo que desempe\u00F1a");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](10, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](11, "input", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_div_33_div_1_Template_input_ngModelChange_11_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r12); const asso_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit; return asso_r3.position = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](12, "div", 93);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](13, "label", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](14, "NIT");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](15, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](16, "input", 94);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_div_33_div_1_Template_input_ngModelChange_16_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r12); const asso_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit; return asso_r3.nit = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](17, "div", 93);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](18, "label", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](19, "% de participaci\u00F3n accionaria");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](20, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](21, "input", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_div_33_div_1_Template_input_ngModelChange_21_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r12); const asso_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit; return asso_r3.shareholding = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](22, PerfilEmpresaComponent_div_33_div_1_div_22_Template, 3, 0, "div", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
} if (rf & 2) {
    const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]();
    const i_r4 = ctx_r19.index;
    const asso_r3 = ctx_r19.$implicit;
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "asso-name", i_r4, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", asso_r3.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "asso-position", i_r4, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", asso_r3.position);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "asso-nit", i_r4, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", asso_r3.nit);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "asso-share-holding", i_r4, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", asso_r3.shareholding);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngIf", asso_r3.associate_id || ctx_r5.associatesCount > 1);
} }
function PerfilEmpresaComponent_div_33_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](1, PerfilEmpresaComponent_div_33_div_1_Template, 23, 9, "div", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
} if (rf & 2) {
    const asso_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngIf", asso_r3.remove != true);
} }
function PerfilEmpresaComponent_div_47_div_1_hr_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](0, "hr", 100);
} }
function PerfilEmpresaComponent_div_47_div_1_div_29_Template(rf, ctx) { if (rf & 1) {
    const _r27 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????getCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](1, "button", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function PerfilEmpresaComponent_div_47_div_1_div_29_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r27); const i_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"](2).index; const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"](); return ctx_r25.quitarEmpresa(i_r21); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](2, "i", 98);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
} }
function PerfilEmpresaComponent_div_47_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????getCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](1, PerfilEmpresaComponent_div_47_div_1_hr_1_Template, 1, 0, "hr", 99);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](2, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](3, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](4, "label", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](5, "Nombre comercial");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](6, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](7, "input", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_div_47_div_1_Template_input_ngModelChange_7_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r30); const company_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit; return company_r20.comercial_name = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](8, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](9, "label", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](10, "Relaci\u00F3n Afiliada, Subsidiaria, Holding");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](11, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](12, "input", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_div_47_div_1_Template_input_ngModelChange_12_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r30); const company_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit; return company_r20.relation = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](13, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](14, "label", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](15, "NIT");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](16, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](17, "input", 94);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_div_47_div_1_Template_input_ngModelChange_17_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r30); const company_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit; return company_r20.nit = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](18, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](19, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](20, "label", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](21, "Pa\u00EDs de domicilio");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](22, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](23, "input", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_div_47_div_1_Template_input_ngModelChange_23_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r30); const company_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit; return company_r20.country = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](24, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](25, "label", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](26, "Actividad comercial");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](27, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](28, "input", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_div_47_div_1_Template_input_ngModelChange_28_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r30); const company_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit; return company_r20.business_activity = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](29, PerfilEmpresaComponent_div_47_div_1_div_29_Template, 3, 0, "div", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
} if (rf & 2) {
    const ctx_r39 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]();
    const i_r21 = ctx_r39.index;
    const company_r20 = ctx_r39.$implicit;
    const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngIf", i_r21 > 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "company-comercial-name", i_r21, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", company_r20.comercial_name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "company-relation", i_r21, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", company_r20.relation);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "company-nit", i_r21, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", company_r20.nit);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "company-country", i_r21, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", company_r20.country);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "company-businnes", i_r21, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", company_r20.business_activity);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngIf", company_r20.company_id || ctx_r22.companysCount > 1);
} }
function PerfilEmpresaComponent_div_47_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](1, PerfilEmpresaComponent_div_47_div_1_Template, 30, 12, "div", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
} if (rf & 2) {
    const company_r20 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngIf", company_r20.remove != true);
} }
function PerfilEmpresaComponent_div_400_div_1_div_12_Template(rf, ctx) { if (rf & 1) {
    const _r46 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????getCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div", 104);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](1, "button", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function PerfilEmpresaComponent_div_400_div_1_div_12_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r46); const i_r41 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"](2).index; const ctx_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"](); return ctx_r44.quitarOperacion(i_r41); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](2, "i", 98);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
} }
function PerfilEmpresaComponent_div_400_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r49 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????getCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](1, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](2, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](3, "label", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](4, "Pa\u00EDs donde opera");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](5, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](6, "input", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_div_400_div_1_Template_input_ngModelChange_6_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r49); const country_r40 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit; return country_r40.country = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](7, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](8, "label", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](9, "Monto de ventas anuales (Dolares USD)");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](10, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](11, "input", 102);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_div_400_div_1_Template_input_ngModelChange_11_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r49); const country_r40 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit; return country_r40.year_sales = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](12, PerfilEmpresaComponent_div_400_div_1_div_12_Template, 3, 0, "div", 103);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
} if (rf & 2) {
    const ctx_r52 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]();
    const i_r41 = ctx_r52.index;
    const country_r40 = ctx_r52.$implicit;
    const ctx_r42 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "country-country", i_r41, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", country_r40.country);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "country-year-sales", i_r41, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", country_r40.year_sales);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngIf", country_r40.country_operation_id || ctx_r42.countryOperationCount > 1);
} }
function PerfilEmpresaComponent_div_400_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](1, PerfilEmpresaComponent_div_400_div_1_Template, 13, 5, "div", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
} if (rf & 2) {
    const country_r40 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngIf", country_r40.remove != true);
} }
class PerfilEmpresaComponent {
    constructor(mysqlService, toastr, PerfilService, spinner, route, router) {
        //console.log('Constructor de Perfil-Empresa');
        /* this.router.events
         .pipe(filter(event => event instanceof NavigationEnd))
         .subscribe((event: NavigationEnd) => {
           //console.log('prev:', event.url);
           //this.previousUrl = event.url;
           localStorage.setItem('cutomer-previous-url', event.url);
         }); */
        this.mysqlService = mysqlService;
        this.toastr = toastr;
        this.PerfilService = PerfilService;
        this.spinner = spinner;
        this.route = route;
        this.router = router;
        this.profileForm = {};
        this.isforeign = [1, 0];
        this.isforeignpurchase = [1, 0];
        this.countryOperationCount = 0;
        this.companysCount = 0;
        this.associatesCount = 0;
        this.createProfile = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormGroup"]({
            inputNombre: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required]),
            //inputNombrePropietario:new FormControl(),
            //inputCargoPropietario:new FormControl(),
            //inputNitPropietario:new FormControl(),
            Socios: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormArray"]([
                new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormGroup"]({
                    nombre: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](''),
                    cargo: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](''),
                    nit: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](''),
                    porcentaje: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](''),
                })
            ]),
            EmpresasGrupo: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormArray"]([
                new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormGroup"]({
                    nombre: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](''),
                    relacion: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](''),
                    nit: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](''),
                    pais: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](''),
                    actividadComercial: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](''),
                })
            ]),
            inputGGNombre: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](),
            inputGGTiempolaboral: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](),
            inputGFNombre: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](),
            inputGFTiempolaboral: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](),
            inputGRNombre: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](),
            inputGRTiempolaboral: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](),
            inputGPNombre: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](),
            inputGPTiempolaboral: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](),
            inputGONombre: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](),
            inputGOTiempolaboral: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](),
            inputGVNombre: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](),
            inputGVTiempolaboral: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](),
            inputGCNombre: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](),
            inputGCTiempolaboral: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](),
            inputProducto: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](),
            inputMarca: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](),
            inputVentas1: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](),
            inputVentas2: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](),
            inputVentas3: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](),
            inputVentas4: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](),
            inputSegmentoProducto: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](),
            inputCompetidoresProducto: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](),
            inputCanalesProducto: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](),
            inputVentasContado: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](),
            inputVentasLocales: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](),
            inputVentasCredito: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](),
            inputVentasExportacion: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](),
            inputVentasDolaresEuros: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](),
            inputVentasDolaresEurosOrigen: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](),
            inputComprasContado: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](),
            inputComprasLocales: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](),
            inputComprasCredito: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](),
            inputComprasExportacion: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](),
            inputComprasMonedaExtranjera: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](),
            inputComprasMonedaExtranjeraPais: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](),
            PaisOpera: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormArray"]([
                new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormGroup"]({
                    pais: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](''),
                    montoAnual: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](''),
                })
            ]),
        });
        this.EmpresasGrupo = this.createProfile.get('EmpresasGrupo');
        this.PaisOpera = this.createProfile.get('PaisOpera');
        this.Socios = this.createProfile.get('Socios');
    }
    /*   CreateProfile() {
        // console.log(this.createCustomer.value);
        this.mysqlService.CreateUser(this.createProfile.value).subscribe(
          (response) => {
            this.toastr.success('Correo Enviado', 'Enviado!');
            console.log('sucess');
            this.createProfile.reset({});
          },
          (error) => {
            this.toastr.error('Verificar informaci??n del formulario.', 'Oops!');
            console.log('error');
          }
        );
      } */
    onSubmit() {
        console.log(this.createProfile.value);
        let newform = {
            form_type_id: 1,
            comercial_name: this.createProfile.controls.inputNombre.value,
            ceo_name: this.createProfile.controls.inputGGNombre.value,
            ceo_time: this.createProfile.controls.inputGGTiempolaboral.value,
            finance_ceo_name: this.createProfile.controls.inputGFNombre.value,
            finance_ceo_time: this.createProfile.controls.inputGFTiempolaboral.value,
            rh_ceo_name: this.createProfile.controls.inputGRNombre.value,
            rh_ceo_time: this.createProfile.controls.inputGRTiempolaboral.value,
            prod_ceo_name: this.createProfile.controls.inputGPNombre.value,
            prod_ceo_time: this.createProfile.controls.inputGPTiempolaboral.value,
            op_ceo_name: this.createProfile.controls.inputGONombre.value,
            op_ceo_time: this.createProfile.controls.inputGOTiempolaboral.value,
            sales_ceo_name: this.createProfile.controls.inputGVNombre.value,
            sales_ceo_time: this.createProfile.controls.inputGVTiempolaboral.value,
            credit_ceo_name: this.createProfile.controls.inputGCNombre.value,
            credit_ceo_time: this.createProfile.controls.inputGCTiempolaboral.value,
            productions_commerce: this.createProfile.controls.inputProducto.value,
            brands: this.createProfile.controls.inputMarca.value,
            first_quarter: this.createProfile.controls.inputVentas1.value,
            second_quarter: this.createProfile.controls.inputVentas2.value,
            third_quarter: this.createProfile.controls.inputVentas3.value,
            fourth_quarter: this.createProfile.controls.inputVentas4.value,
            product_segment: this.createProfile.controls.inputSegmentoProducto.value,
            competitors: this.createProfile.controls.inputCompetidoresProducto.value,
            distribution_channels: this.createProfile.controls.inputCanalesProducto.value,
            cash_sales: this.createProfile.controls.inputVentasContado.value,
            credit_sales: this.createProfile.controls.inputVentasCredito.value,
            local_sales: this.createProfile.controls.inputVentasLocales.value,
            exports_sales: this.createProfile.controls.inputVentasExportacion.value,
            sales_foreign_currency: this.createProfile.controls.inputVentasDolaresEuros.value,
            sales_foreign_currency_origin: this.createProfile.controls.inputVentasDolaresEurosOrigen.value,
            cash_purchases: this.createProfile.controls.inputComprasContado.value,
            credit_purchases: this.createProfile.controls.inputComprasCredito.value,
            local_purchases: this.createProfile.controls.inputComprasLocales.value,
            exports_purchases: this.createProfile.controls.inputComprasExportacion.value,
            purchases_foreign_currency: this.createProfile.controls.inputComprasMonedaExtranjera.value,
            purchases_foreign_currency_origin: this.createProfile.controls.inputComprasMonedaExtranjeraPais.value,
            associates: this.Socios.value,
            companies: this.EmpresasGrupo.value,
            country_operations: this.PaisOpera.value,
        };
        let suscription = this.PerfilService.saveForm(this.profileForm, this.requestID).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((resp) => {
            this.toastr.success('Guardar', 'Tu progreso fue guardado con ??xito');
            this.profileForm = resp;
            //console.log(resp);
            if (!resp) {
                this.profileForm = {};
                this.profileForm.owner = {};
                this.profileForm.associates = [];
                this.profileForm.associates.push({});
                this.associatesCount = 1;
                this.profileForm.companies = [];
                this.profileForm.companies.push({});
                this.companysCount = 1;
                this.profileForm.country_operations = [];
                this.profileForm.country_operations.push({});
                this.countryOperationCount = 1;
                return;
            }
            if (this.profileForm.associates.length == 0) {
                this.profileForm.associates.push({});
            }
            this.associatesCount = this.profileForm.associates.length;
            if (this.profileForm.companies.length == 0) {
                this.profileForm.companies.push({});
            }
            this.companysCount = this.profileForm.companies.length;
            if (this.profileForm.country_operations.length == 0) {
                this.profileForm.country_operations.push({});
            }
            this.countryOperationCount = this.profileForm.country_operations.length;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])((err) => {
            //this.notifier.notify('error', 'Ocurrio un problema con la eliminacion' + err);
            this.toastr.error('error', 'Tu progreso no fue guardado');
            console.log(err);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])();
        })).subscribe(() => suscription.unsubscribe());
    }
    onSubmitComplete() {
        this.profileForm.finish_date = new Date();
        let suscription = this.PerfilService.saveForm(this.profileForm, this.requestID).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((resp) => {
            this.toastr.success('Guardar', 'Tu progreso fue guardado con ??xito');
            this.profileForm = resp;
            //console.log(resp);
            if (!resp) {
                this.profileForm = {};
                this.profileForm.owner = {};
                this.profileForm.associates = [];
                this.profileForm.associates.push({});
                this.associatesCount = 1;
                this.profileForm.companies = [];
                this.profileForm.companies.push({});
                this.companysCount = 1;
                this.profileForm.country_operations = [];
                this.profileForm.country_operations.push({});
                this.countryOperationCount = 1;
                return;
            }
            if (this.profileForm.associates.length == 0) {
                this.profileForm.associates.push({});
            }
            this.associatesCount = this.profileForm.associates.length;
            if (this.profileForm.companies.length == 0) {
                this.profileForm.companies.push({});
            }
            this.companysCount = this.profileForm.companies.length;
            if (this.profileForm.country_operations.length == 0) {
                this.profileForm.country_operations.push({});
            }
            this.countryOperationCount = this.profileForm.country_operations.length;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])((err) => {
            //this.notifier.notify('error', 'Ocurrio un problema con la eliminacion' + err);
            this.toastr.error('error', 'Tu progreso no fue guardado');
            console.log(err);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])();
        })).subscribe(() => suscription.unsubscribe());
    }
    agregarEmpresa() {
        this.profileForm.companies.push({});
        this.companysCount++;
    }
    quitarEmpresa(i) {
        if (!this.profileForm.companies[i].company_id) {
            this.profileForm.companies = this.profileForm.companies.filter((_, k) => k != i);
        }
        else {
            this.profileForm.companies[i].remove = true;
        }
        this.companysCount--;
        if (this.companysCount == 0) {
            this.agregarEmpresa();
        }
    }
    agregarSocio() {
        this.profileForm.associates.push({});
        this.associatesCount++;
    }
    quitarSocio(i) {
        if (!this.profileForm.associates[i].associate_id) {
            this.profileForm.associates = this.profileForm.associates.filter((_, k) => k != i);
        }
        else {
            this.profileForm.associates[i].remove = true;
        }
        this.associatesCount--;
        if (this.associatesCount == 0) {
            this.agregarSocio();
        }
    }
    agregarOperacion() {
        this.profileForm.country_operations.push({});
        this.countryOperationCount++;
    }
    quitarOperacion(i) {
        if (!this.profileForm.country_operations[i].country_operation_id) {
            this.profileForm.country_operations = this.profileForm.country_operations.filter((_, k) => k != i);
        }
        else {
            this.profileForm.country_operations[i].remove = true;
        }
        this.countryOperationCount--;
        if (this.countryOperationCount == 0) {
            this.agregarOperacion();
        }
    }
    ngOnInit() {
        this.previousUrl = localStorage.getItem('cutomer-previous-url');
        this.requestID = parseInt(this.route.snapshot.params.idsolicitud);
        /* this.sub = this.router.events
          .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
          .subscribe((events: RoutesRecognized[]) => {
            //console.log('previous url', events[0].urlAfterRedirects);
            this.previousUrl = events[0].urlAfterRedirects;
            console.log(this.previousUrl);
            //console.log('current url', events[1].urlAfterRedirects);
            this.sub.unsubscribe();
          }); */
        //console.log(this.route.snapshot.paramMap.get('requestIdSelected'));
        this.spinner.show();
        //console.log('PREVIUS URL:: '+this.previousUrl);
        this.PerfilService.getForm(this.requestID, 1).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((resp) => {
            this.profileForm = resp;
            //console.log(resp);
            if (!resp) {
                this.profileForm = {};
                this.profileForm.owner = {};
                this.profileForm.associates = [];
                this.profileForm.associates.push({});
                this.associatesCount = 1;
                this.profileForm.companies = [];
                this.profileForm.companies.push({});
                this.companysCount = 1;
                this.profileForm.country_operations = [];
                this.profileForm.country_operations.push({});
                this.countryOperationCount = 1;
                return;
            }
            if (this.profileForm.associates.length == 0) {
                this.profileForm.associates.push({});
            }
            this.associatesCount = this.profileForm.associates.length;
            if (this.profileForm.companies.length == 0) {
                this.profileForm.companies.push({});
            }
            this.companysCount = this.profileForm.companies.length;
            if (this.profileForm.country_operations.length == 0) {
                this.profileForm.country_operations.push({});
            }
            this.countryOperationCount = this.profileForm.country_operations.length;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])((err) => {
            //this.notifier.notify('error', 'Ocurrio un problema con la eliminacion' + err);
            console.log(err);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])();
        })).subscribe(x => { this.spinner.hide(); });
    }
    ngAfterViewInit() {
        console.log('EL snapShot.url perfil::');
        console.log(this.route.snapshot.url);
        /*  this.route.snapshot.url[0].path = 'mi perfil';
         this.route.snapshot.data.urls[0].url = `my-profile`; */
        /* if (this.route.snapshot.url.length > 0) {
          
          if (
            this.route.snapshot.url[0].path !== undefined &&
            this.route.snapshot.url[0].path === "cliente"
          ) {
            //this.user_id = this.route.snapshot.params.id;
            this.route.snapshot.data.urls[1].url = `/customer/cliente/${100}`;
          }
        } else {
          console.log('EN EL ELSE DEL ngAfterViewInit');
          /* this.dataCurrentuser = JSON.parse(localStorage.getItem("Usuario"));
          this.user_id = this.dataCurrentuser.customer_id;
        } */
    }
    returnPreviusPage() {
        console.log('RETURN:: ' + this.previousUrl);
        if (this.previousUrl)
            this.router.navigate([this.previousUrl]);
    }
}
PerfilEmpresaComponent.??fac = function PerfilEmpresaComponent_Factory(t) { return new (t || PerfilEmpresaComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["????directiveInject"](_services_mysql_mysql_service__WEBPACK_IMPORTED_MODULE_1__["MysqlService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["????directiveInject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["????directiveInject"](_services_formularios_empresa_perfil_service__WEBPACK_IMPORTED_MODULE_5__["PerfilService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["????directiveInject"](ngx_spinner__WEBPACK_IMPORTED_MODULE_8__["NgxSpinnerService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["????directiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["????directiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"])); };
PerfilEmpresaComponent.??cmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????defineComponent"]({ type: PerfilEmpresaComponent, selectors: [["app-perfil-empresa"]], decls: 415, vars: 46, consts: [[1, "row", "mt-4"], ["bdColor", "rgba(51,51,51,0.8)", "size", "medium", "color", "#759ee0", "type", "ball-scale-multiple"], [2, "font-size", "20px", "color", "#fff"], [1, "col-md-6"], ["src", "/assets/images/logo.png", "alt", "solucredits", "width", "auto", "height", "80%", 1, "ml-5"], [1, "col-sm-12"], [1, "form-horizontal"], [1, "card"], [1, "card-header", 2, "background-color", "#3473da"], [1, "card-title", "mb-0", "text-white"], [1, "card-body"], [1, "row", "form-group"], [1, "col-12"], ["for", "inputNombre", 1, "col-sm-12", "custom-label"], ["type", "text", "name", "comercial-name", 1, "form-control", 3, "ngModel", "ngModelChange"], [1, "card-title"], [4, "ngFor", "ngForOf"], [1, "row"], [1, "offset-lg-9", "col-lg-3"], ["for", "inputNombre", 1, "col-sm-12"], [1, "btn", "btn-info", "ml-auto", "btn-color-solucredit", 3, "click"], [1, "ml-3", "mt-4"], [1, "row", "mb-4"], [1, "col-lg-3", "offset-lg-9"], [1, "row", "mt-5"], [1, "col-lg-3"], [1, "col-lg-5"], [1, "col-lg-4"], [1, "row", "mt-3"], [1, "col-sm-12", 2, "font-weight", "400 !important"], ["type", "text", "name", "ceo-name", 1, "form-control", 3, "ngModel", "ngModelChange"], ["type", "text", "name", "ceo-time", 1, "form-control", 3, "ngModel", "ngModelChange"], ["type", "text", "name", "financial-ceo-name", 1, "form-control", 3, "ngModel", "ngModelChange"], ["type", "text", "name", "financial-ceo-time", 1, "form-control", 3, "ngModel", "ngModelChange"], ["type", "text", "name", "rh-ceo-name", 1, "form-control", 3, "ngModel", "ngModelChange"], ["type", "text", "name", "rh-ceo-time", 1, "form-control", 3, "ngModel", "ngModelChange"], ["type", "text", "name", "prod-ceo-name", 1, "form-control", 3, "ngModel", "ngModelChange"], ["type", "text", "name", "prod-ceo-time", 1, "form-control", 3, "ngModel", "ngModelChange"], ["type", "text", "name", "op_ceo-name", 1, "form-control", 3, "ngModel", "ngModelChange"], ["type", "text", "name", "sales-ceo-name", 1, "form-control", 3, "ngModel", "ngModelChange"], ["type", "text", "name", "sales_ceo-time", 1, "form-control", 3, "ngModel", "ngModelChange"], ["type", "text", "name", "credit-ceo-name", 1, "form-control", 3, "ngModel", "ngModelChange"], ["type", "text", "name", "credit-ceo-time", 1, "form-control", 3, "ngModel", "ngModelChange"], [1, "col-lg-12"], ["for", "inputMoneda", 1, "col-sm-12"], [1, "form-group"], ["rows", "3", "placeholder", "Agregar descripci\u00F3n...", "name", "productions-commerce", 1, "form-control", 3, "ngModel", "ngModelChange"], ["rows", "3", "placeholder", "Agregar descripci\u00F3n...", "name", "prifile-brands", 1, "form-control", 3, "ngModel", "ngModelChange"], [1, "row", "ml-1"], [1, "row", "form-group", "ml-2"], [1, "input-group", "mb-3"], ["type", "number", "name", "first-quarter", 1, "form-control", 3, "ngModel", "ngModelChange"], [1, "input-group-append"], [1, "input-group-text"], ["type", "number", "name", "second_quarter", 1, "form-control", 3, "ngModel", "ngModelChange"], ["type", "number", "name", "third-quarter", 1, "form-control", 3, "ngModel", "ngModelChange"], ["type", "number", "name", "fourth-quarter", 1, "form-control", 3, "ngModel", "ngModelChange"], ["rows", "3", "placeholder", "Agregar descripci\u00F3n...", "name", "product-segment", 1, "form-control", 3, "ngModel", "ngModelChange"], ["rows", "3", "placeholder", "Agregar descripci\u00F3n...", "name", "competitors", 1, "form-control", 3, "ngModel", "ngModelChange"], ["rows", "3", "placeholder", "Agregar descripci\u00F3n...", "name", "market-porcentage", 1, "form-control", 3, "ngModel", "ngModelChange"], ["rows", "3", "placeholder", "Agregar descripci\u00F3n...", "name", "distributions-chaneels", 1, "form-control", 3, "ngModel", "ngModelChange"], [1, "table-responsive"], [1, "table"], ["scope", "col"], ["type", "number", "name", "cash-sales", 1, "form-control", 3, "ngModel", "ngModelChange"], ["type", "number", "name", "credit-sales", 1, "form-control", 3, "ngModel", "ngModelChange"], ["type", "number", "name", "local-sales", 1, "form-control", 3, "ngModel", "ngModelChange"], ["type", "number", "name", "exports-sales", 1, "form-control", 3, "ngModel", "ngModelChange"], [1, "row", "mb-4", "mt-5"], [1, "col-lg-12", "ml-1"], [1, "form-check", "form-check-inline"], [1, "custom-control", "custom-radio"], ["type", "radio", "id", "customControlValidation4", "name", "sales-foreign-currency", 1, "custom-control-input", 3, "value", "ngModel", "ngModelChange"], ["for", "customControlValidation4", 1, "custom-control-label"], ["type", "radio", "id", "customControlValidation5", "name", "sales-foreign-currency", 1, "custom-control-input", 3, "value", "ngModel", "ngModelChange"], ["for", "customControlValidation5", 1, "custom-control-label"], ["rows", "3", "placeholder", "Agregar origen...", "name", "sales-foreign-currency-origin", 1, "form-control", 3, "ngModel", "ngModelChange"], ["type", "number", "name", "cash-purchases", 1, "form-control", 3, "ngModel", "ngModelChange"], ["type", "number", "name", "local-purchases", 1, "form-control", 3, "ngModel", "ngModelChange"], ["type", "number", "name", "credit-purchases", 1, "form-control", 3, "ngModel", "ngModelChange"], ["type", "number", "name", "exports-purchases", 1, "form-control", 3, "ngModel", "ngModelChange"], ["type", "radio", "id", "customControlValidation2", "name", "purchases-foreign-currency", 1, "custom-control-input", 3, "value", "ngModel", "ngModelChange"], ["for", "customControlValidation2", 1, "custom-control-label"], ["type", "radio", "id", "customControlValidation3", "name", "purchases-foreign-currency", 1, "custom-control-input", 3, "value", "ngModel", "ngModelChange"], ["for", "customControlValidation3", 1, "custom-control-label"], [1, "row", "form-group", "ml-2", "mt-3"], ["rows", "3", "placeholder", "Agregar pa\u00EDs de origen de las importaciones o compras...", "name", "purchases-foreign-currency-origin", 1, "form-control", 3, "ngModel", "ngModelChange"], [1, "form-group", "m-b-0", "text-right"], [1, "btn", "btn-dark", "waves-effect", "waves-light", 3, "click"], [4, "ngIf"], [1, "col-lg-4", "col-md-5", "col-sm-12"], ["type", "text", 1, "form-control", 3, "ngModel", "name", "ngModelChange"], [1, "col-lg-3", "col-md-3", "col-sm-12"], [1, "col-lg-2", "col-md-2", "col-sm-12"], ["type", "text", "maxlength", "13", "minlength", "8", 1, "form-control", 3, "ngModel", "name", "ngModelChange"], ["class", "col-lg-1 align-self-end", 4, "ngIf"], [1, "col-lg-1", "align-self-end"], [1, "btn", "btn-danger", "btn-raised", "mr-1", 3, "click"], [1, "far", "fa-window-close"], ["class", "mt-5 mb-5", 4, "ngIf"], [1, "mt-5", "mb-5"], ["type", "text", "aria-label", "Username", "id", "inputNombre", 1, "form-control", 3, "ngModel", "name", "ngModelChange"], ["type", "number", "aria-label", "Username", "id", "inputNombre", 1, "form-control", 3, "ngModel", "name", "ngModelChange"], ["class", "col-lg-4 align-self-end", 4, "ngIf"], [1, "col-lg-4", "align-self-end"]], template: function PerfilEmpresaComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](1, "ngx-spinner", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](2, "p", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](3, "Cargando Informaci\u00F3n...");
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
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](10, " Avenida Las Am\u00E9ricas, 8-42 Zona 13, Edificio Am\u00E9ricas 10, Nivel 9, Oficina 902 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](11, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](12, " Guatemala, Guatemala ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](13, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](14, " PBX.: 2301 4400 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](15, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](16, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](17, "form", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](18, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](19, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](20, "h4", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](21, "Perfil del solicitante");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](22, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](23, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](24, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](25, "label", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](26, "Nombre comercial de la empresa");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](27, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](28, "input", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_Template_input_ngModelChange_28_listener($event) { return ctx.profileForm.comercial_name = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](29, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](30, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](31, "h4", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](32, "Nombre de los socios");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](33, PerfilEmpresaComponent_div_33_Template, 2, 1, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](34, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](35, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](36, "label", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](37, "button", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function PerfilEmpresaComponent_Template_button_click_37_listener() { return ctx.agregarSocio(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](38, "Agregar otra socio");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](39, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](40, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](41, "h4", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](42, "Informe comercial");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](43, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](44, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](45, "h5", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](46, "Empresas que conforman el GRUPO");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](47, PerfilEmpresaComponent_div_47_Template, 2, 1, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](48, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](49, "div", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](50, "label", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](51, "button", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function PerfilEmpresaComponent_Template_button_click_51_listener() { return ctx.agregarEmpresa(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](52, "Agregar Empresa");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](53, "div", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](54, "h5", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](55, "Nombre y tiempo de laborar, de los principales ejecutivos de la empresa");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](56, "div", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](57, "div", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](58, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](59, "Puesto");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](60, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](61, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](62, "Nombre completo");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](63, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](64, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](65, "Tiempo de laborar");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](66, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](67, "div", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](68, "label", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](69, "Gerente general");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](70, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](71, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](72, "input", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_Template_input_ngModelChange_72_listener($event) { return ctx.profileForm.ceo_name = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](73, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](74, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](75, "input", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_Template_input_ngModelChange_75_listener($event) { return ctx.profileForm.ceo_time = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](76, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](77, "div", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](78, "label", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](79, "Gerente financiero");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](80, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](81, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](82, "input", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_Template_input_ngModelChange_82_listener($event) { return ctx.profileForm.finance_ceo_name = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](83, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](84, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](85, "input", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_Template_input_ngModelChange_85_listener($event) { return ctx.profileForm.finance_ceo_time = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](86, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](87, "div", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](88, "label", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](89, "Gerente de RR.HH");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](90, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](91, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](92, "input", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_Template_input_ngModelChange_92_listener($event) { return ctx.profileForm.rh_ceo_name = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](93, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](94, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](95, "input", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_Template_input_ngModelChange_95_listener($event) { return ctx.profileForm.rh_ceo_time = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](96, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](97, "div", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](98, "label", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](99, "Gerente de producci\u00F3n");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](100, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](101, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](102, "input", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_Template_input_ngModelChange_102_listener($event) { return ctx.profileForm.prod_ceo_name = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](103, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](104, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](105, "input", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_Template_input_ngModelChange_105_listener($event) { return ctx.profileForm.prod_ceo_time = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](106, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](107, "div", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](108, "label", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](109, "Gerente de operaciones");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](110, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](111, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](112, "input", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_Template_input_ngModelChange_112_listener($event) { return ctx.profileForm.op_ceo_name = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](113, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](114, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](115, "input", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_Template_input_ngModelChange_115_listener($event) { return ctx.profileForm.op_ceo_time = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](116, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](117, "div", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](118, "label", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](119, "Gerente de ventas");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](120, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](121, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](122, "input", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_Template_input_ngModelChange_122_listener($event) { return ctx.profileForm.sales_ceo_name = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](123, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](124, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](125, "input", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_Template_input_ngModelChange_125_listener($event) { return ctx.profileForm.sales_ceo_time = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](126, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](127, "div", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](128, "label", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](129, "Gerente de cr\u00E9ditos/cobros");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](130, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](131, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](132, "input", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_Template_input_ngModelChange_132_listener($event) { return ctx.profileForm.credit_ceo_name = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](133, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](134, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](135, "input", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_Template_input_ngModelChange_135_listener($event) { return ctx.profileForm.credit_ceo_time = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](136, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](137, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](138, "h4", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](139, "Productos o servicios");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](140, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](141, "div", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](142, "label", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](143, "Principales L\u00EDneas de producci\u00F3n o comercializaci\u00F3n que maneja en el negocio");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](144, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](145, "div", 45);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](146, "textarea", 46);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_Template_textarea_ngModelChange_146_listener($event) { return ctx.profileForm.productions_commerce = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](147, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](148, "div", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](149, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](150, "Mencione el tipo y nombre de las marcas");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](151, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](152, "div", 45);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](153, "textarea", 47);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_Template_textarea_ngModelChange_153_listener($event) { return ctx.profileForm.brands = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](154, "div", 48);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](155, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](156, "Comportamiento c\u00EDclico de las ventas");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](157, "div", 49);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](158, "div", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](159, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](160, "1\u00B0 trimestre");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](161, "div", 50);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](162, "input", 51);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_Template_input_ngModelChange_162_listener($event) { return ctx.profileForm.first_quarter = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](163, "div", 52);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](164, "span", 53);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](165, "%");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](166, "div", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](167, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](168, "2\u00B0 trimestre");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](169, "div", 50);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](170, "input", 54);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_Template_input_ngModelChange_170_listener($event) { return ctx.profileForm.second_quarter = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](171, "div", 52);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](172, "span", 53);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](173, "%");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](174, "div", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](175, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](176, "3\u00B0 trimestre");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](177, "div", 50);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](178, "input", 55);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_Template_input_ngModelChange_178_listener($event) { return ctx.profileForm.third_quarter = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](179, "div", 52);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](180, "span", 53);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](181, "%");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](182, "div", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](183, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](184, "4\u00B0 trimestre");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](185, "div", 50);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](186, "input", 56);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_Template_input_ngModelChange_186_listener($event) { return ctx.profileForm.fourth_quarter = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](187, "div", 52);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](188, "span", 53);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](189, "%");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](190, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](191, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](192, "h4", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](193, "Segmento de mercado");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](194, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](195, "div", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](196, "label", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](197, "Segmento al que va dirigido los productos o servicios");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](198, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](199, "div", 45);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](200, "textarea", 57);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_Template_textarea_ngModelChange_200_listener($event) { return ctx.profileForm.product_segment = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](201, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](202, "div", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](203, "label", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](204, "Principales competidores en el mercado por cada producto o servicio que ofrezca");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](205, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](206, "div", 45);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](207, "textarea", 58);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_Template_textarea_ngModelChange_207_listener($event) { return ctx.profileForm.competitors = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](208, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](209, "div", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](210, "label", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](211, "Porcentaje de participaci\u00F3n en el mercado por cada producto o servicio");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](212, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](213, "div", 45);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](214, "textarea", 59);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_Template_textarea_ngModelChange_214_listener($event) { return ctx.profileForm.market_percentage = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](215, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](216, "div", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](217, "label", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](218, "Canales de distribuci\u00F3n");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](219, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](220, "div", 45);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](221, "textarea", 60);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_Template_textarea_ngModelChange_221_listener($event) { return ctx.profileForm.distribution_channels = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](222, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](223, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](224, "h4", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](225, "Estructura de ventas");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](226, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](227, "div", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](228, "div", 61);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](229, "table", 62);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](230, "thead");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](231, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](232, "th", 63);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](233, "Ventas");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](234, "th", 63);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](235, "Porcentaje");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](236, "th", 63);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](237, "Ventas");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](238, "th", 63);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](239, "Porcentaje");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](240, "tbody");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](241, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](242, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](243, "Contado");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](244, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](245, "div", 50);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](246, "input", 64);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_Template_input_ngModelChange_246_listener($event) { return ctx.profileForm.cash_sales = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](247, "div", 52);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](248, "span", 53);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](249, "%");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](250, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](251, "Locales");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](252, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](253, "div", 50);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](254, "input", 65);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_Template_input_ngModelChange_254_listener($event) { return ctx.profileForm.credit_sales = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](255, "div", 52);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](256, "span", 53);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](257, "%");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](258, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](259, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](260, "Cr\u00E9dito");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](261, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](262, "div", 50);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](263, "input", 66);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_Template_input_ngModelChange_263_listener($event) { return ctx.profileForm.local_sales = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](264, "div", 52);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](265, "span", 53);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](266, "%");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](267, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](268, "Exportaciones");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](269, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](270, "div", 50);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](271, "input", 67);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_Template_input_ngModelChange_271_listener($event) { return ctx.profileForm.exports_sales = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](272, "div", 52);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](273, "span", 53);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](274, "%");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](275, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](276, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](277, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](278, "Total (100%)");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](279, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](280, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](281, "100%");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](282, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](283, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](284, "Total (100%)");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](285, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](286, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](287, "100%");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](288, "div", 68);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](289, "div", 69);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](290, "h5", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](291, "Ingreso en moneda extranjera");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](292, "div", 49);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](293, "div", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](294, " \u00BFEl solicitante genera d\u00F3lares o euros?\u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](295, "div", 70);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](296, "div", 71);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](297, "input", 72);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_Template_input_ngModelChange_297_listener($event) { return ctx.profileForm.sales_foreign_currency = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](298, "label", 73);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](299, "Si");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](300, "div", 70);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](301, "div", 71);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](302, "input", 74);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_Template_input_ngModelChange_302_listener($event) { return ctx.profileForm.sales_foreign_currency = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](303, "label", 75);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](304, "No");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](305, "div", 49);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](306, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](307, "div", 45);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](308, "textarea", 76);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_Template_textarea_ngModelChange_308_listener($event) { return ctx.profileForm.sales_foreign_currency_origin = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](309, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](310, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](311, "h4", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](312, "Estructura de compras");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](313, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](314, "div", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](315, "div", 61);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](316, "table", 62);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](317, "thead");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](318, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](319, "th", 63);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](320, "Ventas");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](321, "th", 63);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](322, "Porcentaje");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](323, "th", 63);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](324, "Ventas");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](325, "th", 63);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](326, "Porcentaje");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](327, "tbody");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](328, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](329, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](330, "Contado");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](331, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](332, "div", 50);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](333, "input", 77);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_Template_input_ngModelChange_333_listener($event) { return ctx.profileForm.cash_purchases = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](334, "div", 52);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](335, "span", 53);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](336, "%");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](337, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](338, "Locales");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](339, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](340, "div", 50);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](341, "input", 78);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_Template_input_ngModelChange_341_listener($event) { return ctx.profileForm.local_purchases = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](342, "div", 52);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](343, "span", 53);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](344, "%");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](345, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](346, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](347, "Cr\u00E9dito");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](348, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](349, "div", 50);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](350, "input", 79);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_Template_input_ngModelChange_350_listener($event) { return ctx.profileForm.credit_purchases = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](351, "div", 52);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](352, "span", 53);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](353, "%");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](354, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](355, "Exportaciones");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](356, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](357, "div", 50);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](358, "input", 80);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_Template_input_ngModelChange_358_listener($event) { return ctx.profileForm.exports_purchases = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](359, "div", 52);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](360, "span", 53);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](361, "%");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](362, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](363, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](364, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](365, "Total (100%)");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](366, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](367, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](368, "100%");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](369, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](370, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](371, "Total (100%)");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](372, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](373, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](374, "100%");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](375, "div", 68);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](376, "div", 69);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](377, "h5", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](378, "Compras en moneda extranjera");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](379, "div", 49);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](380, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](381, " \u00BFEl solicitante realiza compras en moneda extranjera?\u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](382, "div", 70);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](383, "div", 71);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](384, "input", 81);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_Template_input_ngModelChange_384_listener($event) { return ctx.profileForm.purchases_foreign_currency = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](385, "label", 82);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](386, "Si");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](387, "div", 70);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](388, "div", 71);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](389, "input", 83);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_Template_input_ngModelChange_389_listener($event) { return ctx.profileForm.purchases_foreign_currency = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](390, "label", 84);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](391, "No");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](392, "div", 85);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](393, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](394, "div", 45);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](395, "textarea", 86);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function PerfilEmpresaComponent_Template_textarea_ngModelChange_395_listener($event) { return ctx.profileForm.purchases_foreign_currency_origin = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](396, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](397, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](398, "h4", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](399, "Operaciones en otros paises");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](400, PerfilEmpresaComponent_div_400_Template, 2, 1, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](401, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](402, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](403, "label", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](404, "button", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function PerfilEmpresaComponent_Template_button_click_404_listener() { return ctx.agregarOperacion(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](405, "Agregar otra empresa");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](406, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](407, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](408, "div", 87);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](409, "button", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function PerfilEmpresaComponent_Template_button_click_409_listener() { return ctx.onSubmitComplete(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](410, "Marcar como completado");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](411, "button", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function PerfilEmpresaComponent_Template_button_click_411_listener() { return ctx.onSubmit(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](412, "Guardar");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](413, "button", 88);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function PerfilEmpresaComponent_Template_button_click_413_listener() { return ctx.returnPreviusPage(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](414, "Regresar");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.profileForm.comercial_name);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngForOf", ctx.profileForm.associates);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngForOf", ctx.profileForm.companies);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.profileForm.ceo_name);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.profileForm.ceo_time);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.profileForm.finance_ceo_name);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.profileForm.finance_ceo_time);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.profileForm.rh_ceo_name);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.profileForm.rh_ceo_time);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.profileForm.prod_ceo_name);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.profileForm.prod_ceo_time);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.profileForm.op_ceo_name);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.profileForm.op_ceo_time);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.profileForm.sales_ceo_name);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.profileForm.sales_ceo_time);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.profileForm.credit_ceo_name);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.profileForm.credit_ceo_time);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.profileForm.productions_commerce);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.profileForm.brands);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.profileForm.first_quarter);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.profileForm.second_quarter);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.profileForm.third_quarter);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.profileForm.fourth_quarter);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.profileForm.product_segment);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.profileForm.competitors);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.profileForm.market_percentage);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.profileForm.distribution_channels);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.profileForm.cash_sales);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.profileForm.credit_sales);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.profileForm.local_sales);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.profileForm.exports_sales);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("value", ctx.isforeign[0])("ngModel", ctx.profileForm.sales_foreign_currency);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("value", ctx.isforeign[1])("ngModel", ctx.profileForm.sales_foreign_currency);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.profileForm.sales_foreign_currency_origin);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.profileForm.cash_purchases);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.profileForm.local_purchases);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.profileForm.credit_purchases);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.profileForm.exports_purchases);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("value", ctx.isforeignpurchase[0])("ngModel", ctx.profileForm.purchases_foreign_currency);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("value", ctx.isforeignpurchase[1])("ngModel", ctx.profileForm.purchases_foreign_currency);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.profileForm.purchases_foreign_currency_origin);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngForOf", ctx.profileForm.country_operations);
    } }, directives: [ngx_spinner__WEBPACK_IMPORTED_MODULE_8__["NgxSpinnerComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["??angular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgForm"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgModel"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgForOf"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NumberValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["RadioControlValueAccessor"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgIf"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["MaxLengthValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["MinLengthValidator"]], styles: [".btn-color-solucredit[_ngcontent-%COMP%] {\r\n    background-color: #2061C4;\r\n    color: white;\r\n}\r\n\r\n.btn-color-solucredit-secondary[_ngcontent-%COMP%] {\r\n    background-color: #6C6C6C;\r\n    color: white;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZm9ybXMvZW1wcmVzYS9wZXJmaWwtZW1wcmVzYS9wZXJmaWwtZW1wcmVzYS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0kseUJBQXlCO0lBQ3pCLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSx5QkFBeUI7SUFDekIsWUFBWTtBQUNoQiIsImZpbGUiOiJzcmMvYXBwL2Zvcm1zL2VtcHJlc2EvcGVyZmlsLWVtcHJlc2EvcGVyZmlsLWVtcHJlc2EuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5idG4tY29sb3Itc29sdWNyZWRpdCB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjA2MUM0O1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG59XHJcblxyXG4uYnRuLWNvbG9yLXNvbHVjcmVkaXQtc2Vjb25kYXJ5IHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICM2QzZDNkM7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbn0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["??setClassMetadata"](PerfilEmpresaComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-perfil-empresa',
                templateUrl: './perfil-empresa.component.html',
                styleUrls: ['./perfil-empresa.component.css']
            }]
    }], function () { return [{ type: _services_mysql_mysql_service__WEBPACK_IMPORTED_MODULE_1__["MysqlService"] }, { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"] }, { type: _services_formularios_empresa_perfil_service__WEBPACK_IMPORTED_MODULE_5__["PerfilService"] }, { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_8__["NgxSpinnerService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }]; }, null); })();


/***/ }),

/***/ "./src/app/forms/empresa/perfil-empresa/perfil-empresa.module.ts":
/*!***********************************************************************!*\
  !*** ./src/app/forms/empresa/perfil-empresa/perfil-empresa.module.ts ***!
  \***********************************************************************/
/*! exports provided: PerfilEmpresaModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PerfilEmpresaModule", function() { return PerfilEmpresaModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/__ivy_ngcc__/fesm2015/ng-bootstrap.js");
/* harmony import */ var _perfil_empresa_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./perfil-empresa.component */ "./src/app/forms/empresa/perfil-empresa/perfil-empresa.component.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/__ivy_ngcc__/fesm2015/ngx-spinner.js");









const routes = [
    {
        path: '',
        data: {
            title: 'Perfil',
            urls: [
                { title: 'Clientes', url: '/list-customer' },
                { title: 'clientes' },
            ],
        },
        component: _perfil_empresa_component__WEBPACK_IMPORTED_MODULE_5__["PerfilEmpresaComponent"],
    },
    {
        path: 'cliente/:idsolicitud',
        data: {
            title: 'cliente',
            urls: [
                { title: 'Mi perfil', url: '/my-profile' },
                { title: 'Mi Perfil' },
            ],
        },
        component: _perfil_empresa_component__WEBPACK_IMPORTED_MODULE_5__["PerfilEmpresaComponent"],
    }
];
class PerfilEmpresaModule {
}
PerfilEmpresaModule.??mod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????defineNgModule"]({ type: PerfilEmpresaModule });
PerfilEmpresaModule.??inj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????defineInjector"]({ factory: function PerfilEmpresaModule_Factory(t) { return new (t || PerfilEmpresaModule)(); }, imports: [[
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes),
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModule"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_6__["NgxSpinnerModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["????setNgModuleScope"](PerfilEmpresaModule, { declarations: [_perfil_empresa_component__WEBPACK_IMPORTED_MODULE_5__["PerfilEmpresaComponent"]], imports: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
        _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModule"],
        ngx_spinner__WEBPACK_IMPORTED_MODULE_6__["NgxSpinnerModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["??setClassMetadata"](PerfilEmpresaModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
                    _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes),
                    _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModule"],
                    ngx_spinner__WEBPACK_IMPORTED_MODULE_6__["NgxSpinnerModule"]
                ],
                declarations: [_perfil_empresa_component__WEBPACK_IMPORTED_MODULE_5__["PerfilEmpresaComponent"]],
            }]
    }], null, null); })();


/***/ })

}]);
//# sourceMappingURL=forms-empresa-perfil-empresa-perfil-empresa-module-es2015.js.map