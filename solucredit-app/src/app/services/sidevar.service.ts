import { Injectable } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';
//import { Routes, RouterModule } from '@angular/router';
import { RouteInfo } from '../shared/sidebar/sidebar.metadata'
import { AuthorizationService } from './authorization.service';

interface Menu {
  path: string;
  title: string;
  icon: string;
  class: string;
  extralink: boolean;
  submenu: Menu[];
  type_icon?: 'feather';
  icon_class?: string
}

const sortFunction = (a, b) => {
  if (a.title < b.title) { return -1; }
  if (a.title > b.title) { return 1; }
  return 0;
}
@Injectable({
  providedIn: 'root'
})


export class SidevarService {

  menu: Menu[];

  private _sidebarStateSource = new ReplaySubject<RouteInfo[]>();
  sidebarState$ = this._sidebarStateSource.asObservable();
  constructor(private authotizationService: AuthorizationService) {

    this.authotizationService.authotizationState$.subscribe(

      (permisos) => {
        //console.log('EN LA SUSCRIPCION DE sidevarService');
        let newmenu: Menu[] = []

        //EMPIEZA EL MENU DE ADMINISTRACION
        let submenusAdmin: Menu[] = [];
        if (this.authotizationService.havePermission("USER", "*")) {
          submenusAdmin.push({
            path: "usuarios",
            title: "Usuarios",
            icon: "mdi mdi-account-settings-variant",
            class: "",
            extralink: false,
            submenu: [],
          });

        }
        if (this.authotizationService.havePermission('ROL_VIEW', '*')) {
          submenusAdmin.push({
            path: 'rolview',
            title: 'Vistas por Rol',
            icon: 'far fa-file-code',
            class: '',
            extralink: false,
            submenu: []
          })
        }
        if (this.authotizationService.havePermission("ROL", "*")) {
          submenusAdmin.push({
            path: "roles",
            title: "Roles",
            icon: "mdi mdi-account-box",
            class: "",
            extralink: false,
            submenu: [],
          });
        }
        if (this.authotizationService.havePermission("LOG", "*")) {
          submenusAdmin.push({
            path: "bitacora",
            title: "Bitácora",
            icon: "mdi mdi-alarm-multiple",
            class: "",
            extralink: false,
            submenu: [],
          });
        }

        if (submenusAdmin.length != 0) {
          newmenu.push({
            path: "administracion",
            title: "Administración",
            icon: "mdi mdi-equal",
            class: "has-arrow",
            extralink: false,
            submenu: submenusAdmin.sort((a, b) => sortFunction(a, b)),
            type_icon: 'feather',
            icon_class: 'settings'
          });
        }

        //TERMINA EL MENU DE ADMINISTRACION

        //EMPIEZA EL MENU DE CLIENTES
        let submenusClient = [];
        //menu nuevo prospecto, se muestra si y solo si tiene el permiso 'CREATE'
        if (this.authotizationService.havePermission("CLIENT", "CREATE")) {
          submenusClient.push({
            path: "new-user",
            title: "Nuevo prospecto",
            icon: "mdi mdi-account-card-details",
            class: "",
            extralink: false,
            submenu: [],
          });
        }
        //menu clientes y prospecto, se mostrara si tiene algun permiso..
        if (this.authotizationService.havePermission("CLIENT", "LIST")) {
          submenusClient.push({
            path: "list-customer",
            title: "Clientes y prospectos",
            icon: "mdi mdi-account-multiple",
            class: "",
            extralink: false,
            submenu: [],
          });
        }
        if (this.authotizationService.havePermission("CLIENT", "LIST")) {
          submenusClient.push({
            path: "prospectos",
            title: "Prospectos",
            icon: "mdi mdi-account-multiple",
            class: "",
            extralink: false,
            submenu: [],
          });
        }
        if (
          this.authotizationService.havePermission("CLIENT", "LIST_DEB") ||
          this.authotizationService.havePermission("CLIENT", "CREATE_DEB")
        ) {
          submenusClient.push({
            path: "/deudores",
            title: "Deudores",
            icon: "fas fa-users",
            class: "",
            extralink: false,
            submenu: [],
          });
        }

        if (submenusClient.length != 0) {
          newmenu.push({
            path: "clientes",
            title: "Clientes",
            icon: "mdi mdi-account",
            class: "has-arrow",
            extralink: false,
            submenu: submenusClient,
            type_icon: 'feather',
            icon_class: 'user'
          });
        }

        //TERMINA EL MENU DE CLIENTES

        //EMPIEZA EL MENU DE REPORTES
        let submenusReports = [];
        if (this.authotizationService.havePermission("REPORT", "REQUEST")) {
          submenusReports.push({
            path: "solicitudes-reporte",
            title: "Solicitudes",
            icon: "mdi mdi-table-large",
            class: "",
            extralink: false,
            submenu: [],
          });
        }
        /* if (this.authotizationService.havePermission("REPORT", "REQUEST")) {
          submenusReports.push({
            path: "deudores-reporte",
            title: "Deudores",
            icon: "mdi mdi-table-large",
            class: "",
            extralink: false,
            submenu: [],
          });
        } */
        if (submenusReports.length != 0) {
          newmenu.push({
            path: "reportes",
            title: "Reportes",
            icon: "mdi mdi-poll",
            class: "has-arrow",
            extralink: false,
            submenu: submenusReports,
            icon_class: 'bar-chart-2',
            type_icon: 'feather'
          });
        }

        //TEMRINA EL MENU DE REPORTES

        //EMPIEZA EL MENU DE ALERTAS

        let submenusAlerts = [];
        //MENU CREACION DE ALERTAS Y RIESGOS
        if (
          this.authotizationService.havePermission("ALERT", "LIST") ||
          this.authotizationService.havePermission("ALERT", "CREATE")
        ) {
          submenusAlerts.push({
            path: "creacion-alertas",
            title: "Creacion de alertas y riesgos",
            icon: "fas fa-edit ml-4",
            class: "",
            extralink: false,
            submenu: [],
          });
        }
        // if (this.authotizationService.havePermission("ALERT", "LOG")) {
        //   submenusAlerts.push({
        //     path: "bitacora-alertas",
        //     title: "Bitácora de alertas y riesgos",
        //     icon: "fas fa-clipboard-list ml-4",
        //     class: "",
        //     extralink: false,
        //     submenu: [],
        //   });
        // }
        // if (submenusAlerts.length != 0) {
        //   newmenu.push({
        //     path: "#",
        //     title: "Alertas y Riesgos",
        //     icon: "fas fa-exclamation-triangle",
        //     class: "has-arrow",
        //     extralink: false,
        //     submenu: submenusAlerts,
        //     type_icon: 'feather',
        //     icon_class: 'alert-triangle'
        //   });
        // }

        //MENU BITACORA DE ALERTAS Y RIESGOS

        //TERMINA EL MENU DE ALERTAS

        //EMPIEZA EL MENU DE LISTAS INTERNACIOALES
        let submenusInternationalL = [];
        //MENU CARGA DE LISTAS ONU // SI Y SOLO SI TIENE CREATE_ONULIST
        if (this.authotizationService.havePermission("ONU", "SEE_LIST")) {
          submenusInternationalL.push({
            path: "cargar-lista-onu",
            title: "Cargas de listas ONU",
            icon: "fas fa-upload ml-4",
            class: "",
            extralink: false,
            submenu: [],
          });
        }

        //MENU CONSULTA DE LISTAS CARGADAS //SSI Y SOLO SI TIENE QUERY-ONULIST
        if (this.authotizationService.havePermission("ONU", "QUERY")) {
          submenusInternationalL.push({
            path: "consulta-lista-onu",
            title: "Consulta de listas cargadas",
            icon: " fas fa-clipboard-list ml-4",
            class: "",
            extralink: false,
            submenu: [],
          });
        }

        //VERIFICACION DE CLIENTES EN LISTA //SI Y SOLO SI TIENE CHECK_CLIENT
        if (this.authotizationService.havePermission("ONU", "CHECK_CLIENT")) {
          submenusInternationalL.push({
            path: "verificacion-cliente-onu",
            title: "Verificación de clientes en listas",
            icon: " fas fa-clipboard-check ml-4",
            class: "",
            extralink: false,
            submenu: [],
          });
        }
        //VERIFICACION DE CLIENTES EN LISTA //SI Y SOLO SI TIENE CHECK_CLIENT
        if (this.authotizationService.havePermission("ONU", "LOGS")) {
          submenusInternationalL.push({
            path: "bitacora-de-desbloqueo",
            title: "Bitácora de desbloqueo/bloqueo",
            icon: " fas fa-clipboard-check ml-4",
            class: "",
            extralink: false,
            submenu: [],
          });
        }


        // if (submenusInternationalL.length != 0) {
        //   newmenu.push({
        //     path: "clientes",
        //     title: "Listas Internacionales",
        //     icon: "fas fa-list-alt ml-4",
        //     class: "has-arrow",
        //     extralink: false,
        //     submenu: submenusInternationalL,
        //     type_icon: 'feather',
        //     icon_class: 'list'
        //   });
        // }

        //TERMINA EL MENU DE LISTAS INTERNACIONALES
        //MENU DE ANALYSIS
        let submenuanalysis = []
        if (
          this.authotizationService.havePermission('ANALYSIS', 'COMPLETE_LEGAL_ANALISIS') ||
          this.authotizationService.havePermission('ANALYSIS', 'REJECT_LEGAL_ANALISIS')
        ) {
          submenuanalysis.push(
            {
              path: 'legal-analysis-list',
              title: 'Análisis Legal',
              icon: 'fas fa-balance-scale  ml-4',
              class: '',
              extralink: false,
              submenu: []
            }
          )
        }
        if (this.authotizationService.havePermission('ANALYSIS', 'COMPLETE_COMPLIANCE_VERIFICATION') ||
          this.authotizationService.havePermission('ANALYSIS', 'REJECT_COMPLIANCE_VERIFICATION')
        ) {
          submenuanalysis.push(
            {
              path: 'compliance-verification-list',
              title: 'Verificación de Cumplimiento',
              icon: 'mdi mdi-message-draw ml-4',
              class: '',
              extralink: false,
              submenu: []
            }
          )
        }
        if (submenuanalysis.length > 0) {
          submenusClient.push({
            path: 'analysis',
            title: 'Análisis',
            icon: "fas fa-chart-line",
            class: 'has-arrow',
            extralink: false,
            submenu: submenuanalysis,
          })
        }
        let submenusCumplimiento = [];
        //MENU CARGA DE LISTAS ONU // SI Y SOLO SI TIENE CREATE_ONULIST


        let rr = this.authotizationService.havePermission('SUPPLIER', '*');
        //console.log('RESPUESTA DE SUPPLIER:: ' +rr);
        if (rr) {
          submenusCumplimiento.push(
            {
              path: "proveedores",
              title: "Proveedores",
              icon: " fas fa-dolly-flatbed",
              class: "",
              extralink: false,
              submenu: [],
            }
          );
          submenusCumplimiento.push({
            path: "clientes",
            title: "Listas Internacionales",
            icon: "fas fa-list ",
            class: "has-arrow",
            extralink: false,
            submenu: submenusInternationalL,
            type_icon: '',
            icon_class: 'list'
          })
          submenusCumplimiento.push({
            path: "#",
            title: "Alertas y Riesgos",
            icon: "fas fa-exclamation-triangle",
            class: "has-arrow",
            extralink: false,
            submenu: submenusAlerts,

          })
        }

        if (submenusCumplimiento.length != 0) {
          newmenu.push({
            path: "cumplimiento",
            title: "Cumplimiento",
            icon: " fas fa-tasks ",
            class: "has-arrow",
            extralink: false,
            submenu: submenusCumplimiento,
          })
        }

        let submenuMaintenance = [];
        let submenuAdviser = [];
        let submenuBrachOffice = [];
        let submenuRate = [];
        let submenuFolder = [];
        //MENU CARGA DE LISTAS ONU // SI Y SOLO SI TIENE CREATE_ONULIST

        let rh = this.authotizationService.havePermission('SUPPLIER', '*');
        //console.log('RESPUESTA DE SUPPLIER:: ' +rr);
        /* if (rh) {
          submenuMaintenance.push(
            {
              path: "forma-desembolso",
              title: "Forma de Desembolso",
              icon: "fas fa-handshake",
              class: "",
              extralink: false,
              submenu: [],
            }
          );
        } */
        /* if (rh) {
          submenuMaintenance.push(
            {
              path: "forma-pago",
              title: "Forma de Pago",
              icon: "fas fa-file",
              class: "",
              extralink: false,
              submenu: [],
            }
          );
        } */
           if (rh) {
            submenuMaintenance.push(
              {
                path: "forma-garantia",
                title: "Tipo de Garantía",
                icon: " fas fa-th-large",
                class: "",
                extralink: false,
                submenu: [],
              })
          } 
        

        let fm = this.authotizationService.havePermission('FILEMANAGER', '*')
        if (fm) {
          submenuFolder.push(
            {

              path: "carpetas",
              title: "Administrar directorios",
              icon: "fas fa-file ml-4",
              class: "",
              extralink: false,
              submenu: [],

            }
          )
        }
        if (submenuFolder.length > 0) {
          submenusAdmin.push({
            path: 'carpetas',
            title: 'Archivos y Carpetas',
            icon: 'fas fa-folder',
            class: 'has-arrow',
            extralink: false,
            submenu: submenuFolder,
          })
        }
        let request_type = this.authotizationService.havePermission('REQUEST_TYPE', '*')
        if (request_type) {
          submenuMaintenance.push(
            {
              path: "forma-tipo-solicitud",
              title: "Tipo de solicitud",
              icon: "fas fa-file",
              class: "",
              extralink: false,
              submenu: [],
            }
          );
        }
        let cover = this.authotizationService.havePermission('TERRITORIAL', '*')
        if (cover) {
          submenuMaintenance.push(
            {
              path: "forma-cobertura",
              title: "Coberturas",
              icon: " fas fa-map",
              class: "",
              extralink: false,
              submenu: [],
            }
          );
        }
        /* if (rh) {
          submenuMaintenance.push(
            {
              path: "forma-documento",
              title: "Documentos",
              icon: "  fas fa-book",
              class: "",
              extralink: false,
              submenu: [],
            }
          );
        } */
        /*   if (rh) {
            submenuMaintenance.push(
              {
                path: "requisitos",
                title: "Requisitos",
                icon: "fas fa-clipboard-list",
                class: "",
                extralink: false,
                submenu: [],
              }
            );
          } */
        /* if (rh) {
          submenuMaintenance.push(
            {
              path: "avales",
              title: "Avales",
              icon: "far fa-id-badge",
              class: "",
              extralink: false,
              submenu: [],
            }
          );
        } */
        let fiscal_period = this.authotizationService.havePermission('FISCAL_PERIOD', '*')
        if (fiscal_period) {
          submenuMaintenance.push(
            {
              path: "fiscal-period",
              title: "Período Fiscal",
              icon: "fas fa-calendar-alt",
              class: "",
              extralink: false,
              submenu: [],
            }
          );
        }
        let council_members = this.authotizationService.havePermission('COUNCIL_MEMBERS', '*')
        if (council_members) {
          submenuMaintenance.push(
            {
              path: "council-members",
              title: "Miembros del Comité",
              icon: "fas fa-user",
              class: "",
              extralink: false,
              submenu: [],
            }
          );
        }
        let bc = this.authotizationService.havePermission('BANK', '*')
        if (bc) {
          submenuMaintenance.push(
            {
              path: "banks",
              title: "Bancos",
              icon: "  fas fa-university",
              class: "",
              extralink: false,
              submenu: [],
            }
          );
        }

        let isr = this.authotizationService.havePermission('ISR', '*')
        if (isr) {
          submenuMaintenance.push(
            {
              path: "isr",
              title: "ISR",
              icon: "fas fa-hand-holding-usd",
              class: "",
              extralink: false,
              submenu: [],
            })
          }

        let links = this.authotizationService.havePermission('LINKS', '*')
        if(links){
          submenuMaintenance.push(
            {
              path: "enlace",
              title: "Enlaces",
              icon: "fas fa-globe",
              class: "",
              extralink: false,
              submenu: [],
            }
          );
        }
        let iva = this.authotizationService.havePermission('ISR', '*')
        if (iva) {
          submenuMaintenance.push(
            {
              path: "iva",
              title: "IVA",
              icon: "fas fa-hand-holding-usd",
              class: "",
              extralink: false,
              submenu: [],
            }
          );
        }
        let currency = this.authotizationService.havePermission('CURRENCY', '*')
        if (currency) {
          submenuMaintenance.push(
            {
              path: "forma-moneda",
              title: "Moneda",
              icon: "fas fa-hand-holding-usd",
              class: "",
              extralink: false,
              submenu: [],
            }
          );
        }
        let inspection_place = this.authotizationService.havePermission('INSPECTION_PLACE', '*')
        if (inspection_place) {
          submenuMaintenance.push(
            {
              path: "forma-tipo-inspeccion",
              title: "Lugares de inspección",
              icon: "fas fa-map-pin",
              class: "",
              extralink: false,
              submenu: [],
            }
          );
        }
        let product_type = this.authotizationService.havePermission('PRODUCT_TYPE', '*')
        if (product_type) {
          submenuBrachOffice.push(
            {
              path: "tipo-producto",
              title: "Tipos de Productos",
              icon: "fas fa-people-carry ml-4",
              class: "",
              extralink: false,
              submenu: [],
            }
          );
        }
        let branch_office = this.authotizationService.havePermission('BRANCH_OFFICE', '*')
        if (branch_office) {
          submenuBrachOffice.push(
            {
              path: "sucursales",
              title: "Sucursales",
              icon: "far fa-building ml-4",
              class: "",
              extralink: false,
              submenu: [],
            }
          );
        }
        let account_type = this.authotizationService.havePermission('ACCOUNT_TYPE', '*')
        if (account_type) {
          submenuMaintenance.push(
            {
              path: "forma-tipo-cuenta",
              title: "Tipos de Cuenta",
              icon: "fas fa-users",
              class: "",
              extralink: false,
              submenu: [],
            }
          );
        }
        let products = this.authotizationService.havePermission('PRODUCTS', '*')
        if (products) {
          submenuBrachOffice.push(
            {
              path: "productos",
              title: "Productos",
              icon: "fas fa-hands-helping ml-4",
              class: "",
              extralink: false,
              submenu: [],
            }
          );
        }
        if (submenuBrachOffice.length != 0) {
          submenuMaintenance.push(
            {
              path: "sucursales",
              title: "Sucursales",
              icon: "far fa-building",
              extralink: false,
              class: "has-arrow",
              submenu: submenuBrachOffice,
            }
          );
        }
        let condition = this.authotizationService.havePermission('CONDITION', '*')
        if (condition) {
          submenuRate.push(
            {
              path: "tasa",
              title: "Condiciones",
              icon: "fas fa-list-alt ml-4",
              class: "",
              extralink: false,
              submenu: [],
            }
          );
        }
        let rate_type = this.authotizationService.havePermission('RATE_TYPE', '*')
        if (rate_type) {
          submenuRate.push(
            {
              path: "tipo-tasa",
              title: "Tipo Tasa",
              icon: "fas fa-list-alt ml-4",
              class: "",
              extralink: false,
              submenu: [],
            }
          );
        }
        let rule_type = this.authotizationService.havePermission('RULE_TYPE', '*')
        if (rule_type) {
          submenuRate.push(
            {
              path: "tipo-reglas",
              title: "Tipo Reglas",
              icon: "fas fa-align-justify ml-4",
              class: "",
              extralink: false,
              submenu: [],
            }
          );
        }
        let rule = this.authotizationService.havePermission('RULE', '*')
        if (rule) {
          submenuRate.push(
            {
              path: "reglas",
              title: "Reglas",
              icon: "fas fa-sliders-h ml-4",
              class: "",
              extralink: false,
              submenu: [],
            }
          );
        }
        if (submenuRate.length != 0) {
          submenuMaintenance.push(
            {
              path: "tasas",
              title: "Conf. Condiciones",
              icon: "fas fa-percent",
              extralink: false,
              class: "has-arrow",
              submenu: submenuRate,
            }
          );
        }
        let payment_method = this.authotizationService.havePermission('PAYMENT_METHOD', '*')
        if (payment_method) {
          submenuMaintenance.push(
            {
              path: "forma-tipo-pago",
              title: "Forma de pago",
              icon: "fas fa-handshake",
              class: "",
              extralink: false,
              submenu: [],
            }
          );
        }
        let quote_type = this.authotizationService.havePermission('QUOTE_TYPE', '*')
        if (quote_type) {
          submenuMaintenance.push(
            {
              path: "forma-tipo-cupo",
              title: "Tipo de Cupo",
              icon: "fas fa-briefcase",
              class: "",
              extralink: false,
              submenu: [],
            }
          );
        }
        let adviser_type = this.authotizationService.havePermission('ADVISER_TYPE', '*')
        if (adviser_type) {
          submenuAdviser.push(
            {
              path: "forma-tipo-asesor",
              title: "Tipo de Asesores",
              icon: "fas fa-user ml-4",
              class: "",
              extralink: false,
              submenu: [],
            }
          )
        }
        let adviser = this.authotizationService.havePermission('ADVISER', '*')
        if (adviser) {
          submenuAdviser.push(
            {
              path: "forma-asesor",
              title: "Asesores",
              icon: "fas fa-user ml-4",
              class: "",
              extralink: false,
              submenu: [],
            }
          )
        }

        if (submenuAdviser.length != 0) {
          submenuMaintenance.push(
            {
              path: "asesores",
              title: "Asesores",
              icon: "fas fa-users",
              extralink: false,
              class: "has-arrow",
              submenu: submenuAdviser,
            }
          )
        }
        if (submenuMaintenance.length != 0) {
          newmenu.push({
            path: "mantenimiento",
            title: "Configuraciones",
            icon: "",
            class: "has-arrow",
            extralink: false,
            submenu: submenuMaintenance.sort((a, b) => sortFunction(a, b)),
            type_icon: 'feather',
            icon_class: 'tool'
          })
        }



        //TERMINA EL MENU DE CUMPLIMIENTO

        if (this.authotizationService.havePermission('PERFIL', '____CLIENTE___')) {
          newmenu.push({
            path: '/my-profile',
            title: 'Mi perfil',
            icon: 'mdi mdi-account-card-details',
            class: '',
            extralink: false,
            submenu: [],
          });
        }

        this.menu = newmenu.sort((a, b) => sortFunction(a, b));

        this._sidebarStateSource.next(newmenu);
      }
    );


  }
}



