(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["forms-individual-solicitud-individual-solicitud-individual-module"],{

/***/ "./src/app/forms/individual/solicitud-individual/solicitud-individual.component.ts":
/*!*****************************************************************************************!*\
  !*** ./src/app/forms/individual/solicitud-individual/solicitud-individual.component.ts ***!
  \*****************************************************************************************/
/*! exports provided: SolicitudIndividualComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SolicitudIndividualComponent", function() { return SolicitudIndividualComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _services_mysql_mysql_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/mysql/mysql.service */ "./src/app/services/mysql/mysql.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/__ivy_ngcc__/fesm2015/ngx-toastr.js");
/* harmony import */ var _services_formularios_individua_solicitud_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/formularios/individua/solicitud.service */ "./src/app/services/formularios/individua/solicitud.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/__ivy_ngcc__/fesm2015/ngx-spinner.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");






//import { AplicationFormDirectorBoard } from '../../models/solicitud-individual.model';











function SolicitudIndividualComponent_div_290_div_1_div_17_Template(rf, ctx) { if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????getCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div", 127);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](1, "button", 128);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function SolicitudIndividualComponent_div_290_div_1_div_17_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r12); const i_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"](2).index; const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"](); return ctx_r10.quitarEmpresa(i_r7); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](2, "i", 129);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
} }
function SolicitudIndividualComponent_div_290_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????getCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](1, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](2, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](3, "label", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](4, "Nombre");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](5, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](6, "input", 125);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_div_290_div_1_Template_input_ngModelChange_6_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r15); const company_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit; return company_r6.name = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](7, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](8, "label", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](9, "Sector al que pertenece");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](10, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](11, "input", 125);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_div_290_div_1_Template_input_ngModelChange_11_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r15); const company_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit; return company_r6.business = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](12, "div", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](13, "label", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](14, "Nombre de la Holding / Pa\u00EDs");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](15, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](16, "input", 125);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_div_290_div_1_Template_input_ngModelChange_16_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r15); const i_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().index; const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"](); return ctx_r18.requestForm.companys[i_r7].holding_name = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](17, SolicitudIndividualComponent_div_290_div_1_div_17_Template, 3, 0, "div", 126);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
} if (rf & 2) {
    const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]();
    const i_r7 = ctx_r20.index;
    const company_r6 = ctx_r20.$implicit;
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "comp-name", i_r7, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", company_r6.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "comp-business", i_r7, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", company_r6.business);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "comp-holding_name", i_r7, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx_r8.requestForm.companys[i_r7].holding_name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngIf", company_r6.company_id || ctx_r8.companiesCount > 1);
} }
function SolicitudIndividualComponent_div_290_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](1, SolicitudIndividualComponent_div_290_div_1_Template, 18, 7, "div", 124);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
} if (rf & 2) {
    const company_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngIf", company_r6.remove != true);
} }
function SolicitudIndividualComponent_div_300_div_1_div_33_Template(rf, ctx) { if (rf & 1) {
    const _r27 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????getCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div", 127);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](1, "button", 128);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function SolicitudIndividualComponent_div_300_div_1_div_33_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r27); const i_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"](2).index; const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"](); return ctx_r25.quitarCuenta(i_r22); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](2, "i", 129);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
} }
function SolicitudIndividualComponent_div_300_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????getCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](1, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](2, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](3, "label", 130);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](4, "Banco");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](5, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](6, "input", 125);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_div_300_div_1_Template_input_ngModelChange_6_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r30); const aco_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit; return aco_r21.bank = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](7, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](8, "label", 131);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](9, "No. Cuenta");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](10, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](11, "input", 125);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_div_300_div_1_Template_input_ngModelChange_11_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r30); const aco_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit; return aco_r21.account_number = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](12, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](13, "label", 132);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](14, "Tipo de Cuenta");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](15, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](16, "input", 125);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_div_300_div_1_Template_input_ngModelChange_16_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r30); const aco_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit; return aco_r21.account_type = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](17, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](18, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](19, "label", 133);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](20, "Moneda");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](21, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](22, "input", 134);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_div_300_div_1_Template_input_ngModelChange_22_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r30); const aco_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit; return aco_r21.currency = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](23, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](24, "label", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](25, "Nombre de la cuenta");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](26, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](27, "input", 125);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_div_300_div_1_Template_input_ngModelChange_27_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r30); const aco_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit; return aco_r21.name_account = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](28, "div", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](29, "label", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](30, "Promedio mensual en Dep\u00F3sitos");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](31, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](32, "input", 135);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_div_300_div_1_Template_input_ngModelChange_32_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r30); const aco_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit; return aco_r21.monthly_average_deposit = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](33, SolicitudIndividualComponent_div_300_div_1_div_33_Template, 3, 0, "div", 126);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
} if (rf & 2) {
    const ctx_r41 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]();
    const i_r22 = ctx_r41.index;
    const aco_r21 = ctx_r41.$implicit;
    const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "aco-banck", i_r22, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", aco_r21.bank);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "aco-accoun-number", i_r22, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", aco_r21.account_number);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "aco-account-type", i_r22, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", aco_r21.account_type);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "aco-currency", i_r22, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", aco_r21.currency);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "aco-name-account", i_r22, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", aco_r21.name_account);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "aco-monthly-avera-depo", i_r22, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", aco_r21.monthly_average_deposit);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngIf", aco_r21.account_id || ctx_r23.bank_accountCount > 1);
} }
function SolicitudIndividualComponent_div_300_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](1, SolicitudIndividualComponent_div_300_div_1_Template, 34, 13, "div", 124);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
} if (rf & 2) {
    const aco_r21 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngIf", aco_r21.remove != true);
} }
function SolicitudIndividualComponent_div_310_div_1_div_33_Template(rf, ctx) { if (rf & 1) {
    const _r48 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????getCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div", 127);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](1, "button", 128);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function SolicitudIndividualComponent_div_310_div_1_div_33_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r48); const i_r43 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"](2).index; const ctx_r46 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"](); return ctx_r46.quitarPrestamo(i_r43); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](2, "i", 129);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
} }
function SolicitudIndividualComponent_div_310_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r51 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????getCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](1, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](2, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](3, "label", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](4, "Banco");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](5, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](6, "input", 125);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_div_310_div_1_Template_input_ngModelChange_6_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r51); const loan_r42 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit; return loan_r42.bank = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](7, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](8, "label", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](9, "No. Pr\u00E9stamo");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](10, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](11, "input", 125);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_div_310_div_1_Template_input_ngModelChange_11_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r51); const loan_r42 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit; return loan_r42.loan_number = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](12, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](13, "label", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](14, "Garant\u00EDa");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](15, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](16, "input", 125);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_div_310_div_1_Template_input_ngModelChange_16_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r51); const loan_r42 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit; return loan_r42.warranty = $event; });
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
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](22, "input", 135);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_div_310_div_1_Template_input_ngModelChange_22_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r51); const loan_r42 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit; return loan_r42.amount_awarded = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](23, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](24, "label", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](25, "Plazo");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](26, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](27, "input", 135);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_div_310_div_1_Template_input_ngModelChange_27_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r51); const loan_r42 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit; return loan_r42.time = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](28, "div", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](29, "label", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](30, "Saldo");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](31, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](32, "input", 135);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_div_310_div_1_Template_input_ngModelChange_32_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r51); const loan_r42 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit; return loan_r42.balance = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](33, SolicitudIndividualComponent_div_310_div_1_div_33_Template, 3, 0, "div", 126);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
} if (rf & 2) {
    const ctx_r62 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]();
    const i_r43 = ctx_r62.index;
    const loan_r42 = ctx_r62.$implicit;
    const ctx_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "loan.bank", i_r43, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", loan_r42.bank);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "loan-loannum", i_r43, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", loan_r42.loan_number);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "loan-warranty", i_r43, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", loan_r42.warranty);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "loan-amount-awarded", i_r43, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", loan_r42.amount_awarded);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "loan-time", i_r43, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", loan_r42.time);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "loan.balance", i_r43, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", loan_r42.balance);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngIf", loan_r42.loan_id || ctx_r44.bank_loansCount > 1);
} }
function SolicitudIndividualComponent_div_310_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](1, SolicitudIndividualComponent_div_310_div_1_Template, 34, 13, "div", 124);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
} if (rf & 2) {
    const loan_r42 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngIf", loan_r42.remove != true);
} }
function SolicitudIndividualComponent_div_321_div_1_div_28_Template(rf, ctx) { if (rf & 1) {
    const _r69 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????getCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div", 127);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](1, "button", 128);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function SolicitudIndividualComponent_div_321_div_1_div_28_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r69); const i_r64 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"](2).index; const ctx_r67 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"](); return ctx_r67.quitarDescuento(i_r64); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](2, "i", 129);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
} }
function SolicitudIndividualComponent_div_321_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r72 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????getCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](1, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](2, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](3, "label", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](4, "Entidad");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](5, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](6, "input", 125);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_div_321_div_1_Template_input_ngModelChange_6_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r72); const fact_r63 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit; return fact_r63.entity = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](7, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](8, "label", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](9, "Garant\u00EDa");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](10, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](11, "input", 125);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_div_321_div_1_Template_input_ngModelChange_11_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r72); const fact_r63 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit; return fact_r63.warranty = $event; });
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
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](17, "input", 135);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_div_321_div_1_Template_input_ngModelChange_17_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r72); const fact_r63 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit; return fact_r63.amount_awarded = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](18, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](19, "label", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](20, "Monto Utilizado");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](21, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](22, "input", 135);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_div_321_div_1_Template_input_ngModelChange_22_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r72); const fact_r63 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit; return fact_r63.amount_used = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](23, "div", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](24, "label", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](25, "Saldo");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](26, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](27, "input", 135);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_div_321_div_1_Template_input_ngModelChange_27_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r72); const fact_r63 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit; return fact_r63.balance = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](28, SolicitudIndividualComponent_div_321_div_1_div_28_Template, 3, 0, "div", 126);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
} if (rf & 2) {
    const ctx_r81 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]();
    const i_r64 = ctx_r81.index;
    const fact_r63 = ctx_r81.$implicit;
    const ctx_r65 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "fact-entity", i_r64, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", fact_r63.entity);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "fac-warranty", i_r64, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", fact_r63.warranty);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "fact-amount-awarded", i_r64, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", fact_r63.amount_awarded);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "fact-amount-used", i_r64, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", fact_r63.amount_used);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "fact-balance", i_r64, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", fact_r63.balance);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngIf", fact_r63.factoring_id || ctx_r65.factoringsCount > 1);
} }
function SolicitudIndividualComponent_div_321_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](1, SolicitudIndividualComponent_div_321_div_1_Template, 29, 11, "div", 124);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
} if (rf & 2) {
    const fact_r63 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngIf", fact_r63.remove != true);
} }
function SolicitudIndividualComponent_div_331_div_1_div_33_Template(rf, ctx) { if (rf & 1) {
    const _r88 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????getCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div", 127);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](1, "button", 128);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function SolicitudIndividualComponent_div_331_div_1_div_33_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r88); const i_r83 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"](2).index; const ctx_r86 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"](); return ctx_r86.quitarProveedor(i_r83); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](2, "i", 129);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
} }
function SolicitudIndividualComponent_div_331_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r91 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????getCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](1, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](2, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](3, "label", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](4, "Nombre");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](5, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](6, "input", 125);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_div_331_div_1_Template_input_ngModelChange_6_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r91); const sup_r82 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit; return sup_r82.name = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](7, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](8, "label", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](9, "Promedio mensual en compras");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](10, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](11, "input", 135);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_div_331_div_1_Template_input_ngModelChange_11_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r91); const sup_r82 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit; return sup_r82.average_monthly_purchase = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](12, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](13, "label", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](14, "Monto m\u00E1ximo de cr\u00E9dito");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](15, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](16, "input", 135);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_div_331_div_1_Template_input_ngModelChange_16_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r91); const sup_r82 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit; return sup_r82.max_credit = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](17, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](18, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](19, "label", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](20, "Pa\u00EDs\t");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](21, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](22, "input", 125);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_div_331_div_1_Template_input_ngModelChange_22_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r91); const sup_r82 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit; return sup_r82.country = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](23, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](24, "label", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](25, "Contacto");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](26, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](27, "input", 125);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_div_331_div_1_Template_input_ngModelChange_27_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r91); const sup_r82 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit; return sup_r82.contact = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](28, "div", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](29, "label", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](30, "Tel\u00E9fono");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](31, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](32, "input", 125);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_div_331_div_1_Template_input_ngModelChange_32_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r91); const sup_r82 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit; return sup_r82.phone = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](33, SolicitudIndividualComponent_div_331_div_1_div_33_Template, 3, 0, "div", 126);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
} if (rf & 2) {
    const ctx_r102 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]();
    const i_r83 = ctx_r102.index;
    const sup_r82 = ctx_r102.$implicit;
    const ctx_r84 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "sup-name", i_r83, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", sup_r82.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "sup-average_monthly_purchase", i_r83, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", sup_r82.average_monthly_purchase);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "sup-max_credit", i_r83, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", sup_r82.max_credit);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "sup.country", i_r83, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", sup_r82.country);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "sup-contact", i_r83, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", sup_r82.contact);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "sup-phone", i_r83, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", sup_r82.phone);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngIf", sup_r82.supplier_id || ctx_r84.suppliersCount > 1);
} }
function SolicitudIndividualComponent_div_331_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](1, SolicitudIndividualComponent_div_331_div_1_Template, 34, 13, "div", 124);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
} if (rf & 2) {
    const sup_r82 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngIf", sup_r82.remove != true);
} }
function SolicitudIndividualComponent_div_341_div_1_div_43_Template(rf, ctx) { if (rf & 1) {
    const _r109 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????getCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div", 127);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](1, "button", 128);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function SolicitudIndividualComponent_div_341_div_1_div_43_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r109); const i_r104 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"](2).index; const ctx_r107 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"](); return ctx_r107.quitarCliente(i_r104); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](2, "i", 129);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
} }
function SolicitudIndividualComponent_div_341_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r112 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????getCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](1, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](2, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](3, "label", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](4, "Nombre");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](5, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](6, "input", 125);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_div_341_div_1_Template_input_ngModelChange_6_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r112); const client_r103 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit; return client_r103.name = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](7, "div", 136);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](8, "label", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](9, "Promedio mensual");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](10, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](11, "input", 135);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_div_341_div_1_Template_input_ngModelChange_11_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r112); const client_r103 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit; return client_r103.monthly_average = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](12, "div", 136);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](13, "label", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](14, "D\u00EDas Cr\u00E9dito");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](15, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](16, "input", 135);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_div_341_div_1_Template_input_ngModelChange_16_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r112); const client_r103 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit; return client_r103.credit_days = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](17, "div", 136);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](18, "label", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](19, "Forma de Pago");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](20, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](21, "input", 125);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_div_341_div_1_Template_input_ngModelChange_21_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r112); const client_r103 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit; return client_r103.pay_form = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](22, "div", 136);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](23, "label", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](24, "Tiempo de relaci\u00F3n");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](25, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](26, "input", 135);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_div_341_div_1_Template_input_ngModelChange_26_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r112); const client_r103 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit; return client_r103.relation_time = $event; });
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
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](32, "input", 125);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_div_341_div_1_Template_input_ngModelChange_32_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r112); const client_r103 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit; return client_r103.product_service = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](33, "div", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](34, "label", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](35, "Contacto");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](36, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](37, "input", 125);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_div_341_div_1_Template_input_ngModelChange_37_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r112); const client_r103 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit; return client_r103.contact = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](38, "div", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](39, "label", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](40, "Tel\u00E9fono");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](41, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](42, "input", 125);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_div_341_div_1_Template_input_ngModelChange_42_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r112); const client_r103 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]().$implicit; return client_r103.phone = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](43, SolicitudIndividualComponent_div_341_div_1_div_43_Template, 3, 0, "div", 126);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
} if (rf & 2) {
    const ctx_r127 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]();
    const i_r104 = ctx_r127.index;
    const client_r103 = ctx_r127.$implicit;
    const ctx_r105 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "client-name", i_r104, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", client_r103.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "client-monthly-average", i_r104, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", client_r103.monthly_average);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "client-credit-days", i_r104, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", client_r103.credit_days);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "client-pay-form", i_r104, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", client_r103.pay_form);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "client-relation-name", i_r104, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", client_r103.relation_time);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "client-product-service", i_r104, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", client_r103.product_service);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "client-contact", i_r104, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", client_r103.contact);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????propertyInterpolate1"]("name", "client-phone", i_r104, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", client_r103.phone);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngIf", client_r103.client_id || ctx_r105.clientsCount > 1);
} }
function SolicitudIndividualComponent_div_341_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](1, SolicitudIndividualComponent_div_341_div_1_Template, 44, 17, "div", 124);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
} if (rf & 2) {
    const client_r103 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngIf", client_r103.remove != true);
} }
const _c0 = function () { return { standalone: true }; };
class SolicitudIndividualComponent {
    //-----------------
    constructor(mysqlService, toastr, solicitudService, spinner, route, router) {
        this.mysqlService = mysqlService;
        this.toastr = toastr;
        this.solicitudService = solicitudService;
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
        this.myForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormGroup"]({
            inputType: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](null),
            inputMonto: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](null),
            inputDestino: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](null),
            inputPlazo: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](null),
            inputGarantia: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](null),
            inputNombrePropietario: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](null),
            inputNombreComercial: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](null),
            inputNit: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](null),
            inputSector: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](null),
            inputDireccion: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](null),
            inputTelefono: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](null),
            inputNombreContacto: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](null),
            inputCargoContacto: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](null),
            inputEmailSolicitarInfo: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](null),
            inputNombreSolicitarInfo: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](null),
            inputTelefonoSolicitarInfo: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](null),
            inputEmailContabilidad: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](null),
            inputNombreContabilidad: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](null),
            inputTelefonoContabilidad: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](null),
            inputEmailCobros: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](null),
            inputNombreCobros: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](null),
            inputTelefonoCobros: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](null),
            inputEmailFactura: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](null),
            inputNombreFactura: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](null),
            inputTelefonoFactura: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](null),
            inputEmailRetencion: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](null),
            inputNombreRetencion: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](null),
            inputTelefonoRetencion: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](null),
            inputActividadPrincipal: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](null),
            inputTiempoMercado: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](null),
            inputVentasAnuales: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](null),
            inputAgenteIVA: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](null),
            inputPorcentajeRetencionIVA: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](null),
            inputAgenteISR: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](null),
            inputPorcentajeRetencionISR: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](null),
            inputWeb: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](null),
            inputGroup: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](null),
            inputNombre: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required]),
            inputDireccion1: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required]),
            inputDireccion2: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required]),
            inputMunicipio: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required]),
            inputTipoNegocio: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required]),
            inputPais: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required]),
            inputDepartamento: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required]),
            /* EmpresasGrupo: new FormArray([
              new FormGroup({
                name: new FormControl(null),
                business: new FormControl(null),
                holding_name: new FormControl(null),
              })
            ]) */
            EmpresasGrupo: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormArray"]([]),
            Cuenta: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormArray"]([]),
            /* Cuenta: new FormArray([
              new FormGroup({
                bank: new FormControl(null),
                account_number: new FormControl(null),
                account_type: new FormControl(null),
                currency: new FormControl(null),
                name_account: new FormControl(null),
                monthly_average_deposit: new FormControl(null)
              })
            ]), */
            Prestamos: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormArray"]([]),
            /* Prestamos: new FormArray([
              new FormGroup({
                bank: new FormControl(null),
                loan_number: new FormControl(null),
                warranty: new FormControl(null),
                amount_awarded: new FormControl(null),
                time: new FormControl(null),
                balance: new FormControl(null)
              })
            ]), */
            Descuentos: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormArray"]([]),
            /* Descuentos: new FormArray([
              new FormGroup({
                entity: new FormControl(null),
                warranty: new FormControl(null),
                amount_awarded: new FormControl(null),
                amount_used: new FormControl(null),
                balance: new FormControl(null)
              })
            ]), */
            Proveedores: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormArray"]([]),
            /* Proveedores: new FormArray([
              new FormGroup({
                name: new FormControl(null),
                average_monthly_purchase: new FormControl(null),
                max_credit: new FormControl(null),
                country_id: new FormControl(null),
                contact: new FormControl(null),
                phone: new FormControl(null)
              })
            ]), */
            Clientes: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormArray"]([]),
        });
        this.Cuenta = this.myForm.get('Cuenta');
        this.EmpresasGrupo = this.myForm.get('EmpresasGrupo');
        this.Prestamos = this.myForm.get('Prestamos');
        this.Descuentos = this.myForm.get('Descuentos');
        this.Proveedores = this.myForm.get('Proveedores');
        this.Clientes = this.myForm.get('Clientes');
    }
    agregarEmpresa() {
        this.requestForm.companys.push({});
        this.companiesCount++;
        //console.log('AgregarEmpresa: ' + this.companiesCount);
    }
    quitarEmpresa(i) {
        //console.log('SE VA A QUITAR EL INDICE ' + i);
        if (!this.requestForm.companys[i].company_id) {
            //console.log('SE VA A QUITAR UNA COMPANIA QUE NO EXISTE EN BACKEND');
            this.requestForm.companys = this.requestForm.companys.filter((_, k) => k != i);
        }
        else {
            this.requestForm.companys[i].remove = true;
        }
        this.companiesCount--;
        if (this.companiesCount == 0) {
            this.agregarEmpresa();
        }
        //console.log('QuitarEmpresa: '+this.companiesCount);
    }
    agregarCuenta() {
        this.requestForm.bank_accounts.push({});
        this.bank_accountCount++;
    }
    quitarCuenta(i) {
        if (!this.requestForm.bank_accounts[i].account_id) {
            //console.log('SE VA A QUITAR UNA COMPANIA QUE NO EXISTE EN BACKEND');
            this.requestForm.bank_accounts = this.requestForm.bank_accounts.filter((_, k) => k != i);
        }
        else {
            this.requestForm.bank_accounts[i].remove = true;
        }
        this.bank_accountCount--;
        if (this.bank_accountCount == 0) {
            this.agregarCuenta();
        }
    }
    agregarPrestamo() {
        this.requestForm.bank_loans.push({});
        this.bank_loansCount++;
    }
    quitarPrestamo(i) {
        if (!this.requestForm.bank_loans[i].loan_id) {
            //console.log('SE VA A QUITAR UNA COMPANIA QUE NO EXISTE EN BACKEND');
            this.requestForm.bank_loans = this.requestForm.bank_loans.filter((_, k) => k != i);
        }
        else {
            this.requestForm.bank_loans[i].remove = true;
        }
        this.bank_loansCount--;
        if (this.bank_loansCount == 0) {
            this.agregarPrestamo();
        }
    }
    agregarDescuento() {
        this.requestForm.factorings.push({});
        this.factoringsCount++;
    }
    quitarDescuento(i) {
        if (!this.requestForm.factorings[i].factoring_id) {
            //console.log('SE VA A QUITAR UNA COMPANIA QUE NO EXISTE EN BACKEND');
            this.requestForm.factorings = this.requestForm.factorings.filter((_, k) => k != i);
        }
        else {
            this.requestForm.factorings[i].remove = true;
        }
        this.factoringsCount--;
        if (this.factoringsCount == 0) {
            this.agregarDescuento();
        }
    }
    agregarProveedor() {
        this.requestForm.suppliers.push({});
        this.suppliersCount++;
    }
    quitarProveedor(i) {
        if (!this.requestForm.suppliers[i].supplier_id) {
            //console.log('SE VA A QUITAR UNA COMPANIA QUE NO EXISTE EN BACKEND');
            this.requestForm.suppliers = this.requestForm.suppliers.filter((_, k) => k != i);
        }
        else {
            this.requestForm.suppliers[i].remove = true;
        }
        this.suppliersCount--;
        if (this.suppliersCount == 0) {
            this.agregarProveedor();
        }
    }
    agregarCliente() {
        this.requestForm.clients.push({});
        this.clientsCount++;
    }
    quitarCliente(i) {
        if (!this.requestForm.clients[i].client_id) {
            //console.log('SE VA A QUITAR UNA COMPANIA QUE NO EXISTE EN BACKEND');
            this.requestForm.clients = this.requestForm.clients.filter((_, k) => k != i);
        }
        else {
            this.requestForm.clients[i].remove = true;
        }
        this.clientsCount--;
        if (this.clientsCount == 0) {
            this.agregarCliente();
        }
    }
    onSubmitComplete() {
        //console.log(newform);
        this.requestForm.finish_date = new Date();
        let suscription = this.solicitudService.saveForm(this.requestForm, this.requestID, 0).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])((resp) => {
            //console.log(resp);
            this.spinner.hide();
            this.toastr.success('Guardar', 'Tu progreso fue guardado');
            this.requestForm = resp;
            if (!resp) {
                this.requestForm = {};
                this.requestForm.companys = [];
                this.requestForm.companys.push({});
                this.companiesCount = 1;
                this.requestForm.bank_accounts = [];
                this.requestForm.bank_accounts.push({});
                this.bank_accountCount = 1;
                this.requestForm.bank_loans = [];
                this.requestForm.bank_loans.push({});
                this.bank_loansCount = 1;
                this.requestForm.factorings = [];
                this.requestForm.factorings.push({});
                this.factoringsCount = 1;
                this.requestForm.suppliers = [];
                this.requestForm.suppliers.push({});
                this.suppliersCount = 1;
                this.requestForm.clients = [];
                this.requestForm.clients.push({});
                this.clientsCount = 1;
                return;
            }
            this.requestForm = resp;
            if (this.requestForm.companys.length == 0) {
                this.requestForm.companys.push({});
            }
            this.companiesCount = this.requestForm.companys.length;
            if (this.requestForm.bank_accounts.length == 0) {
                this.requestForm.bank_accounts.push({});
            }
            this.bank_accountCount = this.requestForm.bank_accounts.length;
            if (this.requestForm.bank_loans.length == 0) {
                this.requestForm.bank_loans.push({});
            }
            this.bank_loansCount = this.requestForm.bank_loans.length;
            if (this.requestForm.factorings.length == 0) {
                this.requestForm.factorings.push({});
            }
            this.factoringsCount = this.requestForm.factorings.length;
            if (this.requestForm.suppliers.length == 0) {
                this.requestForm.suppliers.push({});
            }
            this.suppliersCount = this.requestForm.suppliers.length;
            if (this.requestForm.clients.length == 0) {
                this.requestForm.clients.push({});
            }
            this.clientsCount = this.requestForm.clients.length;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["catchError"])((err) => {
            this.spinner.hide();
            this.toastr.error('error', 'Tu progreso no fue guardado');
            //console.log(err);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])();
        })).subscribe(() => suscription.unsubscribe());
    }
    onSubmit() {
        //console.log(newform);
        let suscription = this.solicitudService.saveForm(this.requestForm, this.requestID, 0).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])((resp) => {
            //console.log(resp);
            this.spinner.hide();
            this.toastr.success('Guardar', 'Tu progreso fue guardado');
            this.requestForm = resp;
            if (!resp) {
                this.requestForm = {};
                this.requestForm.companys = [];
                this.requestForm.companys.push({});
                this.companiesCount = 1;
                this.requestForm.bank_accounts = [];
                this.requestForm.bank_accounts.push({});
                this.bank_accountCount = 1;
                this.requestForm.bank_loans = [];
                this.requestForm.bank_loans.push({});
                this.bank_loansCount = 1;
                this.requestForm.factorings = [];
                this.requestForm.factorings.push({});
                this.factoringsCount = 1;
                this.requestForm.suppliers = [];
                this.requestForm.suppliers.push({});
                this.suppliersCount = 1;
                this.requestForm.clients = [];
                this.requestForm.clients.push({});
                this.clientsCount = 1;
                return;
            }
            this.requestForm = resp;
            if (this.requestForm.companys.length == 0) {
                this.requestForm.companys.push({});
            }
            this.companiesCount = this.requestForm.companys.length;
            if (this.requestForm.bank_accounts.length == 0) {
                this.requestForm.bank_accounts.push({});
            }
            this.bank_accountCount = this.requestForm.bank_accounts.length;
            if (this.requestForm.bank_loans.length == 0) {
                this.requestForm.bank_loans.push({});
            }
            this.bank_loansCount = this.requestForm.bank_loans.length;
            if (this.requestForm.factorings.length == 0) {
                this.requestForm.factorings.push({});
            }
            this.factoringsCount = this.requestForm.factorings.length;
            if (this.requestForm.suppliers.length == 0) {
                this.requestForm.suppliers.push({});
            }
            this.suppliersCount = this.requestForm.suppliers.length;
            if (this.requestForm.clients.length == 0) {
                this.requestForm.clients.push({});
            }
            this.clientsCount = this.requestForm.clients.length;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["catchError"])((err) => {
            this.spinner.hide();
            this.toastr.error('error', 'Tu progreso no fue guardado');
            //console.log(err);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])();
        })).subscribe(() => suscription.unsubscribe());
    }
    ngOnInit() {
        //console.log('EN EL INIT DEL FOMRULARIO SOLICITUD--------------');
        //console.log(this.route.snapshot.params);
        this.requestID = parseInt(this.route.snapshot.params.idsolicitud);
        this.previousUrl = localStorage.getItem('cutomer-previous-url');
        //console.log(this.route.snapshot.paramMap.get('requestIdSelected'));
        this.spinner.show();
        this.solicitudService.getForm(this.requestID).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])((resp) => {
            //console.log(resp);
            if (!resp) {
                this.requestForm = {};
                this.requestForm.companys = [];
                this.requestForm.companys.push({});
                this.companiesCount = 1;
                this.requestForm.bank_accounts = [];
                this.requestForm.bank_accounts.push({});
                this.bank_accountCount = 1;
                this.requestForm.bank_loans = [];
                this.requestForm.bank_loans.push({});
                this.bank_loansCount = 1;
                this.requestForm.factorings = [];
                this.requestForm.factorings.push({});
                this.factoringsCount = 1;
                this.requestForm.suppliers = [];
                this.requestForm.suppliers.push({});
                this.suppliersCount = 1;
                this.requestForm.clients = [];
                this.requestForm.clients.push({});
                this.clientsCount = 1;
                return;
            }
            this.requestForm = resp;
            if (this.requestForm.companys.length == 0) {
                this.requestForm.companys.push({});
            }
            this.companiesCount = this.requestForm.companys.length;
            if (this.requestForm.bank_accounts.length == 0) {
                this.requestForm.bank_accounts.push({});
            }
            this.bank_accountCount = this.requestForm.bank_accounts.length;
            if (this.requestForm.bank_loans.length == 0) {
                this.requestForm.bank_loans.push({});
            }
            this.bank_loansCount = this.requestForm.bank_loans.length;
            if (this.requestForm.factorings.length == 0) {
                this.requestForm.factorings.push({});
            }
            this.factoringsCount = this.requestForm.factorings.length;
            if (this.requestForm.suppliers.length == 0) {
                this.requestForm.suppliers.push({});
            }
            this.suppliersCount = this.requestForm.suppliers.length;
            if (this.requestForm.clients.length == 0) {
                this.requestForm.clients.push({});
            }
            this.clientsCount = this.requestForm.clients.length;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["catchError"])((err) => {
            //this.notifier.notify('error', 'Ocurrio un problema con la eliminacion' + err);
            console.log(err);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])();
        })).subscribe(x => { this.spinner.hide(); });
    }
    returnPreviusPage() {
        //console.log('RETURN:: ' + this.previousUrl);
        if (this.previousUrl)
            this.router.navigate([this.previousUrl]);
    }
}
SolicitudIndividualComponent.??fac = function SolicitudIndividualComponent_Factory(t) { return new (t || SolicitudIndividualComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["????directiveInject"](_services_mysql_mysql_service__WEBPACK_IMPORTED_MODULE_2__["MysqlService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["????directiveInject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["????directiveInject"](_services_formularios_individua_solicitud_service__WEBPACK_IMPORTED_MODULE_4__["SolicitudService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["????directiveInject"](ngx_spinner__WEBPACK_IMPORTED_MODULE_8__["NgxSpinnerService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["????directiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["????directiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"])); };
SolicitudIndividualComponent.??cmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????defineComponent"]({ type: SolicitudIndividualComponent, selectors: [["app-solicitud-individual"]], decls: 372, vars: 66, consts: [[1, "row", "mt-4"], ["bdColor", "rgba(51,51,51,0.8)", "size", "medium", "color", "#759ee0", "type", "ball-scale-multiple"], [2, "font-size", "20px", "color", "#fff"], [1, "col-md-6"], ["src", "/assets/images/logo.png", "alt", "solucredits", "width", "auto", "height", "80%", 1, "ml-5"], [1, "col-sm-12"], [1, "card"], [1, "card-header", 2, "background-color", "#3473da"], [1, "card-title", "mb-0", "text-white"], [1, "form-horizontal"], [1, "card-body"], [1, "card-title"], [1, "row", "form-group", "mt-4", "pl-2"], [1, "col-lg-4", "col-md-4", "col-sm-12"], [1, "custom-control", "custom-radio"], ["type", "radio", "id", "customRadio1", "name", "inputType", 1, "custom-control-input", 3, "value", "ngModel", "ngModelChange"], ["for", "customRadio1", 1, "custom-control-label", "custom-label"], ["type", "radio", "id", "customRadio2", "name", "inputType", 1, "custom-control-input", 3, "value", "ngModel", "ngModelChange"], ["for", "customRadio2", 1, "custom-control-label", "custom-label"], ["type", "radio", "id", "customRadio3", "name", "inputType", 1, "custom-control-input", 3, "value", "ngModel", "ngModelChange"], ["for", "customRadio3", 1, "custom-control-label", "custom-label"], [1, "row", "form-group"], [1, "col-lg-6"], ["for", "inputMonto", 1, "col-sm-12", "custom-label"], ["type", "number", "aria-label", "Monto", "id", "inputMonto", "required", "", "name", "amount", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputDestino", 1, "col-sm-12", "custom-label"], ["type", "text", "aria-label", "Destino", "id", "inputDestino", "required", "", "name", "destination", 1, "form-control", 3, "ngModel", "ngModelChange"], [1, "col-lg-12"], ["for", "inputNombre", 1, "col-sm-12", "custom-label"], ["type", "number", "aria-label", "Plazo", "id", "inputPlazo", "required", "", "name", "month_duration", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputGarantia", 1, "col-sm-12", "custom-label"], [1, "row", "pl-4"], ["type", "radio", "id", "customRadio11", "name", "inputGarantia", 1, "custom-control-input", 3, "value", "ngModel", "ngModelChange"], ["for", "customRadio11", 1, "custom-control-label", "custom-label"], ["type", "radio", "id", "customRadio12", "name", "inputGarantia", 1, "custom-control-input", 3, "value", "ngModel", "ngModelChange"], ["for", "customRadio12", 1, "custom-control-label", "custom-label"], ["type", "radio", "id", "customRadio13", "name", "inputGarantia", 1, "custom-control-input", 3, "value", "ngModel", "ngModelChange"], ["for", "customRadio13", 1, "custom-control-label", "custom-label"], [1, "row", "form-group", "mt-4"], ["for", "inputNombrePropietario", 1, "col-sm-12", "custom-label"], ["type", "text", "aria-label", "Nombre propietario", "id", "inputNombrePropietario", "required", "", "name", "owner_name", 1, "form-control", 3, "ngModel", "ngModelChange"], [1, "col-lg-8"], ["for", "inputNombreComercial", 1, "col-sm-12", "custom-label"], ["type", "text", "aria-label", "Nombre comercial", "id", "inputNombreComercial", "required", "", "name", "comercial_name", 1, "form-control", 3, "ngModel", "ngModelChange"], [1, "col-lg-4"], ["for", "inputNit", 1, "col-sm-12", "custom-label"], ["type", "text", "maxlength", "13", "minlength", "8", "aria-label", "NIT", "id", "inputNit", "required", "", "name", "nit", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputSector", 1, "col-sm-12", "custom-label"], ["type", "text", "aria-label", "Sector econ\u00F3mico", "id", "inputSector", "required", "", "name", "economic_sector", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputDireccion", 1, "col-sm-12", "custom-label"], ["type", "text", "aria-label", "Direccion", "required", "", "name", "address", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputTelefono", 1, "col-sm-12", "custom-label"], ["type", "tel", "aria-label", "Tel\u00E9fonos", "required", "", "name", "phones", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputNombreContacto", 1, "col-sm-12", "custom-label"], ["type", "text", "aria-label", "Nombre del cont\u00E1cto", "required", "", "name", "contact_comercial_name", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputCargoContacto", 1, "col-sm-12", "custom-label"], ["type", "text", "aria-label", "Nombre del cont\u00E1cto", "required", "", "name", "position", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputEmailSolicitarInfo", 1, "col-sm-12", "custom-label"], ["type", "email", "aria-label", "Email para solicitar informacion", "required", "", "name", "records_info_email", 1, "form-control", 3, "ngModel", "ngModelChange"], [1, "col-lg-3"], ["for", "inputNombreSolicitarInfo", 1, "col-sm-12", "custom-label"], ["type", "text", "aria-label", "Nombre para solicitar informacion", "required", "", "name", "records_info_name", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputTelefonoSolicitarInfo", 1, "col-sm-12", "custom-label"], ["type", "tel", "aria-label", "Telefono para solicitar informacion", "required", "", "name", "records_info_phone", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputEmailContabilidad", 1, "col-sm-12", "custom-label"], ["type", "email", "aria-label", "Email", "required", "", "name", "accounting_email", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputNombreContabilidad", 1, "col-sm-12", "custom-label"], ["type", "text", "aria-label", "Nombre", "required", "", "name", "accounting_name", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputTelefonoContabilidad", 1, "col-sm-12", "custom-label"], ["type", "tel", "aria-label", "Telefono de contabilidad", "required", "", "name", "accounting_phone", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputEmailCobros", 1, "col-sm-12", "custom-label"], ["type", "email", "aria-label", "Corre", "required", "", "name", "charges_email", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputNombreCobros", 1, "col-sm-12", "custom-label"], ["type", "text", "aria-label", "Nombre", "required", "", "name", "charges_name", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputTelefonoCobros", 1, "col-sm-12", "custom-label"], ["type", "tel", "aria-label", "Telefono", "required", "", "name", "charges_phone", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputEmailFactura", 1, "col-sm-12", "custom-label"], ["type", "email", "aria-label", "email", "required", "", "name", "bill_send_email", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputNombreFactura", 1, "col-sm-12", "custom-label"], ["type", "text", "aria-label", "Nombre", "required", "", "name", "bill_send_name", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputTelefonoFactura", 1, "col-sm-12", "custom-label"], ["type", "tel", "aria-label", "Telefono", "required", "", "name", "bill_send_phone", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputEmailRetencion", 1, "col-sm-12", "custom-label"], ["type", "email", "aria-label", "Email", "required", "", "name", "isr_email", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputNombreRetencion", 1, "col-sm-12", "custom-label"], ["type", "text", "aria-label", "Nombre", "required", "", "name", "isr_name", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputTelefonoRetencion", 1, "col-sm-12", "custom-label"], ["type", "tel", "aria-label", "Telefono", "required", "", "name", "isr_phone", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputActividadPrincipal", 1, "col-sm-12", "custom-label"], ["type", "text", "aria-label", "Actividad principal", "required", "", "name", "core_business", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputTiempoMercado", 1, "col-sm-12", "custom-label"], ["type", "number", "aria-label", "Tiempo en el mercado", "required", "", "name", "time_in_business", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputVentasAnuales", 1, "col-sm-12", "custom-label"], ["type", "number", "aria-label", "Ventas Anuales", "required", "", "name", "last_year_sales", 1, "form-control", 3, "ngModel", "ngModelChange"], [1, "form-check", "form-check-inline"], ["type", "radio", "id", "agenteIVATrue", "name", "iva_holder", 1, "custom-control-input", 3, "value", "ngModel", "ngModelChange"], ["for", "agenteIVATrue", 1, "custom-control-label", "custom-label"], ["type", "radio", "id", "agenteIVAFlase", "name", "iva_holder", 1, "custom-control-input", 3, "value", "ngModel", "ngModelChange"], ["for", "agenteIVAFlase", 1, "custom-control-label", "custom-label"], ["for", "inputPorcentajeRetencionIVA", 1, "col-sm-12", "custom-label"], ["type", "number", "aria-label", "Porcentaje", "required", "", "name", "iva_percentage", 1, "form-control", 3, "ngModel", "ngModelChange"], ["type", "radio", "id", "agenteISRTrue", "name", "isr_holder", 1, "custom-control-input", 3, "value", "ngModel", "ngModelChange"], ["for", "agenteISRTrue", 1, "custom-control-label", "custom-label"], ["type", "radio", "id", "agenteISRFalse", "name", "isr_holder", 1, "custom-control-input", 3, "value", "ngModel", "ngModelChange"], ["for", "agenteISRFalse", 1, "custom-control-label", "custom-label"], ["for", "inputPorcentajeRetencionISR", 1, "col-sm-12", "custom-label"], ["type", "number", "aria-label", "Porcentaje ISR", "required", "", "name", "isr_percentage", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputWeb", 1, "col-sm-12", "custom-label"], ["type", "text", "aria-label", "URL", "required", "", "name", "web_page", 1, "form-control", 3, "ngModel", "ngModelChange"], ["for", "inputGroup", 1, "col-sm-12", "custom-label"], ["type", "radio", "id", "inputGroupTrue", 1, "custom-control-input", 3, "value", "ngModel", "ngModelOptions", "ngModelChange"], ["for", "inputGroupTrue", 1, "custom-control-label", "custom-label"], ["type", "radio", "id", "inputGroupFlase", 1, "custom-control-input", 3, "value", "ngModel", "ngModelOptions", "ngModelChange"], ["for", "inputGroupFlase", 1, "custom-control-label", "custom-label"], [4, "ngFor", "ngForOf"], [1, "row"], [1, "offset-lg-9", "col-lg-3"], [1, "btn", "btn", "btn-info", "ml-auto", "btn-color-solucredit", 3, "click"], [1, "col-lg-3", "offset-lg-9"], [1, "row", "mb-4"], [1, "text-justify"], [1, "form-group", "m-b-0", "text-right"], [1, "btn", "btn-info", "ml-auto", "btn-color-solucredit", 3, "click"], [1, "btn", "btn", "btn-info", "ml-auto", "btn-color-solucredit-secondary", 3, "click"], [4, "ngIf"], ["type", "text", "aria-label", "Username", "required", "", 1, "form-control", 3, "ngModel", "name", "ngModelChange"], ["class", "col-lg-1 align-self-end", 4, "ngIf"], [1, "col-lg-1", "align-self-end"], [1, "btn", "btn-danger", "btn-raised", "mr-1", 3, "click"], [1, "far", "fa-window-close"], ["for", "inputBanco", 1, "col-sm-12", "custom-label"], ["for", "inputCuenta", 1, "col-sm-12", "custom-label"], ["for", "inputTipo", 1, "col-sm-12", "custom-label"], ["for", "inputMoneda", 1, "col-sm-12", "custom-label"], ["type", "text", "aria-label", "Username", "i", "", "required", "", 1, "form-control", 3, "ngModel", "name", "ngModelChange"], ["type", "number", "aria-label", "Username", "required", "", 1, "form-control", 3, "ngModel", "name", "ngModelChange"], [1, "col-lg-2"]], template: function SolicitudIndividualComponent_Template(rf, ctx) { if (rf & 1) {
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
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](17, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](18, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](19, "h3", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](20, "Solicitud Individual");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](21, "form", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](22, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](23, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](24, "h4", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](25, "CR\u00C9DITO SOLICITADO");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](26, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](27, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](28, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](29, "input", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_Template_input_ngModelChange_29_listener($event) { return ctx.requestForm.credit_type_id = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](30, "label", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](31, "Nueva Solicitud");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](32, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](33, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](34, "input", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_Template_input_ngModelChange_34_listener($event) { return ctx.requestForm.credit_type_id = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](35, "label", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](36, "Pr\u00F3rroga");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](37, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](38, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](39, "input", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_Template_input_ngModelChange_39_listener($event) { return ctx.requestForm.credit_type_id = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](40, "label", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](41, "Ampliac\u00EDon o modificac\u00EDon");
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
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_Template_input_ngModelChange_47_listener($event) { return ctx.requestForm.amount = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](48, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](49, "label", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](50, "Destino");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](51, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](52, "input", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_Template_input_ngModelChange_52_listener($event) { return ctx.requestForm.destination = $event; });
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
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_Template_input_ngModelChange_58_listener($event) { return ctx.requestForm.month_duration = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](59, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](60, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](61, "label", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](62, "Garant\u00EDa");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](63, "div", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](64, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](65, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](66, "input", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_Template_input_ngModelChange_66_listener($event) { return ctx.requestForm.warranty_type_id = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](67, "label", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](68, "Hipotecario");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](69, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](70, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](71, "input", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_Template_input_ngModelChange_71_listener($event) { return ctx.requestForm.warranty_type_id = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](72, "label", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](73, "Prendario");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](74, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](75, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](76, "input", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_Template_input_ngModelChange_76_listener($event) { return ctx.requestForm.warranty_type_id = $event; });
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
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](82, "DATOS GENERALES DEL PROPIETARIO");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](83, "div", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](84, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](85, "label", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](86, "Nombre del propietario");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](87, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](88, "input", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_Template_input_ngModelChange_88_listener($event) { return ctx.requestForm.owner_name = $event; });
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
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_Template_input_ngModelChange_94_listener($event) { return ctx.requestForm.comercial_name = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](95, "div", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](96, "label", 45);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](97, "NIT");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](98, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](99, "input", 46);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_Template_input_ngModelChange_99_listener($event) { return ctx.requestForm.nit = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](100, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](101, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](102, "label", 47);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](103, "Sector econ\u00F3mico");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](104, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](105, "input", 48);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_Template_input_ngModelChange_105_listener($event) { return ctx.requestForm.economic_sector = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](106, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](107, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](108, "label", 49);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](109, "Direcci\u00F3n");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](110, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](111, "input", 50);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_Template_input_ngModelChange_111_listener($event) { return ctx.requestForm.address = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](112, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](113, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](114, "label", 51);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](115, "Tel\u00E9fonos");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](116, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](117, "input", 52);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_Template_input_ngModelChange_117_listener($event) { return ctx.requestForm.phones = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](118, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](119, "div", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](120, "label", 53);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](121, "Nombre del cont\u00E1cto");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](122, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](123, "input", 54);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_Template_input_ngModelChange_123_listener($event) { return ctx.requestForm.contact_comercial_name = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](124, "div", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](125, "label", 55);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](126, "Cargo");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](127, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](128, "input", 56);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_Template_input_ngModelChange_128_listener($event) { return ctx.requestForm.position = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](129, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](130, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](131, "label", 57);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](132, "Correo electr\u00F3nico para solicitar informaci\u00F3n para el expediente");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](133, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](134, "input", 58);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_Template_input_ngModelChange_134_listener($event) { return ctx.requestForm.records_info_email = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](135, "div", 59);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](136, "label", 60);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](137, "Nombre");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](138, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](139, "input", 61);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_Template_input_ngModelChange_139_listener($event) { return ctx.requestForm.records_info_name = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](140, "div", 59);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](141, "label", 62);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](142, "Tel\u00E9fono directo");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](143, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](144, "input", 63);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_Template_input_ngModelChange_144_listener($event) { return ctx.requestForm.records_info_phone = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](145, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](146, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](147, "label", 64);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](148, "Correo electr\u00F3nico de contabilidad");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](149, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](150, "input", 65);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_Template_input_ngModelChange_150_listener($event) { return ctx.requestForm.accounting_email = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](151, "div", 59);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](152, "label", 66);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](153, "Nombre");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](154, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](155, "input", 67);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_Template_input_ngModelChange_155_listener($event) { return ctx.requestForm.accounting_name = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](156, "div", 59);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](157, "label", 68);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](158, "Tel\u00E9fono directo");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](159, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](160, "input", 69);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_Template_input_ngModelChange_160_listener($event) { return ctx.requestForm.accounting_phone = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](161, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](162, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](163, "label", 70);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](164, "Correo electr\u00F3nico para cobros");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](165, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](166, "input", 71);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_Template_input_ngModelChange_166_listener($event) { return ctx.requestForm.charges_email = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](167, "div", 59);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](168, "label", 72);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](169, "Nombre");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](170, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](171, "input", 73);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_Template_input_ngModelChange_171_listener($event) { return ctx.requestForm.charges_name = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](172, "div", 59);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](173, "label", 74);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](174, "Tel\u00E9fono directo");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](175, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](176, "input", 75);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_Template_input_ngModelChange_176_listener($event) { return ctx.requestForm.charges_phone = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](177, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](178, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](179, "label", 76);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](180, "Correo electr\u00F3nico para enviar factura");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](181, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](182, "input", 77);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_Template_input_ngModelChange_182_listener($event) { return ctx.requestForm.bill_send_email = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](183, "div", 59);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](184, "label", 78);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](185, "Nombre");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](186, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](187, "input", 79);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_Template_input_ngModelChange_187_listener($event) { return ctx.requestForm.bill_send_name = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](188, "div", 59);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](189, "label", 80);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](190, "Tel\u00E9fono directo");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](191, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](192, "input", 81);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_Template_input_ngModelChange_192_listener($event) { return ctx.requestForm.bill_send_phone = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](193, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](194, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](195, "label", 82);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](196, "Correo electr\u00F3nico para solicitar retenci\u00F3n de ISR");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](197, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](198, "input", 83);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_Template_input_ngModelChange_198_listener($event) { return ctx.requestForm.isr_email = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](199, "div", 59);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](200, "label", 84);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](201, "Nombre");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](202, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](203, "input", 85);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_Template_input_ngModelChange_203_listener($event) { return ctx.requestForm.isr_name = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](204, "div", 59);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](205, "label", 86);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](206, "Tel\u00E9fono directo");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](207, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](208, "input", 87);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_Template_input_ngModelChange_208_listener($event) { return ctx.requestForm.isr_phone = $event; });
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
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_Template_input_ngModelChange_214_listener($event) { return ctx.requestForm.core_business = $event; });
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
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_Template_input_ngModelChange_220_listener($event) { return ctx.requestForm.time_in_business = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](221, "div", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](222, "label", 92);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](223, "Ventas anuales \u00FAltimo a\u00F1o");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](224, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](225, "input", 93);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_Template_input_ngModelChange_225_listener($event) { return ctx.requestForm.last_year_sales = $event; });
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
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_Template_input_ngModelChange_233_listener($event) { return ctx.requestForm.iva_holder = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](234, "label", 96);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](235, "Si");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](236, "div", 94);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](237, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](238, "input", 97);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_Template_input_ngModelChange_238_listener($event) { return ctx.requestForm.iva_holder = $event; });
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
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](243, "Porcentaje de retenci\u00F3n IVA");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](244, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](245, "input", 100);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_Template_input_ngModelChange_245_listener($event) { return ctx.requestForm.iva_percentage = $event; });
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
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_Template_input_ngModelChange_252_listener($event) { return ctx.requestForm.isr_holder = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](253, "label", 102);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](254, "Si");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](255, "div", 94);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](256, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](257, "input", 103);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_Template_input_ngModelChange_257_listener($event) { return ctx.requestForm.isr_holder = $event; });
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
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](262, "Porcentaje de retenci\u00F3n ISR");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](263, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](264, "input", 106);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_Template_input_ngModelChange_264_listener($event) { return ctx.requestForm.isr_percentage = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](265, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](266, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](267, "label", 107);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](268, "P\u00E1gina Web");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](269, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](270, "input", 108);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_Template_input_ngModelChange_270_listener($event) { return ctx.requestForm.web_page = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](271, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](272, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](273, "label", 109);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](274, "\u00BFPertenece a un grupo de empresas?");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](275, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](276, "div", 94);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](277, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](278, "input", 110);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_Template_input_ngModelChange_278_listener($event) { return ctx.requestForm.holding = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](279, "label", 111);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](280, "Si");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](281, "div", 94);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](282, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](283, "input", 112);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function SolicitudIndividualComponent_Template_input_ngModelChange_283_listener($event) { return ctx.requestForm.holding = $event; });
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
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](287, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](288, "h4", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](289, "Empresas del grupo / holding");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](290, SolicitudIndividualComponent_div_290_Template, 2, 1, "div", 114);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](291, "div", 115);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](292, "div", 116);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](293, "label", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](294, "button", 117);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function SolicitudIndividualComponent_Template_button_click_294_listener() { return ctx.agregarEmpresa(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](295, "Agregar otra empresa");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](296, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](297, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](298, "h4", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](299, "Cuentas bancarias de la empresa o del propietario");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](300, SolicitudIndividualComponent_div_300_Template, 2, 1, "div", 114);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](301, "div", 115);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](302, "div", 118);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](303, "label", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](304, "button", 117);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function SolicitudIndividualComponent_Template_button_click_304_listener() { return ctx.agregarCuenta(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](305, "Agregar Cuenta");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](306, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](307, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](308, "h4", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](309, "Pr\u00E9stamos bancarios");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](310, SolicitudIndividualComponent_div_310_Template, 2, 1, "div", 114);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](311, "div", 115);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](312, "div", 116);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](313, "label", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](314, "button", 117);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function SolicitudIndividualComponent_Template_button_click_314_listener() { return ctx.agregarPrestamo(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](315, "Agregar");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](316, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](317, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](318, "h4", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](319, "Descuento de documentos (Factoraje)");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](320, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](321, SolicitudIndividualComponent_div_321_Template, 2, 1, "div", 114);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](322, "div", 115);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](323, "div", 116);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](324, "label", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](325, "button", 117);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function SolicitudIndividualComponent_Template_button_click_325_listener() { return ctx.agregarDescuento(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](326, "Agregar");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](327, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](328, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](329, "h4", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](330, "Referencias comerciales principales proveedores");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](331, SolicitudIndividualComponent_div_331_Template, 2, 1, "div", 114);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](332, "div", 115);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](333, "div", 116);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](334, "label", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](335, "button", 117);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function SolicitudIndividualComponent_Template_button_click_335_listener() { return ctx.agregarProveedor(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](336, "Agregar");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](337, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](338, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](339, "h4", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](340, "Principales clientes");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](341, SolicitudIndividualComponent_div_341_Template, 2, 1, "div", 114);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](342, "div", 115);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](343, "div", 116);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](344, "label", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](345, "button", 117);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function SolicitudIndividualComponent_Template_button_click_345_listener() { return ctx.agregarCliente(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](346, "Agregar");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](347, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](348, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](349, "div", 119);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](350, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](351, "p", 120);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](352, " Declaro que los datos y cifras anotadas anteriormente son ciertas, dejando a criterio de SOLUCIONES CREDITICIAS, S.A. la confirmaci\u00F3n de la informaci\u00F3n, por los medios que considere convenientes. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](353, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](354, "Conozco las consecuencias legales en caso no ser cierto y veraz lo declarado.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](355, "div", 119);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](356, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](357, "p", 120);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](358, " Autorizo voluntariamente que la informaci\u00F3n recopilada y/o proporcionada por entidades p\u00FAblicas o privadas y la generada de relaciones contractuales, crediticias o comerciales, sea reportada a centrales de riesgo o bur\u00F3s de cr\u00E9dito para ser tratada, almacenada o transferida; y autorizo expresamente a las entidades que prestan servicios de informaci\u00F3n, centrales de riesgo y bur\u00F3s de cr\u00E9dito, a recopilar, difundir o comercializar reportes o estudios que contengan informaci\u00F3n sobre mi persona y mi representada. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](359, "div", 119);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](360, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](361, "p", 120);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](362, " As\u00ED mismo autorizo a Soluciones Crediticias, para que pueda realizar consultas las veces que sean necesarias, durante la vigencia de la relaci\u00F3n financiera. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](363, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](364, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](365, "div", 121);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](366, "button", 122);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function SolicitudIndividualComponent_Template_button_click_366_listener() { return ctx.onSubmitComplete(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](367, "Guardar y marcar como completado");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](368, "button", 117);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function SolicitudIndividualComponent_Template_button_click_368_listener() { return ctx.onSubmit(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](369, "Guardar");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](370, "button", 123);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function SolicitudIndividualComponent_Template_button_click_370_listener() { return ctx.returnPreviusPage(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](371, "Regresar");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    } if (rf & 2) {
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
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.requestForm.owner_name);
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
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("value", ctx.isISR[0])("ngModel", ctx.requestForm.holding)("ngModelOptions", _angular_core__WEBPACK_IMPORTED_MODULE_0__["????pureFunction0"](64, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("value", ctx.isISR[1])("ngModel", ctx.requestForm.holding)("ngModelOptions", _angular_core__WEBPACK_IMPORTED_MODULE_0__["????pureFunction0"](65, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngForOf", ctx.requestForm.companys);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngForOf", ctx.requestForm.bank_accounts);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngForOf", ctx.requestForm.bank_loans);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngForOf", ctx.requestForm.factorings);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngForOf", ctx.requestForm.suppliers);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngForOf", ctx.requestForm.clients);
    } }, directives: [ngx_spinner__WEBPACK_IMPORTED_MODULE_8__["NgxSpinnerComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["??angular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgForm"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["RadioControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgModel"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NumberValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["RequiredValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["MaxLengthValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["MinLengthValidator"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgIf"]], styles: [".custom-label[_ngcontent-%COMP%] {\r\n    font-weight: 400;\r\n}\r\n\r\n.btn-color-solucredit[_ngcontent-%COMP%] {\r\n    background-color: #2061C4;\r\n    color: white;\r\n}\r\n\r\n.btn-color-solucredit-secondary[_ngcontent-%COMP%] {\r\n    background-color: #6C6C6C;\r\n    color: white;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZm9ybXMvaW5kaXZpZHVhbC9zb2xpY2l0dWQtaW5kaXZpZHVhbC9zb2xpY2l0dWQtaW5kaXZpZHVhbC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0kseUJBQXlCO0lBQ3pCLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSx5QkFBeUI7SUFDekIsWUFBWTtBQUNoQiIsImZpbGUiOiJzcmMvYXBwL2Zvcm1zL2luZGl2aWR1YWwvc29saWNpdHVkLWluZGl2aWR1YWwvc29saWNpdHVkLWluZGl2aWR1YWwuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jdXN0b20tbGFiZWwge1xyXG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcclxufVxyXG5cclxuLmJ0bi1jb2xvci1zb2x1Y3JlZGl0IHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMyMDYxQzQ7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbn1cclxuXHJcbi5idG4tY29sb3Itc29sdWNyZWRpdC1zZWNvbmRhcnkge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzZDNkM2QztcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["??setClassMetadata"](SolicitudIndividualComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-solicitud-individual',
                templateUrl: './solicitud-individual.component.html',
                styleUrls: ['./solicitud-individual.component.css']
            }]
    }], function () { return [{ type: _services_mysql_mysql_service__WEBPACK_IMPORTED_MODULE_2__["MysqlService"] }, { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"] }, { type: _services_formularios_individua_solicitud_service__WEBPACK_IMPORTED_MODULE_4__["SolicitudService"] }, { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_8__["NgxSpinnerService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] }]; }, null); })();


