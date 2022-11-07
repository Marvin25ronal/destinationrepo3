(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "./src/app/services/formularios/empresa/perfil.service.ts":
/*!****************************************************************!*\
  !*** ./src/app/services/formularios/empresa/perfil.service.ts ***!
  \****************************************************************/
/*! exports provided: PerfilService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PerfilService", function() { return PerfilService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");






const httpOptions = {
    headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
        'Content-Type': 'application/json',
    }),
    responseType: 'json',
    //withCredentials: true as const,  
    observe: 'response'
};
class PerfilService {
    constructor(http) {
        this.http = http;
    }
    saveForm(newform, idApplication) {
        const uri = `${src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].urlCrearFormularioPerfil}`;
        let body = {
            idCustomer: 1,
            idApplication: idApplication,
            profileForm: newform
        };
        return this.http.post(uri, body, httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])((response) => {
            //console.log('RESP saveFOrm');
            //console.log(response);
            return response.body.data;
        }));
    }
    getForm(idSolicitud, idCustomer) {
        const uri = `${src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].urlCrearFormularioPerfil}?idapplication=${idSolicitud}&idcustomer=${idCustomer}`;
        return this.http.get(uri, httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])((response) => {
            //console.log('RESP getFOrm');
            //console.log(response);
            return response.body.data;
        }));
    }
}
PerfilService.ɵfac = function PerfilService_Factory(t) { return new (t || PerfilService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); };
PerfilService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: PerfilService, factory: PerfilService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PerfilService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "./src/app/services/formularios/individua/solicitud.service.ts":
/*!*********************************************************************!*\
  !*** ./src/app/services/formularios/individua/solicitud.service.ts ***!
  \*********************************************************************/
/*! exports provided: SolicitudService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SolicitudService", function() { return SolicitudService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");






const httpOptions = {
    headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
        'Content-Type': 'application/json',
    }),
    responseType: 'json',
    //withCredentials: true as const,  
    observe: 'response'
};
class SolicitudService {
    constructor(http) {
        this.http = http;
    }
    getForm(applicationID) {
        const uri = `${src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].urlCrearSolitudInidvidual}?idapplication=${applicationID}`;
        return this.http.get(uri, httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(resp => {
            //console.log(resp);
            return resp.body.data;
        }));
    }
    saveForm(newform, idAplication, formType) {
        //console.log('IDAPLICATION::',idAplication);
        newform.form_type_id = formType;
        const uri = `${src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].urlCrearSolitudInidvidual}`;
        let body = {
            idCustomer: 1,
            idAplication: idAplication,
            applicationForm: newform
        };
        let re = this.http.post(uri, body, httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])((response) => {
            //console.log(response);
            return response.body.data;
        }));
        //console.log(re);
        return re;
    }
}
SolicitudService.ɵfac = function SolicitudService_Factory(t) { return new (t || SolicitudService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); };
SolicitudService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: SolicitudService, factory: SolicitudService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SolicitudService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }]; }, null); })();


/***/ })

}]);
//# sourceMappingURL=common-es2015.js.map