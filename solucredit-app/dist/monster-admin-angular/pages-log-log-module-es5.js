function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-log-log-module"], {
  /***/
  "./src/app/pages/log/log.component.ts":
  /*!********************************************!*\
    !*** ./src/app/pages/log/log.component.ts ***!
    \********************************************/

  /*! exports provided: LogComponent */

  /***/
  function srcAppPagesLogLogComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "LogComponent", function () {
      return LogComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var src_app_services_service_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! src/app/services/service.index */
    "./src/app/services/service.index.ts");
    /* harmony import */


    var ngx_spinner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ngx-spinner */
    "./node_modules/ngx-spinner/__ivy_ngcc__/fesm2015/ngx-spinner.js");
    /* harmony import */


    var _user_servicio_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../user/servicio/user.service */
    "./src/app/pages/user/servicio/user.service.ts");
    /* harmony import */


    var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! rxjs/operators */
    "./node_modules/rxjs/_esm2015/operators/index.js");
    /* harmony import */


    var angular_notifier__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! angular-notifier */
    "./node_modules/angular-notifier/__ivy_ngcc__/fesm2015/angular-notifier.js");
    /* harmony import */


    var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! rxjs */
    "./node_modules/rxjs/_esm2015/index.js");
    /* harmony import */


    var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! @ng-bootstrap/ng-bootstrap */
    "./node_modules/@ng-bootstrap/ng-bootstrap/__ivy_ngcc__/fesm2015/ng-bootstrap.js");
    /* harmony import */


    var _shared_reportfilters_reportfilters_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! ../../shared/reportfilters/reportfilters.component */
    "./src/app/shared/reportfilters/reportfilters.component.ts");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
    /* harmony import */


    var _pipes_logsAction_pipe__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! ../../pipes/logsAction.pipe */
    "./src/app/pipes/logsAction.pipe.ts");

    function LogComponent_th_14_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var header_r4 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", header_r4, " ");
      }
    }

    function LogComponent_tr_16_Template(rf, ctx) {
      if (rf & 1) {
        var _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "tr");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "td");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "td");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](5, "date");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "td");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](8, "date");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "td");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](11, "logaction");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "td");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "td", 14);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function LogComponent_tr_16_Template_td_click_14_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r7);

          var log_r5 = ctx.$implicit;

          var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          var _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](21);

          return ctx_r6.openModal(_r2, log_r5.user_log_id);
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "b", 15);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var log_r5 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](log_r5.user_email);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](5, 7, log_r5.time, "dd/MM/yyyy"));

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](8, 10, log_r5.time, "h:mm a"));

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"]("", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](11, 13, log_r5.action), " ", log_r5.resourcee, "");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](log_r5.ip);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](log_r5.description);
      }
    }

    function LogComponent_ng_template_20_p_18_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "b");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var datanew_r11 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](datanew_r11.key);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](": ", datanew_r11.value, "");
      }
    }

    function LogComponent_ng_template_20_p_20_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "b");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var dataold_r12 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](dataold_r12.key);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](": ", dataold_r12.value, "");
      }
    }

    function LogComponent_ng_template_20_Template(rf, ctx) {
      if (rf & 1) {
        var _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 16);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h5", 17);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Informaci\xF3n");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", 18);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function LogComponent_ng_template_20_Template_button_click_3_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r14);

          var ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          return ctx_r13.closeBtnClick();
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "span", 19);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "\xD7");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 20);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 21);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "table", 9);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "thead");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "tr");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "th");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "Informaci\xF3n actual");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "th");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Informaci\xF3n anterior");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "tbody");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "tr");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "td", 22);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](18, LogComponent_ng_template_20_p_18_Template, 5, 2, "p", 10);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "td", 22);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](20, LogComponent_ng_template_20_p_20_Template, 5, 2, "p", 10);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](18);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r3.newdatacurrentLog);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r3.olddatacurrentLog);
      }
    }

    var my = new Date();

    var LogComponent =
    /*#__PURE__*/
    function () {
      function LogComponent(notifier, _service, spinner, modalService, _userService) {
        _classCallCheck(this, LogComponent);

        this.notifier = notifier;
        this._service = _service;
        this.spinner = spinner;
        this.modalService = modalService;
        this._userService = _userService; //--COSAS PARA LOS FILTROS-------

        this.searchField = [];
        this.searchItem = [];
        this.vals = [null, null, ""];
        this.config = [{
          label: "Rango de fechas:",
          tipo: "DATE",
          range: true,
          labelsAux: ["Fecha inicio:", "Fecha fin"]
        }, {
          label: "Usuario",
          tipo: "DROPDOWN",
          range: false,
          labelsAux: ["Email"]
        }, {
          tipo: "OPTIONS",
          options: {
            restart: true,
            header: false
          }
        }];
        /* model: NgbDateStruct;
        date: { year: number; month: number }; */
        //

        this.pageSize = 10;
        this.page = 1;
        this.totalData = 0;
        this.Infologsold = [];
        this.Infologsnew = [];
        this.newdatacurrentLog = [];
        this.olddatacurrentLog = [];
        this.usersData = [];
        this.dataList = {
          metadata: ["Email/Usuario", "Fecha", "Hora", "Acción realizada", "Ip", "Info"],
          data: []
        };
        /* this.model = { year: my.getFullYear(), month: my.getMonth() + 1, day: my.getDate() }; */
      }

      _createClass(LogComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          var _this = this;

          this.spinner.show();
          this.pageSize = 10;

          this._service.getLogs(this.pageSize, 0, [], []).subscribe(function (logs) {
            _this.Infologsnew = [];
            _this.Infologsold = [];
            _this.dataList.data = logs.logs;
            _this.totalData = 50; //console.log("logs", logs.logs);

            logs.logs.forEach(function (element) {
              console.log("old " + element.old_data);

              if (element.old_data != null && element.old_data != "") {
                _this.Infologsold.push({
                  id: element.user_log_id,
                  data: JSON.parse(element.old_data)
                });
              }

              if (element.new_data != null && element.new_data != "") {
                _this.Infologsnew.push({
                  id: element.user_log_id,
                  data: JSON.parse(element.new_data)
                });
              }
            });

            _this.spinner.hide();
          });

          this.getUsers();
        }
      }, {
        key: "getLogs",
        value: function getLogs() {
          var _this2 = this;

          this.spinner.show();

          this._service.getLogs(this.pageSize, (this.page - 1) * this.pageSize, this.searchItem, this.searchField).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (logs) {
            //console.log(logs.logs);
            _this2.dataList.data = logs.logs;
            _this2.totalData = logs.count;
            _this2.Infologsnew = [];
            _this2.Infologsold = [];
            _this2.dataList.data = logs.logs;
            _this2.totalData = logs.count;
            logs.logs.forEach(function (element) {
              console.log("old " + element.old_data);

              if (element.old_data != null && element.old_data != "") {
                _this2.Infologsold.push({
                  id: element.user_log_id,
                  data: JSON.parse(element.old_data)
                });
              }

              if (element.new_data != null && element.new_data != "") {
                _this2.Infologsnew.push({
                  id: element.user_log_id,
                  data: JSON.parse(element.new_data)
                });
              }
            });

            _this2.spinner.hide();
          }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(function (err) {
            _this2.notifier.notify("error", "Ocurrio un problema con la conexion" + err);

            console.log(err);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["of"])();
          })).subscribe();
        }
      }, {
        key: "filter",
        value: function filter(dataFilter) {
          var _this3 = this;

          this.searchField = [];
          this.searchItem = [];

          if (this.vals[0] && this.vals[1]) {
            this.searchField.push("FECINI");
            var fecini = this.vals[0].year + "-" + this.vals[0].month + "-" + this.vals[0].day + " 00:00:00";
            this.searchItem.push(fecini);
            this.searchField.push("FECEND");
            var fecend = this.vals[1].year + "-" + this.vals[1].month + "-" + this.vals[1].day + " 23:59:59";
            this.searchItem.push(fecend);
          }

          if (this.vals[2] != "") {
            this.searchField.push("EMAIL");
            this.searchItem.push(this.vals[2]);
          }

          this._service.getLogs(this.pageSize, (this.page - 1) * this.pageSize, this.searchItem, this.searchField).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (logs) {
            //console.log(logs.logs);
            _this3.dataList.data = logs.logs;
            _this3.totalData = logs.count;
            _this3.Infologsnew = [];
            _this3.Infologsold = [];
            logs.logs.forEach(function (element) {
              //console.log('old '+ element.old_data);
              if (element.old_data != null && element.old_data != "") {
                _this3.Infologsold.push({
                  id: element.user_log_id,
                  data: JSON.parse(element.old_data)
                });
              }

              if (element.new_data != null && element.new_data != "") {
                _this3.Infologsnew.push({
                  id: element.user_log_id,
                  data: JSON.parse(element.new_data)
                });
              }
            });

            _this3.spinner.hide();
          }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(function (err) {
            _this3.notifier.notify("error", "Ocurrio un problema con la conexion" + err);

            console.log(err);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["of"])();
          })).subscribe();
        }
      }, {
        key: "getUsers",
        value: function getUsers() {
          var _this4 = this;

          //console.log('LE DI CLICK AL DROPDOWN');
          this._userService.getUsers(1000, 0, [], []).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (users) {
            _this4.usersData = users.data.map(function (item) {
              return {
                value: item.email,
                text: item.email
              };
            });
          }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(function (err) {
            _this4.notifier.notify("error", "Ocurrio un problema con la conexion" + err);

            console.log(err);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["of"])();
          })).subscribe();
        }
      }, {
        key: "pageChange",
        value: function pageChange(e) {
          //console.log(e);
          this.getLogs();
        }
      }, {
        key: "closeBtnClick",
        value: function closeBtnClick() {
          this.modalService.dismissAll();
        }
      }, {
        key: "openModal",
        value: function openModal(targetModal, logid) {
          var _this5 = this;

          this.newdatacurrentLog = [];
          this.olddatacurrentLog = [];
          var result1 = this.Infologsold.find(function (oldlog) {
            return oldlog.id == logid;
          });
          var result2 = this.Infologsnew.find(function (newlog) {
            return newlog.id == logid;
          });

          if (result2 != null && result2 != "") {
            Object.entries(result2.data).forEach(function (_ref) {
              var _ref2 = _slicedToArray(_ref, 2),
                  key = _ref2[0],
                  value = _ref2[1];

              _this5.newdatacurrentLog.push({
                key: key,
                value: value
              });
            });
          }

          if (result1 != null && result1 != "") {
            Object.entries(result1.data).forEach(function (_ref3) {
              var _ref4 = _slicedToArray(_ref3, 2),
                  key = _ref4[0],
                  value = _ref4[1];

              _this5.olddatacurrentLog.push({
                key: key,
                value: value
              });
            });
          }

          this.modalService.open(targetModal, {
            centered: true,
            backdrop: "static",
            keyboard: false,
            size: "xl"
          });
        }
      }]);

      return LogComponent;
    }();

    LogComponent.ɵfac = function LogComponent_Factory(t) {
      return new (t || LogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](angular_notifier__WEBPACK_IMPORTED_MODULE_5__["NotifierService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_service_index__WEBPACK_IMPORTED_MODULE_1__["LogsService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ngx_spinner__WEBPACK_IMPORTED_MODULE_2__["NgxSpinnerService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_7__["NgbModal"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_user_servicio_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"]));
    };

    LogComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: LogComponent,
      selectors: [["app-log"]],
      decls: 22,
      vars: 10,
      consts: [[1, "row"], [1, "col-md-12"], ["bdColor", "rgba(51,51,51,0.8)", "size", "medium", "color", "#759ee0", "type", "ball-scale-multiple"], [2, "font-size", "20px", "color", "#fff"], [1, "card"], [1, "card-body"], [1, "card-title", "mb-0"], [1, "lstick"], [3, "config", "vals", "dataset3", "valsChange", "onFilter"], [1, "table", "table-striped", "border", "mt-4"], [4, "ngFor", "ngForOf"], [1, "d-flex", "justify-content-center", "p-2"], ["aria-label", "Default pagination", 3, "collectionSize", "pageSize", "page", "boundaryLinks", "maxSize", "pageChange"], ["infologs", ""], [3, "click"], ["ngbTooltip", "Dar click para ver m\xE1s informaci\xF3n.", 2, "cursor", "pointer", "color", "#2162c4", "text-decoration", "underline"], [1, "modal-header"], ["id", "editUserLabel", 1, "modal-title"], ["type", "button", "aria-label", "Close", 1, "close", 3, "click"], ["aria-hidden", "true"], [1, "modal-body"], [1, "card-block"], [2, "max-width", "220px", "white-space", "pre-wrap"]],
      template: function LogComponent_Template(rf, ctx) {
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

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "h4", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "span", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Bit\xE1cora del sistema ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "app-reportfilters", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("valsChange", function LogComponent_Template_app_reportfilters_valsChange_10_listener($event) {
            return ctx.vals = $event;
          })("onFilter", function LogComponent_Template_app_reportfilters_onFilter_10_listener($event) {
            return ctx.filter($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "table", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "thead");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "tr");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](14, LogComponent_th_14_Template, 2, 1, "th", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "tbody");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](16, LogComponent_tr_16_Template, 17, 15, "tr", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "ngb-pagination", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("pageChange", function LogComponent_Template_ngb_pagination_pageChange_18_listener($event) {
            return ctx.page = $event;
          })("pageChange", function LogComponent_Template_ngb_pagination_pageChange_18_listener($event) {
            return ctx.pageChange($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](19, "notifier-container");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](20, LogComponent_ng_template_20_Template, 21, 2, "ng-template", null, 13, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("config", ctx.config)("vals", ctx.vals)("dataset3", ctx.usersData);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.dataList.metadata);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.dataList.data);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("collectionSize", ctx.totalData)("pageSize", ctx.pageSize)("page", ctx.page)("boundaryLinks", true)("maxSize", 7);
        }
      },
      directives: [ngx_spinner__WEBPACK_IMPORTED_MODULE_2__["NgxSpinnerComponent"], _shared_reportfilters_reportfilters_component__WEBPACK_IMPORTED_MODULE_8__["ReportfiltersComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgForOf"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_7__["NgbPagination"], angular_notifier__WEBPACK_IMPORTED_MODULE_5__["NotifierContainerComponent"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_7__["NgbTooltip"]],
      pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_9__["DatePipe"], _pipes_logsAction_pipe__WEBPACK_IMPORTED_MODULE_10__["LogActionPipe"]],
      styles: [".control-div[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-between;\n}\n\n.control-div[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n  max-width: 33%;\n}\n\n.pointer[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n\nth[sortable].asc[_ngcontent-%COMP%], th[sortable].desc[_ngcontent-%COMP%] {\n  display: flex;\n  border: 0px;\n}\n\nth[sortable].asc[_ngcontent-%COMP%]:after, th[sortable].desc[_ngcontent-%COMP%]:after {\n  content: \"\";\n  display: block;\n  background-size: 12px;\n  width: 25px;\n  height: 25px;\n  position: relative;\n  right: -12px;\n  margin-right: -22px;\n}\n\nth[sortable].desc[_ngcontent-%COMP%]:after {\n  transform: rotate(180deg);\n  background-position: right center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvbG9nL0Q6XFxUcmFiYWpvXFxQcm95ZWN0b3NcXE51ZXZvIHNvbHVjcmVkaXRcXHNvbHVjcmVkaXQtYXBwL3NyY1xcYXBwXFxwYWdlc1xcbG9nXFxuZ3RhYmxlLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9wYWdlcy9sb2cvbmd0YWJsZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsbUJBQW1CO0VBQ25CLDhCQUE4QjtBQ0NsQzs7QURFQTtFQUNJLGNBQWM7QUNDbEI7O0FERUE7RUFDSSxlQUFlO0FDQ25COztBREVBOztFQUVJLGFBQWE7RUFDYixXQUFXO0FDQ2Y7O0FERUE7O0VBRUksV0FBVztFQUNYLGNBQWM7RUFFZCxxQkFBcUI7RUFDckIsV0FBVztFQUNYLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsWUFBWTtFQUNaLG1CQUFtQjtBQ0F2Qjs7QURHQTtFQUNJLHlCQUF5QjtFQUN6QixpQ0FBaUM7QUNBckMiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9sb2cvbmd0YWJsZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jb250cm9sLWRpdiB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbn1cclxuXHJcbi5jb250cm9sLWRpdj4qIHtcclxuICAgIG1heC13aWR0aDogMzMlO1xyXG59XHJcblxyXG4ucG9pbnRlciB7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuXHJcbnRoW3NvcnRhYmxlXS5hc2MsXHJcbnRoW3NvcnRhYmxlXS5kZXNjIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBib3JkZXI6IDBweDtcclxufVxyXG5cclxudGhbc29ydGFibGVdLmFzYzphZnRlcixcclxudGhbc29ydGFibGVdLmRlc2M6YWZ0ZXIge1xyXG4gICAgY29udGVudDogXCJcIjtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgLy9iYWNrZ3JvdW5kOiB1cmwoLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9jdXN0b20tc2VsZWN0LnBuZykgbm8tcmVwZWF0IGxlZnQgY2VudGVyO1xyXG4gICAgYmFja2dyb3VuZC1zaXplOiAxMnB4O1xyXG4gICAgd2lkdGg6IDI1cHg7XHJcbiAgICBoZWlnaHQ6IDI1cHg7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICByaWdodDogLTEycHg7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IC0yMnB4O1xyXG59XHJcblxyXG50aFtzb3J0YWJsZV0uZGVzYzphZnRlciB7XHJcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xyXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogcmlnaHQgY2VudGVyO1xyXG59IiwiLmNvbnRyb2wtZGl2IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xufVxuXG4uY29udHJvbC1kaXYgPiAqIHtcbiAgbWF4LXdpZHRoOiAzMyU7XG59XG5cbi5wb2ludGVyIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG50aFtzb3J0YWJsZV0uYXNjLFxudGhbc29ydGFibGVdLmRlc2Mge1xuICBkaXNwbGF5OiBmbGV4O1xuICBib3JkZXI6IDBweDtcbn1cblxudGhbc29ydGFibGVdLmFzYzphZnRlcixcbnRoW3NvcnRhYmxlXS5kZXNjOmFmdGVyIHtcbiAgY29udGVudDogXCJcIjtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGJhY2tncm91bmQtc2l6ZTogMTJweDtcbiAgd2lkdGg6IDI1cHg7XG4gIGhlaWdodDogMjVweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICByaWdodDogLTEycHg7XG4gIG1hcmdpbi1yaWdodDogLTIycHg7XG59XG5cbnRoW3NvcnRhYmxlXS5kZXNjOmFmdGVyIHtcbiAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTtcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogcmlnaHQgY2VudGVyO1xufVxuIl19 */"]
    });
    /*@__PURE__*/

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LogComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
          selector: "app-log",
          templateUrl: "./log.component.html",
          styleUrls: ["./ngtable.component.scss"]
        }]
      }], function () {
        return [{
          type: angular_notifier__WEBPACK_IMPORTED_MODULE_5__["NotifierService"]
        }, {
          type: src_app_services_service_index__WEBPACK_IMPORTED_MODULE_1__["LogsService"]
        }, {
          type: ngx_spinner__WEBPACK_IMPORTED_MODULE_2__["NgxSpinnerService"]
        }, {
          type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_7__["NgbModal"]
        }, {
          type: _user_servicio_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"]
        }];
      }, null);
    })();
    /***/

  },

  /***/
  "./src/app/pages/log/log.module.ts":
  /*!*****************************************!*\
    !*** ./src/app/pages/log/log.module.ts ***!
    \*****************************************/

  /*! exports provided: LogModule */

  /***/
  function srcAppPagesLogLogModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "LogModule", function () {
      return LogModule;
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


    var _log_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./log.component */
    "./src/app/pages/log/log.component.ts");
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


    var _shared_shared_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! ../../shared/shared.module */
    "./src/app/shared/shared.module.ts"); //import { ComponentsModule } from '../../component/component.module';
    //import { UserModule } from '../user/user.module'


    var routes = [{
      path: '',
      data: {
        title: 'Bitácora',
        urls: [{
          title: 'Bitácora',
          url: '/logs'
        }, {
          title: 'Bitácora'
        }]
      },
      component: _log_component__WEBPACK_IMPORTED_MODULE_4__["LogComponent"]
    }];

    var LogModule = function LogModule() {
      _classCallCheck(this, LogModule);
    };

    LogModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: LogModule
    });
    LogModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
      factory: function LogModule_Factory(t) {
        return new (t || LogModule)();
      },
      imports: [[_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbModule"], ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerModule"], angular_notifier__WEBPACK_IMPORTED_MODULE_7__["NotifierModule"], _pipes_pipes_module__WEBPACK_IMPORTED_MODULE_8__["PipesModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_9__["SharedModule"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](LogModule, {
        declarations: [_log_component__WEBPACK_IMPORTED_MODULE_4__["LogComponent"]],
        imports: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbModule"], ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerModule"], angular_notifier__WEBPACK_IMPORTED_MODULE_7__["NotifierModule"], _pipes_pipes_module__WEBPACK_IMPORTED_MODULE_8__["PipesModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_9__["SharedModule"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"]]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LogModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
          imports: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbModule"], ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerModule"], angular_notifier__WEBPACK_IMPORTED_MODULE_7__["NotifierModule"], _pipes_pipes_module__WEBPACK_IMPORTED_MODULE_8__["PipesModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_9__["SharedModule"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)],
          declarations: [_log_component__WEBPACK_IMPORTED_MODULE_4__["LogComponent"]]
        }]
      }], null, null);
    })();
    /***/

  }
}]);
//# sourceMappingURL=pages-log-log-module-es5.js.map