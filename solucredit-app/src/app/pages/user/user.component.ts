import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { map, mergeMap, catchError, exhaustMap, withLatestFrom, } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { UserService } from './servicio/user.service';
import { User } from '../../models/user.model';
import { of, Observable, Subscription } from 'rxjs';
import { Rol } from 'src/app/models/rol.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthorizationService } from '../../services/authorization.service';
import { MysqlService } from '../../services/mysql/mysql.service';
import { ValidatePasswordAuth0Service } from 'src/app/services/auth0/validate-password-auth0.service';
import { ValidationErrors } from '@iplab/ngx-file-upload';
interface checkRol {
    value: boolean;
    rol: Rol
}
@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


    //PARA FILTROS

    vals: any[] = ['', '', '', '', '', '', '', ''];


    config = [

        {
            label: 'Email:',
            tipo: 'TEXT',
            range: false,
            labelsAux: []

        },
        {
            label: 'Nombres:',
            tipo: 'TEXT',
            range: false,
            labelsAux: []

        },
        {
            label: 'Apellidos:',
            tipo: 'TEXT',
            range: false,
            labelsAux: []

        },
        {

            tipo: 'OPTIONS',
            options: {
                restart: false,
                header: false

            }

        }
    ];

    filter(dataFilter) {

        let searchField = [];
        let searchItem = [];


        /* if (this.vals[0] && this.vals[1]) {
          searchField.push('FECINI');
          let fecini = this.vals[0].year + '-' + this.vals[0].month + '-' + this.vals[0].day + ' 00:00:00';
          searchItem.push(fecini);
          searchField.push('FECEND');
          let fecend = this.vals[1].year + '-' + this.vals[1].month + '-' + this.vals[1].day + ' 23:59:59';
          searchItem.push(fecend);
        } */


        if (this.vals[2] != "") {
            searchField.push('NAME');
            searchItem.push('%' + this.vals[2] + '%');

        }
        if (this.vals[4] != "") {
            searchField.push('NAME2');
            searchItem.push('%' + this.vals[4] + '%');

        }
        if (this.vals[0] != "") {
            searchField.push('EMAIL');
            searchItem.push('%' + this.vals[0] + '%');
        }

        let sub = this.userService.getUsers(this.pageSize, (this.page - 1) * this.pageSize, searchItem, searchField).pipe(
            map((response) => {

                this.userList = response.data;
                this.usersTotal = response.count;
                this.spinner.hide();
                /* 
                                this.supplierList = response.data;
                                this.suppliersTotal = response.count;
                                this.spinner.hide(); */


            }),
            catchError((err) => {
                this.notifier.notify('error', 'Ocurrio un problema con la conexion' + err);
                console.log(err);
                return of();
            })

        ).subscribe(() => {
            //console.log('................');
            sub.unsubscribe()
        });

    }
    constructor(
        private notifier: NotifierService,
        private userService: UserService,
        private fb: FormBuilder,
        private modalService: NgbModal,
        private datePipe: DatePipe,
        private spinner: NgxSpinnerService,
        private autorization: AuthorizationService,
        private mysqlService: MysqlService,
        private validate_auth0: ValidatePasswordAuth0Service
    ) { }


    getCurrentuser(): string {
        let a = window.localStorage.getItem('email');
        if (!a)
            return ""
        else
            return a;
    }
    canDelete(): boolean {
        let resource = 'USER';
        return this.autorization.havePermission(resource, 'DELETE');
    }

    canUpdate(): boolean {
        let resource = 'USER';
        return this.autorization.havePermission(resource, 'UPDATE');
    }
    canCreate(): boolean {
        let resource = 'USER';
        return this.autorization.havePermission(resource, 'CREATE');
    }
    canList(): boolean {
        let resource = 'USER';
        return this.autorization.havePermission(resource, 'LIST');
    }
    canEditPass(): boolean {
        let resource = 'USER';
        return this.autorization.havePermission(resource, 'PASS_EDITION');
    }

    //SUSCRIPCIONES
    suscripcionUsers: Subscription;
    //FLAGS DE COMPOTAMIENTO
    isEmailUnique: boolean;
    isEmailInputFocus: boolean;



    //aux to delete
    IdUsertoDelete = -1;
    @ViewChild('modalDelete') private modalDelete: TemplateRef<{}>;



    //COSAS PAR EL CHECKBOX...
    // For example, an array of choices
    //public checks: Array<Rol> = [];
    public rolesModificados: Array<checkRol>;
    public isCalculatingRoles: boolean;
    public rolesMap = {};
    isLoadingInEdition: boolean;




    //PAGINACION
    page = 1;
    pageSize = 10;
    userActual: User;
    rolestotales: Rol[];
    rolesactuales: Rol[];
    //searchTerm = '';


    generos = ['Femenino', 'Masculino'];
    /* singleselectedItems = []; */
    isEditing = false;

    pageName = 'Personal';
    singledropdownSettings = {};
    multidropdownSettings = {};

    //FORMULARIOS

    editPassword = this.fb.group({

        newPassword: ['', [Validators.required]],
        confirm: ['', [Validators.required, this.forbiddenNameValidator()]]

    },
        {
            validators: [this.forbiddenNameValidator()]
        });
    newUserForm = this.fb.group({
        FirstName: ['', Validators.required],
        LastName: ['', Validators.required],
        Email: ['', [Validators.required, Validators.email]],
        Gen: ['', Validators.required],
        Phone: ['', [Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)")]],
        Address: [''],
        Rols: []
    });
    newUserForm2 = this.fb.group({

        Rols: []
    });


    editUser = this.fb.group({
        FirstName: ['', Validators.required],
        LastName: ['', Validators.required],
        Email: ['', [Validators.required, Validators.email]],
        GenFalso: [],
        Gen: [],
        Phone: [''],
        Address: [''],
        Rols: new FormArray([])
    });

    //LISTA DE USUARIO PRINCIPAL
    userList: User[] = [];
    usersTotal: number;
    //PARA LOS ROLES CARGADOR DURANTE LA SECCION DE CREACION
    roles: Rol[] = [];

    //ESTRUCTURAS ROL PARA EL DROPDOWN DE CREACION DEL USUARIO
    rolesitems = [];
    getUsers() {
        this.spinner.show();
        /* this.suscripcionUsers = this.userService.getUsers(this.pageSize, (this.page-1)*this.pageSize).pipe(
            map((response) => {
                this.userList = response.users;
                this.usersTotal = response.count;
                this.spinner.hide();
                
                
            }),
            catchError((err) => {
                this.notifier.notify('error', 'Ocurrio un problema con la conexion' + err);
                console.log(err);
                return of();
            })
            
        ).subscribe((lol) => {
            //console.log('................');
            this.suscripcionUsers.unsubscribe()
        }); */
        this.filter(null);
    }
    ngOnInit() {
        //CHECKBOXES
        this.isCalculatingRoles = false;
        this.isLoadingInEdition = false;
        //-----------------
        //FLAG PARA VALIDACION DE CORREO
        this.isEmailUnique = true;
        this.isEmailInputFocus = false;
        this.getUsers();

        this.singledropdownSettings = {
            singleSelection: true,
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            allowSearchFilter: false,
            closeDropDownOnSelection: false
        };
        this.multidropdownSettings = {
            singleSelection: false,
            idField: 'item_id',
            textField: 'item_text',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 3
            /* allowSearchFilter: true */
        };

        this.pageName = 'Personal';
        const formArray: FormArray = this.editUser.get('Rols') as FormArray;
        formArray.clear();

    }
    pageChange(e) {
        //console.log(e);
        this.getUsers();
    }

    //SEARCHING.................








    onCheckChange(event) {
        //console.log("EL VALOR DEL EVENTO DEL CHECK");
        //console.log(event.target.value);
        const formArray: FormArray = this.editUser.get('Rols') as FormArray;

        /* Selected */
        if (event.target.checked) {
            // Add a new control in the arrayForm
            formArray.push(new FormControl(event.target.value));
            //console.log("SE CHECKIO");
            //console.log(formArray);
        }

        /* unselected */
        else {
            //console.log("SE DESCHEKIO");
            // find the unselected element
            let i: number = 0;

            formArray.controls.forEach((ctrl: FormControl) => {
                if (ctrl.value == event.target.value) {
                    // Remove the unselected element from the arrayForm
                    formArray.removeAt(i);
                    return;
                }

                i++;
            });
        }
    }


    changePwd(userid: number, modal) {
        //console.log('SE QUIERE CAMBIAR EL PASSWORD..');
        this.IdUsertoDelete = userid;
        this.editPassword.reset({})
        this.validate_auth0.getNewRules();
        this.modalService.open(modal, {
            centered: true,
            backdrop: 'static',
            keyboard: false,

            size: 'lg'
        });

    }

    forbiddenNameValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const password = control.get('newPassword')
            const confirmPassword = control.get('confirm')
            return password && confirmPassword && password.value !== confirmPassword.value ? {
                mismatch: true
            } : null
        };
    }
    changePassword() {
        let suscription = this.userService.changePassword(this.IdUsertoDelete, this.editPassword.controls.newPassword.value).pipe(
            map((resp) => {
                //console.log(resp);
                this.notifier.notify('success', 'Se cambio la contraseña satisfactoriamente');
                this.closeBtnClick();
            }),
            catchError((err) => {
                this.notifier.notify('error', 'Ocurrio un problema' + err.message);
                console.log(err);
                return of();
            })
        ).subscribe(() => suscription.unsubscribe());
    }
    //OBTIENE LOS ROLES DEL SISTEMA Y LOS MAPEA AL LOS COMPONENTES DEL DROPDOWN
    getRols() {
        let suscription = this.userService.getRols(100, 0).pipe(
            map((response) => {
                this.roles = response;
                //this.rolesitems = this.roles;
                //console.log(this.rolesitems);
                this.rolesitems = this.roles.map((item, i) => {
                    return { item_id: i, item_text: item.name }
                })
                //console.log(this.rolesitems);
            }),
            catchError((err) => {
                this.notifier.notify('error', 'Ocurrio un problema al obtener los roles' + err);
                console.log(err);
                return of();
            })
        ).subscribe(() => suscription.unsubscribe());
    }
    //SUBMIT DEL NUEVO USUARIO
    onSubmit() {

        let rolsaux: string[] = [];
        //POR SI NO SE SELECCIONO NINGUN ROL EN EL DROPDOW DE CREACION
        if (this.newUserForm2.controls.Rols.value != null) {
            //console.log('EL VALOR DE Rol no es nulo');
            //console.log(this.newUserForm2.controls.Rols.value);
            //console.log(this.roles);
            rolsaux = this.newUserForm2.controls.Rols.value.map((item) => {

                //console.log(item);
                return this.roles[item.item_id].rol_id;
            })
        }
        let newuser = new User(
            -1,
            this.newUserForm.controls.FirstName.value,
            this.newUserForm.controls.LastName.value,
            this.newUserForm.controls.Email.value,
            this.newUserForm.controls.Gen.value == 'Masculino' ? 0 : 1,
            this.newUserForm.controls.Phone.value,
            this.newUserForm.controls.Address.value,
            rolsaux,
        );
        //console.log(".....EL USERQUE VOY A MANDAR AL SERVER::")
        //console.log(newuser);
        let suscription = this.userService.saveUser(newuser).pipe(
            map((resp) => {
                //console.log(resp);
                this.notifier.notify('success', 'Se creo el usuario satisfactoriamente');
                this.userList.push(resp);
                this.closeBtnClick();
            }),
            catchError((err) => {
                this.notifier.notify('error', 'Ocurrio un problema con la conexion' + err);
                console.log(err);
                return of();
            })
        ).subscribe(() => suscription.unsubscribe());
    }
    //PARA CERRAR LOS MODALES, TAMBIEN SE UTILIZA PARA REINICIAR DE NUEVO LOS DOS MODALES DE ESTA VISTA
    closeBtnClick() {
        //console.log('Se va a cerrar el modal');
        this.modalService.dismissAll();
        this.newUserForm.reset();
        this.newUserForm2.reset()
        this.newUserForm.controls.Phone.setValue('');
        this.newUserForm.controls.Address.setValue('');
        this.editUser.reset();
        this.IdUsertoDelete = -1;
        //this.singleselectedItems = [];
        /* this.rolesitems = []; */
        this.pageName = 'Personal';

        this.isEditing = false;
        this.ngOnInit();

    }

    deleteUserModal(iduser: number) {
        this.IdUsertoDelete = iduser;
        this.openSingleModal(this.modalDelete)
    }

    openSingleModal(targetModal) {
        this.modalService.open(targetModal, {
            centered: true,
            backdrop: 'static',
            keyboard: false
        });
    }


    //BORRADO DE USUARIOS
    deleteUser() {
        let userID = this.IdUsertoDelete;
        let suscription = this.userService.deleteUser(userID).pipe(
            map((resp) => {
                //console.log(resp);
                this.notifier.notify('success', 'Se elimino el Usuario');
                this.userList = this.userList.filter((us) => {
                    return us.user_id != userID;
                })
            }),
            catchError((err) => {
                this.notifier.notify('error', 'Ocurrio un problema con la eliminacion' + err);
                console.log(err);
                return of();
            })
        ).subscribe(() => suscription.unsubscribe());
        this.closeBtnClick();
    }


    emailFocus() {
        console.log('EmailFOcus');
        this.isEmailInputFocus = true;
        this.isEmailUnique = true;

    }
    //SIGUIENTE PARA AVANZAR EN EL MODAL DE CREACION
    siguiente() {
        this.mysqlService.isExistEmail(this.newUserForm.controls.Email.value).pipe(
            map((resp) => {
                //console.log(resp);
                //this.emailAlreadyInUse = resp.data;


                if (!resp.data) {
                    this.pageName = 'Rol';
                    this.getRols();
                    this.isEmailUnique = true;
                }
                else {
                    this.isEmailUnique = false;
                }
                return of();

            })
        ).subscribe();
        /* this.userService.searchUser(['email'], [this.newUserForm.controls.Email.value]).subscribe(resp => {
            if (resp.data.length == 0) {
                this.pageName = 'Rol';
                this.getRols();
                this.isEmailUnique = true;
            }
            else {
                this.isEmailUnique = false;
            }
        }); */


    }
    //ATRAS PARA RETROCEDER EN EL MODAL DE CREACION
    atras() {
        this.pageName = 'Personal';
    }
    //METODOS PARA LOS BOTONES DE SUBMIT SE ABILITEN O NO
    isCorrect(): boolean { return !this.newUserForm.valid; }
    isCorrect2(): boolean { return !this.editUser.valid; }

    //HABRE EL MODAL DE LA CREACION DE USUARIO
    openModal2(targetModal, user: User) {
        this.modalService.open(targetModal, {
            centered: true,
            backdrop: 'static',
            keyboard: false,
            size: 'lg'
            /* size: 'sm' */
        });
    }
    //HABRE EL MODAL DE LA EDICION
    openModal(targetModal, user: User) {
        this.modalService.open(targetModal, {
            centered: true,
            backdrop: 'static',
            keyboard: false,
            size: 'lg'

            /* size: 'sm' */
        });


        //OBTENGO TOLA LA INFO DE ESE..
        this.isLoadingInEdition = true;
        const subscription1 = this.userService.getUser(user.user_id).pipe(
            map((resp) => {
                //console.log(resp);
                this.isEditing = false;
                this.userActual = resp;
                this.editUser.controls.FirstName.setValue(resp.firstname);
                this.editUser.controls.FirstName.disable();
                this.editUser.controls.LastName.setValue(resp.lastname);
                this.editUser.controls.LastName.disable();
                this.editUser.controls.Email.setValue(resp.email);
                this.editUser.controls.Email.disable();
                this.editUser.controls.GenFalso.setValue(resp.gender == 0 ? "Masculino" : "Femenino");
                this.editUser.controls.GenFalso.disable();
                return resp;
                //this.getRolesUserActual();
            }), catchError((err) => {
                this.notifier.notify('error', 'Ocurrio un problema a recupar la info de ' + user.firstname + " " + user.lastname);
                console.log(err);
                return of();
            })
        ).subscribe((userinfo) => {
            //console.log("#######INFO EN EL SUSCRIBE DE getUserInfo")
            //console.log(userinfo)
            //console.log('###############################')
            subscription1.unsubscribe()
            const subscription2 = this.userService.getUserROls(this.userActual.user_id).pipe(
                map((response) => {
                    this.rolesactuales = response;
                    this.userActual.rols = response;
                    this.isLoadingInEdition = false
                    return response;


                })

            ).subscribe(() => subscription2.unsubscribe());
        }

        );


    }


    saveUserChanges() {
        //console.log("SAVE CHNANGES");
        //console.log(this.editUser.controls.Rols.value);
        let newrols = this.editUser.controls.Rols.value;
        //console.log("LOS ROLES QUE VOY A MANDAR::")
        //console.log(this.editUser.controls.Rols.value);
        /* let newuser = new User(
            this.userActual.user_id,
            this.editUser.controls.FirstName.value,
            this.editUser.controls.LasName.value,
            this.editUser.controls.Email.value,
            this.editUser.controls.Gen.value == 'Masculino' ? 0 : 1,
            this.userActual.mobile_phone,
            this.userActual.address,
            []
        );  */
        this.userActual.firstname = this.editUser.controls.FirstName.value;
        this.userActual.lastname = this.editUser.controls.LastName.value;
        this.userActual.gender = this.editUser.controls.Gen.value;
        const suscription1 = this.userService.modUserInfo(this.userActual).pipe(
            map((resp) => {
                //console.log(resp);
                this.notifier.notify('success', 'Se modifico');
                this.closeBtnClick();
            }),
            catchError((err) => {
                this.notifier.notify('error', 'Ocurrio un problema con la conexion' + err);
                console.log(err);
                return of();
            })
        ).subscribe(() => suscription1.unsubscribe());

        const suscription2 = this.userService.modRolsUser(this.userActual, newrols).pipe(
            map((resp) => {
                //console.log(resp);
                this.notifier.notify('success', 'Se modificaron los roles');
                this.closeBtnClick();
            }),
            catchError((err) => {
                this.notifier.notify('error', 'Ocurrio un problema con la conexion' + err);
                console.log(err);
                return of();
            })
        ).subscribe(() => suscription2.unsubscribe());

    }

    startMod() {
        this.isEditing = true;

        this.editUser.controls.FirstName.enable()
        this.editUser.controls.LastName.enable();
        this.editUser.controls.Gen.setValue(this.userActual.gender == 0 ? "Masculino" : "Femenino");

        //this.getrolesActuales();.
        //console.log("SE LLAMO A LOS getrolesActuales");
        let suscription = this.userService.getRols(100, 0).pipe(
            map(response => {

                this.rolestotales = response;
                this.rolestotales.forEach((item) => {
                    this.rolesMap[item.rol_id] = {
                        value: false,
                        rol: item
                    };
                });


            })
        ).subscribe(() => {
            this.isCalculatingRoles = true;
            suscription.unsubscribe();
            let suscription2 = this.armarCheckBoxes(this.rolestotales, this.userActual.rols).subscribe((estate) => {
                //console.log("En teoria ya termino de hacer lo del mapeo de los roles");
                this.isCalculatingRoles = false;
                //suscription2.unsubscribe();
            });

        });







        //console.log("SE termino de armar los boxes, como habran quedo????");
        //console.log(this.rolesModificados)


        //this.editUser.controls.Email.enable();

        //this.editUser.controls.Gen.enable();
    }

    modificarRoles() {
        //console.log("LOS ROLES QUE SE VAN A INGRESAR A USUARIO");
        //console.log(this.editUser.controls.Rols.value);

        //this.userService.modRolsUser(this.userActual,this.editUser.controls.Rols.value)
    }





    armarCheckBoxes(rolesSistema: Rol[], rolesUsuario: Rol[]): Observable<boolean> {

        return new Observable((observer) => {
            const formArray: FormArray = this.editUser.get('Rols') as FormArray;

            for (let i = 0; i < this.rolesactuales.length; i++) {
                let rol = this.rolesactuales[i];

                this.rolesMap[rol.rol_id].value = true;
                formArray.push(new FormControl(rol.rol_id));

            }
            this.rolesModificados = Object.values(this.rolesMap);

            observer.next(true);
            //observer.complete();

        });

    }



    onItemSelect(item: any) {

    }



}

