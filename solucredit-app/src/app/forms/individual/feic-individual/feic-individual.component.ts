import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MysqlService } from 'src/app/services/mysql/mysql.service';

@Component({
  selector: 'app-feic-individual',
  templateUrl: './feic-individual.component.html',
  styleUrls: ['./feic-individual.component.css']
})
export class FeicIndividualComponent implements OnInit {

  constructor(
    private mysqlService: MysqlService,
    private toastr: ToastrService
  ) { }
  createProfile = new FormGroup({
    inputNombre: new FormControl(null, [Validators.required]),
    inputNit: new FormControl(null, [Validators.required]),
    inputDireccion1: new FormControl(null, [Validators.required]),
    inputDireccion2: new FormControl(null, [Validators.required]),
    inputMunicipio: new FormControl('', [Validators.required]),
    inputTipoNegocio: new FormControl('', [Validators.required]),
    inputPais: new FormControl('', [Validators.required]),
    inputDepartamento: new FormControl('', [Validators.required]),
  });

  CreateProfile() {
    // console.log(this.createCustomer.value);
    this.mysqlService.CreateUser(this.createProfile.value).subscribe(
      (response) => {
        this.toastr.success('Correo Enviado', 'Enviado!');
        console.log('sucess');
        this.createProfile.reset({});
      },
      (error) => {
        this.toastr.error('Verificar información del formulario.', 'Oops!');
        console.log('error');
      }
    );
  }
  ngOnInit(): void {
  }

}
