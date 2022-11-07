import { AfterViewInit, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MysqlService } from '../../services/mysql/mysql.service';
import { Location } from '@angular/common';
import { PlaceHoldersService } from 'src/app/services/place-holders.service';
import { ErrorMessagesService } from 'src/app/services/error-messages.service';
import { isNitValid } from 'src/app/Validators/NitValidator';

@Component({
  selector: "app-edit-customer",
  templateUrl: "./edit-customer.component.html",
  styleUrls: ["./edit-customer.component.css"],
})
export class EditCustomerComponent implements AfterViewInit {
  Countries = [];
  Departments = [];
  Municipalities = [];
  optionsCountries = [];
  optionsDepartments = [];
  optionsMunicipalities = [];
  optionsCategories = [];
  selecionCountry: string[] = [];
  selecionDepartment: string[] = [];
  //selecionMunicipality: string[] = [];
  selecionMunicipality: number = 0;
  dataCurrentCustomer = [];
  user_id;
  dataCurrentuser;
  localUrl: any[];
  filelogo;

  constructor(
    private mysqlService: MysqlService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private location: Location,
    public placeHolders: PlaceHoldersService,
    public errorMessages: ErrorMessagesService
  ) { }

  customerType: number = 0;
  createCustomer = new FormGroup({
    businessname: new FormControl(null, [Validators.required]),
    branchoffice: new FormControl({ value: null },),
    branchofficecode: new FormControl({ value: null }),
    zone: new FormControl(''),
    name: new FormControl(null),
    name1: new FormControl(null, [Validators.required]),
    name2: new FormControl(''),
    name3: new FormControl(''),
    lastname1: new FormControl(null, [Validators.required]),
    lastname2: new FormControl('', []),
    lastname3: new FormControl(''),
    nit: new FormControl('', [
      Validators.required,
      isNitValid
    ]),
    DPI: new FormControl(),
    address1: new FormControl(''),
    address2: new FormControl(''),
    phone: new FormControl([
      Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)"),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    municipality_id: new FormControl("", [Validators.required]),
    category_id: new FormControl("1"),
    type: new FormControl(0, [Validators.required]),
    inputPais: new FormControl("", []),
    inputDepartamento: new FormControl("", []),
    amount_interests: new FormControl("", [Validators.required]),
    currency: new FormControl("0", [Validators.required]),
    commercialname: new FormControl("", []),
    //inputlogo: new FormControl("", []),
  });

  createCustomerIndividual = new FormGroup({

    zone: new FormControl(null),
    name: new FormControl(null),
    name1: new FormControl(null, [Validators.required]),
    name2: new FormControl(''),
    name3: new FormControl(''),
    lastname1: new FormControl(null, [Validators.required]),
    lastname2: new FormControl('', []),
    lastname3: new FormControl(''),
    nit: new FormControl('', [
      Validators.required,
      isNitValid,
    ]),
    DPI: new FormControl(),
    address1: new FormControl(''),
    address2: new FormControl('', []),
    phone: new FormControl(null, [
      Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)"),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email,]),
    municipality_id: new FormControl("", [Validators.required]),
    category_id: new FormControl("1"),
    type: new FormControl(0, [Validators.required]),
    inputPais: new FormControl("", []),
    inputDepartamento: new FormControl("", []),
    amount_interests: new FormControl("", [Validators.required]),
    currency: new FormControl("0", [Validators.required]),
    //inputlogo: new FormControl("", []),
  });

  returnBack(): void {
    this.location.back()
  }

  async EditUser() {

    const newfile = JSON.parse(localStorage.getItem("file"));
    console.log("this.user_id: ", this.user_id);
    /* if (newfile) {
      await this.mysqlService
        .UploadFile({ inputlogo: newfile, customer_id: this.user_id})
        .toPromise()
        .then((response) => {
          console.log(response);
          this.createCustomer.value.logotipo = response.data.key;
        })
        .catch((error) => {
          this.toastr.error("Problemas con guardar la imagen", "Oops!");
        });
    } */
    let formsend = null;
    if (this.customerType == 0) {
      formsend = this.createCustomerIndividual;
      console.log('Ejecuta desde IndividualCustomer');
    }
    else {
      formsend = this.createCustomer;
      console.log('Ejecuta desde Crear Customer');
    }
    formsend = formsend.value;
    if (newfile) {
      formsend = { ...formsend, inputlogo: newfile }
      console.log('Ejecuta desde NewFile');
    }
    console.log("formsend:: ");
    console.log(formsend);
    this.mysqlService
      .UpdateCustomer(formsend, this.user_id)
      .subscribe(
        (response) => {
          localStorage.removeItem("file");
          this.toastr.success(
            "La información fue guardada con exito.",
            "Información Guardada!"
          );
          if (this.activatedRoute.snapshot.url.length > 0) {

            if (
              this.activatedRoute.snapshot.url[0].path !== undefined &&
              this.activatedRoute.snapshot.url[0].path === "cliente"
            ) {
              console.log('aqui 2');
              this.router.navigate([`/list-customer`]);
            }
            this.returnBack();

          } else {
            console.log('aqui 3');
            this.router.navigate([`/customer/cliente`, this.user_id]);
          }
        },
        (error) => {
          this.toastr.error("Verificar información del formulario.", "Oops!");
          console.log("error");
        }
      );
  }

  getDataCurrentCustomer() {
    this.mysqlService.GetOneCustomer(this.user_id).subscribe(
      (response) => {
        console.log(response);
        this.dataCurrentCustomer = response.data.customer;
        this.customerType = response.data.customer.type
        this.createCustomer.patchValue({

          businessname: response.data.customer.businessname,
          branchoffice: response.data.customer.branchoffice,
          branchofficecode: response.data.customer.branchofficecode,
          zone: response.data.customer.zone,
          name1: response.data.customer.name1,
          name2: response.data.customer.name2,
          name3: response.data.customer.name3,
          lastname1: response.data.customer.lastname1,
          lastname2: response.data.customer.lastname2,
          lastname3: response.data.customer.lastname3,
          nit: response.data.customer.nit,
          address1: response.data.customer.address1,
          address2: response.data.customer.address2,
          phone: response.data.customer.phone,
          email: response.data.customer.email,
          municipality_id: response.data.customer.municipality_id,
          type: response.data.customer.type,
          DPI: response.data.customer.DPI,
          currency: response.data.customer.currency,
          amount_interests: response.data.customer.amount_interests,
          commercialname: response.data.customer.commercialname,
          /* inputPais: response.data.customer., */
          /* inputDepartamento: response.data.customer., */

        });
        this.createCustomerIndividual.patchValue({


          zone: response.data.customer.zone,

          name1: response.data.customer.name1,
          name2: response.data.customer.name2,
          name3: response.data.customer.name3,
          lastname1: response.data.customer.lastname1,
          lastname2: response.data.customer.lastname2,
          lastname3: response.data.customer.lastname3,
          nit: response.data.customer.nit,
          address1: response.data.customer.address1,
          address2: response.data.customer.address2,
          phone: response.data.customer.phone,
          email: response.data.customer.email,
          municipality_id: response.data.customer.municipality_id,
          type: response.data.customer.type,
          DPI: response.data.customer.DPI,
          currency: response.data.customer.currency,
          amount_interests: response.data.customer.amount_interests,
          /* inputPais: response.data.customer., */
          /* inputDepartamento: response.data.customer., */

        })
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

        this.Countries = response.data;
      });
    return res;
  }

  async getDepartments() {
    const res = this.mysqlService
      .GetDepartments()
      .toPromise()
      .then((response) => {

        this.Departments = response.data;
      });
    return res;
  }

  async getMunicipalities() {
    const res = this.mysqlService
      .GetMunicipalities()
      .toPromise()
      .then((response) => {

        this.Municipalities = response.data;
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

  onCountrySelected(value: Number) {
    /*  
     this.selecionDepartment = [];
     this.selecionMunicipality = []; */

    let country = this.Countries.find(item => { return item.country_id == value });


    this.optionsDepartments = this.Departments.filter((item) => item.country_id == country.country_id);
    this.optionsMunicipalities = [];
    this.selecionMunicipality = null;
    this.createCustomer.controls.municipality_id.setValue(null);
  }
  onDepartmentSelected(value: Number) {

    let departamento = this.Departments.find(item => { return item.department_id == value });


    this.optionsMunicipalities = this.Municipalities.filter((item) => item.department_id == departamento.department_id);
    this.createCustomer.controls.municipality_id.setValue(null);

    /*
    this.selecionMunicipality = []; */
  }
  onMunicipalitySelected(value) {
    this.createCustomer.controls.municipality_id.setValue(parseInt(value));
    this.selecionMunicipality = value;
  }

  loadDataTerritorial(data) {

    this.selecionMunicipality = data;

    this.createCustomer.controls.municipality_id.setValue(data);
    let municipio = this.Municipalities.find(element => element.municipality_id == this.selecionMunicipality);

    let departamento = this.Departments.find(item => item.department_id == municipio.department_id);
    let country = this.Countries.find(item => item.country_id == departamento.country_id);
    this.optionsCountries = this.Countries;
    this.optionsMunicipalities = this.Municipalities.filter((item) => item.department_id === municipio.department_id)
    this.selecionCountry = country.country_id;
    this.optionsDepartments = this.Departments.filter(item => item.country_id == departamento.country_id);
    this.selecionDepartment = departamento.department_id;


    /*  Object.entries(this.optionsMunicipalities).forEach(([key, value]) => {
       if (value.municipality_id === data) {
         this.selecionDepartment = value.department_id;
         //return false;
       }
     });
     Object.entries(this.optionsDepartments).forEach(([key, value]) => {
       if (value.department_id === this.selecionDepartment) {
         this.selecionCountry = value.country_id;
         //return false;
       }
     }); */
    this.spinner.hide();

    return false;

    /* let cont = 0;
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
        console.log(this.selecionCountry);
        this.spinner.hide();
        cont = 2;
        break;
      }
    } */
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
      this.router.navigate([`/customer/cliente`, this.user_id]);
    }
  }

  // tslint:disable-next-line: use-lifecycle-interface
  async ngOnInit() {
    this.spinner.show();
    if (this.activatedRoute.snapshot.params) {
      this.user_id = this.activatedRoute.snapshot.params.id;
      //console.log("this.activatedRoute.snapshot.params.id:: ", this.activatedRoute.snapshot.params.id);
      localStorage.setItem('clientIDForFicha', this.activatedRoute.snapshot.params.id);

    } else {
      this.dataCurrentuser = JSON.parse(localStorage.getItem("Usuario"));
      this.user_id = this.dataCurrentuser.customer_id;
    }
    await this.getMunicipalities();
    await this.getDepartments();
    await this.getCountries();
    await this.getDataCurrentCustomer();
    await this.getCategories();
  }

  onCountriSelected(value: string) {
    /* this.selecionDepartment = [];
    this.selecionMunicipality = []; */
  }

  showPreviewImage(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;
        localStorage.setItem("file", JSON.stringify(event.target.result));
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }


  ngAfterViewInit(): void { }


}
