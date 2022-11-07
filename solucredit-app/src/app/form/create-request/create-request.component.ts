import { AfterViewInit, Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { isNitValid } from "src/app/Validators/NitValidator";
import { MysqlService } from "../../services/mysql/mysql.service";

@Component({
  selector: "app-create-request",
  templateUrl: "./create-request.component.html",
  styleUrls: ["./create-request.component.css"],
})
export class CreateRequestComponent implements AfterViewInit {
  optionsCountries = [];
  optionsDepartments = [];
  optionsMunicipalities = [];
  optionsTypeRequest = [];
  optionsCategories = [];
  selecionCountry: string[] = [];
  selecionDepartment: string[] = [];
  selecionMunicipality: string[] = [];
  dataCurrentCustomer = [];
  user_id;
  dataCurrentuser;
  user_solucredit;
  localUrl: any[];
  filelogo;
  constructor(
    private mysqlService: MysqlService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  createRequest = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    nit: new FormControl(null, [Validators.required,
      isNitValid
    ]),
    address1: new FormControl(null, [Validators.required]),
    address2: new FormControl(null, []),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)"),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    municipality_id: new FormControl("", [Validators.required]),
    type: new FormControl("", [Validators.required]),
    inputPais: new FormControl("", [Validators.required]),
    inputDepartamento: new FormControl("", [Validators.required]),
    inputTipoSolicitud: new FormControl("", [Validators.required]),
  });

  getDataCurrentCustomer() {

    this.mysqlService.GetOneCustomer(this.user_id).subscribe(
      (response) => {
        this.dataCurrentCustomer = response.data.customer;
        this.createRequest.patchValue({
          name: response.data.customer.name,
          nit: response.data.customer.nit,
          address1: response.data.customer.address1,
          address2: response.data.customer.address2,
          type: response.data.customer.type,
          phone: response.data.customer.phone,
          email: response.data.customer.email,
        });
        this.localUrl = response.data.customer.logotipo;
        this.selecionMunicipality = response.data.customer.municipality_id;
        this.loadDataTerritorial(this.selecionMunicipality);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async getCountries() {
    const res = this.mysqlService
      .GetCountries()
      .toPromise()
      .then((response) => {
        this.optionsCountries = response.data;
      });
    return res;
  }

  async getDepartments() {
    const res = this.mysqlService
      .GetDepartments()
      .toPromise()
      .then((response) => {
        this.optionsDepartments = response.data;
      });
    return res;
  }

  async getTypeRequest() {
    const res = this.mysqlService
      .GetTypeRequest()
      .toPromise()
      .then((response) => {
        console.log('rest', response);
        this.optionsTypeRequest = response.data;
      });
    return res;
  }

  async getMunicipalities() {
    const res = this.mysqlService
      .GetMunicipalities()
      .toPromise()
      .then((response) => {
        this.optionsMunicipalities = response.data;
      });
    return res;
  }

  async getCategories() {
    const res = this.mysqlService
      .GetAllCustomerCategories()
      .toPromise()
      .then((response) => {
        this.optionsCategories = response.data;
      });
    return res;
  }

  onCountrySelected(value: string) {
    this.selecionDepartment = [];
    this.selecionMunicipality = [];
  }
  onDepartmentSelected(value: string) {
    this.selecionMunicipality = [];
  }

  async loadDataTerritorial(data) {
    let cont = 0;
    switch (cont) {
      case 0: {
        Object.entries(this.optionsMunicipalities).forEach(([key, value]) => {
          if (value.municipality_id === data) {
            this.selecionDepartment = value.department_id;
            return false;
          }
        });
        cont = 1;
      }
      // tslint:disable-next-line: no-switch-case-fall-through
      case 1: {
        Object.entries(this.optionsDepartments).forEach(([key, value]) => {
          if (value.department_id === this.selecionDepartment) {
            this.selecionCountry = value.country_id;
            return false;
          }
        });
        this.spinner.hide();
        cont = 2;
        break;
      }
    }
  }

  BackCustomer() {
    if (this.activatedRoute.snapshot.url.length > 0) {
      if (
        this.activatedRoute.snapshot.url[0].path !== undefined &&
        this.activatedRoute.snapshot.url[0].path === "cliente"
      ) {
        this.router.navigate([`/list-customer`]);
      }
    } else {
      this.router.navigate([`/customer`]);
    }
  }

  // tslint:disable-next-line: use-lifecycle-interface
  async ngOnInit() {
    this.spinner.show();
    this.createRequest.get("name").disable();
    this.createRequest.get("nit").disable();
    this.createRequest.get("address1").disable();
    this.createRequest.get("address2").disable();
    this.createRequest.get("phone").disable();
    this.createRequest.get("email").disable();
    this.createRequest.get("municipality_id").disable();
    this.createRequest.get("type").disable();
    this.createRequest.get("inputPais").disable();
    this.createRequest.get("inputDepartamento").disable();

    if (this.activatedRoute.snapshot.url.length > 0) {
      if (
        this.activatedRoute.snapshot.url[0].path !== undefined &&
        this.activatedRoute.snapshot.url[0].path === "cliente"
      ) {
        this.user_solucredit = false;
        this.user_id = this.activatedRoute.snapshot.params.id;
      }
    } else {
      this.user_solucredit = true;
      this.dataCurrentuser = JSON.parse(localStorage.getItem("Usuario"));
      this.user_id = this.dataCurrentuser.customer_id;
    }
    await this.getMunicipalities();
    await this.getDepartments();
    await this.getCountries();
    await this.getDataCurrentCustomer();
    await this.getCategories();
    await this.getTypeRequest();
  }

  async CreateRequest() {
    const myDate = new Date();
    const body = {
      customer_id: this.user_id,
      documents: 0,
      verifications: 0,
      warranties: 0,
      status: 0,
      type: this.createRequest.value.inputTipoSolicitud,
      create_date: myDate,
    };
    await this.mysqlService
      .CreateCustomerRequest(body)
      .toPromise()
      .then((response) => {
        this.toastr.success(
          "La solicitud fue creada con éxito.",
          "Solicitud Creada!"
        );
        this.router.navigate([`/list-customer`]);
        console.log('response', response);
      })
      .catch((error) => {
        this.toastr.error(
          "La información fue guardada con exito.",
          "Opss!"
        );
        console.log("error", error);
      });
  }

  ngAfterViewInit(): void { }
}
