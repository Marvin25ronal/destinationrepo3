(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["form-edit-view-person-edit-view-person-module"],{

/***/ "./src/app/form/edit-view-person/edit-view-person.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/form/edit-view-person/edit-view-person.component.ts ***!
  \*********************************************************************/
/*! exports provided: EditViewPersonComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditViewPersonComponent", function() { return EditViewPersonComponent; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/__ivy_ngcc__/fesm2015/ngx-toastr.js");
/* harmony import */ var _services_mysql_mysql_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/mysql/mysql.service */ "./src/app/services/mysql/mysql.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/__ivy_ngcc__/fesm2015/ngx-spinner.js");














function EditViewPersonComponent_small_26_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](0, "small", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["????text"](1, "El nombre es requerido.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
} }
function EditViewPersonComponent_small_57_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](0, "small", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["????text"](1, "El nombre es requerido.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
} }
function EditViewPersonComponent_small_85_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](0, "small", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["????text"](1, "El DPI es requerido.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
} }
function EditViewPersonComponent_small_101_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](0, "small", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["????text"](1, "Seleccione un genero.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
} }
function EditViewPersonComponent_small_112_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](0, "small", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["????text"](1, "La fecha de nacimiento es requerida.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
} }
function EditViewPersonComponent_small_125_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](0, "small", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["????text"](1, "Ingresar un correo electr\u00F3nico v\u00E1lido.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
} }
function EditViewPersonComponent_small_135_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](0, "small", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["????text"](1, "El n\u00FAmero de celular es requerido.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
} }
function EditViewPersonComponent_small_145_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](0, "small", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["????text"](1, "El n\u00FAmero debe contener 8 digitos.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
} }
function EditViewPersonComponent_small_155_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](0, "small", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["????text"](1, "El n\u00FAmero debe contener 8 digitos.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
} }
function EditViewPersonComponent_small_165_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](0, "small", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["????text"](1, "La direcci\u00F3n es requerida.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
} }
class EditViewPersonComponent {
    constructor(activatedRoute, mysqlService, datepipe, toastr, router, spinner) {
        this.activatedRoute = activatedRoute;
        this.mysqlService = mysqlService;
        this.datepipe = datepipe;
        this.toastr = toastr;
        this.router = router;
        this.spinner = spinner;
        this.viewform = false;
        this.editPersonform = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
            first_name: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]),
            last_name: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]),
            name2: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](''),
            name3: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](''),
            lastname2: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](''),
            lastname3: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](''),
            gender: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]("", []),
            birthdate: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, []),
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].email]),
            mobile_phone: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, [
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(8),
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(8),
            ]),
            home_phone: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]("", [
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(8),
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(8),
            ]),
            office_home: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]("", [
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(8),
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(8),
            ]),
            address: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', []),
            DPI: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, [
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern("(^[0-9]{13})"),
            ]),
        });
    }
    editPerson() {
        if (!this.editPersonform.value.home_phone) {
            delete this.editPersonform.value.home_phone;
        }
        if (!this.editPersonform.value.office_home) {
            delete this.editPersonform.value.office_home;
        }
        this.mysqlService
            .UpdatePerson(this.editPersonform.value, this.peron_id)
            .subscribe((response) => {
            this.toastr.success("La informaci??n fue guardada con exito.", "Informaci??n Guardada!");
            console.log("sucess");
        }, (error) => {
            this.toastr.error("Verificar informaci??n del formulario.", "Oops!");
            console.log("error");
        });
    }
    getDataCurrentPerson() {
        this.mysqlService.GetOnePerson(this.peron_id).subscribe((response) => {
            this.editPersonform.patchValue({
                first_name: response.data.first_name,
                name2: response.data.name2,
                name3: response.data.name3,
                lastname2: response.data.lastname2,
                lastname3: response.data.lastname3,
                last_name: response.data.last_name,
                gender: response.data.gender,
                birthdate: this.datepipe.transform(response.data.birthdate, "yyyy-MM-dd"),
                email: response.data.email,
                mobile_phone: response.data.mobile_phone,
                home_phone: response.data.home_phone,
                office_home: response.data.office_home,
                address: response.data.address,
                DPI: response.data.DPI,
            });
            this.spinner.hide();
        }, (error) => {
            console.log(error);
        });
    }
    BackPerson() {
        if (this.activatedRoute.snapshot.url.length > 0) {
            if (this.activatedRoute.snapshot.url[0].path !== undefined &&
                this.activatedRoute.snapshot.url[0].path === "cliente") {
                this.router.navigate([`/customer/cliente/${this.customer_id}`]);
            }
        }
        else {
            this.router.navigate([`/customer`]);
        }
    }
    ngOnInit() {
        this.spinner.show();
        this.peron_id = this.activatedRoute.snapshot.params.id;
        this.type = this.activatedRoute.snapshot.params.type;
        if (this.activatedRoute.snapshot.url.length > 0) {
            if (this.activatedRoute.snapshot.url[0].path !== undefined &&
                this.activatedRoute.snapshot.url[0].path === "cliente") {
                this.customer_id = this.activatedRoute.snapshot.params.id_cliente;
                this.activatedRoute.snapshot.data.urls[1].url = `/customer/cliente/${this.customer_id}`;
            }
        }
        if (this.type === "view") {
            this.title = "Ver informaci??n del Representante";
            this.getDataCurrentPerson();
            this.editPersonform.get("first_name").disable();
            this.editPersonform.get("name2").disable();
            this.editPersonform.get("name3").disable();
            this.editPersonform.get("last_name").disable();
            this.editPersonform.get("lastname2").disable();
            this.editPersonform.get("lastname3").disable();
            this.editPersonform.get("gender").disable();
            this.editPersonform.get("birthdate").disable();
            this.editPersonform.get("email").disable();
            this.editPersonform.get("mobile_phone").disable();
            this.editPersonform.get("home_phone").disable();
            this.editPersonform.get("office_home").disable();
            this.editPersonform.get("address").disable();
            this.editPersonform.get("DPI").disable();
            this.viewform = true;
        }
        else if (this.type === "edit") {
            this.title = "Editar informaci??n del Representante";
            this.getDataCurrentPerson();
            this.editPersonform.get("first_name").enable();
            this.editPersonform.get("name2").enable();
            this.editPersonform.get("name3").enable();
            this.editPersonform.get("last_name").enable();
            this.editPersonform.get("lastname2").enable();
            this.editPersonform.get("lastname3").enable();
            this.editPersonform.get("gender").enable();
            this.editPersonform.get("birthdate").enable();
            this.editPersonform.get("email").enable();
            this.editPersonform.get("mobile_phone").enable();
            this.editPersonform.get("home_phone").enable();
            this.editPersonform.get("office_home").enable();
            this.editPersonform.get("address").enable();
            this.editPersonform.get("DPI").enable();
        }
    }
}
EditViewPersonComponent.??fac = function EditViewPersonComponent_Factory(t) { return new (t || EditViewPersonComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["????directiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["????directiveInject"](_services_mysql_mysql_service__WEBPACK_IMPORTED_MODULE_5__["MysqlService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["????directiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_0__["DatePipe"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["????directiveInject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["????directiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["????directiveInject"](ngx_spinner__WEBPACK_IMPORTED_MODULE_6__["NgxSpinnerService"])); };
EditViewPersonComponent.??cmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["????defineComponent"]({ type: EditViewPersonComponent, selectors: [["app-edit-view-person"]], decls: 173, vars: 14, consts: [[1, "row"], [1, "col-sm-12"], [1, "card"], [1, "card-header", 2, "background", "linear-gradient(to right, #2061c4 0%, #4382eb 100%)"], [1, "card-title", "mb-0", "text-white"], [1, "card-body"], ["bdColor", "rgba(51,51,51,0.8)", "size", "medium", "color", "#759ee0", "type", "ball-scale-multiple"], [2, "font-size", "20px", "color", "#fff"], [1, "card-block"], [1, "form-horizontal", 3, "formGroup", "ngSubmit"], [1, "col-sm-12", "col-lg-3"], [1, "form-group", "row"], ["for", "first_name", 1, "col-sm-12"], [2, "font-size", "16px"], [1, "input-group", "col-sm-12"], [1, "input-group-prepend"], ["id", "basic-addon1", 1, "input-group-text"], [1, "far", "fa-user"], ["type", "text", "aria-label", "Username", "id", "first_name", "formControlName", "first_name", "required", "", "placeholder", "Ej. Roberto Ariel", 1, "form-control"], ["class", "form-text text-danger col-sm-12", 4, "ngIf"], ["type", "text", "aria-label", "Username", "id", "name2", "formControlName", "name2", "placeholder", "Ej. Roberto", 1, "form-control"], ["type", "text", "aria-label", "Username", "id", "name3", "formControlName", "name3", "placeholder", "Ej. Roberto Ariel", 1, "form-control"], ["type", "text", "aria-label", "Username", "id", "last_name", "formControlName", "last_name", "required", "", "placeholder", "Ej. Roberto Ariel", 1, "form-control"], ["for", "last_name", 1, "col-sm-12"], ["type", "text", "aria-label", "Username", "id", "lastname2", "formControlName", "lastname2", "placeholder", "Ej. Jimenez", 1, "form-control"], ["type", "text", "aria-label", "Username", "id", "lastname3", "formControlName", "lastname3", "placeholder", "Ej. Jimenez Ramirez", 1, "form-control"], [1, "col-sm-12", "col-lg-6"], ["for", "DPI", 1, "col-sm-12"], [1, "far", "fa-address-card"], ["type", "text", "aria-label", "Username", "id", "DPI", "maxlength", "13", "formControlName", "DPI", "placeholder", "Ej. 2743984710101", 1, "form-control"], ["for", "gender", 1, "col-sm-12"], ["_ngcontent-bpb-c164", "", 1, "input-group-prepend"], ["_ngcontent-bpb-c164", "", "for", "inputGroupSelect01", 1, "input-group-text"], [1, "fas", "fa-venus-mars"], ["id", "gender", "formControlName", "gender", 1, "custom-select", "col-sm-12"], ["value", "", "selected", "", "disabled", ""], ["value", "0"], ["value", "1"], ["for", "birthdate", 1, "col-sm-12"], [1, "fas", "fa-calendar-alt"], ["type", "date", "id", "birthdate", "formControlName", "birthdate", 1, "form-control"], ["for", "email", 1, "col-sm-12"], [1, "fas", "fa-envelope"], ["type", "email", "id", "email", "formControlName", "email", "required", "", "placeholder", "Ej. email@email.com", 1, "form-control"], ["for", "mobile_phone", 1, "col-sm-12"], [1, "fas", "fa-mobile-alt"], ["type", "tel", "id", "mobile_phone", "maxlength", "8", "formControlName", "mobile_phone", "placeholder", "Ej. 45826578", 1, "form-control"], ["for", "home_phone", 1, "col-sm-12"], [1, "fas", "fa-phone"], ["type", "tel", "id", "home_phone", "formControlName", "home_phone", "minlength", "8", "maxlength", "8", "placeholder", "Ej. 24536987", 1, "form-control"], ["for", "office_home", 1, "col-sm-12"], ["type", "tel", "id", "office_home", "formControlName", "office_home", "minlength", "8", "maxlength", "8", "placeholder", "Ej. 24536987", 1, "form-control"], ["for", "address", 1, "col-sm-12"], [1, "far", "fa-address-book"], ["type", "text", "id", "address", "formControlName", "address", "placeholder", "Ej. 8va. calle 35-40 zona 4, Mixco, Guatemala", 1, "form-control"], [1, "form-group", "m-b-0", "text-left"], ["type", "submit", 1, "btn", "btn-raised", "mr-1", "text-white", 2, "background-color", "#3473da", 3, "hidden", "disabled"], ["type", "", 1, "btn", "btn-gray", "waves-effect", "waves-light", 3, "click"], [1, "form-text", "text-danger", "col-sm-12"]], template: function EditViewPersonComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](4, "h4", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????text"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](7, "ngx-spinner", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](8, "p", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????text"](9, "Cargando Informaci\u00F3n...");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](10, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](11, "form", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????listener"]("ngSubmit", function EditViewPersonComponent_Template_form_ngSubmit_11_listener() { return ctx.editPerson(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](12, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](13, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](14, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](15, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](16, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????text"](17, "Primer nombre ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](18, "code", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](19, "sup");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????text"](20, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](21, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](22, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](23, "span", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????element"](24, "i", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????element"](25, "input", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????template"](26, EditViewPersonComponent_small_26_Template, 2, 0, "small", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](27, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](28, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](29, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????text"](30, "Segundo nombre ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](31, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](32, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](33, "span", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????element"](34, "i", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????element"](35, "input", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](36, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](37, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](38, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????text"](39, "Tercer nombre ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](40, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](41, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](42, "span", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????element"](43, "i", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????element"](44, "input", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](45, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](46, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](47, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????text"](48, "Primer apellido ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](49, "code", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](50, "sup");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????text"](51, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](52, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](53, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](54, "span", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????element"](55, "i", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????element"](56, "input", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????template"](57, EditViewPersonComponent_small_57_Template, 2, 0, "small", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](58, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](59, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](60, "label", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????text"](61, "Segundo apellido ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](62, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](63, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](64, "span", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????element"](65, "i", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????element"](66, "input", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](67, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](68, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](69, "label", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????text"](70, "Apellido de casada ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](71, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](72, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](73, "span", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????element"](74, "i", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????element"](75, "input", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](76, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](77, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](78, "label", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????text"](79, "DPI");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](80, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](81, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](82, "span", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????element"](83, "i", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????element"](84, "input", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????template"](85, EditViewPersonComponent_small_85_Template, 2, 0, "small", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](86, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](87, "label", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????text"](88, "Seleccionar G\u00E9nero");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](89, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](90, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](91, "div", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](92, "label", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????element"](93, "i", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](94, "select", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](95, "option", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????text"](96, "Selecionar...");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](97, "option", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????text"](98, "Femenino");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](99, "option", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????text"](100, "Masculino");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????template"](101, EditViewPersonComponent_small_101_Template, 2, 0, "small", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](102, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](103, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](104, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](105, "label", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????text"](106, "Fecha de nacimiento");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](107, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](108, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](109, "span", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????element"](110, "i", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????element"](111, "input", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????template"](112, EditViewPersonComponent_small_112_Template, 2, 0, "small", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](113, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](114, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](115, "label", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????text"](116, "Correo electr\u00F3nico ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](117, "code", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](118, "sup");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????text"](119, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](120, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](121, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](122, "span", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????element"](123, "i", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????element"](124, "input", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????template"](125, EditViewPersonComponent_small_125_Template, 2, 0, "small", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](126, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](127, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](128, "label", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????text"](129, "N\u00FAmero de celular");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](130, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](131, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](132, "span", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????element"](133, "i", 45);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????element"](134, "input", 46);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????template"](135, EditViewPersonComponent_small_135_Template, 2, 0, "small", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](136, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](137, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](138, "label", 47);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????text"](139, "N\u00FAmero de casa");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](140, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](141, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](142, "span", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????element"](143, "i", 48);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????element"](144, "input", 49);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????template"](145, EditViewPersonComponent_small_145_Template, 2, 0, "small", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](146, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](147, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](148, "label", 50);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????text"](149, "N\u00FAmero de oficina");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](150, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](151, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](152, "span", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????element"](153, "i", 48);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????element"](154, "input", 51);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????template"](155, EditViewPersonComponent_small_155_Template, 2, 0, "small", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](156, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](157, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](158, "label", 52);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????text"](159, "Direcci\u00F3n");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](160, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](161, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](162, "span", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????element"](163, "i", 53);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????element"](164, "input", 54);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????template"](165, EditViewPersonComponent_small_165_Template, 2, 0, "small", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????element"](166, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](167, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](168, "div", 55);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](169, "button", 56);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????text"](170, "Guardar");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementStart"](171, "a", 57);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????listener"]("click", function EditViewPersonComponent_Template_a_click_171_listener() { return ctx.BackPerson(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????text"](172, "Regresar");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????elementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????advance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????textInterpolate"](ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????advance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????property"]("formGroup", ctx.editPersonform);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????advance"](15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????property"]("ngIf", !ctx.editPersonform.get("first_name").valid && (ctx.editPersonform.get("first_name").dirty || ctx.editPersonform.get("first_name").touched));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????advance"](31);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????property"]("ngIf", !ctx.editPersonform.get("last_name").valid && (ctx.editPersonform.get("last_name").dirty || ctx.editPersonform.get("last_name").touched));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????advance"](28);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????property"]("ngIf", !ctx.editPersonform.get("DPI").valid && (ctx.editPersonform.get("DPI").dirty || ctx.editPersonform.get("DPI").touched));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????advance"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????property"]("ngIf", !ctx.editPersonform.get("gender").valid && (ctx.editPersonform.get("gender").dirty || ctx.editPersonform.get("gender").touched));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????advance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????property"]("ngIf", !ctx.editPersonform.get("birthdate").valid && (ctx.editPersonform.get("birthdate").dirty || ctx.editPersonform.get("birthdate").touched));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????advance"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????property"]("ngIf", !ctx.editPersonform.get("email").valid && (ctx.editPersonform.get("email").dirty || ctx.editPersonform.get("email").touched));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????advance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????property"]("ngIf", !ctx.editPersonform.get("mobile_phone").valid && (ctx.editPersonform.get("mobile_phone").dirty || ctx.editPersonform.get("mobile_phone").touched));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????advance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????property"]("ngIf", !ctx.editPersonform.get("home_phone").valid && (ctx.editPersonform.get("home_phone").dirty || ctx.editPersonform.get("home_phone").touched));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????advance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????property"]("ngIf", !ctx.editPersonform.get("office_home").valid && (ctx.editPersonform.get("office_home").dirty || ctx.editPersonform.get("office_home").touched));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????advance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????property"]("ngIf", !ctx.editPersonform.get("address").valid && (ctx.editPersonform.get("address").dirty || ctx.editPersonform.get("address").touched));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????advance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["????property"]("hidden", ctx.viewform)("disabled", !ctx.editPersonform.valid);
    } }, directives: [ngx_spinner__WEBPACK_IMPORTED_MODULE_6__["NgxSpinnerComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["??angular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroupDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControlName"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["RequiredValidator"], _angular_common__WEBPACK_IMPORTED_MODULE_0__["NgIf"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["MaxLengthValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["SelectControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgSelectOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["??angular_packages_forms_forms_x"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["MinLengthValidator"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2Zvcm0vZWRpdC12aWV3LXBlcnNvbi9lZGl0LXZpZXctcGVyc29uLmNvbXBvbmVudC5jc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["??setClassMetadata"](EditViewPersonComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: "app-edit-view-person",
                templateUrl: "./edit-view-person.component.html",
                styleUrls: ["./edit-view-person.component.css"],
            }]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] }, { type: _services_mysql_mysql_service__WEBPACK_IMPORTED_MODULE_5__["MysqlService"] }, { type: _angular_common__WEBPACK_IMPORTED_MODULE_0__["DatePipe"] }, { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }, { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_6__["NgxSpinnerService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/form/edit-view-person/edit-view-person.module.ts":
/*!******************************************************************!*\
  !*** ./src/app/form/edit-view-person/edit-view-person.module.ts ***!
  \******************************************************************/
/*! exports provided: DashboardModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardModule", function() { return DashboardModule; });
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/__ivy_ngcc__/fesm2015/ng-bootstrap.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _edit_view_person_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./edit-view-person.component */ "./src/app/form/edit-view-person/edit-view-person.component.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/__ivy_ngcc__/fesm2015/ngx-spinner.js");









const routes = [
    {
        path: "",
        data: {
            title: "Informaci??n de Representante",
            urls: [
                { title: "Representante", url: "/new-person" },
                { title: "Informaci??n" },
            ],
        },
        component: _edit_view_person_component__WEBPACK_IMPORTED_MODULE_4__["EditViewPersonComponent"],
    },
    {
        path: "cliente/:id_cliente",
        data: {
            title: "Informaci??n de Representante",
            urls: [
                { title: "Listado de Clientes", url: "/list-customer" },
                { title: "Cliente", url: "/new-person" },
                { title: "Detalle del Representante" },
            ],
        },
        component: _edit_view_person_component__WEBPACK_IMPORTED_MODULE_4__["EditViewPersonComponent"],
    },
];
class DashboardModule {
}
DashboardModule.??mod = _angular_core__WEBPACK_IMPORTED_MODULE_5__["????defineNgModule"]({ type: DashboardModule });
DashboardModule.??inj = _angular_core__WEBPACK_IMPORTED_MODULE_5__["????defineInjector"]({ factory: function DashboardModule_Factory(t) { return new (t || DashboardModule)(); }, imports: [[
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes),
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_0__["NgbModule"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_6__["NgxSpinnerModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["????setNgModuleScope"](DashboardModule, { declarations: [_edit_view_person_component__WEBPACK_IMPORTED_MODULE_4__["EditViewPersonComponent"]], imports: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
        _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_0__["NgbModule"],
        ngx_spinner__WEBPACK_IMPORTED_MODULE_6__["NgxSpinnerModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_5__["??setClassMetadata"](DashboardModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_5__["NgModule"],
        args: [{
                imports: [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
                    _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes),
                    _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_0__["NgbModule"],
                    ngx_spinner__WEBPACK_IMPORTED_MODULE_6__["NgxSpinnerModule"],
                ],
                declarations: [_edit_view_person_component__WEBPACK_IMPORTED_MODULE_4__["EditViewPersonComponent"]],
                schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["CUSTOM_ELEMENTS_SCHEMA"]],
            }]
    }], null, null); })();


/***/ })

}]);
//# sourceMappingURL=form-edit-view-person-edit-view-person-module-es2015.js.map