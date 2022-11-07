import { AfterViewInit, Component, ElementRef, getDebugNode, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { IActionMapping, ITreeOptions, KEYS, TREE_ACTIONS } from '@circlon/angular-tree-component';
import { NgbCalendar, NgbDate, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { catchError, last, map, share } from 'rxjs/operators';
import { PaginationTableData } from 'src/app/interfaces/ui/pagination-table.interface';
import { FmRolSharedDocument, FmRolSharedFolder, FmUserSharedDocument, FmUserSharedFolder, Folder } from 'src/app/models/file-manager.model';
import { FileService } from 'src/app/services/fileManager/file.service';
import { FolderService } from 'src/app/services/fileManager/folder.service';
import { SIZE_PAGE } from 'src/Utils/constants';
import { UserService } from '../../user/servicio/user.service';
import Swal from 'sweetalert2';
import { RolService } from '../../rol/services/rol.service';
import { ValidatorFn } from '@iplab/ngx-file-upload';
import { asEnumerable } from 'linq-es2015';
import { FolderPermissionsService } from 'src/app/services/folder_permissions/folder-permissions.service';
import { DeleteAlertService } from 'src/app/services/alerts/delete-alert.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { DocumentmodalComponent } from 'src/app/component/modals/documentmodal/documentmodal.component';

const defaultActionMapping: IActionMapping = {
  mouse: {
    contextMenu: (tree, node, $event) => {
      $event.preventDefault();
      alert(`context menu for ${node.data.name}`);
    },
    dblClick: (tree, node, $event) => {
      if (node.hasChildren) {
        TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
      }
    },
    click: (tree, node, $event) => {
      $event.shiftKey
        ? TREE_ACTIONS.TOGGLE_ACTIVE_MULTI(tree, node, $event)
        : TREE_ACTIONS.TOGGLE_ACTIVE(tree, node, $event);
      if (node.hasChildren) {
        TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
      }
    },
    mouseOver: (tree, node, $event) => {
      $event.preventDefault();
      console.log(`mouseOver ${node.data.name}`);
    },
    mouseOut: (tree, node, $event) => {
      $event.preventDefault();
      console.log(`mouseOut ${node.data.name}`);
    }
  },
  keys: {
    [KEYS.ENTER]: (tree, node, $event) => alert(`This is ${node.data.name}`)
  }
};

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss']
})

export class FileManagerComponent implements OnInit, AfterViewInit {
  @ViewChild('tree') tree;
  @ViewChild('tree_shared') tree_shared;
  @ViewChild('datepicker') datepicker: ElementRef;

  @ViewChild(DocumentmodalComponent) viewDocumentModal: DocumentmodalComponent

  dataList: PaginationTableData = {
    metadata: [
      "No.",
      "Nombre de archivo",
      "Última modificación",
      "Acciones",
    ],
    data: []
  }
  editpermissionList: PaginationTableData = {
    metadata: [
      "No.",
      "Tipo Permiso",
      "Sujeto",
      "Permiso",
      "Duración",
      "Acciones"
    ],
    data: []
  }
  resource = 'FILEMANAGER'
  permissionList: PaginationTableData = {
    metadata: [
      "No.",
      "Tipo Permiso",
      "Sujeto",
      "Permiso",
      "Duración",
      "Acciones"
    ],
    data: []
  }
  nodes = [
    {
      "id": 0,
      "name": "Solucredit",
      "children": [
        {
          "id": "6151e38d029cd8e44f968b9e",
          "name": "2021"
        }
      ]
    }
  ]
  sharednodes = [
    {
      "id": 0,
      "name": "Carpetas Compartidas",
      "children": [
        {
          "id": "6151e38d029cd8e44f968b9e",
          "name": "2021"
        }
      ]
    }
  ]
  userLoading = {}
  totalData: number;
  page = 1;
  find: any
  pageSize = SIZE_PAGE;

