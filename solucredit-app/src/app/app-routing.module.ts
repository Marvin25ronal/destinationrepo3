import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './layouts/full/full.component';
import { AuthComponent } from './auth/auth.component';
import { NewCustomerComponent } from './form/new-customer/new-customer.component';

import { AuthGuard } from '@auth0/auth0-angular';
import { AuthorizationGuard } from './authorization.guard';
import { ResetguardGuard } from './resetguard.guard';
//import { LogComponent } from './pages/log/log.component';
import { RateType } from './models/ratetype.model';


export const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    /*  canActivate: [AuthorizationGuard], */
    pathMatch: "full",
  },/* 
  {
    path: "new-customer",
    component: NewCustomerComponent,
  },*/
  {
    path: "new-customer",
    loadChildren: () =>
      import("./form/new-customer/new-customer.module").then(
        (m) => m.DashboardModule
      ),
  },

  {
    path: "reset-password",
    canActivate: [ResetguardGuard],
    loadChildren: () =>
      import("./pages/resetpassword/resetpassword.module").then(
        (m) => m.ResetpasswordModule
      ),
  },
  {
    path: "",
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [

      {
        path: "proveedores",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import("./pages/supliers/supliers.module").then(
            (m) => m.SupliersModule
          ),
      },

      {
        path: "solicitudes-reporte",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import("./pages/request-report/request-report.module").then(
            (m) => m.RequestReporteModule
          ),
      },
      {
        path: "deudores-reporte",
        /* canActivate: [AuthorizationGuard], */
        loadChildren: () =>
          import("./pages/deb-report/deb-report.module").then(
            (m) => m.DebReportModule
          ),
      },
      {
        path: "dashboard",
        canActivate: [AuthorizationGuard],

        loadChildren: () =>
          import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
      },
      {
        path: "usuarios",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import("./pages/user/user.module").then((m) => m.UserModule),
      },
      {
        path: "bitacora",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import("./pages/log/log.module").then((m) => m.LogModule),
      },
      {
        path: "roles",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import("./pages/rol/rol.module").then((m) => m.RolModule),
      },
      {
        path: 'rolview',
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import("./pages/rolview/rolview.module").then((m) => m.RolviewModule)
      },

      /* {
        path: "component",
        loadChildren: () =>
          import("./component/component.module").then(
            (m) => m.ComponentsModule
          ),
      }, */
      /* {
        path: "email",
        loadChildren: () =>
          import("./form/email/email.module").then((m) => m.DashboardModule),
      }, */
      {
        path: "customer",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import("./layouts/cutomer/customer.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "customer/:id",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import("./layouts/cutomer/customer.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "new-user",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import("./form/new-user/new-user.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "prospectos",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import("./pages/prospects/prospects.module").then(
            (m) => m.ProspectModule
          ),
      },
      {
        path: "edit-customer",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import("./form/edit-customer/edit-customer.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "edit-customer/:id",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import("./form/edit-customer/edit-customer.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "new-person",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import("./form/new-person/new-person.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "new-member",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import("./form/new-member/new-member.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "edit-view-person",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import("./form/edit-view-person/edit-view-person.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "edit-view-person/:type/:id", //REDIRECCION DEL EDITAR DE REPRESENTANTE LEGAL
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import("./form/edit-view-person/edit-view-person.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "list-customer",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import("./pages/list-customer/list-customer.module").then(
            (m) => m.DashboardModule
          ),
      },

      {
        path: "crear-solicitud",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import("./form/create-request/create-request.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "crear-solicitud/:id",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import("./form/create-request/create-request.module").then(
            (m) => m.DashboardModule
          ),
      },
      //TERMINA CLIENTES

      //Alertas

      {
        path: "creacion-alertas",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import("./pages/alerts/alerts-crud/alerts-crud.module").then(
            (m) => m.AlertsCrudModule
          ),
      },

      {
        path: "bitacora-alertas",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import("./pages/alerts/alerts-log/alerts-log.module").then(
            (m) => m.AlertsLogModule
          ),
      },

      //Deudores
      {
        path: "deudores",
        loadChildren: () =>
          import("./pages/debtors/debtors.module").then((m) => m.DebtorsModule),
      },


      //TERMINA ALERTAS
      {
        path: "cargar-lista-onu",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import("./pages/upload-onu-list/upload-onu-list.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "consulta-lista-onu",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import("./pages/consult-onu-list/consult-onu-list.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "verificacion-cliente-onu",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import(
            "./pages/verification-list-onu/verification-list-onu.module"
          ).then((m) => m.DashboardModule),
      },
      {
        path: "bitacora-de-desbloqueo",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import(
            "./pages/log-unlock-lock-customer-onu/log-unlock-lock-customer-onu.module"
          ).then((m) => m.LogUnlockLockCustomerOnu),
      },
      /*{
        path: "desbloqueo-cliente-onu",
        loadChildren: () =>
          import(
            "./pages/unlock-customer-list-onu/unlock-customer-list-onu.module"
          ).then((m) => m.DashboardModule),
      }, */
      //TODO PREGUNTAR COMO PROTEGER ESTA RUTA
      {
        path: "cumplimiento-cliente/:id/:request",
        loadChildren: () =>
          import("./pages/customer-compliance/customer-compliance.module").then(
            (m) => m.DashboardModule
          ),
      },
      //TODO PRESGUNTAR COMO PROTEGER ESTO...
      {
        //SE MANDA POR CORREO ELECTRONICO AL CLIENTE.
        canActivate: [AuthorizationGuard],
        path: "subir-archivos/:id", //SIRVE PARA SUBIR LOS ARCHIVOS DE CLIENTE, EL DPI Y LA CARTA CUANDO SE INICIAL LA RELACIONES
        loadChildren: () =>
          import(
            "./pages/upload-documents-of-relation/upload-document-of-relation.module"
          ).then((m) => m.DashboardModule),
      },

      //Inicio forms
      {
        path: "solicitud-individual/:idsolicitud",
        loadChildren: () =>
          import(
            "./forms/individual/solicitud-individual/solicitud-individual.module"
          ).then((m) => m.SolicitudIndividualModule),
      },
      {
        path: "solicitud-individual",
        loadChildren: () =>
          import(
            "./forms/individual/solicitud-individual/solicitud-individual.module"
          ).then((m) => m.SolicitudIndividualModule),
      },
      {
        path: "perfil-individual",
        loadChildren: () =>
          import(
            "./forms/individual/perfil-individual/perfil-individual.module"
          ).then((m) => m.PerfilIndividualModule),
      },
      {
        path: "perfil-individual/:idsolicitud",
        loadChildren: () =>
          import(
            "./forms/individual/perfil-individual/perfil-individual.module"
          ).then((m) => m.PerfilIndividualModule),
      },
      {
        path: "feic-individual/:idsolicitud",
        loadChildren: () =>
          import(
            "./forms/individual/feic-individual/feic-individual.module"
          ).then((m) => m.FeicIndividualModule),
      },
      {
        path: "feic-individual",
        loadChildren: () =>
          import(
            "./forms/individual/feic-individual/feic-individual.module"
          ).then((m) => m.FeicIndividualModule),
      },
      {
        path: "ive-productos-individual/:idsolicitud",
        loadChildren: () =>
          import(
            "./forms/individual/ive-productos-individual/ive-productos-individual.module"
          ).then((m) => m.IveProductosIndividualModule),
      },
      {
        path: "ive-productos-individual",
        loadChildren: () =>
          import(
            "./forms/individual/ive-productos-individual/ive-productos-individual.module"
          ).then((m) => m.IveProductosIndividualModule),
      },
      {
        path: "cpe-individual/:idsolicitud",
        loadChildren: () =>
          import(
            "./forms/individual/cpe-individual/cpe-individual.module"
          ).then((m) => m.CpeIndividualModule),
      },
      {
        path: "cpe-individual",
        loadChildren: () =>
          import(
            "./forms/individual/cpe-individual/cpe-individual.module"
          ).then((m) => m.CpeIndividualModule),
      },
      {
        path: "pep-individual/:idsolicitud",
        loadChildren: () =>
          import(
            "./forms/individual/pep-individual/pep-individual.module"
          ).then((m) => m.PepIndividualModule),
      },
      {
        path: "pep-individual",
        loadChildren: () =>
          import(
            "./forms/individual/pep-individual/pep-individual.module"
          ).then((m) => m.PepIndividualModule),
      },
      {
        path: "autorizacion-consulta-individual/:idsolicitud",
        loadChildren: () =>
          import(
            "./forms/individual/autorizacion-consulta-individual/autorizacion-consulta-individual.module"
          ).then((m) => m.AutorizacionConsultaIndividualModule),
      },
      {
        path: "autorizacion-consulta-individual",
        loadChildren: () =>
          import(
            "./forms/individual/autorizacion-consulta-individual/autorizacion-consulta-individual.module"
          ).then((m) => m.AutorizacionConsultaIndividualModule),
      },
      {
        path: "carta-banco-internacional-individual/:idsolicitud",
        loadChildren: () =>
          import(
            "./forms/individual/carta-banco-internacional-individual/carta-banco-internacional-individual.module"
          ).then((m) => m.CartaBancoInternacionalIndividualModule),
      },
      {
        path: "carta-banco-internacional-individual",
        loadChildren: () =>
          import(
            "./forms/individual/carta-banco-internacional-individual/carta-banco-internacional-individual.module"
          ).then((m) => m.CartaBancoInternacionalIndividualModule),
      },
      {
        path: "estado-patrimonial-individual/:idsolicitud",
        loadChildren: () =>
          import(
            "./forms/individual/estado-patrimonial-individual/estado-patrimonial-individual.module"
          ).then((m) => m.EstadoPatrimonialIndividualModule),
      },
      {
        path: "estado-patrimonial-individual",
        loadChildren: () =>
          import(
            "./forms/individual/estado-patrimonial-individual/estado-patrimonial-individual.module"
          ).then((m) => m.EstadoPatrimonialIndividualModule),
      },
      {
        path: "flujo-fondos-individual/:idsolicitud",
        loadChildren: () =>
          import(
            "./forms/individual/flujo-fondos-individual/flujo-fondos-individual.module"
          ).then((m) => m.FlujoFondosIndividualModule),
      },
      {
        path: "flujo-fondos-individual",
        loadChildren: () =>
          import(
            "./forms/individual/flujo-fondos-individual/flujo-fondos-individual.module"
          ).then((m) => m.FlujoFondosIndividualModule),
      },
      {
        path: "endeudamiento-bancario-individual/:idsolicitud",
        loadChildren: () =>
          import(
            "./forms/individual/endeudamiento-bancario-individual/endeudamiento-bancario-individual.module"
          ).then((m) => m.EndeudamientoBancarioIndividualModule),
      },
      {
        path: "endeudamiento-bancario-individual",
        loadChildren: () =>
          import(
            "./forms/individual/endeudamiento-bancario-individual/endeudamiento-bancario-individual.module"
          ).then((m) => m.EndeudamientoBancarioIndividualModule),
      },
      {
        path: "formato-integraciones-individual/:idsolicitud",
        loadChildren: () =>
          import(
            "./forms/individual/formato-integraciones-individual/formato-integraciones-individual.module"
          ).then((m) => m.FormatoIntegracionesIndividualModule),
      },
      {
        path: "formato-integraciones-individual",
        loadChildren: () =>
          import(
            "./forms/individual/formato-integraciones-individual/formato-integraciones-individual.module"
          ).then((m) => m.FormatoIntegracionesIndividualModule),
      },
      {
        path: "registro-deudores-individual/:idsolicitud",
        loadChildren: () =>
          import(
            "./forms/individual/registro-deudores-individual/registro-deudores-individual.module"
          ).then((m) => m.RegistroDeudoresIndividualModule),
      },
      {
        path: "registro-deudores-individual",
        loadChildren: () =>
          import(
            "./forms/individual/registro-deudores-individual/registro-deudores-individual.module"
          ).then((m) => m.RegistroDeudoresIndividualModule),
      },

      //Inicio forms
      {
        path: "solicitud-individual",
        loadChildren: () =>
          import(
            "./forms/individual/solicitud-individual/solicitud-individual.module"
          ).then((m) => m.SolicitudIndividualModule),
      },
      {
        path: "perfil-individual",
        loadChildren: () =>
          import(
            "./forms/individual/perfil-individual/perfil-individual.module"
          ).then((m) => m.PerfilIndividualModule),
      },
      {
        path: "feic-individual",
        loadChildren: () =>
          import(
            "./forms/individual/feic-individual/feic-individual.module"
          ).then((m) => m.FeicIndividualModule),
      },
      {
        path: "ive-productos-individual",
        loadChildren: () =>
          import(
            "./forms/individual/ive-productos-individual/ive-productos-individual.module"
          ).then((m) => m.IveProductosIndividualModule),
      },
      {
        path: "cpe-individual",
        loadChildren: () =>
          import(
            "./forms/individual/cpe-individual/cpe-individual.module"
          ).then((m) => m.CpeIndividualModule),
      },
      {
        path: "pep-individual",
        loadChildren: () =>
          import(
            "./forms/individual/pep-individual/pep-individual.module"
          ).then((m) => m.PepIndividualModule),
      },
      {
        path: "autorizacion-consulta-individual",
        loadChildren: () =>
          import(
            "./forms/individual/autorizacion-consulta-individual/autorizacion-consulta-individual.module"
          ).then((m) => m.AutorizacionConsultaIndividualModule),
      },
      {
        path: "carta-banco-internacional-individual",
        loadChildren: () =>
          import(
            "./forms/individual/carta-banco-internacional-individual/carta-banco-internacional-individual.module"
          ).then((m) => m.CartaBancoInternacionalIndividualModule),
      },
      {
        path: "estado-patrimonial-individual",
        loadChildren: () =>
          import(
            "./forms/individual/estado-patrimonial-individual/estado-patrimonial-individual.module"
          ).then((m) => m.EstadoPatrimonialIndividualModule),
      },
      {
        path: "flujo-fondos-individual",
        loadChildren: () =>
          import(
            "./forms/individual/flujo-fondos-individual/flujo-fondos-individual.module"
          ).then((m) => m.FlujoFondosIndividualModule),
      },
      {
        path: "endeudamiento-bancario-individual",
        loadChildren: () =>
          import(
            "./forms/individual/endeudamiento-bancario-individual/endeudamiento-bancario-individual.module"
          ).then((m) => m.EndeudamientoBancarioIndividualModule),
      },
      {
        path: "formato-integraciones-individual",
        loadChildren: () =>
          import(
            "./forms/individual/formato-integraciones-individual/formato-integraciones-individual.module"
          ).then((m) => m.FormatoIntegracionesIndividualModule),
      },
      {
        path: "registro-deudores-individual",
        loadChildren: () =>
          import(
            "./forms/individual/registro-deudores-individual/registro-deudores-individual.module"
          ).then((m) => m.RegistroDeudoresIndividualModule),
      },
      //Forumlarios Juridicos
      {
        path: "solicitud-empresa/:idsolicitud",
        loadChildren: () =>
          import(
            "./forms/empresa/solicitud-empresa/solicitud-empresa.module"
          ).then((m) => m.SolicitudEmpresaModule),
      },
      {
        path: "solicitud-empresa",
        loadChildren: () =>
          import(
            "./forms/empresa/solicitud-empresa/solicitud-empresa.module"
          ).then((m) => m.SolicitudEmpresaModule),
      },
      {
        path: "perfil-empresa",
        loadChildren: () =>
          import("./forms/empresa/perfil-empresa/perfil-empresa.module").then(
            (m) => m.PerfilEmpresaModule
          ),
      },
      {
        path: "perfil-empresa/:idsolicitud",
        loadChildren: () =>
          import("./forms/empresa/perfil-empresa/perfil-empresa.module").then(
            (m) => m.PerfilEmpresaModule
          ),
      },
      {
        path: "feic-empresa",
        loadChildren: () =>
          import("./forms/empresa/feic-empresa/feic-empresa.module").then(
            (m) => m.FeicEmpresaModule
          ),
      },
      {
        path: "ive02-empresa",
        loadChildren: () =>
          import("./forms/empresa/ive02-empresa/ive02-empresa.module").then(
            (m) => m.Ive02EmpresaModule
          ),
      },
      {
        path: "puntoacta-empresa",
        loadChildren: () =>
          import(
            "./forms/empresa/puntoacta-empresa/puntoacta-empresa.module"
          ).then((m) => m.PuntoactaEmpresaModule),
      },

      //Alertas

      {
        path: "creacion-alertas",
        loadChildren: () =>
          import("./pages/alerts/alerts-crud/alerts-crud.module").then(
            (m) => m.AlertsCrudModule
          ),
      },

      {
        path: "bitacora-alertas",
        loadChildren: () =>
          import("./pages/alerts/alerts-log/alerts-log.module").then(
            (m) => m.AlertsLogModule
          ),
      },

      //Deudores
      {
        path: "deudores",
        loadChildren: () =>
          import("./pages/debtors/debtors.module").then((m) => m.DebtorsModule),
      },
      {
        path: "my-profile",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import("./pages/my-profile/my-profile.module").then(
            (m) => m.MyProfileModule
          ),
      },
      {
        path: "consolidado-de-informacion",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import("./pages/all-data-form/all-data-form.module").then(
            (m) => m.AllDataFormModule
          ),
      },
      {
        path: "formularios",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import("./pages/all-form/all-form.module").then(
            (m) => m.AllFormModule
          ),
      },
      //INICIA MANTENIMIENTO
      {
        path: "forma-desembolso",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import('./pages/maintenance/disbursement/disbursement.module')
            .then((m) => m.DisbursementModule)
      },
      {
        path: "fiscal-period",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import('./pages/maintenance/fiscal-period/fiscal-period.module')
            .then((m) => m.FiscalPeriodModule)
      },
      {
        path: "council-members",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import('./pages/maintenance/councilmembers/councilmembers.module')
            .then((m) => m.CouncilmembersModule)
      },
      {
        path: "forma-garantia",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import('./pages/maintenance/warranty-type/warranty-type.module')
            .then((m) => m.WarrantyTypeModule)
      }, {
        path: 'forma-tipo-solicitud',
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import('./pages/maintenance/request-type/request-type.module')
            .then((m) => m.RequestTypeModule)
      },
      {
        path: 'forma-moneda',
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import('./pages/maintenance/currency/currency.module')
            .then((m) => m.CurrencyModule)
      },
      {
        path: 'isr',
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import('./pages/maintenance/isr/isr.module')
            .then((m) => m.IsrModule)
      },
      {
        path: 'iva',
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import('./pages/maintenance/iva/iva.module')
            .then((m) => m.IvaModule)
      },
      {
        path: "forma-cobertura",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import('./pages/maintenance/territorial-coverage/territorial-coverage.module')
            .then((m) => m.TerritorialCoverageModule)
      },
      {
        path: "forma-documento",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import('./pages/maintenance/doc-warranty/doc-warranty.module')
            .then((m) => m.DocWarrantyModule)
      },
      {
        path: "requisitos",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import('./pages/maintenance/requirements/requirements.module')
            .then((m) => m.RequirementsModule)
      },
      {
        path: "avales",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import('./pages/maintenance/endorsement/endorsement.module')
            .then((m) => m.EndorsementModule)
      },
      {
        path: "banks",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import('./pages/maintenance/banks/banks.module')
            .then((m) => m.BanksModule)
      },
      {
        path: "forma-tipo-inspeccion",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import('./pages/maintenance/inspection-place/inspection-place.module')
            .then((m) => m.InspectionPlaceModule)
      },
      {
        path: "tipo-producto",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import('./pages/maintenance/product-type/product-type.module')
            .then((m) => m.ProductTypeModule)
      },
      {
        path: "productos",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import('./pages/maintenance/product/product.module')
            .then((m) => m.ProductModule)
      },
      {
        path: "sucursales",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import('./pages/maintenance/branchoffice/branchoffice.module')
            .then((m) => m.BranchOfficeModule)
      },
      {
        path: "forma-tipo-cuenta",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import('./pages/maintenance/account-types/account-types.module')
            .then((m) => m.AccountTypesModule)
      },
      {
        path: "forma-tipo-pago",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import('./pages/maintenance/payment-method/payment-method.module')
            .then((m) => m.PaymentMethodModule)
      },
      {
        path: "forma-tipo-cupo",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import('./pages/maintenance/quota-type/quota-type.module')
            .then((m) => m.QuotaTypeModule)
      },
      {
        path: "forma-tipo-asesor",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import('./pages/maintenance/adviser-type/adviser-type.module')
            .then((m) => m.AdviserTypeModule)
      },
      {
        path: "tipo-reglas",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import('./pages/maintenance/rule-type/rule-type.module')
            .then((m) => m.RuleTypeModule)
      },
      {
        path: "reglas",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import('./pages/maintenance/rules/rules.module')
            .then((m) => m.RulesModule)
      },
      {
        path: "tipo-tasa",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import('./pages/maintenance/rate-type/rate-type.module')
            .then((m) => m.RateTypeModule)
      },
      {
        path: "tasa",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import('./pages/maintenance/rate/rate.module')
            .then((m) => m.RateModule)
      },
      {
        path: "forma-asesor",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import('./pages/maintenance/adviser/adviser.module')
            .then((m) => m.AdviserModule)
      },
      {
        path: 'carpetas',
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import('./pages/file-manager/file-manager/file-manager.module')
            .then((m) => m.FileManagerModule)
      },
      {
        path: "analysis-report",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import('./pages/analysis-report/analysis-report.module')
            .then((m) => m.AnalysisReportModule)
      },
      {
        path: "management-act",
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import('./pages/management-act/management-act.module')
            .then((m) => m.ManagementActModule)
      },
      {
        path: 'legal-analysis-list',
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import('./pages/analysis/analysis-legal-list/analysis-legal-list.module')
            .then((m) => m.AnalysisLegalListModule)
      },
      {
        path: 'legal-analysis/:id/:requestid/:customerid',
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import('./pages/analysis/legal-analysis/legal-analysis.module')
            .then((m) => m.LegalAnalysisModule)
      },
      {
        path: 'compliance-verification/:id/:requestid/:customerid',
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import('./pages/analysis/compliance-verification/compliance-verification.module')
            .then(m => m.ComplianceVerificationModule)
      },
      {
        path: 'compliance-verification-list',
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import('./pages/analysis/compliance-verification-list/compliance-verification-list.module')
            .then((m) => m.ComplianceVerificationListModule)
      },
      {
        path: 'enlace',
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import('./pages/maintenance/linkmaintenance/linkmaintenance.module')
            .then((m => m.LinkmaintenanceModule))
      },
      {
        path: "**",
        loadChildren: () =>
          import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
      },

    ],
  },
  {
    path: "auth",
    component: AuthComponent,
  },
];

export class AppRoutingModule { }
