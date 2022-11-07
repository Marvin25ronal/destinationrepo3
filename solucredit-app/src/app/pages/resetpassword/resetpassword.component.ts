import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ResetpasswordService } from './resetpassword.service'
import { NotifierService } from 'angular-notifier';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  //FLAGS DE COMPOTAMIENTO
  isEmailUnique: boolean;
  isEmailInputFocus: boolean;
  resetForm = this.fb.group({
    
    Email: ['', [Validators.required, Validators.email]]
   
  });

  constructor(
    private fb: FormBuilder,
    private _service: ResetpasswordService,
    private notifier: NotifierService) { }

  ngOnInit(): void {
    this.isEmailUnique = true;
    this.isEmailInputFocus = false;
  }
  emailFocus() {
    console.log('EmailFOcus');
    this.isEmailInputFocus = true;
    this.isEmailUnique = true;

  }

  changePassword() {
    console.log('changePassword');
    let sub = this._service.resetEmail(this.resetForm.controls.Email.value).pipe(
      map((response) => {
        this.notifier.notify('success', 'Se envio un correo de recuperación al correo indicado.');


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

  isCorrect(): boolean { return !this.resetForm.valid; }

}
