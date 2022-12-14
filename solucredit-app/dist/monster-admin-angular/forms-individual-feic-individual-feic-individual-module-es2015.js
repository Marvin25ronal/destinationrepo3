(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["forms-individual-feic-individual-feic-individual-module"],{

/***/ "./src/app/forms/individual/feic-individual/feic-individual.component.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/forms/individual/feic-individual/feic-individual.component.ts ***!
  \*******************************************************************************/
/*! exports provided: FeicIndividualComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeicIndividualComponent", function() { return FeicIndividualComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/__ivy_ngcc__/fesm2015/ngx-toastr.js");
/* harmony import */ var src_app_services_mysql_mysql_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/mysql/mysql.service */ "./src/app/services/mysql/mysql.service.ts");








class FeicIndividualComponent {
    constructor(mysqlService, toastr) {
        this.mysqlService = mysqlService;
        this.toastr = toastr;
        this.createProfile = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            inputNombre: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]),
            inputNit: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]),
            inputDireccion1: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]),
            inputDireccion2: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]),
            inputMunicipio: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]),
            inputTipoNegocio: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]),
            inputPais: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]),
            inputDepartamento: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]),
        });
    }
    CreateProfile() {
        // console.log(this.createCustomer.value);
        this.mysqlService.CreateUser(this.createProfile.value).subscribe((response) => {
            this.toastr.success('Correo Enviado', 'Enviado!');
            console.log('sucess');
            this.createProfile.reset({});
        }, (error) => {
            this.toastr.error('Verificar informaci??n del formulario.', 'Oops!');
            console.log('error');
        });
    }
    ngOnInit() {
    }
}
FeicIndividualComponent.??fac = function FeicIndividualComponent_Factory(t) { return new (t || FeicIndividualComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["????directiveInject"](src_app_services_mysql_mysql_service__WEBPACK_IMPORTED_MODULE_3__["MysqlService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["????directiveInject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"])); };
FeicIndividualComponent.??cmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????defineComponent"]({ type: FeicIndividualComponent, selectors: [["app-feic-individual"]], decls: 448, vars: 2, consts: [[1, "row", "mt-4"], [1, "col-md-6"], ["src", "/assets/images/logo.png", "alt", "solucredits", "width", "auto", "height", "80%", 1, "ml-5"], [1, "row"], [1, "col-sm-12"], [1, "card"], [1, "card-header", 2, "background-color", "#3473da"], [1, "card-title", "mb-0", "text-white"], [1, "form-horizontal", 3, "formGroup", "ngSubmit"], [1, "card-body"], [1, "card-title"], [1, "col-lg-4", "col-md-4", "col-sm-12"], ["for", "inputNombre", 1, "col-sm-12"], [1, "col-sm-12", 2, "padding-top", "7px"], [1, "form-check", "form-check-inline"], [1, "custom-control", "custom-radio"], ["type", "radio", "id", "customControlValidation2", "name", "radio-stacked", 1, "custom-control-input"], ["for", "customControlValidation2", 1, "custom-control-label"], ["type", "radio", "id", "customControlValidation3", "name", "radio-stacked", 1, "custom-control-input"], ["for", "customControlValidation3", 1, "custom-control-label"], [1, "col-lg-8", "col-md-8", "col-sm-12"], ["type", "text", "aria-label", "Username", "id", "inputNombre", "formControlName", "inputNombre", "required", "", 1, "form-control"], [1, "col-lg-3", "col-md-3", "col-sm-12"], ["id", "inlineFormCustomSelect", 1, "custom-select", "mr-sm-2"], ["selected", ""], ["value", "1"], ["value", "2"], ["value", "3"], ["type", "date", 1, "form-control"], [1, "col-lg-2", "col-md-4", "col-sm-12"], [1, "row", "mt-3"], ["type", "radio", "id", "customControlValidation4", "name", "gender", 1, "custom-control-input"], ["for", "customControlValidation4", 1, "custom-control-label"], ["type", "radio", "id", "customControlValidation5", "name", "gender", 1, "custom-control-input"], ["for", "customControlValidation5", 1, "custom-control-label"], ["type", "text", "maxlength", "13", "minlength", "8", "aria-label", "Username", "id", "inputNombre", "formControlName", "inputNombre", "required", "", 1, "form-control"], ["rows", "3", "placeholder", "Agregar descripci\u00F3n...", 1, "form-control"], [1, "col-lg-6", "col-md-6", "col-sm-12"], ["type", "radio", "id", "customControlValidation8", "name", "pep1", 1, "custom-control-input"], ["for", "customControlValidation8", 1, "custom-control-label"], ["type", "radio", "id", "customControlValidation9", "name", "pep1", 1, "custom-control-input"], ["for", "customControlValidation9", 1, "custom-control-label"], ["type", "radio", "id", "customControlValidation6", "name", "pep", 1, "custom-control-input"], ["for", "customControlValidation6", 1, "custom-control-label"], ["type", "radio", "id", "customControlValidation7", "name", "pep", 1, "custom-control-input"], ["for", "customControlValidation7", 1, "custom-control-label"], [1, "input-group", "mb-3"], [1, "input-group-append"], [1, "input-group-text"], ["type", "number", "aria-label", "Username", "aria-describedby", "basic-addon1", 1, "form-control"], ["for", "addBtn", 1, "col-sm-12"], ["type", "button", "id", "addBtn", 1, "btn", "btn-primary", "btn-raised", "mr-1"], [1, "table-responsive"], [1, "table"], ["scope", "col"], ["scope", "row"], ["type", "button", 1, "btn", "btn-danger", "waves-effect", "btn-rounded", "waves-light"], [1, "fas", "fa-trash-alt"], ["type", "number", "aria-label", "Username", "id", "inputNombre", "formControlName", "inputNombre", "required", "", 1, "form-control"], [1, "card-block"], [1, "form-group", "m-b-0", "text-right"], ["type", "submit", 1, "btn", "btn-success", "btn-raised", "mr-1", 3, "disabled"], ["type", "submit", 1, "btn", "btn-dark", "waves-effect", "waves-light"]], template: function FeicIndividualComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](2, "img", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](3, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](4, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](5, "SOLUCIONES CREDITICIAS S.A.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](6, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](7, " Avenida Las Am\u00E9ricas, 8-42 Zona 13, Edificio Am\u00E9ricas 10, Nivel 9, Oficina 902 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](8, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](9, " Guatemala, Guatemala ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](10, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](11, " PBX.: 2301 4400 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](12, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](13, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](14, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](15, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](16, "h4", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](17, "Formulario electr\u00F3nico de informaci\u00F3n del cliente (FEIC)");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](18, "form", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngSubmit", function FeicIndividualComponent_Template_form_ngSubmit_18_listener() { return ctx.CreateProfile(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](19, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](20, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](21, "h4", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](22, "I. Tipo de actuaci\u00F3n del cliente");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](23, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](24, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](25, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](26, "\u00BFEl cliente act\u00FAa en nombre propio?");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](27, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](28, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](29, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](30, "input", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](31, "label", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](32, "Si");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](33, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](34, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](35, "input", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](36, "label", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](37, "No");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](38, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](39, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](40, "Calidad con que act\u00FAa");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](41, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](42, "input", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](43, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](44, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](45, "h4", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](46, "II. Lugar y fecha");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](47, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](48, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](49, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](50, "Pa\u00EDs");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](51, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](52, "select", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](53, "option", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](54, "Seleccione...");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](55, "option", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](56, "Guatemala");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](57, "option", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](58, "El Salvador");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](59, "option", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](60, "M\u00E9xico");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](61, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](62, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](63, "Departamento");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](64, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](65, "select", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](66, "option", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](67, "Seleccione...");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](68, "option", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](69, "Guatemala");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](70, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](71, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](72, "Municipio");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](73, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](74, "select", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](75, "option", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](76, "Seleccione...");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](77, "option", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](78, "Guatemala");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](79, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](80, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](81, "Fecha");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](82, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](83, "input", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](84, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](85, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](86, "h4", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](87, "III. Datos personales");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](88, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](89, "h6", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](90, "Informaci\u00F3n del cliente");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](91, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](92, "div", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](93, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](94, "Primer apellido");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](95, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](96, "input", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](97, "div", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](98, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](99, "Segundo apellido");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](100, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](101, "input", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](102, "div", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](103, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](104, "Apellido casada");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](105, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](106, "input", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](107, "div", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](108, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](109, "Primer nombre");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](110, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](111, "input", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](112, "div", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](113, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](114, "Segundo nombre");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](115, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](116, "input", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](117, "div", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](118, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](119, "Otros nombres");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](120, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](121, "input", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](122, "div", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](123, "div", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](124, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](125, "Fecha de nacimiento");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](126, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](127, "input", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](128, "div", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](129, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](130, "Pa\u00EDs nacimiento");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](131, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](132, "input", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](133, "div", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](134, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](135, "Departamento nacimiento");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](136, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](137, "input", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](138, "div", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](139, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](140, "Municipio nacimiento");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](141, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](142, "input", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](143, "div", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](144, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](145, "Condici\u00F3n migratoria");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](146, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](147, "input", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](148, "div", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](149, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](150, "Especifique");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](151, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](152, "input", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](153, "div", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](154, "div", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](155, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](156, "Sexo");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](157, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](158, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](159, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](160, "input", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](161, "label", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](162, "Femenino");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](163, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](164, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](165, "input", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](166, "label", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](167, "Masculino");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](168, "div", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](169, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](170, "Estado civil");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](171, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](172, "input", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](173, "div", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](174, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](175, "Profesi\u00F3n u oficio");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](176, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](177, "input", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](178, "div", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](179, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](180, "Docto. identificaci\u00F3n");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](181, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](182, "input", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](183, "div", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](184, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](185, "N\u00FAmero identificaci\u00F3n");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](186, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](187, "input", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](188, "div", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](189, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](190, "Pa\u00EDs (Pasaporte)");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](191, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](192, "input", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](193, "div", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](194, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](195, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](196, "NIT");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](197, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](198, "input", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](199, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](200, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](201, "Correo electr\u00F3nico");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](202, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](203, "input", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](204, "div", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](205, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](206, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](207, "Direcci\u00F3n de residencia completa (calle o avenida, n\u00FAmero de casa, colonia, sector, lote, manzana, otros)");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](208, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](209, "textarea", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](210, "div", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](211, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](212, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](213, "Pa\u00EDs");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](214, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](215, "input", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](216, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](217, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](218, "Departamento");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](219, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](220, "input", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](221, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](222, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](223, "Municipio");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](224, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](225, "input", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](226, "div", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](227, "div", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](228, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](229, "Pa\u00EDs");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](230, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](231, "input", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](232, "div", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](233, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](234, "Tel\u00E9fono");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](235, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](236, "input", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](237, "div", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](238, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](239, " \u00BFEl cliente es PEP, tiene parentesco o es asociado cercano a una PEP? \u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](240, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](241, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](242, "input", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](243, "label", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](244, "Si");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](245, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](246, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](247, "input", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](248, "label", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](249, "No");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](250, "div", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](251, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](252, " \u00BFEl cliente es CPE? \u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](253, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](254, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](255, "input", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](256, "label", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](257, "Si");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](258, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](259, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](260, "input", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](261, "label", 45);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](262, "No");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](263, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](264, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](265, "h4", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](266, "IV. Informaci\u00F3n econ\u00F3mica del cliente");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](267, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](268, "div", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](269, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](270, "Monto mensual aproximado de los ingresos considerando todas las actividades econ\u00F3micas a las que se dedica (monto en quetzales)");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](271, "div", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](272, "div", 46);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](273, "div", 47);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](274, "span", 48);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](275, "GTQ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](276, "input", 49);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](277, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](278, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](279, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](280, "Fuente de ingresos");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](281, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](282, "select", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](283, "option", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](284, "Seleccione...");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](285, "option", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](286, "Negocio propio");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](287, "option", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](288, "Relaci\u00F3n de dependencia");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](289, "option", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](290, "Otras fuentes de ingreso");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](291, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](292, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](293, "Nombre comercial");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](294, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](295, "input", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](296, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](297, "label", 50);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](298, "\u00A0");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](299, "button", 51);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](300, "Agregar");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](301, "div", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](302, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](303, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](304, "div", 52);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](305, "table", 53);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](306, "thead");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](307, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](308, "th", 54);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](309, "#");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](310, "th", 54);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](311, "Fuente de ingreso");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](312, "th", 54);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](313, "Nombre");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](314, "th", 54);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](315, "Acci\u00F3n");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](316, "tbody");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](317, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](318, "th", 55);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](319, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](320, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](321, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](322, "button", 56);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](323, "i", 57);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](324, "div", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](325, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](326, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](327, "Pr\u00F3posito de la relaci\u00F3n de negocios");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](328, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](329, "textarea", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](330, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](331, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](332, "h4", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](333, "V. Productos y/o servicios");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](334, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](335, "div", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](336, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](337, "Tipo ingreso");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](338, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](339, "select", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](340, "option", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](341, "Seleccione...");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](342, "option", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](343, "Perfil inicial");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](344, "option", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](345, "Actualizaci\u00F3n de perfil");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](346, "div", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](347, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](348, "Fecha");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](349, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](350, "input", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](351, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](352, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](353, "h4", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](354, "VI. Perfil econ\u00F3mico y transaccional");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](355, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](356, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](357, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](358, "Fecha de elaboraci\u00F3n del perfil");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](359, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](360, "input", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](361, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](362, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](363, "Producto y/o servicio");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](364, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](365, "input", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](366, "div", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](367, "div", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](368, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](369, "Moneda");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](370, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](371, "select", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](372, "option", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](373, "Seleccione...");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](374, "option", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](375, "Perfil inicial");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](376, "option", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](377, "Actualizaci\u00F3n de perfil");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](378, "div", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](379, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](380, "Monto promedio mensual (6 meses)");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](381, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](382, "input", 58);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](383, "div", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](384, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](385, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](386, "Principales ubicaciones geogr\u00E1ficas (pa\u00EDs)");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](387, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](388, "select", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](389, "option", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](390, "Seleccione...");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](391, "option", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](392, "Negocio propio");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](393, "option", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](394, "Relaci\u00F3n de dependencia");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](395, "option", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](396, "Otras fuentes de ingreso");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](397, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](398, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](399, "Departamento");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](400, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](401, "input", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](402, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](403, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](404, "Municipio");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](405, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](406, "input", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](407, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](408, "label", 50);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](409, "\u00A0");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](410, "button", 51);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](411, "Agregar");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](412, "div", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](413, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](414, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](415, "div", 52);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](416, "table", 53);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](417, "thead");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](418, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](419, "th", 54);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](420, "#");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](421, "th", 54);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](422, "Pa\u00EDs");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](423, "th", 54);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](424, "Departamento");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](425, "th", 54);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](426, "Municipio");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](427, "th", 54);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](428, "Acci\u00F3n");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](429, "tbody");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](430, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](431, "th", 55);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](432, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](433, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](434, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](435, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](436, "button", 56);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](437, "i", 57);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](438, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](439, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](440, "div", 59);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](441, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](442, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](443, "div", 60);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](444, "button", 61);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](445, "Registrar");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](446, "button", 62);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](447, "Cancelar");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("formGroup", ctx.createProfile);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](426);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("disabled", !ctx.createProfile.valid);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["??angular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroupDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControlName"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["RequiredValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgSelectOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["??angular_packages_forms_forms_x"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["MaxLengthValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["MinLengthValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NumberValueAccessor"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2Zvcm1zL2luZGl2aWR1YWwvZmVpYy1pbmRpdmlkdWFsL2ZlaWMtaW5kaXZpZHVhbC5jb21wb25lbnQuY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["??setClassMetadata"](FeicIndividualComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-feic-individual',
                templateUrl: './feic-individual.component.html',
                styleUrls: ['./feic-individual.component.css']
            }]
    }], function () { return [{ type: src_app_services_mysql_mysql_service__WEBPACK_IMPORTED_MODULE_3__["MysqlService"] }, { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/forms/individual/feic-individual/feic-individual.module.ts":
/*!****************************************************************************!*\
  !*** ./src/app/forms/individual/feic-individual/feic-individual.module.ts ***!
  \****************************************************************************/
/*! exports provided: FeicIndividualModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeicIndividualModule", function() { return FeicIndividualModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/__ivy_ngcc__/fesm2015/ng-bootstrap.js");
/* harmony import */ var _feic_individual_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./feic-individual.component */ "./src/app/forms/individual/feic-individual/feic-individual.component.ts");








const routes = [
    {
        path: '',
        data: {
            title: 'FEIC',
            urls: [
                { title: 'FEIC', url: '/feic-individual' },
                { title: 'Formulario' },
            ],
        },
        component: _feic_individual_component__WEBPACK_IMPORTED_MODULE_5__["FeicIndividualComponent"],
    },
];
class FeicIndividualModule {
}
FeicIndividualModule.??mod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????defineNgModule"]({ type: FeicIndividualModule });
FeicIndividualModule.??inj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????defineInjector"]({ factory: function FeicIndividualModule_Factory(t) { return new (t || FeicIndividualModule)(); }, imports: [[
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes),
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["????setNgModuleScope"](FeicIndividualModule, { declarations: [_feic_individual_component__WEBPACK_IMPORTED_MODULE_5__["FeicIndividualComponent"]], imports: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
        _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["??setClassMetadata"](FeicIndividualModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
                    _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes),
                    _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModule"],
                ],
                declarations: [_feic_individual_component__WEBPACK_IMPORTED_MODULE_5__["FeicIndividualComponent"]],
            }]
    }], null, null); })();


/***/ })

}]);
//# sourceMappingURL=forms-individual-feic-individual-feic-individual-module-es2015.js.map