  options1: ITreeOptions = {
    actionMapping: defaultActionMapping,
    useVirtualScroll: true,

  };
  options2: ITreeOptions = {
    actionMapping: defaultActionMapping,
    useVirtualScroll: true,
    nodeHeight: 30,
  };
  newFolderForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  })
  newFileForm = new FormGroup({
    document_name: new FormControl('', [Validators.required]),
  })
  updateForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      extension: new FormControl('', [])
    }
  )
  permissionRolForm = new FormGroup(
    {
      id_permission: new FormControl('', [Validators.required]),
      id_duration: new FormControl('', [Validators.required])// 0 sin duracion 1 con duracion
    }
  )
  permissionUserForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required]),
      id_permission: new FormControl('', [Validators.required]),
      id_duration: new FormControl('', [Validators.required])
    }
  )
  permissionEditForm = new FormGroup(
    {
      id: new FormControl('', []),
      id_duration: new FormControl('', []),
      id_permission: new FormControl('', []),
      permission: new FormControl('', [])
    }
  )
  currentNode: any;
  currentType: number;//Folder 0, File 1, 2 Shared Folder
  isSharedFolderFather: boolean;
  currentDocument: any;
  shared = 0
  userFolders: Folder[]
  sharedFolders: Folder[]
  myFiles = [];
  selectUser: string[] = [];
  pdfsrcbase64: any;
  imgsrcbase64: any;
  dataRol: any
  groupsRol: any
  dataPermissions: { id: number; name: string; rule: string; }[];
  arrayPermissionSelected: any
  arraymodals = [];
  tmpDataPermissionRol = []
  model: NgbDateStruct;
  date: { year: number, month: number };
  idsharedfolder = 0;
  permissionUserload: any
  lastpermissionselect: any
  tmpDataPermissionRemoveRol: any[] = [];
  selectedFile: any
  write = false
  lastcurrent: any
  year: any
  month: any
  day: any
  constructor(
    private modalService: NgbModal,
    private _folder_service: FolderService,
    private toastr: ToastrService,
    private _userService: UserService,
    private _file_service: FileService,
    private sanitizer: DomSanitizer,
    private spinner: NgxSpinnerService,
    private _rol_service: RolService,
    private _folder_permission: FolderPermissionsService,
    private calendar: NgbCalendar,
    private delete_alert: DeleteAlertService,
    private autorization: AuthorizationService,
  ) {

  }
  async searchEmail(email) {
    await this._userService.getUserByEmail(email).subscribe(
      (response) => {
        let data = response.data;
        this.permissionUserload = data
        if (data == null) {
          //Mostrar alerta
          Swal.fire({
            icon: 'error',
            title: 'Usuario incorrecto',
            text: 'El usuario debe existir en el sistema',
            footer: '<a href="/usuarios"><bold>Puede crearlo utilizando el siguiente enlace</bold></a>'
          })
          this.permissionUserForm.controls['id_permission'].disable()
          this.permissionUserForm.controls['id_duration'].disable()
        } else {
          console.log(response.data)
          this.permissionUserForm.controls['id_permission'].enable()
          this.permissionUserForm.controls['id_duration'].enable()
        }
      }
    )
  }
  shareDocument(file, modal) {
    this.selectedFile = file
    console.log(file)
    this.permissionList.data = []
    let email = localStorage.getItem('email')
    let sub = this._file_service.canWriteDocument(file.document_id, email).pipe(
      map((response) => {
        if (response == true) {
          this.openModal(modal)
        } else {
          this._folder_permission.showCantWriteDocuments()
        }
      }), catchError((err) => {
        this.toastr.error('error', 'Ocurrio un problema' + err.message);
        console.log(err);
        this.closeBtnClick();
        return of();
      })
    ).subscribe(() => sub.unsubscribe())
    // this.openModal(modal)
  }
  selectToday() {
    this.model = this.calendar.getToday();
  }
  ngOnInit() {
    //this.currentNode = null
    let date = new Date()
    this.day = date.getDate()
    this.month = date.getMonth() + 1
    this.year = date.getFullYear()
    this.getFolders()
    this.getSharedFolders()

    this._file_service.list(-1, -1, [], 2).subscribe(
      (response) => {
        console.log(response)
      }
    )
    this.getRols()
    this.dataPermissions = this.getPermissions()
  }
  private getPermissions() {
    return this._folder_permission.getPermissions()
  }
  private async getRols() {
    await this._rol_service.getRols(-1, -1, [], []).subscribe((rols) => {
      console.log(rols)
      this.dataRol = rols.data
      var groups = asEnumerable(this.dataRol)
        .Select((option, index) => { return { option, index }; })
        .GroupBy(
          x => Math.floor(x.index / 4),
          x => x.option,
          (key, options) => asEnumerable(options).ToArray()
        )
        .ToArray();
      console.log(groups)
      this.groupsRol = groups
    })

  }
  checkPermission(value, rol) {
    console.log('ddd')
    console.log(value)
    if (value == true) {
      let p = {
        permission: 'Rol',
        value: rol.name,
        info: rol,
        id: rol.rol_id
      }
      this.tmpDataPermissionRol.push(p)
    } else {
      console.log('falso')
      let index = this.tmpDataPermissionRol.findIndex((item) => item.rol_id == rol.rol_id)
      this.tmpDataPermissionRol.splice(index, 1)
    }

  }
  checkPermission2(value, rol) {

    // si es un nuevo rol se agrega a la data 
    console.log(this.lastpermissionselect)
    console.log(value, rol)
    if (value == true) {
      let p = {
        permission: 'Rol',
        value: rol.name,
        info: rol,
        id: rol.rol_id
      }
      this.tmpDataPermissionRol.push(p)

    } else {
      let index = this.tmpDataPermissionRol.findIndex((item) => item.rol_id == rol.rol_id)
      if (index >= 0)
        this.tmpDataPermissionRol.splice(index, 1)
      else
        this.tmpDataPermissionRemoveRol.push(rol)
    }
  }

  private getSharedFolders() {
    let email = localStorage.getItem('email')
    let subscription = this._folder_service.getSharedFolders(email).pipe(
      map((response) => {
        this.sharedFolders = response
        this.convertSharedTree()
      }),
      catchError((err) => {
        this.toastr.error('error', 'Problemas al obtener carpetas compartidas')
        console.log(err)
        return of()
      })
    ).subscribe(() => subscription.unsubscribe())
  }
  private async getFolders() {
    let email = localStorage.getItem('email')
    let subscription = this._folder_service.list(email).pipe(
      map((response) => {
        this.userFolders = response
        this.convertTree()
      }),
      catchError((err) => {
        this.toastr.error('error', 'Problemas al obtener carpetas')
        console.log(err)
        return of()
      })
    ).subscribe(() => subscription.unsubscribe())

  }
  private getInfoSharedTree(arra: any[]) {
    if (!arra || arra.length <= 0)
      return
    arra.forEach((item: any) => {
      let sub = this._folder_service.isSharedFolder(item.folder_id).pipe(
        map((res) => {
          console.log(res)
          if (res.length > 0) {
            item['info_shared'] = res;
          }
          item['id'] = this.idsharedfolder++;
          item['data'] = { ...item }
        }),
        catchError((err) => {
          this.toastr.error('error', 'Problemas en el servidor')
          console.log(err)
          return of()
        })
      ).subscribe(() => sub.unsubscribe())
      this.getInfoSharedTree(item.children)
    })
  }

  private async convertSharedTree() {
    var datatree = []
    let id = 1
    this.idsharedfolder = 1;
    this.getInfoSharedTree(this.sharedFolders)
    console.log(this.sharedFolders)

    // datatree = firstlevel.map((item) => (
    //   {
    //     id: id++,
    //     name: item.name,
    //     children: [],
    //     data: item
    //   }
    // ))
    // let copydatatree = datatree
    // copydatatree.forEach((item, i) => {
    //   if (item.data.father_id) {
    //     let elementpop = datatree[i];
    //     //datatree.splice(i, 1)

    //     let father = datatree.find((item) => item.data.folder_id == elementpop.data.father_id)
    //     father.children.push(elementpop)
    //     //tenemos el elemnto eliminado es hora de buscar a su padre
    //   }
    // })
    // //remover las que no son raiz

    // //ya que tenemos los primeros niveles es hora de colocarlos correspondientemente
    let childrens: any = this.sharedFolders
    childrens.push({
      id: 'documents',
      name: 'Documentos compartidos',
      children: [],

    })
    this.sharednodes = [{ id: 0, name: 'Compartidas', children: childrens }]
  }
  private async convertTree() {
    //primero convertir el primer nivel de las carpetas de usuario
    var datatree = []
    let id = 1
    this.userFolders.forEach((item) => {
      console.log(item)
      let sub = this._folder_service.isSharedFolder(item.folder_id).pipe(
        map((res) => {
          console.log(res)
          if (res.length > 0)
            item['info_shared'] = res
        }),
        catchError((err) => {
          this.toastr.error('error', 'Problemas en el servidor')
          console.log(err)
          return of()
        })
      ).subscribe(() => sub.unsubscribe())
    })
    let firstlevel = this.userFolders
    datatree = firstlevel.map((item) => (
      {
        id: id++,
        name: item.name,
        children: [],
        data: item
      }
    ))
    let copydatatree = datatree
    copydatatree.forEach((item, i) => {
      if (item.data.father_id) {
        let elementpop = datatree[i];
        //datatree.splice(i, 1)

        let father = datatree.find((item) => item.data.folder_id == elementpop.data.father_id)
        father.children.push(elementpop)
        //tenemos el elemnto eliminado es hora de buscar a su padre
      }
    })
    //remover las que no son raiz

    //ya que tenemos los primeros niveles es hora de colocarlos correspondientemente
    this.nodes = [{ id: 0, name: 'Solucredit', children: datatree.filter((item) => item.data.father_id == null || item.data.father_id == undefined) }]
  }


  ngAfterViewInit() {
    const someNode = this.tree.treeModel.getNodeById(0);
    someNode.expand();
    const someNode2 = this.tree_shared.treeModel.getNodeById(0);
    someNode2.expand();
    const firstRoot = this.tree.treeModel.roots[0];
    const secondRoot = this.tree_shared.treeModel.roots[0]
    secondRoot.setActiveAndVisible();
    firstRoot.setActiveAndVisible();
  }
  changeOutsorcing(val) {
    this.shared = val
  }
  openFolder(node) {
    console.log(node)
    this.totalData = this.dataList.data.length
    this.currentNode = node.data
    console.log(this.currentNode)
    this.selectUser = []
    this.currentType = 0
    this.dataList.data = []
    this.totalData = 0
    this.isSharedFolderFather = false

    if (this.currentNode.data) {
      this._file_service.list(this.pageSize, (this.page - 1) * this.pageSize, this.selectUser, this.currentNode.data.folder_id).subscribe((coverage) => {
        console.log(coverage)
        this.totalData = coverage.count
        this.dataList.data = coverage.documents
      })
    }
  }
  openSharedFolder(node) {
    console.log(node)
    this.currentNode = node.data
    console.log(this.currentNode)
    this.dataList.data = []
    this.totalData = 0
    if (this.currentNode.data) {

      //Es necesario buscar los archivos que se puedan leer por el rol y por el usuario que no tengan fecha de vencimiento y que aun se puedan ver
      //Le voy a mandar el usuario que soy, la carpeta que tengo
      let email = localStorage.getItem('email')
      let folder = this.currentNode.data.folder_id

      this._file_service.getDocumentsShared(this.pageSize, (this.page - 1) * this.pageSize, email, folder).subscribe((data) => {
        //console.log(data)
        this.totalData = data.count
        this.dataList.data = data.documents
      })
      this.currentType = 2
    }
    if (this.currentNode.id == 'documents' && this.currentNode.name == 'Documentos compartidos') {
      let email = localStorage.getItem('email')
      this._file_service.listSharedFolders(this.pageSize, (this.page - 1) * this.pageSize, email).subscribe((list) => {
        console.log('LISTA')
        console.log(list)
        this.totalData = list.count
        this.dataList.data = list.documents
      })
      return
    }
    this.isSharedFolderFather = true

  }
  showInformation(node) {
    console.log(node)
    this.currentType = 1
    this.currentDocument = node
    this.selectedFile = node
  }
  pageChange(e) {
    //console.log(e);
    // this.getCoverage(this.selectUser);
    this.getInfo()
  }
  userName(id) {
    let find = this.userLoading[id]
    if (find) {
      // console.log(this.userLoading)
      return find.firstname + ' ' + find.lastname
    } else {
      this._userService.getUser(id).subscribe((user) => {
        this.userLoading[user.user_id] = user
        user.firstname
      })
    }
  }
  deletePermission(permission) {
    console.log('aaa')
    console.log(permission)
    if (this.currentType == 0 || this.currentType == 2) {
      if (permission.permission == 'Rol') {
        let sub = this._folder_service.deleteRolPermission(permission.id).pipe(
          map((response) => {
            this.toastr.success('Éxito', `Permiso eliminado`)
            this.refreshPermission()
          }), catchError((erro) => {
            this.toastr.error('error', 'Error en el servidor')
            console.log(erro)
            return of()
          })
        ).subscribe(() => sub.unsubscribe())
      } else {
        let sub = this._folder_service.deleteUserPermission(permission.id).pipe(
          map((response) => {
            this.toastr.success('Éxito', `Permiso eliminado`)
            this.refreshPermission()
          }), catchError((erro) => {
            this.toastr.error('error', 'Error en el servidor')
            console.log(erro)
            return of()
          })
        ).subscribe(() => sub.unsubscribe())
      }
    } else {
      //es documento
      if (permission.permission == 'Rol') {
        //let sub=this._file_service.
        let sub = this._file_service.deleteRolPermission(permission.id).pipe(
          map((response) => {
            this.toastr.success('Éxito', `Permiso eliminado`)
            this.refreshPermission()
          }), catchError((erro) => {
            this.toastr.error('error', 'Error en el servidor')
            console.log(erro)
            return of()
          })
        ).subscribe(() => sub.unsubscribe())
      } else {
        let sub = this._file_service.deleteUserPermission(permission.id).pipe(
          map((response) => {
            this.toastr.success('Éxito', `Permiso eliminado`)
            this.refreshPermission()
          }), catchError((erro) => {
            this.toastr.error('error', 'Error en el servidor')
            console.log(erro)
            return of()
          })
        ).subscribe(() => sub.unsubscribe())
      }
    }

  }
  openModal(targetModal) {
    this.arraymodals.push(
      this.modalService.open(targetModal, {
        centered: true,
        backdrop: "static",
        keyboard: false,
        size: "xl",
        windowClass: 'my-modal'
      }))

  }
  openCreate(target) {
    this.newFolderForm.reset();
    this.tmpDataPermissionRol = []
    this.permissionList.data = []
    //En esta parte miramos si tenemos el rol de crear carpetas
    if (this.currentNode && this.currentNode.data) {
      let email = localStorage.getItem('email')
      let sub = this._folder_service.canCreateFolderSharedFolder(this.currentNode.data.folder_id, email).pipe(
        map((response) => {
          console.log(response)
          if (response == true) {
            //tengo permisos de escritura
            this.openModal(target)
            this.shared = 0
          } else {
            Swal.fire(
              'Error',
              'No cuenta con los permisos suficientes para crear carpetas',
              'warning'
            )
          }
        }),
        catchError((erro) => {
          this.toastr.error('error', 'Error en el servidor')
          console.log(erro)
          return of()
        })
      ).subscribe(() => sub.unsubscribe())
    } else {
      this.openModal(target)
      this.shared = 0
    }


  }
  closeBtnClick() {
    this.write = false;
    if (this.arraymodals.length > 0)
      this.arraymodals.pop().close()

  }
  showExistFolder() {
    Swal.fire(
      'Error',
      'Este nombre de carpeta ya existe',
      'warning'
    )
  }
  openEditPermissions(current, modal) {
    console.log(current)
    //Jalar todos los permisos de usuario y de rol de la carpeta
    this.lastcurrent = current
    this.permissionList.data = []
    debugger;
    let email = localStorage.getItem('email')
    if (this.currentType == 0 || this.currentType == 2) {
      let sub = this._folder_service.canCreateFolderSharedFolder(this.currentNode.data.folder_id, email).pipe(
        map((response) => {
          if (response == true) {
            this.refreshPermission()
            this.openModal(modal)
          } else {
            this._folder_permission.showCantWriteDocuments()
          }
        }), catchError((err) => {
          this.toastr.error('error', 'Ocurrio un problema' + err.message);
          console.log(err);
          this.closeBtnClick();
          return of();
        })
      ).subscribe(() => sub.unsubscribe())
    } else {
      let sub = this._file_service.canWriteDocument(this.currentDocument.document_id, email).pipe(
        map((response) => {
          if (response == true) {
            this.refreshPermission()
            this.openModal(modal)
          } else {
            this._folder_permission.showCantWriteDocuments()
          }
        }), catchError((err) => {
          this.toastr.error('error', 'Ocurrio un problema' + err.message);
          console.log(err);
          this.closeBtnClick();
          return of();
        })
      ).subscribe(() => sub.unsubscribe())
    }


    // this.openModal(modal)
  }
  refreshPermission() {
    this.editpermissionList.data = []
    this.write = true;
    debugger

    if (this.currentType == 0 || this.currentType == 2) {
      let sub = this._folder_service.getAllPermissions(this.lastcurrent.data.folder_id).pipe(
        map((resp) => {
          console.log(resp)
          console.log(this.dataRol)
          if (resp.length > 0) {
            resp.forEach((item, i) => {
              if (item.rol_id) {
                //Permiso de rol

                let d = {
                  permission: 'Rol',
                  id: item.id,
                  value: this.dataRol.find((t) => t.rol_id == item.rol_id).name,
                  rule: this._folder_permission.getPermissions().find(t => t.rule == item.permission).name,
                  info_rule: item.permission,
                  expiration: item.expiration_date
                }
                this.editpermissionList.data.push(d)
              } else {
                let d = {
                  permission: 'Usuario',
                  id: item.id,
                  value: '',
                  rule: this._folder_permission.getPermissions().find(t => t.rule == item.permission).name,
                  info_rule: item.permission,
                  expiration: item.expiration_date
                }
                this._userService.getUser(item.user_id).subscribe((user) => {
                  d.value = user.firstname
                })
                this.editpermissionList.data.push(d)
              }
            })
          }
        }), catchError((erro) => {
          this.toastr.error('error', 'Error en el servidor')
          console.log(erro)
          return of()
        })
      ).subscribe(() => sub.unsubscribe())
    } else {
      //Archivo
      //console.log(this.lastcurrent.document_id)
      let sub = this._file_service.getAllPermissions(this.lastcurrent.document_id).pipe(
        map((resp) => {
          if (resp.length > 0) {
            resp.forEach((item, i) => {
              if (item.rol_id) {
                //Permiso de rol

                let d = {
                  permission: 'Rol',
                  id: item.id,
                  value: this.dataRol.find((t) => t.rol_id == item.rol_id).name,
                  rule: this._folder_permission.getPermissions().find(t => t.rule == item.permission).name,
                  info_rule: item.permission,
                  expiration: item.expiration_date
                }
                this.editpermissionList.data.push(d)
              } else {
                let d = {
                  permission: 'Usuario',
                  id: item.id,
                  value: '',
                  rule: this._folder_permission.getPermissions().find(t => t.rule == item.permission).name,
                  info_rule: item.permission,
                  expiration: item.expiration_date
                }
                this._userService.getUser(item.user_id).subscribe((user) => {
                  d.value = user.firstname
                })
                this.editpermissionList.data.push(d)
              }
            })
          }
        }), catchError((erro) => {
          this.toastr.error('error', 'Error en el servidor')
          console.log(erro)
          return of()
        })

      ).subscribe(() => sub.unsubscribe())
    }
  }

  download(document) {
    console.log(document)
    //Verificamos si tenemos permisos para descargar el documento
    let email = localStorage.getItem('email')
    let sub = this._file_service.canDownloadDocument(document.document_id, email).pipe(
      map((response) => {
        if (response == true) {
          this._file_service.download(document.document_id, document.document_name)
        } else {
          this._folder_permission.showCantDownloadDocuments()
        }
      }
      ), catchError((erro) => {
        this.toastr.error('error', 'Error en el servidor')
        console.log(erro)
        return of()
      })
    ).subscribe(() => sub.unsubscribe())
    //this._file_service.download(document.document_id, document.document_name)
  }
  onShareFile() {

    console.log(this.selectedFile)
    if (this.permissionList.data.length > 0) {
      this.closeBtnClick()
      this.permissionList.data.forEach((item) => {
        if (item.permission == 'Rol') {
          //Agregamos por rol
          let data: FmRolSharedDocument = {
            expiration_date: item.expiration == '1' ? new Date(item.expiration_date.year, item.expiration_date.month - 1, item.expiration_date.day) : null,
            document_id: this.selectedFile.document_id,
            permission: item.rule.rule,
            rol_id: item.id,
          }
          let sub = this._file_service.sharedDocumentByRol(data).pipe(
            map((r) => {
              this.toastr.success('Éxito', `Permiso ${item.value} Agregado`)
            }), catchError((erro) => {
              this.toastr.error('error', 'Error en el servidor')
              console.log(erro)
              return of()
            })
          ).subscribe(() => sub.unsubscribe())
        } else if (item.permission == 'Usuario') {
          //Agregamos permiso por user
          let data: FmUserSharedDocument = {
            expiration_date: item.expiration == '1' ? new Date(item.expiration_date.year, item.expiration_date.month - 1, item.expiration_date.day) : null,
            document_id: this.selectedFile.document_id,
            permission: item.rule.rule,
            user_id: item.id,
          }
          let sub = this._file_service.sharedDocumentByUser(data).pipe(
            map((r) => {
              this.toastr.success('Éxito', `Permiso ${item.value} Agregado`)
            }), catchError((erro) => {
              this.toastr.error('error', 'Error en el servidor')
              console.log(erro)
              return of()
            })
          ).subscribe(() => sub.unsubscribe())
        }
      })
    }
  }
  openEditPermission(document, modal) {
    this.selectedFile = document

    this.permissionEditForm.controls['id_duration'].setValue(document.expiration != null ? '1' : '0')
    this.permissionEditForm.controls['id'].setValue(document.id)
    this.permissionEditForm.controls['permission'].setValue(document.permission)
    this.permissionEditForm.controls['id_permission'].setValue(this._folder_permission.dataPermission.find(item => item.rule == document.info_rule).id)
    console.log(this.selectedFile)
    if (document.expiration != null) {

      let date = new Date(document.expiration)
      console.log(date)
      let day = date.getDate()
      console.log(day)
      this.model = new NgbDate(date.getFullYear(), date.getMonth() + 1, day)
      this.model.day = day
      this.model.month = date.getMonth() + 1
      this.model.year = date.getFullYear()
      //this.datepicker.navigateTo({ year: this.model.year, month: this.model.month, day: this.model.day })
      console.log(this.datepicker)
    }

    this.openModal(modal)
  }
  updatePermission() {
    let info = this.permissionEditForm.value
    console.log(info)
    let newdate = null
    if (info.id_duration == "1") {
      newdate = new Date(this.model.year, this.model.month - 1, this.model.day)
    }
    let permission = this._folder_permission.dataPermission.find(item => item.id == info.id_permission).rule
    let id = info.id
    let type = info.permission
    if (this.currentType == 0 || this.currentType == 2) {
      //Actualizar permiisos de carpeta
      if (type == 'Rol') {
        //PErmisos por rol carpeta
        let sub = this._folder_service.uptdateRolPermission(id, newdate, permission).pipe(
          map((response) => {
            this.toastr.success('Éxito', `Permiso Actualizado`)
            this.closeBtnClick()
            this.refreshPermission()
            //this.ngOnInit()
          }), catchError((erro) => {
            this.toastr.error('error', 'Error en el servidor')
            console.log(erro)
            return of()
          })
        ).subscribe(() => sub.unsubscribe())
      } else {
        let sub = this._folder_service.uptdateUserPermission(id, newdate, permission).pipe(
          map((response) => {
            this.toastr.success('Éxito', `Permiso Actualizado`)
            this.closeBtnClick()
            this.refreshPermission()
            //this.ngOnInit()
          }), catchError((erro) => {
            this.toastr.error('error', 'Error en el servidor')
            console.log(erro)
            return of()
          })
        ).subscribe(() => sub.unsubscribe())
      }
    } else {
      if (type == 'Rol') {
        //PErmisos por rol carpeta
        let sub = this._file_service.uptdateRolPermission(id, newdate, permission).pipe(
          map((response) => {
            this.toastr.success('Éxito', `Permiso Actualizado`)
            this.closeBtnClick()
            this.refreshPermission()
            //this.ngOnInit()
          }), catchError((erro) => {
            this.toastr.error('error', 'Error en el servidor')
            console.log(erro)
            return of()
          })
        ).subscribe(() => sub.unsubscribe())
      } else {
        let sub = this._file_service.uptdateUserPermission(id, newdate, permission).pipe(
          map((response) => {
            this.toastr.success('Éxito', `Permiso Actualizado`)
            this.closeBtnClick()
            this.refreshPermission()
            //this.ngOnInit()
          }), catchError((erro) => {
            this.toastr.error('error', 'Error en el servidor')
            console.log(erro)
            return of()
          })
        ).subscribe(() => sub.unsubscribe())
      }
    }

    console.log(info)
  }
  onCreate() {

    //los que tienen padre
    let data = this.newFolderForm.value
    let padre = -1
    if (this.currentNode == undefined || this.currentNode == null || this.currentNode.id == 0) {
      padre = -1
      data.father_id = null
    } else {
      padre = this.currentNode.data.folder_id;
      data.father_id = padre;
    }

    ;
    data.read_only = 0

    console.log(data)
    console.log(this.permissionList.data)
    let email = localStorage.getItem('email')
    let subs = this._folder_service.exist(data.name, padre, email).pipe(
      map((response) => {
        if (response) {
          this.showExistFolder()
        } else {
          let subscription = this._folder_service.save(data, email).pipe(
            map((resp) => {
              this.closeBtnClick()
              this.newFolderForm.reset()
              this.toastr.success('Éxito', 'Carpeta creada satisfactoriamente')
              if (this.permissionList.data.length > 0 && this.shared == 1) {
                //Agregamos permisos
                this.permissionList.data.forEach((item) => {
                  if (item.permission == 'Rol') {
                    //Agregamos por rol
                    let data: FmRolSharedFolder = {
                      expiration_date: item.expiration == '1' ? new Date(item.expiration_date.year, item.expiration_date.month - 1, item.expiration_date.day) : null,
                      folder_id: resp.folder_id,
                      permission: item.rule.rule,
                      rol_id: item.id,
                    }
                    let sub = this._folder_service.sharedFolderByRol(data).pipe(
                      map((r) => {
                        this.toastr.success('Éxito', `Permiso ${item.value} Agregado`)
                      }), catchError((erro) => {
                        this.toastr.error('error', 'Error en el servidor')
                        console.log(erro)
                        return of()
                      })
                    ).subscribe(() => sub.unsubscribe())
                  } else if (item.permission == 'Usuario') {
                    //Agregamos permiso por user
                    let data: FmUserSharedFolder = {
                      expiration_date: item.expiration == '1' ? new Date(item.expiration_date.year, item.expiration_date.month - 1, item.expiration_date.day) : null,
                      folder_id: resp.folder_id,
                      permission: item.rule.rule,
                      user_id: item.id,
                    }
                    let sub = this._folder_service.sharedFolderByUser(data).pipe(
                      map((r) => {
                        this.toastr.success('Éxito', `Permiso ${item.value} Agregado`)
                      }), catchError((erro) => {
                        this.toastr.error('error', 'Error en el servidor')
                        console.log(erro)
                        return of()
                      })
                    ).subscribe(() => sub.unsubscribe())
                  }
                })
              }
              this.ngOnInit()
            }),
            catchError((err) => {
              this.toastr.error('error', 'Problemas al crear la carpeta')
              console.log(err)
              return of()
            })
          ).subscribe(() => subscription.unsubscribe());
        }
      })
    ).subscribe(() => subs.unsubscribe());
  }
  update() {
    let data = this.updateForm.value
    console.log(data)
    if (this.currentType == 1) {
      //verficar si realmente hace el cambio
      if (this.currentDocument.name != data.name) {
        //Verificar si el documento ya existe
        let arrname = ''
        if (data.name.includes('.')) {
          arrname = data.name
        } else {
          arrname = data.name + '.' + data.extension
        }
        console.log('mandando')
        console.log(arrname)
        if (!this.currentNode.data) {
          //Estamos en un folder compartido
          let subscription = this._file_service.renameFile(arrname, this.currentDocument.document_id).pipe(
            map((resp) => {
              console.log(resp)
              this.toastr.success('Archivo cambiado', 'Éxito')
              this.getInfo()
              this.modalService.dismissAll()
            }),
            catchError((err) => {
              this.toastr.error('error', 'Ocurrio un problema' + err.message);
              console.log(err);
              this.closeBtnClick();
              return of();
            })
          ).subscribe(() => subscription.unsubscribe());
          return
        }
        let subs = this._file_service.fileinFolder(this.currentNode.data.folder_id, arrname).pipe(
          map((response) => {
            console.log(response)
            if (response) {
              Swal.fire(
                'Error',
                'El nombre ya existe en esta carpeta',
                'warning'
              )
            } else {
              //grabamos el nombre del archivo'
              console.log(this.currentDocument)
              let subscription = this._file_service.renameFile(arrname, this.currentDocument.document_id).pipe(
                map((resp) => {
                  console.log(resp)
                  this.toastr.success('Archivo cambiado', 'Éxito')
                  this.getInfo()
                  this.modalService.dismissAll()
                }),
                catchError((err) => {
                  this.toastr.error('error', 'Ocurrio un problema' + err.message);
                  console.log(err);
                  this.closeBtnClick();
                  return of();
                })
              ).subscribe(() => subscription.unsubscribe());
            }
          }),
          catchError((err) => {
            this.toastr.error('error', 'Ocurrio un problema' + err.message);
            console.log(err);
            this.closeBtnClick();
            return of();
          })
        ).subscribe(() => subs.unsubscribe());
      }
    } else if (this.currentType == 0) {
      //Carpeta
      if (this.currentNode.name != data.name) {
        let folder_id = -1
        if (this.currentNode.data) {
          folder_id = this.currentNode.data.folder_id
        }
        let email = localStorage.getItem('email')
        let subs = this._folder_service.exist(data.name, folder_id, email).pipe(
          map((response) => {
            if (response) {
              this.showExistFolder()
            } else {
              let subscription = this._folder_service.rename(data.name, folder_id).pipe(
                map((response) => {
                  this.toastr.success('Carpeta renombrada', 'Éxito')
                  this.getFolders()
                  this.modalService.dismissAll()
                }),
                catchError((err) => {
                  this.toastr.error('error', 'Ocurrio un problema' + err.message);
                  console.log(err);
                  this.closeBtnClick();
                  return of();
                })
              ).subscribe(() => subscription.unsubscribe());
            }
          })
        ).subscribe(() => subs.unsubscribe());
      }
    }
  }
  removePermission(i: number) {
    this.permissionList.data.splice(i, 1)
  }
  editPermission(i: number, modal, modal2) {
    console.log(this.groupsRol)
    this.tmpDataPermissionRol = []
    this.tmpDataPermissionRemoveRol = []
    let permission = this.permissionList.data[i]
    this.lastpermissionselect = permission
    console.log(permission)
    if (permission.permission == 'Rol') {
      this.permissionRolForm.controls['id_permission'].setValue(this.lastpermissionselect.rule.id)
      console.log(this.lastpermissionselect)
      if (permission.expiration == '1') {
        this.permissionRolForm.controls['id_duration'].setValue(1)
      } else {
        this.permissionRolForm.controls['id_duration'].setValue(0)
      }
      if (this.lastpermissionselect.expiration_date) {
        this.model.day = this.lastpermissionselect.expiration_date.day
        this.model.month = this.lastpermissionselect.expiration_date.month
        this.model.year = this.lastpermissionselect.expiration_date.year
      }

      this.openModal(modal)
    } else {
      this.permissionUserForm.controls['id_permission'].setValue(this.lastpermissionselect.rule.id)
      if (permission.expiration == '1') {
        this.permissionUserForm.controls['id_duration'].setValue(1)
      } else {
        this.permissionUserForm.controls['id_duration'].setValue(0)
      }
      this.permissionUserForm.controls['email'].setValue(permission.value)
      this.permissionUserForm.controls['email'].disable()
      if (this.lastpermissionselect.expiration_date) {
        this.model.day = this.lastpermissionselect.expiration_date.day
        this.model.month = this.lastpermissionselect.expiration_date.month
        this.model.year = this.lastpermissionselect.expiration_date.year
      }
      this.openModal(modal2)
    }
  }
  ischecked(option) {
    //console.log(option)
    let permission = this.permissionList.data.filter(item => item.permission == 'Rol')
    permission = permission.filter(item => item.rule == this.lastpermissionselect.rule)
    //Buscar el permiso
    let find = permission.find(item => item.id == option.rol_id)
    if (find)
      return true
    return false
  }
  async uploadFiles(event) {
    if (event.target.files && event.target.files.length > 0) {
      console.log(event.target.files)
      //ya teniendo los archivos tenemos que subir todos  
      let body = []
      for (var i = 0; i < event.target.files.length; i++) {
        let base = await this.getBase64(event.target.files[i]);
        body.push({
          name: event.target.files[i].name,
          file: base
        })
      }
      let email = localStorage.getItem('email')
      let folder_id = 0;
      if (this.currentNode && this.currentNode.data) {
        folder_id = this.currentNode.data.folder_id
      } else {
        Swal.fire(
          'Error',
          'Es necesario seleccionar una carpeta primero',
          'warning'
        )
        return
      }
      this.toastr.info('Información', 'Iniciando la carga de documentos')
      for (let i = 0; i < body.length; i++) {
        let item = body[i]
        let subs = this._file_service.fileinFolder(folder_id, item.name).pipe(
          map((response) => {
            if (response) {
              this.toastr.error(`El archivo ${item.name} ya existe`, 'Nombre repetido')
            } else {
              let suscription = this._file_service.save(item, email, folder_id).pipe(
                map((resp) => {
                  this.toastr.success('Éxito', `Archivo subido ${item.name}`)
                  this.getInfo()
                  //verificar si es compartida la carpeta y agarrar los permisos de lectura
                  // if (this.currentNode.data.info_shared) {
                  //   //Es compartida, por lo cual se deben de subir con los permisos del padre
                  //   //TODO subir archivos con permisos de la carpeta
                  //   //la carpeta tiene multiples permisos por lo que el documento se debe de crear por cada uno de los permisos
                  //   //Permisos del usuario y permisos de rol
                  //   let subsdoc = this._file_service.sharedDocumentByFatherPermission(folder_id, resp.document_id).pipe(
                  //     map((reshared) => {
                  //       console.log(reshared)
                  //     }),
                  //     catchError((err) => {
                  //       this.toastr.error('error', 'Ocurrio un problema' + err.message);
                  //       console.log(err);
                  //       this.closeBtnClick();
                  //       return of();
                  //     })
                  //   ).subscribe(() => subsdoc.unsubscribe())
                  // }
                }),
                catchError((err) => {
                  this.toastr.error('error', 'Ocurrio un problema' + err.message);
                  console.log(err);
                  this.closeBtnClick();
                  return of();
                })
              ).subscribe(() => suscription.unsubscribe());
            }
          }),
          catchError((err) => {
            this.toastr.error('error', 'Ocurrio un problema' + err.message);
            console.log(err);
            this.closeBtnClick();
            return of();
          })
        ).subscribe(() => subs.unsubscribe());
      }
    }
  }
  showFiles(event) {

    if (this.currentNode && this.currentNode.data) {
      let email = localStorage.getItem('email')
      //Es una carpeta compartida y vamos a verificar si podemos escribir
      let sub = this._folder_service.canCreateFolderSharedFolder(this.currentNode.data.folder_id, email).pipe(
        map((response) => {
          if (response == false) {
            this._folder_permission.showCantCreateDocuments()
            return
          } else {
            this.uploadFiles(event)
          }
        }),
        catchError((err) => {
          this.toastr.error('error', 'Ocurrio un problema' + err.message);
          console.log(err);
          this.closeBtnClick();
          return of();
        })
      ).subscribe(() => sub.unsubscribe())

    } else {
      this.uploadFiles(event)
    }



  }
  getInfo() {
    this._file_service.list(this.pageSize, (this.page - 1) * this.pageSize, this.selectUser, this.currentNode.data.folder_id).subscribe((coverage) => {
      console.log(coverage)
      this.totalData = coverage.count
      this.dataList.data = coverage.documents
    })
  }

  async ViewReqDoc(modal, doc) {
    //tenemos que buscar la carpeta padre para saber 
    //Tenemos que saber si es una carpeta

    //Es una carpeta compartida
    let email = localStorage.getItem('email')
    let sub = this._file_service.canSeeDocument(doc.document_id, email).pipe(
      map(async (response) => {
        if (response == false) {
          this._folder_permission.showCantSeeDocuments()
        } else {
          this.spinner.show()
          await this._file_service.show(doc.document_id).toPromise()
            .then((response) => {
              this.imgsrcbase64 = null;
              this.pdfsrcbase64 = null;
              let body = response.body
              console.log(response)
              if (body.data.type === "image") {
                const urls =
                  "data:image/jpg;base64;base64," + body.data.url;
                this.imgsrcbase64 = this.sanitizer.bypassSecurityTrustResourceUrl(
                  urls
                );
              } else if (body.data.type === "pdf") {
                const urls =
                  "data:application/pdf;base64," + body.data.url;
                this.pdfsrcbase64 = body.data.url
              }
              this.spinner.hide()
              console.log(body)
              console.log(2)
            }).catch((error) => {
              this.toastr.error("Problemas con el servidor.", "Oops!");
              this.spinner.hide()
              console.log(error)
            });
            this.viewDocumentModal.openModal()
        }
      }),
      catchError((err) => {
        this.toastr.error('error', 'Ocurrio un problema' + err.message);
        console.log(err);
        this.closeBtnClick();
        return of();
      })

    ).subscribe(() => sub.unsubscribe())





  }
  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  openEdit(type, data, modal) {
    this.currentType = type
    console.log(data)
    this.tmpDataPermissionRol = []
    this.tmpDataPermissionRemoveRol = []
    let email = localStorage.getItem('email')
    if (this.currentType == 1) {
      let extension = data.document_name.split('.')[1]
      let name = data.document_name.split('.')[0]
      this.updateForm.controls['name'].setValue(name)
      this.updateForm.controls['extension'].setValue(extension)
      this.currentDocument = data
      //Verificar si puede escribir el archivo

      let sub = this._file_service.canWriteDocument(this.currentDocument.document_id, email).pipe(
        map((response) => {
          if (response == true) {
            this.openModal(modal)
          } else {
            this._folder_permission.showCantWriteDocuments()
          }
        }), catchError((err) => {
          this.toastr.error('error', 'Ocurrio un problema' + err.message);
          console.log(err);
          this.closeBtnClick();
          return of();
        })
      ).subscribe(() => sub.unsubscribe())
    } else {
      this.updateForm.controls['name'].setValue(data.data.name)
      this.currentNode = data
      console.log(this.currentNode.data.folder_id,)
      let sub = this._folder_service.canCreateFolderSharedFolder(this.currentNode.data.folder_id, email).pipe(
        map((response) => {
          if (response == true) {
            this.openModal(modal)
          } else {
            this._folder_permission.showCantEditFolders()
          }
        }), catchError((err) => {
          this.toastr.error('error', 'Ocurrio un problema' + err.message);
          console.log(err);
          this.closeBtnClick();
          return of();
        })
      ).subscribe(() => sub.unsubscribe())
    }
    console.log(this.currentNode)


  }

  openRol(modal) {
    this.tmpDataPermissionRol = []
    this.permissionRolForm.reset()
    this.openModal(modal)
  }
  openRol2(modal) {
    this.tmpDataPermissionRol = []
    this.permissionRolForm.reset()
    this.permissionList.data = []
    this.openModal(modal)
  }
  openUser(modal) {
    this.permissionUserForm.reset()
    this.openModal(modal)
  }
  setRule(rule) {
    console.log(rule)
    let rulef = this.dataPermissions.find((item) => item.id == rule)
    console.log(rulef)
    this.permissionRolForm.controls['id_permission'].setValue(rulef.id)
  }
  setUserRule(rule) {
    let rulef = this.dataPermissions.find((item) => item.id == rule)
    console.log(rulef)
    this.permissionUserForm.controls['id_permission'].setValue(rulef.id)
  }
  addRolPermissionList() {
    //con la lista de roles seleccionados tenemos que agregarle a cada uno el tipo de permiso y refrescarlo
    debugger
    let rule = this.permissionRolForm.controls['id_permission'].value
    rule = this.dataPermissions.find(item => item.id == rule)
    this.tmpDataPermissionRol.forEach((item) => {
      item['rule'] = rule,
        item['expiration'] = this.permissionRolForm.controls['id_duration'].value,
        item['expiration_date'] = this.model ? { year: this.model.year, day: this.model.day, month: this.model.month } : null
    })
    this.tmpDataPermissionRol.forEach((item) => {
      if (this.permissionList.data.find((f) => f.id == item.id)) {
        //no se agrega

        this.permissionList.data.push(item)
      } else {
        this.permissionList.data.push(item)
      }
    })
    if (this.write) {
      //Grabamos los permisos
      if (this.currentType == 0 || this.currentType == 2) {
        //grabar permisos
        if (this.permissionList.data.length > 0) {
          //Agregamos permisos
          let folder_id = this.currentNode.data.folder_id
          this.permissionList.data.forEach((item) => {
            if (item.permission == 'Rol') {
              //Agregamos por rol
              let data: FmRolSharedFolder = {
                expiration_date: item.expiration == '1' ? new Date(item.expiration_date.year, item.expiration_date.month - 1, item.expiration_date.day) : null,
                folder_id: folder_id,
                permission: item.rule.rule,
                rol_id: item.id,
              }
              let sub = this._folder_service.sharedFolderByRol(data).pipe(
                map((r) => {
                  this.toastr.success('Éxito', `Permiso ${item.value} Agregado`)
                  this.refreshPermission()
                }), catchError((erro) => {
                  this.toastr.error('error', 'Error en el servidor')
                  console.log(erro)
                  return of()
                })
              ).subscribe(() => sub.unsubscribe())
            }
          })
          this.permissionList.data = []
        }
      } else {
        //Documento compartido agregar permisos
        if (this.permissionList.data.length > 0) {
          this.closeBtnClick()
          this.permissionList.data.forEach((item) => {
            if (item.permission == 'Rol') {
              //Agregamos por rol
              let data: FmRolSharedDocument = {
                expiration_date: item.expiration == '1' ? new Date(item.expiration_date.year, item.expiration_date.month - 1, item.expiration_date.day) : null,
                document_id: this.selectedFile.document_id,
                permission: item.rule.rule,
                rol_id: item.id,
              }
              let sub = this._file_service.sharedDocumentByRol(data).pipe(
                map((r) => {
                  this.toastr.success('Éxito', `Permiso ${item.value} Agregado`)
                }), catchError((erro) => {
                  this.toastr.error('error', 'Error en el servidor')
                  console.log(erro)
                  return of()
                })
              ).subscribe(() => sub.unsubscribe())
            } else if (item.permission == 'Usuario') {
              //Agregamos permiso por user
              let data: FmUserSharedDocument = {
                expiration_date: item.expiration == '1' ? new Date(item.expiration_date.year, item.expiration_date.month - 1, item.expiration_date.day) : null,
                document_id: this.selectedFile.document_id,
                permission: item.rule.rule,
                user_id: item.id,
              }
              let sub = this._file_service.sharedDocumentByUser(data).pipe(
                map((r) => {
                  this.toastr.success('Éxito', `Permiso ${item.value} Agregado`)
                }), catchError((erro) => {
                  this.toastr.error('error', 'Error en el servidor')
                  console.log(erro)
                  return of()
                })
              ).subscribe(() => sub.unsubscribe())
            }
          })
        }
      }
      this.ngOnInit()
    }
    this.arraymodals.pop().close()
  }
  editRolPermissionList() {
    debugger;
    let rule = this.permissionRolForm.controls['id_permission'].value
    rule = this.dataPermissions.find(item => item.id == rule)
    //Cambiar a los que ya estan en la tabla
    let permission = this.permissionList.data.filter(item => item.permission == 'Rol')
    permission = permission.filter(item => item.rule == this.lastpermissionselect.rule)
    let newlist = this.permissionList.data.filter(item => item.permission != 'Rol')
    newlist = newlist.filter(item => item.rule != this.lastpermissionselect.rule)
    console.log(permission)
    permission.forEach((item, i) => {
      let find = this.tmpDataPermissionRemoveRol.find((tt) => tt.name == item.value)
      if (find) {
        permission.splice(i, 1)
      }
    })
    this.tmpDataPermissionRol.forEach((item) => {
      item['rule'] = rule,
        item['expiration'] = this.permissionRolForm.controls['id_duration'].value,
        item['expiration_date'] = this.model ? { year: this.model.year, day: this.model.day, month: this.model.month } : null
    })
    permission.forEach((item) => {
      item['rule'] = rule,
        item['expiration'] = this.permissionRolForm.controls['id_duration'].value,
        item['expiration_date'] = this.model ? { year: this.model.year, day: this.model.day, month: this.model.month } : null
    })
    this.permissionList.data = newlist
    this.tmpDataPermissionRol.forEach((item) => {
      if (this.permissionList.data.find((f) => f.id == item.id)) {
        //no se agrega
        this.permissionList.data.push(item)
      } else {
        this.permissionList.data.push(item)
      }
    })
    permission.forEach((item) => {
      item['rule'] = rule,
        item['expiration'] = this.permissionRolForm.controls['id_duration'].value,
        item['expiration_date'] = this.model ? { year: this.model.year, day: this.model.day, month: this.model.month } : null
    })
    permission.forEach((item) => {
      if (this.permissionList.data.find((f) => f.id == item.id)) {
        //no se agrega
        this.permissionList.data.push(item)
      } else {
        this.permissionList.data.push(item)
      }
    })
    this.arraymodals.pop().close()
  }
  addUserPermissionList() {
    let rule = this.permissionUserForm.controls['id_permission'].value
    rule = this.dataPermissions.find(item => item.id == rule)
    let user = {
      permission: 'Usuario',
      value: this.permissionUserload.email,
      info: this.permissionUserload,
      id: this.permissionUserload.user_id,
      rule: rule,
      expiration: this.permissionUserForm.controls['id_duration'].value,
      expiration_date: this.model ? { year: this.model.year, day: this.model.day, month: this.model.month } : null
    }
    this.permissionList.data.push(user)

    if (this.write) {
      //Grabamos los permisos
      if (this.currentType == 0 || this.currentType == 2) {
        //grabar permisos
        if (this.permissionList.data.length > 0) {
          //Agregamos permisos
          let folder_id = this.currentNode.data.folder_id
          this.permissionList.data.forEach((item) => {
            if (item.permission == 'Rol') {
              //Agregamos por rol
              let data: FmRolSharedFolder = {
                expiration_date: item.expiration == '1' ? new Date(item.expiration_date.year, item.expiration_date.month - 1, item.expiration_date.day) : null,
                folder_id: folder_id,
                permission: item.rule.rule,
                rol_id: item.id,
              }
              let sub = this._folder_service.sharedFolderByRol(data).pipe(
                map((r) => {
                  this.toastr.success('Éxito', `Permiso ${item.value} Agregado`)
                  this.refreshPermission()
                }), catchError((erro) => {
                  this.toastr.error('error', 'Error en el servidor')
                  console.log(erro)
                  return of()
                })
              ).subscribe(() => sub.unsubscribe())
            } else if (item.permission == 'Usuario') {
              //Agregamos permiso por user
              let data: FmUserSharedFolder = {
                expiration_date: item.expiration == '1' ? new Date(item.expiration_date.year, item.expiration_date.month - 1, item.expiration_date.day) : null,
                folder_id: folder_id,
                permission: item.rule.rule,
                user_id: item.id,
              }
              let sub = this._folder_service.sharedFolderByUser(data).pipe(
                map((r) => {
                  this.toastr.success('Éxito', `Permiso ${item.value} Agregado`)
                  this.refreshPermission()
                }), catchError((erro) => {
                  this.toastr.error('error', 'Error en el servidor')
                  console.log(erro)
                  return of()
                })
              ).subscribe(() => sub.unsubscribe())
            }
          })
          this.permissionList.data = []
        }
      } else {
        //Documento compartido agregar permisos
        if (this.permissionList.data.length > 0) {
          this.closeBtnClick()
          console.log(this.selectedFile)
          this.permissionList.data.forEach((item) => {
            if (item.permission == 'Rol') {
              //Agregamos por rol
              let data: FmRolSharedDocument = {
                expiration_date: item.expiration == '1' ? new Date(item.expiration_date.year, item.expiration_date.month - 1, item.expiration_date.day) : null,
                document_id: this.selectedFile.document_id,
                permission: item.rule.rule,
                rol_id: item.id,
              }
              let sub = this._file_service.sharedDocumentByRol(data).pipe(
                map((r) => {
                  this.toastr.success('Éxito', `Permiso ${item.value} Agregado`)
                  this.refreshPermission()
                }), catchError((erro) => {
                  this.toastr.error('error', 'Error en el servidor')
                  console.log(erro)
                  return of()
                })
              ).subscribe(() => sub.unsubscribe())
            } else if (item.permission == 'Usuario') {
              //Agregamos permiso por user
              let data: FmUserSharedDocument = {
                expiration_date: item.expiration == '1' ? new Date(item.expiration_date.year, item.expiration_date.month - 1, item.expiration_date.day) : null,
                document_id: this.selectedFile.document_id,
                permission: item.rule.rule,
                user_id: item.id,
              }
              let sub = this._file_service.sharedDocumentByUser(data).pipe(
                map((r) => {
                  this.toastr.success('Éxito', `Permiso ${item.value} Agregado`)
                  this.refreshPermission()
                }), catchError((erro) => {
                  this.toastr.error('error', 'Error en el servidor')
                  console.log(erro)
                  return of()
                })
              ).subscribe(() => sub.unsubscribe())
            }
          })
        }
      }

    }
    this.closeBtnClick()
  }

  editUserPermissionList() {
    let rule = this.permissionUserForm.controls['id_permission'].value
    rule = this.dataPermissions.find(item => item.id == rule)
    let element = this.permissionList.data.findIndex((item => item == this.lastpermissionselect))
    this.permissionList.data[element].rule = rule
    this.permissionList.data[element].expiration = this.permissionUserForm.controls['id_duration'].value
    this.permissionList.data[element].expiration_date = this.model ? { year: this.model.year, day: this.model.day, month: this.model.month } : null
    this.closeBtnClick()
  }
  getDate(request) {
    if (request.expiration == '1')
      return `${request.expiration_date.day}/${request.expiration_date.month}/${request.expiration_date.year}`
    return 'Sin expiración'
  }
  async deleteFile() {
    console.log(this.currentDocument)
    const result = await this.delete_alert.showAlert()

    if (result.confirmed) {
      this._file_service.delete(this.currentDocument.document_id).pipe(
        map((resp) => {
          this.toastr.success('Documento eliminado', 'Éxito')
          this.getInfo()
        }),
        catchError((err) => {
          this.toastr.error('error', 'Ocurrio un problema' + err.message);
          console.log(err);
          this.closeBtnClick();
          return of();
        })
      ).subscribe()
    }
  }
  deleteObject() {
    console.log(this.currentType)
    if (this.currentType == 1) {
      //eliminar documento
      //Verificar si lo podemos eliminar
      let email = localStorage.getItem('email')
      let sub = this._file_service.canDeleteDocument(this.currentDocument.document_id, email).pipe(
        map((resp) => {
          if (resp == true) {
            this.deleteFile()
          } else {
            this._folder_permission.showCantDeleteDocuments()
          }
        }),
        catchError((err) => {
          this.toastr.error('error', 'Ocurrio un problema' + err.message);
          console.log(err);
          this.closeBtnClick();
          return of();
        })
      ).subscribe(() => sub.unsubscribe())
    } else if (this.currentType == 0) {
      //Ver si no tiene archivos la carpeta
      //Verificar si puedo eliminar la carpeta
      //Verificar si es una carpeta compartida para ver si se puede eliminar
      let subs = this._folder_service.countFiles(this.currentNode.data.folder_id).pipe(
        map(async (resp) => {
          if (resp > 0) {
            Swal.fire(
              'Error',
              'La carpeta contiene archivos',
              'error'
            )
          } else {
            const result = await this.delete_alert.showAlert()
            if (result.confirmed) {

              this._folder_service.deleteFolder(this.currentNode.data.folder_id).pipe(
                map((resp) => {
                  this.toastr.success('Documento eliminado', 'Éxito')
                  this.ngOnInit()
                }),
                catchError((err) => {
                  this.toastr.error('error', 'Ocurrio un problema' + err.message);
                  console.log(err);
                  this.closeBtnClick();
                  return of();
                })
              ).subscribe()
            }
          }
        }), catchError((err) => {
          this.toastr.error('error', 'Ocurrio un problema' + err.message);
          console.log(err);
          return of();
        })
      ).subscribe(() => subs.unsubscribe())


    } else if (this.currentType == 2) {
      //Eliminar de una carpeta compartida
      if (this.currentNode && this.currentNode.data.folder_id) {
        //consultar permisos si puedo eliminar
        let email = localStorage.getItem('email')
        let sub1 = this._folder_service.canDeleteFolderSharedFolder(this.currentNode.data.folder_id, email)
          .pipe(
            map((resp) => {
              if (resp == false) {
                this._folder_permission.showCantDeleteFolder()
                return
              } else {
                let subs = this._folder_service.countFiles(this.currentNode.data.folder_id).pipe(
                  map(async (resp) => {
                    if (resp > 0) {
                      Swal.fire(
                        'Error',
                        'La carpeta contiene archivos',
                        'error'
                      )
                    } else {
                      const result = await this.delete_alert.showAlert()
                      if (result.confirmed) {

                        this._folder_service.deleteFolder(this.currentNode.data.folder_id).pipe(
                          map((resp) => {
                            this.toastr.success('Documento eliminado', 'Éxito')
                            this.ngOnInit()
                          }),
                          catchError((err) => {
                            this.toastr.error('error', 'Ocurrio un problema' + err.message);
                            console.log(err);
                            this.closeBtnClick();
                            return of();
                          })
                        ).subscribe()
                      }
                    }
                  }), catchError((err) => {
                    this.toastr.error('error', 'Ocurrio un problema' + err.message);
                    console.log(err);
                    return of();
                  })
                ).subscribe(() => subs.unsubscribe())
              }
            }),
            catchError((erro) => {
              this.toastr.error('error', 'Error en el servidor')
              console.log(erro)
              return of()
            })
          ).subscribe(() => sub1.unsubscribe())
      }
    }
  }
  canList(): boolean {
    return this.autorization.havePermission(this.resource, "LIST_FOLDERS");
  }
  canCreateFolder(): boolean {
    return this.autorization.havePermission(this.resource, 'CREATE_FOLDER')
  }
  canListSharedFolders(): boolean {
    return this.autorization.havePermission(this.resource, 'LIST_SHARED_FOLDERS')
  }
  canUploadFile(): boolean {
    return this.autorization.havePermission(this.resource, 'UPLOAD_FILE')
  }
  canListFiles(): boolean {
    return this.autorization.havePermission(this.resource, 'LIST_FILES')
  }
  canReadInformation(): boolean {
    return this.autorization.havePermission(this.resource, 'READ_INFORMATION')
  }
  canShareRolFolder(): boolean {
    return this.autorization.havePermission(this.resource, 'SHARE_ROL')
  }
  canShareUserFolder(): boolean {
    return this.autorization.havePermission(this.resource, 'SHARE_USER')
  }
  canSeeDocument(): boolean {
    return this.autorization.havePermission(this.resource, 'SEE_FILE')
  }
  canDownloadFile(): boolean {
    return this.autorization.havePermission(this.resource, 'DOWNLOAD_FILE')
  }
  canEdit(): boolean {
    return this.autorization.havePermission(this.resource, 'EDIT')
  }
  canShareFile(): boolean {
    return this.autorization.havePermission(this.resource, 'SHARE_FILE')
  }
}

