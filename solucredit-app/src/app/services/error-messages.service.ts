import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessagesService {

  constructor() { }
  nitErrorMessages = {
    'isNitValid': 'El nit no es válido',
    'hasNDash': 'El nit debe de ingresarlo sin guiones',
    'required': 'El nit es requerido'
  }
  dpiErrorMessages = {
    'isDPIValid': 'El DPI no es válido',
    'required': 'El DPI es requerido'
  }
  firstnameErrorMessages = {
    'required': 'El primer nombre es requerido'
  }
  secondnameErrorMessages = {
    'required': 'El segundo nombre es requerido'
  }
  lastnameErrorMessages = {
    'required': 'El apellido es requerido'
  }
  lastname2ErrorMessages = {
    'required': 'El segundo apellido es requerido'
  }
  emailErrorMessages = {
    'required': 'El correo es requerido',
    'email': 'El correo no es válido',
    'emailExist': 'El correo ya esta registrado.'
  }
  addressErrorMessages = {
    'required': 'La dirección es requerida'
  }
  businessNameErrorMessages = {
    'required': 'El nombre de la empresa es requerido'
  }
  phoneErrorMessages = {
    'required': 'El teléfono es requerido',
    'pattern': 'El teléfono no es válido'
  }
  requiredAmountErrorMessages = {
    'required': 'El monto es requerido'
  }
  nameErrorMessages = {
    'required': 'El nombre es requerido'
  }
  positionErrorMessages = {
    'required': 'El cargo es requerido'
  }
  nationalityErrorMessages = {
    'required': 'La nacionalidad es requerida'
  }
  percentageErrorMessages = {
    'required': 'El porcentaje es requerido',
    'min': 'El porcentaje debe ser mayor a 0',
    'max': 'El porcentaje debe ser menor a 100'
  }
  workingTimeErrorMessages = {
    'required': 'El tiempo de trabajo es requerido',
    'min': 'El tiempo de trabajo debe ser mayor a 0',
  }
  yearErrorMessages = {
    'required': 'El año es requerido',
    'min': 'El año debe ser mayor a 0',
  }
  salesyearErrorMessages = {
    'required': 'Las ventas anuales son requeridas',
    'min': 'Las ventas anuales deben ser mayor a 0',
  }
  phoneNumberErrorMessages = {
    'required': 'El teléfono es requerido',
    'isPhoneNumberValid': 'El teléfono no es válido'
  }
  maritalStatusErrorMessages = {
    'required': 'El estado civil es requerido'
  }
  professionErrorMessages = {
    'required': 'La profesión es requerida'
  }
}
