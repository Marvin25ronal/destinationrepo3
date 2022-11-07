(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["forms-individual-ive-productos-individual-ive-productos-individual-module"],{

/***/ "./src/app/forms/individual/ive-productos-individual/ive-productos-individual.component.ts":
/*!*************************************************************************************************!*\
  !*** ./src/app/forms/individual/ive-productos-individual/ive-productos-individual.component.ts ***!
  \*************************************************************************************************/
/*! exports provided: IveProductosIndividualComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IveProductosIndividualComponent", function() { return IveProductosIndividualComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


class IveProductosIndividualComponent {
    constructor() {
    }
    ngOnInit() {
    }
}
IveProductosIndividualComponent.ɵfac = function IveProductosIndividualComponent_Factory(t) { return new (t || IveProductosIndividualComponent)(); };
IveProductosIndividualComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: IveProductosIndividualComponent, selectors: [["app-ive-productos-individual"]], decls: 8, vars: 0, consts: [[1, "row"], [1, "col-sm-12"], [1, "card"], [1, "card-header", "bg-dark"], [1, "card-title", "mb-0", "text-white"], [1, "card-body"], [1, "card-block"]], template: function IveProductosIndividualComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "h4", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Formulario para inicio de relaciones");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2Zvcm1zL2luZGl2aWR1YWwvaXZlLXByb2R1Y3Rvcy1pbmRpdmlkdWFsL2l2ZS1wcm9kdWN0b3MtaW5kaXZpZHVhbC5jb21wb25lbnQuY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](IveProductosIndividualComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-ive-productos-individual',
                templateUrl: './ive-productos-individual.component.html',
                styleUrls: ['./ive-productos-individual.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/forms/individual/ive-productos-individual/ive-productos-individual.module.ts":
/*!**********************************************************************************************!*\
  !*** ./src/app/forms/individual/ive-productos-individual/ive-productos-individual.module.ts ***!
  \**********************************************************************************************/
/*! exports provided: IveProductosIndividualModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IveProductosIndividualModule", function() { return IveProductosIndividualModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/__ivy_ngcc__/fesm2015/ng-bootstrap.js");
/* harmony import */ var _ive_productos_individual_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ive-productos-individual.component */ "./src/app/forms/individual/ive-productos-individual/ive-productos-individual.component.ts");








const routes = [
    {
        path: '',
        data: {
            title: 'IVE Productos',
            urls: [
                { title: 'IVE Productos', url: '/ive-productos-individual' },
                { title: 'Formulario' },
            ],
        },
        component: _ive_productos_individual_component__WEBPACK_IMPORTED_MODULE_5__["IveProductosIndividualComponent"],
    },
];
class IveProductosIndividualModule {
}
IveProductosIndividualModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: IveProductosIndividualModule });
IveProductosIndividualModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function IveProductosIndividualModule_Factory(t) { return new (t || IveProductosIndividualModule)(); }, imports: [[
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes),
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](IveProductosIndividualModule, { declarations: [_ive_productos_individual_component__WEBPACK_IMPORTED_MODULE_5__["IveProductosIndividualComponent"]], imports: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
        _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](IveProductosIndividualModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
                    _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes),
                    _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModule"],
                ],
                declarations: [_ive_productos_individual_component__WEBPACK_IMPORTED_MODULE_5__["IveProductosIndividualComponent"]],
            }]
    }], null, null); })();


/***/ })

}]);
//# sourceMappingURL=forms-individual-ive-productos-individual-ive-productos-individual-module-es2015.js.map