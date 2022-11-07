function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-request-report-request-report-module"], {
  /***/
  "./src/app/pages/request-report/request-report.component.ts":
  /*!******************************************************************!*\
    !*** ./src/app/pages/request-report/request-report.component.ts ***!
    \******************************************************************/

  /*! exports provided: RequestReportComponent */

  /***/
  function srcAppPagesRequestReportRequestReportComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "RequestReportComponent", function () {
      return RequestReportComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _servicio_request_report_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./servicio/request-report.service */
    "./src/app/pages/request-report/servicio/request-report.service.ts");
    /* harmony import */


    var ngx_spinner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ngx-spinner */
    "./node_modules/ngx-spinner/__ivy_ngcc__/fesm2015/ngx-spinner.js");
    /* harmony import */


    var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! rxjs/operators */
    "./node_modules/rxjs/_esm2015/operators/index.js");
    /* harmony import */


    var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! rxjs */
    "./node_modules/rxjs/_esm2015/index.js");
    /* harmony import */


    var angular_notifier__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! angular-notifier */
    "./node_modules/angular-notifier/__ivy_ngcc__/fesm2015/angular-notifier.js");
    /* harmony import */


    var _services_mysql_mysql_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ../../services/mysql/mysql.service */
    "./src/app/services/mysql/mysql.service.ts");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
    /* harmony import */


    var _shared_reportfilters_reportfilters_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! ../../shared/reportfilters/reportfilters.component */
    "./src/app/shared/reportfilters/reportfilters.component.ts");
    /* harmony import */


    var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! @ng-bootstrap/ng-bootstrap */
    "./node_modules/@ng-bootstrap/ng-bootstrap/__ivy_ngcc__/fesm2015/ng-bootstrap.js");
    /* harmony import */


    var _pipes_reqreportdocs_pipe__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! ../../pipes/reqreportdocs.pipe */
    "./src/app/pipes/reqreportdocs.pipe.ts");
    /* harmony import */


    var _pipes_reqreportstatus_pipe__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
    /*! ../../pipes/reqreportstatus.pipe */
    "./src/app/pipes/reqreportstatus.pipe.ts");
    /* harmony import */


    var _pipes_reqreporttype_pipe__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
    /*! ../../pipes/reqreporttype.pipe */
    "./src/app/pipes/reqreporttype.pipe.ts");

    var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
          resolve(value);
        });
      }

      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }

        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }

        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }

        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };

    function RequestReportComponent_th_11_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 11);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var header_r2 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", header_r2, " ");
      }
    }

    function RequestReportComponent_tr_13_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "tr");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "td");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 11);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "td");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "td");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 11);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "td");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 11);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "td");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 11);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](15, "reqreportdocs");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "td");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 11);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](19, "reqreportdocs");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "td");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 11);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](23, "reqreportstatus");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "td");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 11);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](27, "reqreporttype");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "td");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "div", 11);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](31, "date");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "td");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "div", 11);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](34);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](35, "reqreportdocs");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var req_r3 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", req_r3.customer_id, " ");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](req_r3.name);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", req_r3.nit, " ");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", req_r3.request_id, " ");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](15, 10, req_r3.documents), " ");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](19, 12, req_r3.warranties), " ");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](23, 14, req_r3.status), " ");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](27, 16, req_r3.type), " ");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](31, 18, req_r3.create_date, "dd/MM/yyyy"), " ");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](35, 21, req_r3.verifications), " ");
      }
    }

    var RequestReportComponent =
    /*#__PURE__*/
    function () {
      function RequestReportComponent(_service, spinner, notifier, mysqlService, datepipe) {
        _classCallCheck(this, RequestReportComponent);

        this._service = _service;
        this.spinner = spinner;
        this.notifier = notifier;
        this.mysqlService = mysqlService;
        this.datepipe = datepipe; //-------FILTER-COMPONENT STUFFFF------

        this.valores1 = [{
          value: 0,
          text: "Factoraje Tradicional"
        }, {
          value: 1,
          text: "Factoraje Especial"
        }, {
          value: 3,
          text: "Especiales"
        }, {
          value: 4,
          text: "Pronto Pago"
        }];
        this.valores2 = [{
          value: 'NIT',
          text: "nit"
        }, {
          value: 'NAME',
          text: "nombre"
        }];
        this.vals = ['', '', '', '...', null, null];
        this.config = [{
          label: ' Filtrar por tipo de solicitud',
          tipo: 'DROPDOWN',
          range: false,
          labelsAux: ['Tipo:']
        }, {
          label: 'Filtrar por usuario ',
          tipo: 'DROP_TEXT',
          range: true,
          labelsAux: ['Filtro:', 'Palabra']
        }, {
          label: 'Rango de fechas',
          tipo: 'DATE',
          range: true,
          labelsAux: ['Fecha inicio:', 'Fecha fin:']
        }, {
          tipo: 'OPTIONS',
          options: {
            restart: true,
            header: true
          }
        }];
        this.selectedRequestType = "";
        this.selectedCustomerFilter = "";
        this.selectCustomerSearch = "";
        this.dataList = {
          metadata: ["ID Cliente", "Nombre", "Nit", "ID solicitud", "Documentos", "Garantias", "Estado", "Tipo", "Fecha de creacion", "Verificaciones"],
          data: []
        };
        this.pageSize = 10;
        this.page = 1;
        this.totalData = 0;
      }

      _createClass(RequestReportComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          var _this = this;

          this.spinner.show();

          this._service.getRequests(this.pageSize, 0, [], []).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            _this.dataList.data = data.data;
            _this.totalData = data.count;

            _this.spinner.hide();
          }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (err) {
            _this.notifier.notify('error', 'Ocurrio un problema con la conexion' + err);

            console.log(err);

            _this.spinner.hide();

            return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["of"])();
          })).subscribe(function (data) {});
        }
      }, {
        key: "onChangeCategory1",
        value: function onChangeCategory1(deviceValue) {
          this.selectedRequestType = deviceValue;
          /* if (this.selectUser != "") {
            this.getLogs([this.selectUser]);
          }
          else {
            this.getLogs("");
          } */
        }
      }, {
        key: "onChangeCategory2",
        value: function onChangeCategory2(deviceValue) {
          this.selectedCustomerFilter = deviceValue;
          /*  if (this.selectUser != "") {
             this.getLogs([this.selectUser]);
           }
           else {
             this.getLogs("");
           } */
        }
      }, {
        key: "xlsxDownload",
        value: function xlsxDownload(e) {
          return __awaiter(this, void 0, void 0,
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee() {
            var searchField, searchItem, fecini, fecend, date, datestring;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    /*let searchField = [];
                    let searchItem = [];
                    if (this.model && this.model2) {
                      searchField.push('FECINI');
                      let fecini = this.model.year + '-' + this.model.month + '-' + this.model.day + ' 00:00:00';
                      searchItem.push(fecini);
                      searchField.push('FECEND');
                      let fecend = this.model2.year + '-' + this.model2.month + '-' + this.model2.day + ' 23:59:59';
                      searchItem.push(fecend);
                    }
                          
                    if (this.selectedRequestType != "") {
                      searchField.push('TYPE');
                      searchItem.push(this.selectedRequestType);
                    }
                    if (this.selectedCustomerFilter != "" && this.selectCustomerSearch != "") {
                      searchField.push(this.selectedCustomerFilter);
                      searchItem.push('%' + this.selectCustomerSearch + '%');
                    }*/
                    searchField = [];
                    searchItem = [];
                    console.log('SEARCH:: ');
                    console.log(e);

                    if (this.vals[4] && this.vals[5]) {
                      searchField.push('FECINI');
                      fecini = this.vals[4].year + '-' + this.vals[4].month + '-' + this.vals[4].day + ' 00:00:00';
                      searchItem.push(fecini);
                      searchField.push('FECEND');
                      fecend = this.vals[5].year + '-' + this.vals[5].month + '-' + this.vals[5].day + ' 23:59:59';
                      searchItem.push(fecend);
                    }

                    if (this.vals[0] != "") {
                      searchField.push('TYPE');
                      searchItem.push(this.vals[0]);
                    }

                    if (this.vals[2] != "" && this.vals[3] != "") {
                      searchField.push(this.vals[2]);
                      searchItem.push('%' + this.vals[3] + '%');
                    }

                    date = new Date();
                    datestring = this.datepipe.transform(date, 'yyyy-MM-dd HH:MM:ss');
                    _context.next = 11;
                    return this.mysqlService.DownloadXlsx('ReporteSolicitudes' + datestring, searchItem, searchField);

                  case 11:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));
        }
      }, {
        key: "search",
        value: function search(e) {
          var _this2 = this;

          var searchField = [];
          var searchItem = [];
          console.log('SEARCH:: ');
          console.log(e);

          if (this.vals[4] && this.vals[5]) {
            searchField.push('FECINI');
            var fecini = this.vals[4].year + '-' + this.vals[4].month + '-' + this.vals[4].day + ' 00:00:00';
            searchItem.push(fecini);
            searchField.push('FECEND');
            var fecend = this.vals[5].year + '-' + this.vals[5].month + '-' + this.vals[5].day + ' 23:59:59';
            searchItem.push(fecend);
          }

          if (this.vals[0] != "") {
            searchField.push('TYPE');
            searchItem.push(this.vals[0]);
          }

          if (this.vals[2] != "" && this.vals[3] != "") {
            searchField.push(this.vals[2]);
            searchItem.push('%' + this.vals[3] + '%');
          }

          this._service.getRequests(this.pageSize, (this.page - 1) * this.pageSize, searchItem, searchField).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            _this2.dataList.data = data.data;
            _this2.totalData = data.count;

            _this2.spinner.hide();
          }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (err) {
            _this2.notifier.notify('error', 'Ocurrio un problema con la conexion' + err);

            console.log(err);

            _this2.spinner.hide();

            return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["of"])();
          })).subscribe(function (data) {});
        }
      }, {
        key: "pageChange",
        value: function pageChange(e) {
          //console.log(e);
          this.search(e);
        }
      }, {
        key: "onfilterChange1",
        value: function onfilterChange1(e) {
          console.log('onfilterChange1:' + e);
          console.log(this.vals);
        }
      }, {
        key: "onfilterChange2",
        value: function onfilterChange2(e) {
          console.log('onfilterChange2:' + e);
          console.log(this.vals);
        }
      }]);

      return RequestReportComponent;
    }();

    RequestReportComponent.ɵfac = function RequestReportComponent_Factory(t) {
      return new (t || RequestReportComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_servicio_request_report_service__WEBPACK_IMPORTED_MODULE_1__["RequestService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ngx_spinner__WEBPACK_IMPORTED_MODULE_2__["NgxSpinnerService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](angular_notifier__WEBPACK_IMPORTED_MODULE_5__["NotifierService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_mysql_mysql_service__WEBPACK_IMPORTED_MODULE_6__["MysqlService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_7__["DatePipe"]));
    };

    RequestReportComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: RequestReportComponent,
      selectors: [["app-request-report"]],
      decls: 17,
      vars: 11,
      consts: [[1, "row"], [1, "col-md-12"], ["bdColor", "rgba(51,51,51,0.8)", "size", "medium", "color", "#759ee0", "type", "ball-scale-multiple"], [2, "font-size", "20px", "color", "#fff"], [1, "card"], [1, "card-body"], [3, "config", "vals", "dataset1", "dataset3", "onFilter", "onCreateExcel", "valsChange", "onChange1", "onChange3"], [1, "table", "table-striped", "border", "mt-4"], [4, "ngFor", "ngForOf"], [1, "d-flex", "justify-content-center", "p-2"], ["aria-label", "Default pagination", 3, "collectionSize", "pageSize", "page", "boundaryLinks", "maxSize", "pageChange"], [1, "text-center"]],
      template: function RequestReportComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "ngx-spinner", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "p", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Cargando Informaci\xF3n...");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "app-reportfilters", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("onFilter", function RequestReportComponent_Template_app_reportfilters_onFilter_7_listener($event) {
            return ctx.search($event);
          })("onCreateExcel", function RequestReportComponent_Template_app_reportfilters_onCreateExcel_7_listener($event) {
            return ctx.xlsxDownload($event);
          })("valsChange", function RequestReportComponent_Template_app_reportfilters_valsChange_7_listener($event) {
            return ctx.vals = $event;
          })("onChange1", function RequestReportComponent_Template_app_reportfilters_onChange1_7_listener($event) {
            return ctx.onfilterChange1($event);
          })("onChange3", function RequestReportComponent_Template_app_reportfilters_onChange3_7_listener($event) {
            return ctx.onfilterChange2($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "table", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "thead");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "tr");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, RequestReportComponent_th_11_Template, 3, 1, "th", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "tbody");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, RequestReportComponent_tr_13_Template, 36, 23, "tr", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "ngb-pagination", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("pageChange", function RequestReportComponent_Template_ngb_pagination_pageChange_15_listener($event) {
            return ctx.page = $event;
          })("pageChange", function RequestReportComponent_Template_ngb_pagination_pageChange_15_listener($event) {
            return ctx.pageChange($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](16, "notifier-container");
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("config", ctx.config)("vals", ctx.vals)("dataset1", ctx.valores1)("dataset3", ctx.valores2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.dataList.metadata);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.dataList.data);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("collectionSize", ctx.totalData)("pageSize", ctx.pageSize)("page", ctx.page)("boundaryLinks", true)("maxSize", 7);
        }
      },
      directives: [ngx_spinner__WEBPACK_IMPORTED_MODULE_2__["NgxSpinnerComponent"], _shared_reportfilters_reportfilters_component__WEBPACK_IMPORTED_MODULE_8__["ReportfiltersComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgForOf"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_9__["NgbPagination"], angular_notifier__WEBPACK_IMPORTED_MODULE_5__["NotifierContainerComponent"]],
      pipes: [_pipes_reqreportdocs_pipe__WEBPACK_IMPORTED_MODULE_10__["ReqReportDocsPipe"], _pipes_reqreportstatus_pipe__WEBPACK_IMPORTED_MODULE_11__["ReqReportStatusPipe"], _pipes_reqreporttype_pipe__WEBPACK_IMPORTED_MODULE_12__["ReqReportTypePipe"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["DatePipe"]],
      styles: [".controls[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  border-radius: 2px;\n  box-shadow: 1px 2px 10px 0px rgba(0, 0, 0, 0.3);\n}\n\n.controls[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 0;\n}\n\n.controls[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n  margin: 0.2rem 0.2rem;\n}\n\n.control-div[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  \n  justify-content: space-between;\n}\n\n.control-div[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n  \n  margin: auto;\n}\n\n.control-div-section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-width: 33%;\n  max-width: 33%;\n}\n\n.control-div-section-title[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n}\n\n.control-div-section-body[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-evenly;\n  margin-top: 0.2rem;\n}\n\n.searchbtn[_ngcontent-%COMP%] {\n  max-width: 66%;\n  min-width: 66%;\n}\n\n.searchbtn2[_ngcontent-%COMP%] {\n  min-width: 100%;\n}\n\n.dropdowfilter[_ngcontent-%COMP%] {\n  min-width: 100%;\n}\n\n.line[_ngcontent-%COMP%] {\n  height: 3px;\n  background: #E4E4E4;\n  margin: 0 auto 7px auto;\n}\n\n.lineh[_ngcontent-%COMP%] {\n  min-width: 1px;\n  background: #E4E4E4;\n  margin: 0 auto 7px auto;\n}\n\n.fill[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  height: 10px;\n  width: 100%;\n  background: #7DD0ED;\n  transform: scaleX(0);\n  transform-origin: 0 50%;\n  transition: all 0.3s ease-in-out;\n  border-radius: 3px;\n}\n\n.pointer[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n\nth[sortable].asc[_ngcontent-%COMP%], th[sortable].desc[_ngcontent-%COMP%] {\n  display: flex;\n  border: 0px;\n}\n\nth[sortable].asc[_ngcontent-%COMP%]:after, th[sortable].desc[_ngcontent-%COMP%]:after {\n  content: \"\";\n  display: block;\n  background-size: 12px;\n  width: 25px;\n  height: 25px;\n  position: relative;\n  right: -12px;\n  margin-right: -22px;\n}\n\nth[sortable].desc[_ngcontent-%COMP%]:after {\n  transform: rotate(180deg);\n  background-position: right center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvcmVxdWVzdC1yZXBvcnQvRDpcXFRyYWJham9cXFByb3llY3Rvc1xcTnVldm8gc29sdWNyZWRpdFxcc29sdWNyZWRpdC1hcHAvc3JjXFxhcHBcXHBhZ2VzXFxyZXF1ZXN0LXJlcG9ydFxccmVxdWVzdC1yZXBvcnQuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3BhZ2VzL3JlcXVlc3QtcmVwb3J0L3JlcXVlc3QtcmVwb3J0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksYUFBYTtFQUNiLHNCQUFzQjtFQUN0Qix1QkFBdUI7RUFDdkIsa0JBQWtCO0VBQ2xCLCtDQUErQztBQ0NuRDs7QURHQTtFQUNJLFNBQVM7RUFDVCxVQUFVO0FDQWQ7O0FER0E7RUFFSSxxQkFBcUI7QUNEekI7O0FESUE7RUFDSSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLDZCQUFBO0VBQ0EsOEJBQThCO0FDRGxDOztBREtBO0VBRUk7MEJDSHNCO0VES3RCLFlBQVk7QUNIaEI7O0FETUE7RUFDSSxhQUFhO0VBQ2Isc0JBQXNCO0VBRXRCLGNBQWM7RUFDZCxjQUFjO0FDSmxCOztBRE9BO0VBQ0ksZ0JBQWdCO0VBQ2hCLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsbUJBQW1CO0VBQ25CLHVCQUF1QjtBQ0ozQjs7QURRQTtFQUNJLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsbUJBQW1CO0VBQ25CLDZCQUE2QjtFQUU3QixrQkFBa0I7QUNOdEI7O0FEU0E7RUFDSSxjQUFjO0VBQ2QsY0FBYztBQ05sQjs7QURTQTtFQUVJLGVBQWU7QUNQbkI7O0FEVUE7RUFDSSxlQUFlO0FDUG5COztBRFVBO0VBQ0ksV0FBVztFQUNYLG1CQUFtQjtFQUNuQix1QkFBdUI7QUNQM0I7O0FEVUE7RUFDSSxjQUFjO0VBQ2QsbUJBQW1CO0VBQ25CLHVCQUF1QjtBQ1AzQjs7QURVQTtFQUNJLGtCQUFrQjtFQUNsQixVQUFVO0VBQ1YsWUFBWTtFQUNaLFdBQVc7RUFDWCxtQkFBbUI7RUFDbkIsb0JBQW9CO0VBQ3BCLHVCQUF1QjtFQUN2QixnQ0FBZ0M7RUFDaEMsa0JBQWtCO0FDUHRCOztBRFVBO0VBQ0ksZUFBZTtBQ1BuQjs7QURVQTs7RUFFSSxhQUFhO0VBQ2IsV0FBVztBQ1BmOztBRFVBOztFQUVJLFdBQVc7RUFDWCxjQUFjO0VBRWQscUJBQXFCO0VBQ3JCLFdBQVc7RUFDWCxZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLFlBQVk7RUFDWixtQkFBbUI7QUNSdkI7O0FEV0E7RUFDSSx5QkFBeUI7RUFDekIsaUNBQWlDO0FDUnJDIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvcmVxdWVzdC1yZXBvcnQvcmVxdWVzdC1yZXBvcnQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY29udHJvbHMge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcclxuICAgIGJveC1zaGFkb3c6IDFweCAycHggMTBweCAwcHggcmdiYSgwLCAwLCAwLCAwLjMpO1xyXG4gICAgLy9iYWNrZ3JvdW5kLWNvbG9yOiBibHVldmlvbGV0O1xyXG59XHJcblxyXG4uY29udHJvbHM+KiB7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBwYWRkaW5nOiAwO1xyXG59XHJcblxyXG4uY29udHJvbHM+KiB7XHJcbiAgICAvL21heC13aWR0aDogMTAwJTtcclxuICAgIG1hcmdpbjogMC4ycmVtIDAuMnJlbTtcclxufVxyXG5cclxuLmNvbnRyb2wtZGl2IHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gICAgLyogYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7ICovXHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICAvL2JhY2tncm91bmQtY29sb3I6IHllbGxvdztcclxufVxyXG5cclxuLmNvbnRyb2wtZGl2Pioge1xyXG4gICAgLy9tYXgtd2lkdGg6IDMzJTtcclxuICAgIC8qIG1hcmdpbi10b3A6IDFyZW07XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxcmVtOyAqL1xyXG4gICAgbWFyZ2luOiBhdXRvO1xyXG59XHJcblxyXG4uY29udHJvbC1kaXYtc2VjdGlvbiB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIC8vYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XHJcbiAgICBtaW4td2lkdGg6IDMzJTtcclxuICAgIG1heC13aWR0aDogMzMlO1xyXG59XHJcblxyXG4uY29udHJvbC1kaXYtc2VjdGlvbi10aXRsZSB7XHJcbiAgICBtYXJnaW4tdG9wOiAxcmVtO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICAvL2JhY2tncm91bmQtY29sb3I6IGdyZWVuO1xyXG59XHJcblxyXG4uY29udHJvbC1kaXYtc2VjdGlvbi1ib2R5IHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xyXG4gICAgLy9iYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XHJcbiAgICBtYXJnaW4tdG9wOiAwLjJyZW07XHJcbn1cclxuXHJcbi5zZWFyY2hidG4ge1xyXG4gICAgbWF4LXdpZHRoOiA2NiU7XHJcbiAgICBtaW4td2lkdGg6IDY2JTtcclxufVxyXG5cclxuLnNlYXJjaGJ0bjIge1xyXG4gICAgLy9tYXgtd2lkdGg6IDY2JTtcclxuICAgIG1pbi13aWR0aDogMTAwJTtcclxufVxyXG5cclxuLmRyb3Bkb3dmaWx0ZXIge1xyXG4gICAgbWluLXdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG4ubGluZSB7XHJcbiAgICBoZWlnaHQ6IDNweDtcclxuICAgIGJhY2tncm91bmQ6ICNFNEU0RTQ7XHJcbiAgICBtYXJnaW46IDAgYXV0byA3cHggYXV0bztcclxufVxyXG5cclxuLmxpbmVoIHtcclxuICAgIG1pbi13aWR0aDogMXB4O1xyXG4gICAgYmFja2dyb3VuZDogI0U0RTRFNDtcclxuICAgIG1hcmdpbjogMCBhdXRvIDdweCBhdXRvO1xyXG59XHJcblxyXG4uZmlsbCB7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICB6LWluZGV4OiAxO1xyXG4gICAgaGVpZ2h0OiAxMHB4O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBiYWNrZ3JvdW5kOiAjN0REMEVEO1xyXG4gICAgdHJhbnNmb3JtOiBzY2FsZVgoMCk7XHJcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiAwIDUwJTtcclxuICAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2UtaW4tb3V0O1xyXG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xyXG59XHJcblxyXG4ucG9pbnRlciB7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuXHJcbnRoW3NvcnRhYmxlXS5hc2MsXHJcbnRoW3NvcnRhYmxlXS5kZXNjIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBib3JkZXI6IDBweDtcclxufVxyXG5cclxudGhbc29ydGFibGVdLmFzYzphZnRlcixcclxudGhbc29ydGFibGVdLmRlc2M6YWZ0ZXIge1xyXG4gICAgY29udGVudDogXCJcIjtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgLy9iYWNrZ3JvdW5kOiB1cmwoLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9jdXN0b20tc2VsZWN0LnBuZykgbm8tcmVwZWF0IGxlZnQgY2VudGVyO1xyXG4gICAgYmFja2dyb3VuZC1zaXplOiAxMnB4O1xyXG4gICAgd2lkdGg6IDI1cHg7XHJcbiAgICBoZWlnaHQ6IDI1cHg7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICByaWdodDogLTEycHg7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IC0yMnB4O1xyXG59XHJcblxyXG50aFtzb3J0YWJsZV0uZGVzYzphZnRlciB7XHJcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xyXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogcmlnaHQgY2VudGVyO1xyXG59IiwiLmNvbnRyb2xzIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgYm94LXNoYWRvdzogMXB4IDJweCAxMHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMyk7XG59XG5cbi5jb250cm9scyA+ICoge1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7XG59XG5cbi5jb250cm9scyA+ICoge1xuICBtYXJnaW46IDAuMnJlbSAwLjJyZW07XG59XG5cbi5jb250cm9sLWRpdiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIC8qIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0OyAqL1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG59XG5cbi5jb250cm9sLWRpdiA+ICoge1xuICAvKiBtYXJnaW4tdG9wOiAxcmVtO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMXJlbTsgKi9cbiAgbWFyZ2luOiBhdXRvO1xufVxuXG4uY29udHJvbC1kaXYtc2VjdGlvbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIG1pbi13aWR0aDogMzMlO1xuICBtYXgtd2lkdGg6IDMzJTtcbn1cblxuLmNvbnRyb2wtZGl2LXNlY3Rpb24tdGl0bGUge1xuICBtYXJnaW4tdG9wOiAxcmVtO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cblxuLmNvbnRyb2wtZGl2LXNlY3Rpb24tYm9keSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xuICBtYXJnaW4tdG9wOiAwLjJyZW07XG59XG5cbi5zZWFyY2hidG4ge1xuICBtYXgtd2lkdGg6IDY2JTtcbiAgbWluLXdpZHRoOiA2NiU7XG59XG5cbi5zZWFyY2hidG4yIHtcbiAgbWluLXdpZHRoOiAxMDAlO1xufVxuXG4uZHJvcGRvd2ZpbHRlciB7XG4gIG1pbi13aWR0aDogMTAwJTtcbn1cblxuLmxpbmUge1xuICBoZWlnaHQ6IDNweDtcbiAgYmFja2dyb3VuZDogI0U0RTRFNDtcbiAgbWFyZ2luOiAwIGF1dG8gN3B4IGF1dG87XG59XG5cbi5saW5laCB7XG4gIG1pbi13aWR0aDogMXB4O1xuICBiYWNrZ3JvdW5kOiAjRTRFNEU0O1xuICBtYXJnaW46IDAgYXV0byA3cHggYXV0bztcbn1cblxuLmZpbGwge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHotaW5kZXg6IDE7XG4gIGhlaWdodDogMTBweDtcbiAgd2lkdGg6IDEwMCU7XG4gIGJhY2tncm91bmQ6ICM3REQwRUQ7XG4gIHRyYW5zZm9ybTogc2NhbGVYKDApO1xuICB0cmFuc2Zvcm0tb3JpZ2luOiAwIDUwJTtcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZS1pbi1vdXQ7XG4gIGJvcmRlci1yYWRpdXM6IDNweDtcbn1cblxuLnBvaW50ZXIge1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbnRoW3NvcnRhYmxlXS5hc2MsXG50aFtzb3J0YWJsZV0uZGVzYyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGJvcmRlcjogMHB4O1xufVxuXG50aFtzb3J0YWJsZV0uYXNjOmFmdGVyLFxudGhbc29ydGFibGVdLmRlc2M6YWZ0ZXIge1xuICBjb250ZW50OiBcIlwiO1xuICBkaXNwbGF5OiBibG9jaztcbiAgYmFja2dyb3VuZC1zaXplOiAxMnB4O1xuICB3aWR0aDogMjVweDtcbiAgaGVpZ2h0OiAyNXB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHJpZ2h0OiAtMTJweDtcbiAgbWFyZ2luLXJpZ2h0OiAtMjJweDtcbn1cblxudGhbc29ydGFibGVdLmRlc2M6YWZ0ZXIge1xuICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiByaWdodCBjZW50ZXI7XG59XG4iXX0= */"]
    });
    /*@__PURE__*/

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](RequestReportComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
          selector: 'app-request-report',
          templateUrl: './request-report.component.html',
          styleUrls: ['./request-report.component.scss']
        }]
      }], function () {
        return [{
          type: _servicio_request_report_service__WEBPACK_IMPORTED_MODULE_1__["RequestService"]
        }, {
          type: ngx_spinner__WEBPACK_IMPORTED_MODULE_2__["NgxSpinnerService"]
        }, {
          type: angular_notifier__WEBPACK_IMPORTED_MODULE_5__["NotifierService"]
        }, {
          type: _services_mysql_mysql_service__WEBPACK_IMPORTED_MODULE_6__["MysqlService"]
        }, {
          type: _angular_common__WEBPACK_IMPORTED_MODULE_7__["DatePipe"]
        }];
      }, null);
    })();
    /***/

  },

  /***/
  "./src/app/pages/request-report/request-report.module.ts":
  /*!***************************************************************!*\
    !*** ./src/app/pages/request-report/request-report.module.ts ***!
    \***************************************************************/

  /*! exports provided: RequestReporteModule */

  /***/
  function srcAppPagesRequestReportRequestReportModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "RequestReporteModule", function () {
      return RequestReporteModule;
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


    var _request_report_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./request-report.component */
    "./src/app/pages/request-report/request-report.component.ts");
    /* harmony import */


    var ngx_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ngx-spinner */
    "./node_modules/ngx-spinner/__ivy_ngcc__/fesm2015/ngx-spinner.js");
    /* harmony import */


    var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! @ng-bootstrap/ng-bootstrap */
    "./node_modules/@ng-bootstrap/ng-bootstrap/__ivy_ngcc__/fesm2015/ng-bootstrap.js");
    /* harmony import */


    var angular_notifier__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! angular-notifier */
    "./node_modules/angular-notifier/__ivy_ngcc__/fesm2015/angular-notifier.js");
    /* harmony import */


    var _pipes_pipes_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! ../../pipes/pipes.module */
    "./src/app/pipes/pipes.module.ts");
    /* harmony import */


    var _servicio_request_report_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! ./servicio/request-report.service */
    "./src/app/pages/request-report/servicio/request-report.service.ts");
    /* harmony import */


    var _shared_shared_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! ../../shared/shared.module */
    "./src/app/shared/shared.module.ts"); //import { ComponentsModule } from '../../component/component.module';
    //import { UserModule } from '../user/user.module'


    var routes = [{
      path: '',
      data: {
        title: 'Reporte de solicitudes',
        urls: [{
          title: 'Reporte solicitudes',
          url: '/solicitudes-reporte'
        }, {
          title: 'Reporte solicitudes'
        }]
      },
      component: _request_report_component__WEBPACK_IMPORTED_MODULE_4__["RequestReportComponent"]
    }];

    var RequestReporteModule = function RequestReporteModule() {
      _classCallCheck(this, RequestReporteModule);
    };

    RequestReporteModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: RequestReporteModule
    });
    RequestReporteModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
      factory: function RequestReporteModule_Factory(t) {
        return new (t || RequestReporteModule)();
      },
      providers: [_servicio_request_report_service__WEBPACK_IMPORTED_MODULE_9__["RequestService"]],
      imports: [[_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbModule"], ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerModule"], angular_notifier__WEBPACK_IMPORTED_MODULE_7__["NotifierModule"], _pipes_pipes_module__WEBPACK_IMPORTED_MODULE_8__["PipesModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_10__["SharedModule"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](RequestReporteModule, {
        declarations: [_request_report_component__WEBPACK_IMPORTED_MODULE_4__["RequestReportComponent"]],
        imports: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbModule"], ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerModule"], angular_notifier__WEBPACK_IMPORTED_MODULE_7__["NotifierModule"], _pipes_pipes_module__WEBPACK_IMPORTED_MODULE_8__["PipesModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_10__["SharedModule"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"]]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](RequestReporteModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
          imports: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbModule"], ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerModule"], angular_notifier__WEBPACK_IMPORTED_MODULE_7__["NotifierModule"], _pipes_pipes_module__WEBPACK_IMPORTED_MODULE_8__["PipesModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_10__["SharedModule"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)],
          declarations: [_request_report_component__WEBPACK_IMPORTED_MODULE_4__["RequestReportComponent"]],
          providers: [_servicio_request_report_service__WEBPACK_IMPORTED_MODULE_9__["RequestService"]]
        }]
      }], null, null);
    })();
    /***/

  },

  /***/
  "./src/app/pages/request-report/servicio/request-report.service.ts":
  /*!*************************************************************************!*\
    !*** ./src/app/pages/request-report/servicio/request-report.service.ts ***!
    \*************************************************************************/

  /*! exports provided: RequestService */

  /***/
  function srcAppPagesRequestReportServicioRequestReportServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "RequestService", function () {
      return RequestService;
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


    var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! rxjs/operators */
    "./node_modules/rxjs/_esm2015/operators/index.js");
    /* harmony import */


    var src_environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! src/environments/environment */
    "./src/environments/environment.ts");

    var httpOptions = {
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
        'Content-Type': 'application/json'
      }),
      responseType: 'json',
      //withCredentials: true as const,  
      observe: 'response'
    };

    var RequestService =
    /*#__PURE__*/
    function () {
      function RequestService(http) {
        _classCallCheck(this, RequestService);

        this.http = http;
      }

      _createClass(RequestService, [{
        key: "getRequests",
        value: function getRequests(limit, offset, searchItem, searchField) {
          var uri = "".concat(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].urlRequest, "?limit=").concat(limit, "&offset=").concat(offset);

          if (searchItem.length != 0) {
            for (var i = 0; i < searchItem.length; i++) {
              uri = uri + "&searchItem=".concat(searchItem[i]);
            }
          }

          if (searchField.length != 0) {
            for (var _i = 0; _i < searchField.length; _i++) {
              uri = uri + "&searchField=".concat(searchField[_i]);
            }
          }

          return this.http.get(uri, httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (response) {
            return response.body.data;
          }));
        }
      }]);

      return RequestService;
    }();

    RequestService.ɵfac = function RequestService_Factory(t) {
      return new (t || RequestService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]));
    };

    RequestService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: RequestService,
      factory: RequestService.ɵfac,
      providedIn: 'root'
    });
    /*@__PURE__*/

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](RequestService, [{
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
//# sourceMappingURL=pages-request-report-request-report-module-es5.js.map