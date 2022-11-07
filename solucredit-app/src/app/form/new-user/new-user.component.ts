import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MysqlService } from '../../services/mysql/mysql.service';
import { ToastrService } from 'ngx-toastr';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  NgForm,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AsyncValidatorFn, AbstractControl, ValidatorFn } from '@angular/forms';
import { map } from 'rxjs/operators';
import { CurrencyService } from 'src/app/services/Maintenance/currency.service';
import { data } from '../../component/table/smart-table/smart-data-table';
import { PlaceHoldersService } from 'src/app/services/place-holders.service';
import { ErrorMessagesService } from 'src/app/services/error-messages.service';
import { isDefaultValue } from 'src/app/Validators/NotDefaultValue';

@Component({
  selector: "app-new-user",
  templateUrl: "./new-user.component.html",
  styleUrls: ["./new-user.component.css"],
})
export class NewUserComponent implements OnInit {
  optionsCountries = [];
  optionsDepartments = [];
  optionsMunicipalities = [];
  optionsCategories = [];
  selecionCountry: number = -1;
  selecionDepartment: string[] = [];
  selecionMunicipality: string[] = [];
  localUrl: any[];
  dataCurrency = [];
  page = 1;
  pageSize = 10;
  show = false;
  filelogo;
  constructor(
    private mysqlService: MysqlService,
    private toastr: ToastrService,
    private router: Router,
    private _currency: CurrencyService,
    public placeHolders: PlaceHoldersService,
    public errorMessages: ErrorMessagesService,
  ) { }

