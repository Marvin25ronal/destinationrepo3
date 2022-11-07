import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MysqlService } from '../../services/mysql/mysql.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-edit-view-person",
  templateUrl: "./edit-view-person.component.html",
  styleUrls: ["./edit-view-person.component.css"],
})
export class EditViewPersonComponent implements OnInit {
  peron_id;
  customer_id;
  type;
  viewform: boolean = false;
  title;
  constructor(
    private activatedRoute: ActivatedRoute,
    private mysqlService: MysqlService,
    public datepipe: DatePipe,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  editPersonform = new FormGroup({
    first_name: new FormControl(null, [Validators.required]),
    last_name: new FormControl(null, [Validators.required]),
    name2: new FormControl(''),
    name3: new FormControl(''),
    lastname2: new FormControl(''),
    lastname3: new FormControl(''),
    gender: new FormControl("", []),
    birthdate: new FormControl(null, []),
    email: new FormControl(null, [ Validators.email]),
    mobile_phone: new FormControl(null, [
      
      Validators.minLength(8),
      Validators.maxLength(8),
    ]),
    home_phone: new FormControl("", [
      Validators.minLength(8),
      Validators.maxLength(8),
    ]),
    office_home: new FormControl("", [
      Validators.minLength(8),
      Validators.maxLength(8),
    ]),
    address: new FormControl('', []),
    DPI: new FormControl(null, [
      
      Validators.pattern("(^[0-9]{13})"),
    ]),
  });

  editPerson() {
    if (!this.editPersonform.value.home_phone) {
      delete this.editPersonform.value.home_phone;
    }
    if (!this.editPersonform.value.office_home) {
      delete this.editPersonform.value.office_home;
    }
    this.mysqlService
      .UpdatePerson(this.editPersonform.value, this.peron_id)
      .subscribe(
        (response) => {
          this.toastr.success(
            "La información fue guardada con exito.",
            "Información Guardada!"
          );
          console.log("sucess");
        },
        (error) => {
          this.toastr.error("Verificar información del formulario.", "Oops!");
          console.log("error");
        }
      );
  }

  getDataCurrentPerson() {
    this.mysqlService.GetOnePerson(this.peron_id).subscribe(
      (response) => {
        this.editPersonform.patchValue({
          first_name: response.data.first_name,
          name2: response.data.name2,
          name3: response.data.name3,
          lastname2: response.data.lastname2,
          lastname3: response.data.lastname3,
          last_name: response.data.last_name,
          gender: response.data.gender,
          birthdate: this.datepipe.transform(
            response.data.birthdate,
            "yyyy-MM-dd"
          ),
          email: response.data.email,
          mobile_phone: response.data.mobile_phone,
          home_phone: response.data.home_phone,
          office_home: response.data.office_home,
          address: response.data.address,
          DPI: response.data.DPI,
        });
        this.spinner.hide();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  BackPerson() {
    if (this.activatedRoute.snapshot.url.length > 0) {
      if (
        this.activatedRoute.snapshot.url[0].path !== undefined &&
        this.activatedRoute.snapshot.url[0].path === "cliente"
      ) {
        this.router.navigate([`/customer/cliente/${this.customer_id}`]);
      }
    } else {
      this.router.navigate([`/customer`]);
    }
  }

  ngOnInit(): void {
    this.spinner.show();

    this.peron_id = this.activatedRoute.snapshot.params.id;
    this.type = this.activatedRoute.snapshot.params.type;
    debugger
    if (this.activatedRoute.snapshot.url.length > 0) {
      if (
        this.activatedRoute.snapshot.url[0].path !== undefined &&
        this.activatedRoute.snapshot.url[0].path === "cliente"
      ) {
        this.customer_id = this.activatedRoute.snapshot.params.id_cliente;
        this.activatedRoute.snapshot.data.urls[1].url = `/customer/cliente/${this.customer_id}`;
      }
    }

    if (this.type === "view") {
      this.title = "Ver información del Representante";
      this.getDataCurrentPerson();
      this.editPersonform.get("first_name").disable();
      this.editPersonform.get("name2").disable();
      this.editPersonform.get("name3").disable();
      this.editPersonform.get("last_name").disable();
      this.editPersonform.get("lastname2").disable();
      this.editPersonform.get("lastname3").disable();
      this.editPersonform.get("gender").disable();
      this.editPersonform.get("birthdate").disable();
      this.editPersonform.get("email").disable();
      this.editPersonform.get("mobile_phone").disable();
      this.editPersonform.get("home_phone").disable();
      this.editPersonform.get("office_home").disable();
      this.editPersonform.get("address").disable();
      this.editPersonform.get("DPI").disable();
      this.viewform = true;
    } else if (this.type === "edit") {
      this.title = "Editar información del Representante";
      this.getDataCurrentPerson();
      this.editPersonform.get("first_name").enable();
      this.editPersonform.get("name2").enable();
      this.editPersonform.get("name3").enable();
      this.editPersonform.get("last_name").enable();
      this.editPersonform.get("lastname2").enable();
      this.editPersonform.get("lastname3").enable();
      this.editPersonform.get("gender").enable();
      this.editPersonform.get("birthdate").enable();
      this.editPersonform.get("email").enable();
      this.editPersonform.get("mobile_phone").enable();
      this.editPersonform.get("home_phone").enable();
      this.editPersonform.get("office_home").enable();
      this.editPersonform.get("address").enable();
      this.editPersonform.get("DPI").enable();
    }
  }
}
