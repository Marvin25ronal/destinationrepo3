import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators, AsyncValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { map,catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { MysqlService } from 'src/app/services/mysql/mysql.service';

@Component({
  selector: "app-new-customer",
  templateUrl: "./new-customer.component.html",
  styleUrls: ["./new-customer.component.css"],
})
export class NewCustomerComponent implements OnInit {
  isCreate = false;

  optionsCountries = [];
  optionsDepartments = [];
  optionsMunicipalities = [];
  selecionCountry: string[] = [];
  selecionDepartment: string[] = [];
  selecionMunicipality: string[] = [];
  localUrl: any[];
  filelogo;
  constructor(
    private mysqlService: MysqlService,
    private toastr: ToastrService,
    private router: Router
    
  ) {}
  isDisabled = true;
  createCustomer = new FormGroup({
    businessname: new FormControl(null, [Validators.required]),
    branchoffice: new FormControl({ value: null, disabled: this.isDisabled }),
    branchofficecode: new FormControl(
      { value: null, disabled: this.isDisabled }
    ),
    zone: new FormControl(),
    name: new FormControl(null, [Validators.required]),
    //name1: new FormControl(null, [Validators.required]),
    //name2: new FormControl(null),
    //name3: new FormControl(""),
    //lastname1: new FormControl(null, [Validators.required]),
    //lastname2: new FormControl(null, [Validators.required]),
    //lastname3: new FormControl(""),
    nit: new FormControl(null, [
      Validators.pattern("^[0-9]+(-?[0-9kK])?$"),
    ]),
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
    currency: new FormControl("0", [Validators.required]),
    //inputlogo: new FormControl("", []),
  });

  toggleMoney(val){
    val == 0? this.createCustomer.controls['currency'].setValue('0'): this.createCustomer.controls['currency'].setValue('1');
  }

  toggleType(val){
    val == 0? this.createCustomer.controls['type'].setValue('0'): this.createCustomer.controls['type'].setValue('1');


    if (this.createCustomer.controls.type.value == 1) {
      this.createCustomer.controls.businessname.enable();
      this.createCustomer.controls.branchoffice.enable();
      this.createCustomer.controls.branchofficecode.enable();
      // console.log('juridico');
    } else {
      this.createCustomer.controls.businessname.disable();
      this.createCustomer.controls.branchoffice.disable();
      this.createCustomer.controls.branchofficecode.disable();
      //console.log('individual');
    }
    
  }

  async CreateUser() {
    if (!this.createCustomer.value.home_phone) {
      delete this.createCustomer.value.address2;
    }
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
    } */
    this.createCustomer.value.status_id = 0;
    this.createCustomer.value.category_id = 1;
    let data = this.createCustomer.value;
    if (newfile) {
      data = { ...data, inputlogo: newfile };
    }
    await this.mysqlService.CreateUser(data).subscribe(
      (response) => {
        
        localStorage.removeItem("file");
        console.log("entre", );
        this.toastr.success(
          "La información fue guardad con exito.",
          "Información Guardada!"
        );
        //this.router.navigate(["/customer"]);
        this.isCreate = true;
        //this.router.navigate(["/"]);
        //localStorage.setItem("Usuario", JSON.stringify(response.data));
      },
      (error) => {
        this.toastr.error("Verificar información del formulario.", "Oops!");
        console.log("error");
      }
    );
  }

  ngOnInit(): void {
    this.optionsCountries = this.getCountries();
    this.optionsDepartments = this.getDepartments();
    this.optionsMunicipalities = this.getMunicipalities();
    this.isCreate = false;
    this.chageType();
  }

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

  chageType() {
    //console.log('aqui');
    //console.log(this.createCustomer.controls.type.value);
    if (this.createCustomer.controls.type.value == 1) {
      this.createCustomer.controls.businessname.enable();
      this.createCustomer.controls.branchoffice.enable();
      this.createCustomer.controls.branchofficecode.enable();
      // console.log('juridico');
    } else {
      this.createCustomer.controls.businessname.disable();
      this.createCustomer.controls.branchoffice.disable();
      this.createCustomer.controls.branchofficecode.disable();
      //console.log('individual');
    }
  }

  emailExist():AsyncValidatorFn  {
    return(control: AbstractControl) =>{
      return this.mysqlService.isExistEmail(control.value).pipe(
        map((resp)=>{
          console.log(resp);
          return resp.data ? {'emailExist':true} : null;
        } )
      );
    }
  }

}

