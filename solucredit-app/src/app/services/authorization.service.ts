import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, ReplaySubject, interval, of, throwError } from 'rxjs';
import { map, filter, catchError, exhaustMap, mergeMap, retry, delay } from 'rxjs/operators';
import { Subject, timer } from 'rxjs';
import { Rol } from '../models/rol.model';
import { permisos, environment } from 'src/environments/environment';
import { AuthorizeResponse, PostAuthorize, UserData } from '../interfaces/api/v1/authorize/index.interface';

const httpOptions = {


  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
      /* 'Access-Control-Allow-Credentials': 'true' */
    }),
  responseType: 'json' as const,
  //withCredentials: true as const,  
  observe: 'response' as const
};

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  flagNoPermission = false;
  userPermisos: AuthorizeResponse[] = [];
  alredyCharged = false;
  private _authorizationStateSource: Subject<AuthorizeResponse[]>;
  authotizationState$: Observable<AuthorizeResponse[]>;

  private _userDataStateSource: Subject<UserData>;
  userDataState$: Observable<UserData>;

  constructor(public http: HttpClient) {
    //console.log('############-CONSTRUCTOR  DE AUTHORIZATION SERVICE ####')
    this._authorizationStateSource = new ReplaySubject<AuthorizeResponse[]>();
    this.authotizationState$ = this._authorizationStateSource.asObservable();

    this._userDataStateSource = new ReplaySubject<UserData>();
    this.userDataState$ = this._userDataStateSource.asObservable();

  }

  getUserid(): number {

    return parseInt(this.userPermisos[0].rol_id);

  }


  changeAuthorizationState(permisos: AuthorizeResponse[]) {

    this._authorizationStateSource.next(permisos);
  }
  changeUserData(data: UserData) {
    this._userDataStateSource.next(data);
  }
  canActivateRoute(url: string): Observable<boolean> {

    return new Observable<boolean>((subscriber) => {
      //console.log("##### VA A CONSUMIR EL canActivateROute del SERVICIO:" + url);
      if (this.userPermisos.length == 0) {
        this.flagNoPermission = true;
        subscriber.next(false);
      }
      else {
        this.flagNoPermission = false;
      }
      switch (url) {

        case '/my-profile': {
          subscriber.next(!this.havePermission('DASHBOARD', '____CLIENTE___'));
          break;
        }

        case '/subir-archivos': {
          subscriber.next(!this.havePermission('DASHBOARD', '____CLIENTE___'));
          break;
        }

        case '/dashboard': {
          subscriber.next(this.havePermission('DASHBOARD', '____CLIENTE___'));
          break;
        }
        case '/solicitudes-reporte': {
          subscriber.next(this.havePermission('REPORT', 'REQUEST'));
          break;

        }
        case '/deudores-reporte': {
          subscriber.next(this.havePermission('REPORT', 'REQUEST'));
          break;

        }

        //ADMINISTRACION
        case '/bitacora': {


          subscriber.next(this.havePermission('LOG', '*'));
          break;


        }
        case '/usuarios': {

          subscriber.next(this.havePermission('USER', '*'));
          break;
        }
        case '/roles': {
          subscriber.next(this.havePermission('ROL', '*'));
          break;
        }

        case '/list-customer': {
          subscriber.next(this.havePermission('CLIENT', 'LIST'));
          break;
        }
        case '/customer': {
          subscriber.next(this.havePermission('CLIENT', 'SEE'));
          break;
        }
        case '/edit-customer': {

          subscriber.next(this.havePermission('CLIENT', 'EDIT'));
          break;
        }

        case '/new-user': {

          subscriber.next(this.havePermission('CLIENT', 'CREATE'));
          break;
        }
        case '/new-person': {

          subscriber.next(this.havePermission('CLIENT', 'ADD_REPRESENTATIVE'));
          break;
        }
        case '/edit-view-person': {

          //subscriber.next(this.havePermission('CLIENT', 'EDIT_REPRESENTATIVE'));
          subscriber.next(true);
          break;
        }
        case '/crear-solicitud': {

          //subscriber.next(this.havePermission('CLIENT', 'EDIT_REPRESENTATIVE'));
          subscriber.next(true);
          break;
        }

        case '/deudores': {

          subscriber.next(
            this.havePermission('CLIENT', 'LIST_DEB') ||
            this.havePermission('CLIENT', 'CREATE_DEB')
          );
          //subscriber.next(true);
          break;
        }


        //TERMINO LA PARTE DE CLIENTES
        case '/solicitudes-reporte': {
          subscriber.next(this.havePermission('REPORT', 'REQUEST'));
          break;
        }
        //TERMINA REPORTES

        case '/creacion-alertas': {

          subscriber.next(this.havePermission('ALERT', 'LIST') || this.havePermission('ALERT', 'CREATE'));
          break;
        }
        case '/bitacora-alertas': {
          subscriber.next(this.havePermission('ALERT', 'LOG'));
          break;
        }
        //TERMINO LA PARTE DE ALERTAS
        case '/cargar-lista-onu': {
          subscriber.next(this.havePermission('ONU', 'SEE_LIST'));
          break;
        }

        case '/consulta-lista-onu': {
          subscriber.next(this.havePermission('ONU', 'QUERY'));
          break;
        }
        case '/verificacion-cliente-onu': {
          subscriber.next(this.havePermission('ONU', 'CHECK_CLIENT'));
          break;
        }
        case '/bitacora-de-desbloqueo': {
          subscriber.next(this.havePermission('ONU', 'LOGS'));
          break;
        }

        case '/proveedores': {
          subscriber.next(this.havePermission('SUPPLIER', '*'));
          break;
        }
        //MANTENIMIENTO
        case '/forma-desembolso': {
          subscriber.next(this.havePermission('SUPPLIER', '*'));
          break;
        }
        case '/forma-pago': {
          subscriber.next(this.havePermission('SUPPLIER', '*'));
          break;
        }
        case '/forma-garantia': {
          subscriber.next(this.havePermission('SUPPLIER', '*'));
          break;
        }
        case '/forma-tipo-solicitud': {
          subscriber.next(this.havePermission('SUPPLIER', '*'));
          break;
        }
        case '/forma-moneda': {
          subscriber.next(this.havePermission('SUPPLIER', '*'));
          break;
        }
        case '/forma-cobertura':{
          subscriber.next(this.havePermission('SUPPLIER', '*'));
          break;
        }
        case '/forma-documento':{
          subscriber.next(this.havePermission('SUPPLIER', '*'));
          break;
        }
        case '/requisitos':{
          subscriber.next(this.havePermission('SUPPLIER', '*'));
          break;
        }
        case '/avales':{
          subscriber.next(this.havePermission('SUPPLIER', '*'));
          break;
        }
        case '/tipo-producto':{
          subscriber.next(this.havePermission('SUPPLIER', '*'));
          break;
        }
        case '/productos':{
          subscriber.next(this.havePermission('SUPPLIER', '*'));
          break;
        }
        case '/sucursales':{
          subscriber.next(this.havePermission('SUPPLIER', '*'));
          break;
        }
        case '/tipo-reglas':{
          subscriber.next(this.havePermission('SUPPLIER', '*'));
          break;
        }
        case '/forma-tipo-asesor':{
          subscriber.next(this.havePermission('SUPPLIER', '*'));
          break;
        }
        case '/reglas':{
          subscriber.next(this.havePermission('SUPPLIER', '*'));
          break;
        }
        case '/tipo-tasa':{
          subscriber.next(this.havePermission('SUPPLIER', '*'));
          break;
        }
        case '/tasa':{
          subscriber.next(this.havePermission('SUPPLIER', '*'));
          break;
        }
        case '/isr':{
          subscriber.next(this.havePermission('SUPPLIER', '*'));
          break;
        }


        //TERMINO LA PARTE DE ONU


        default: {
          //console.log('ENTRO AL DEFAULT????')
          subscriber.next(true);
        }
      }

      //subscriber.complete();


    }).pipe(
      mergeMap((val) => {
        //console.log('ENTRO AL PIPE');

        if (this.flagNoPermission) {
          //console.log('TIRANDO ERROR!! ' + this.userPermisos)
          return throwError('ERROR HAUN NO HAY PERMISOS');

        }
        return of(val);


      })
      /* delay(5000), */

      /* retry(10) */
    );

  }
  havePermission(recurso: string, accion: string): boolean {
    //console.log(`havePermission:: ${recurso} ${accion}`);
    //console.log(permisos);
    //console.log('-----------------');
    //console.log('MIS PERMISOS::');
    //console.log(this.userPermisos);
    
    if (recurso == 'DASHBOARD') {
      if (this.userPermisos[0].permission_id == '____CLIENTE___')
        return false;
      return true;
    }
    if (recurso == 'PERFIL') {

      if (this.userPermisos[0].permission_id == '____CLIENTE___')
        return true;
      return false;
    }
    let rRecurso = permisos[recurso];
    //console.log(rRecurso);
    if (!rRecurso) { console.log('ERROR GRAVE, NO EXISTE EL RECURSO EN LOS PERMISOS-GROBALES'); return false; }

    if (accion == '*') {

      //console.log(rRecurso);



      let permi = this.userPermisos.filter(item => Object.values(rRecurso).indexOf(item.permission_id) != -1);
      if (permi.length == 0) { /* console.log('NO ENCONTRE EL PERMISO'); */  return false; }
      return true;
    }
    else {
      //BUSCO EL PERMISO ENTRE LOS PERMISOS
      let rPermission = rRecurso[accion];
      if (!rPermission) { console.log('ERROR GRAVE, NO EXISTE EL PERMISO EN LOS PERMISOS-GLOBALES:: ' + recurso + "[" + accion + "]"); return false; }
      let permi = this.userPermisos.filter(item => item.permission_id == rPermission)
      if (permi.length == 0) { /* console.log('NO ENCONTRE EL PERMISO'); */ return false; }
      return true;
    }





  }
  autorizar(email: string, jwt: string, name: string): Observable<AuthorizeResponse[]> {
    //this._userDataStateSource.next({ name, email, jwt });

    //console.log(`EL CORREO QUE VOY A USAR PARA IDENTIFICARME ${email} ${name}`);

    const uri = `${environment.urlAuthorize}`;
    const data = {
      email,
      jwt
    };
    return this.http.post<PostAuthorize>(uri, data, httpOptions).pipe(
      map((response) => {
        //console.log('.....SE LLAMO A autorizar');
        //console.log(`ESTOS SON LOS PERMISOS`);
        //console.log(response.body.data);'
        //debugger
        this.userPermisos = response.body.data;
        this.changeAuthorizationState(response.body.data);
        this.alredyCharged = true;
        this._userDataStateSource.next({ name, email, jwt });
        return response.body.data;

      })
    )
    //let source = timer(1000);
    /* return source.pipe(
      exhaustMap(() => {
        return this.http.post<PostAuthorize>(uri, data, httpOptions).pipe(
          map((response) => {
            //console.log('.....SE LLAMO A autorizar');
            //console.log(`ESTOS SON LOS PERMISOS`);
            //console.log(response.body.data);
            this.permisos = response.body.data;
            this.changeAuthorizationState(response.body.data);
            this.alredyCharged = true;
            this._userDataStateSource.next({ name, email, jwt });
            return response.body.data;

          })
        )
      })
    ) */
    /* return this.http.post<PostAuthorize>(uri, data, httpOptions).pipe(
      map((response) => {
        //console.log('.....SE LLAMO A autorizar');
        //console.log(`ESTOS SON LOS PERMISOS`);
        //console.log(response.body.data);
        this.permisos = response.body.data;
        this.changeAuthorizationState(response.body.data);
        this.alredyCharged = true;
        this._userDataStateSource.next({ name, email, jwt });
        return response.body.data;

      })
    ) */

  }
}
