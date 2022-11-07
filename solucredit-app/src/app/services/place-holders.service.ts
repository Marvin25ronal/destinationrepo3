import { Injectable } from '@angular/core';
import * as moment from 'moment';
//@ts-ignore
import localization from 'moment/locale/es';
moment.updateLocale('es', localization)
@Injectable({
  providedIn: 'root'
})
export class PlaceHoldersService {

  constructor() { }
  firstname = 'Ej. Adriana'
  secondname = 'Ej. Carolina'
  thirdname = 'Ej. Fernanda'
  lastname1 = 'Ej. Hernandez'
  lastname2 = 'Ej. Monterroza'
  lastname3 = 'Ej. Garcia'


  //DEEDNUMBER
  deedNumber = '43,807 CUARENTA Y TRES MIL OCHOCIENTOS SIETE.'
  actNumber = '03308'
  notarysName = 'Ej. Adriana Carolina Hernandez'


  //CONDITION SHEET FORM
  conditionSheetNumber = '00G503'
  placeAndDate = `Guatemala ${moment(new Date()).format('MMMM Do YYYY, h:mm:ss a')}`
  requiredAmount = 'Ej. 10,000.00'
  warrantyDays = 'Ej. 30'
  amount = 'Ej. 10,000.00'

  //MyProfile
  nit = 'Ej. 0123456789k'
  dpi = "1234567890123"
  email = "andrea@gmail.com"
  address = "Ej. 8va. calle 35-40 zona 4"
  phone = "Ej. 77586789"

  businessName = 'Ej. Empresa S.A'
  commercialName = 'Ej. Comercio S.A'
  fullname = 'Ej. Adriana Carolina Hernandez'
  position = 'Ej. Gerente'
  nationality = 'Ej. Guatemala'
  percentage = 'Ej. 55'
  workingtime = 'Ej. 5'
  year = 'Ej. 3'
  maritalStatus = 'Casado/Casada'
  profession = 'Doctor'
  branchofficecode='003'
}

