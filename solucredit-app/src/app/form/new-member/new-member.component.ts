import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription, of } from "rxjs";
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MysqlService } from '../../services/mysql/mysql.service';
import { AuthorizationService } from "../../services/authorization.service";
import { Location } from '@angular/common'
import { ErrorMessagesService } from 'src/app/services/error-messages.service';
import { PlaceHoldersService } from 'src/app/services/place-holders.service';

@Component({
  selector: 'app-new-member',
  templateUrl: './new-member.component.html',
  styleUrls: ['./new-member.component.css']
})
export class NewMemberComponent implements OnInit {
  dataCurrentuser;
  user_id;

  constructor(
    private mysqlService: MysqlService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authorization: AuthorizationService,
    private location: Location,
    public errorMessages: ErrorMessagesService,
    public placeHolders: PlaceHoldersService,
  ) { }

  createPerson = new FormGroup({
    first_name: new FormControl(null, [Validators.required]),
    name2: new FormControl(''),
    name3: new FormControl(''),
    last_name: new FormControl(null, [Validators.required]),
    lastname2: new FormControl(''),
    lastname3: new FormControl(''),
    gender: new FormControl("", [Validators.required]),
    birthdate: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    mobile_phone: new FormControl(null, [
      Validators.required,
      Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)"),
    ]),
    home_phone: new FormControl("", [
      Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)"),
    ]),
    office_home: new FormControl("", [
      Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)"),
    ]),
    address: new FormControl(null, [Validators.required]),
    DPI: new FormControl(null, [
      Validators.required,
      Validators.pattern("^[0-9]{4}s?[0-9]{5}s?[0-9]{4}$"),
    ]),
  });

  susciption: Subscription;


  CreateUser() {
    if (!this.createPerson.value.birthdate) {
      delete this.createPerson.value.birthdate;
    }
    if (!this.createPerson.value.email) {
      delete this.createPerson.value.email;
    }
    if (!this.createPerson.value.mobile_phone) {
      delete this.createPerson.value.mobile_phone;
    }
    if (!this.createPerson.value.home_phone) {
      delete this.createPerson.value.home_phone;
    }
    if (!this.createPerson.value.office_home) {
      delete this.createPerson.value.office_home;
    }
    if (!this.createPerson.value.address) {
      delete this.createPerson.value.address;
    }
    if (!this.createPerson.value.DPI) {
      delete this.createPerson.value.DPI;
    }
    this.mysqlService.CreatePerson(this.createPerson.value).subscribe(
      (response) => {
        this.mysqlService
          .CreateCustomerMember({
            customer_id: this.user_id,
            person_id: response.data.person_id,
            status_id: 1,
          })
          .subscribe((response2) => {
            this.toastr.success(
              "El Socio fue creado con éxito.",
              "Creado!"
            );
            this.createPerson.reset({});
            if (this.activatedRoute.snapshot.url.length > 0) {
              if (
                this.activatedRoute.snapshot.url[0].path !== undefined &&
                this.activatedRoute.snapshot.url[0].path === "cliente"
              ) {
                this.router.navigate([`/customer/cliente/${this.user_id}`]);
              }
            } else {
              this.router.navigate([`/list-customer`]);
            }
          });
      },
      (error) => {
        this.toastr.error("Verificar información del formulario.", "Oops!");
        console.log("error");
      }
    );
  }


  Back() {
    if (this.activatedRoute.snapshot.url.length > 0) {
      if (
        this.activatedRoute.snapshot.url[0].path !== undefined &&
        this.activatedRoute.snapshot.url[0].path === "cliente"
      ) {
        this.router.navigate([`/my-profile`]);
      }
    } else {
      this.router.navigate([`/list-customer`]);
    }
  }

  ngOnInit() {
    if (localStorage.getItem("cutomer-previous-url") != "/my-profile") {
      this.user_id = this.activatedRoute.snapshot.params.id;
      this.createPerson.patchValue({
        first_name: "",
        last_name: "",
        gender: "0",
      });
      this.createPerson.controls["birthdate"].clearValidators();
      this.createPerson.controls["birthdate"].updateValueAndValidity();
      this.createPerson.controls["email"].clearValidators();
      this.createPerson.controls["email"].updateValueAndValidity();
      this.createPerson.controls["mobile_phone"].clearValidators();
      this.createPerson.controls["mobile_phone"].updateValueAndValidity();
      this.createPerson.controls["home_phone"].clearValidators();
      this.createPerson.controls["home_phone"].updateValueAndValidity();
      this.createPerson.controls["office_home"].clearValidators();
      this.createPerson.controls["office_home"].updateValueAndValidity();
      this.createPerson.controls["address"].clearValidators();
      this.createPerson.controls["address"].updateValueAndValidity();
      this.createPerson.controls["DPI"].clearValidators();
      this.createPerson.controls["DPI"].updateValueAndValidity();
    } else {
      console.log('else')
      this.susciption = this.authorization.authotizationState$.subscribe(
        async (x) => {
          console.log("else", this.authorization.getUserid());
          this.user_id = this.authorization.getUserid();
        }
      );
    }
  }
  returnBack(): void {
    this.location.back()
  }

}