/***/ }),

/***/ "./src/app/forms/individual/solicitud-individual/solicitud-individual.module.ts":
/*!**************************************************************************************!*\
  !*** ./src/app/forms/individual/solicitud-individual/solicitud-individual.module.ts ***!
  \**************************************************************************************/
/*! exports provided: SolicitudIndividualModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SolicitudIndividualModule", function() { return SolicitudIndividualModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _solicitud_individual_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./solicitud-individual.component */ "./src/app/forms/individual/solicitud-individual/solicitud-individual.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/__ivy_ngcc__/fesm2015/ng-bootstrap.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/__ivy_ngcc__/fesm2015/ngx-spinner.js");









const routes = [
    {
        path: '',
        data: {
            title: 'Solicitud Individual',
            urls: [
                { title: 'Clientes', url: '/list-customer' },
                { title: 'clientes' },
            ],
        },
        component: _solicitud_individual_component__WEBPACK_IMPORTED_MODULE_2__["SolicitudIndividualComponent"],
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
        component: _solicitud_individual_component__WEBPACK_IMPORTED_MODULE_2__["SolicitudIndividualComponent"],
    }
];
class SolicitudIndividualModule {
}
SolicitudIndividualModule.??mod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????defineNgModule"]({ type: SolicitudIndividualModule });
SolicitudIndividualModule.??inj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????defineInjector"]({ factory: function SolicitudIndividualModule_Factory(t) { return new (t || SolicitudIndividualModule)(); }, imports: [[
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_6__["NgxSpinnerModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["????setNgModuleScope"](SolicitudIndividualModule, { declarations: [_solicitud_individual_component__WEBPACK_IMPORTED_MODULE_2__["SolicitudIndividualComponent"]], imports: [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
        _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
        ngx_spinner__WEBPACK_IMPORTED_MODULE_6__["NgxSpinnerModule"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["??setClassMetadata"](SolicitudIndividualModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                    ngx_spinner__WEBPACK_IMPORTED_MODULE_6__["NgxSpinnerModule"],
                    _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
                    _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModule"],
                ],
                declarations: [_solicitud_individual_component__WEBPACK_IMPORTED_MODULE_2__["SolicitudIndividualComponent"]],
            }]
    }], null, null); })();


/***/ })

}]);
//# sourceMappingURL=forms-individual-solicitud-individual-solicitud-individual-module-es2015.js.map