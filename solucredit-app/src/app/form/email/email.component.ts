import { Component, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SendEmailService } from '../../services/sendemail/send-email.service';
import { ToastrService, } from 'ngx-toastr';

@Component({
  templateUrl: './email.component.html',
})
export class EmailComponent implements AfterViewInit {
  constructor(
    private _sendemail: SendEmailService,
    private toastr: ToastrService,
  ) {}

  miformulario = new FormGroup({
    From: new FormControl(
      'supervizor.solucredit@gmail.com',
      Validators.required
    ),
    To: new FormControl('', Validators.required),
    Subject: new FormControl('', Validators.required),
    Message: new FormControl('', Validators.required),
  });

  onSubmit() {
    this.miformulario.value.template_id = 2;
    this._sendemail.sendEmail(this.miformulario.value).subscribe(
      (response) => {
        this.toastr.success('Correo Enviado', 'Enviado!');
        console.log('sucess');
      },
      (error) => {
        this.toastr.error('Verificar información del formulario.', 'Oops!');
        console.log('error');
      }
    );
  }
  ngAfterViewInit() {}
}
