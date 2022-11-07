import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MysqlService } from 'src/app/services/mysql/mysql.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  NgForm,
} from '@angular/forms';


@Component({
  selector: 'app-feic-empresa',
  templateUrl: './feic-empresa.component.html',
  styleUrls: ['./feic-empresa.component.css']
})
export class FeicEmpresaComponent implements OnInit {

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
        this.toastr.success('Exito', 'Registro ingresado');
  }

  ngOnInit(): void {
  }

}