  emailAlreadyInUse = false;
  isDisabled = true;
  createCustomer = new FormGroup({
    businessname: new FormControl(null, [Validators.required]),
    branchoffice: new FormControl({ value: null, disabled: this.isDisabled }),
    branchofficecode: new FormControl(''),
    zone: new FormControl(null),
    name1: new FormControl("", [Validators.required]),
    name2: new FormControl(""),
    name3: new FormControl(""),
    lastname1: new FormControl("", [Validators.required]),
    lastname2: new FormControl(""),
    lastname3: new FormControl(""),
    nit: new FormControl(null, [Validators.pattern("^[0-9]+(-?[0-9kK])?$")]),
    address1: new FormControl(null),
    address2: new FormControl(null, []),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)"),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email], [this.emailExist()]),
    municipality_id: new FormControl(""),
    category_id: new FormControl("1"),
    type: new FormControl("0", [Validators.required]),
    inputPais: new FormControl(""),
    inputDepartamento: new FormControl(""),
    DPI: new FormControl("", [
      Validators.pattern("^[0-9]{4}s?[0-9]{5}s?[0-9]{4}$"),
    ]),
    amount_interests: new FormControl("", [Validators.required]),
    currency: new FormControl(-1, [Validators.required, isDefaultValue]),
    is_Contact: new FormControl('0', []),
    is_Member: new FormControl('0', []),
    is_Customer_Fiduciary: new FormControl('0', []),
    is_Owner: new FormControl('0', []),
    commercial_assistant_name: new FormControl({value:'', disabled:true}, []),
    commercial_assistant_email: new FormControl(''),
  });


  chageType() {
    //console.log('aqui');
    //console.log(this.createCustomer.controls.type.value);
    if (this.createCustomer.controls.type.value == 1) {
      this.createCustomer.controls.businessname.enable();
      this.createCustomer.controls.is_Contact.enable();
      this.createCustomer.controls.branchoffice.enable();
      //this.createCustomer.controls.branchofficecode.enable();
      // console.log('juridico');
    } else {
      this.createCustomer.controls.businessname.disable();
      this.createCustomer.controls.branchoffice.disable();
      // this.createCustomer.controls.branchofficecode.disable();
      this.createCustomer.controls.is_Contact.disable();
      //console.log('individual');
    }
  }

  toggleMoney(val) {
    val == 0 ? this.createCustomer.controls['currency'].setValue('0') : this.createCustomer.controls['currency'].setValue('1');
  }

  toggleType(val) {
    val == 0 ? this.createCustomer.controls['type'].setValue('0') : this.createCustomer.controls['type'].setValue('1');


    if (this.createCustomer.controls.type.value == 1) {
      this.createCustomer.controls.businessname.enable();
      this.createCustomer.controls.branchoffice.enable();
      this.createCustomer.controls.branchofficecode.enable();
      this.createCustomer.controls.is_Contact.enable();
      // console.log('juridico');
    } else {
      this.createCustomer.controls.businessname.disable();
      this.createCustomer.controls.branchoffice.disable();
      this.createCustomer.controls.branchofficecode.disable();
      this.createCustomer.controls.is_Contact.disable();
      //console.log('individual');
    }

  }

  async CreateUser() {
    if (!this.createCustomer.value.home_phone) {
      delete this.createCustomer.value.address2;
    }
    this.createCustomer.value.employee_email = localStorage.getItem("email");
    const newfile = JSON.parse(localStorage.getItem("file"));
    /* if (newfile) {
      await this.mysqlService
        .UploadFile({ inputlogo: newfile, nit: this.createCustomer.value.nit })
        .toPromise()
        .then((response) => {
          console.log(response);
          this.createCustomer.value.logotipo = response.data.key;
        })
        .catch((error) => {
          this.toastr.error("Problemas con guardar la imagen", "Oops!");
        });
    }
 */
    this.createCustomer.value.status_id = 0;
    console.log(this.createCustomer.value);
    let data = this.createCustomer.value;
    if (newfile) {
      data = { ...data, inputlogo: newfile };
    }
    await this.mysqlService.CreateUser(data).subscribe(
      (response) => {
        localStorage.removeItem("file");
        this.toastr.success(
          "La información fue guardada con éxito.",
          "Información Guardada!"
        );
        this.router.navigate([`/prospectos`]);
      },
      (error) => {
        this.toastr.error("Verificar información del formulario.", "Oops!");
        console.log("error");
      }
    );
  }

  async ngOnInit() {
    this.optionsCountries = this.getCountries();
    this.optionsDepartments = this.getDepartments();
    this.optionsMunicipalities = this.getMunicipalities();
    this.getCategories();
    this.chageType();
    await this.getCurrency()
    console.log('localstorage', localStorage);
    this.createCustomer.controls['commercial_assistant_name'].setValue(localStorage.getItem('name'));
    this.createCustomer.controls['commercial_assistant_email'].setValue(localStorage.getItem('email'));
  }

  getCurrency() {
    this._currency.getCurrency(this.pageSize, 0, []).subscribe((c) => {
      this.dataCurrency = c.currency;
      console.log(this.dataCurrency)
    })
  }

  async getCategories() {
    const res = this.mysqlService
      .GetAllCustomerCategories()
      .toPromise()
      .then((response) => {
        console.log(response);
        this.optionsCategories = response.data;
      });
    return res;
  }

  /*getCategories() {
    const categories = [];
    this.mysqlService.GetAllCustomerCategories().subscribe(
      (response) => {
        Object.keys(response.data).forEach(function (k) {
          categories.push({
            id: response.data[k].id,
            name: response.data[k].name,
          });
        });
      },
      (error) => {
        console.log("error");
      }
    );
    return categories;
  }*/

  getCountries() {
    const countries = [];
    this.mysqlService.GetCountries().subscribe(
      (response) => {
        Object.keys(response.data).forEach(function (k) {
          countries.push({
            id: response.data[k].country_id,
            name: response.data[k].name,
          });
        });
      },
      (error) => {
        console.log("error");
      }
    );
    return countries;
  }

  getDepartments() {
    const departments = [];
    this.mysqlService.GetDepartments().subscribe(
      (response) => {
        Object.keys(response.data).forEach(function (k) {
          departments.push({
            id: response.data[k].department_id,
            name: response.data[k].name,
            country: response.data[k].country_id,
          });
        });
      },
      (error) => {
        console.log("error");
      }
    );
    return departments;
  }

  getMunicipalities() {
    const municipalities = [];
    this.mysqlService.GetMunicipalities().subscribe(
      (response) => {
        Object.keys(response.data).forEach(function (k) {
          municipalities.push({
            id: response.data[k].municipality_id,
            name: response.data[k].name,
            department: response.data[k].department_id,
          });
        });
      },
      (error) => {
        console.log("error");
      }
    );
    return municipalities;
  }

  onCountriSelected(value: string) {
    this.selecionDepartment = [];
    this.selecionMunicipality = [];
  }
  onDepartmentSelected(value: string) {
    this.selecionMunicipality = [];
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

  Back() {
    this.router.navigate([`/list-customer`]);
  }
  emailExist(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return this.mysqlService.isExistEmail(control.value).pipe(
        map((resp) => {
          //console.log(resp);
          this.emailAlreadyInUse = resp.data;
          return resp.data ? { 'emailExist': true } : null;
        })
      );
    }
  }

}
