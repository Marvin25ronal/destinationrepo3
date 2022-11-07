import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatePasswordAuth0Service {
  rules = [
    {
      'rule': 'Mínimo 8 caracteres',
      'function': this.Size8String
    },
    {
      'rule': 'Mayúsculas y minúsculas',
      'function': this.hasLowerCaseOrHasUpperCase
    },
    {
      'rule': 'Números',
      'function': this.hasNumbers
    },
  ]
  extrarules = [
    {
      'rule': 'caracter especial',
      'function': this.hasCharacterSpecial
    },
    {
      'rule': 'Más de 10 caracteres',
      'function': this.Size10String
    }
  ]
  statusProgressBar = ''
  public checkrules = []
  checkExtraRules = []
  Size8String(str: string) {
    return str.length >= 8
  }
  Size10String(str: string) {
    return str.length >= 10
  }
  hasLowerCaseOrHasUpperCase(str) {
    return (/[a-z]/.test(str)) && (/[A-Z]/.test(str));
  }
  hasNumbers(str: string) {
    return (/\d/g.test(str))
  }
  hasCharacterSpecial(str) {
    return ((/[!@#$%^&*]/.test(str)))
  }
  checkPasswordRules(text) {
    //let strength=0;
    console.log(text)
    this.checkrules.forEach((item) => {
      const check = item.function(text)
      item.status = check
    })
    this.checkExtraRules.forEach((item) => {
      const check = item.function(text)
      item.status = check
    })


  }
  getProgress(label = null) {
    let strength = 0;
    this.checkrules.forEach((item) => {
      if (item.status) {
        strength++
      }
    })
    this.checkExtraRules.forEach((item) => {
      if (item.status) {
        strength++
      }
    })

    switch (strength) {
      case 1:
        this.statusProgressBar = 'Baja'
        return `${label ? 'color:red' : 'width: 10%; background: red'}`;
      case 2:
        this.statusProgressBar = 'Media'
        return `${label ? 'color:orange' : 'width: 30%; background: orange'}`;
      case 3:
        this.statusProgressBar = 'Buena'
        return `${label ? 'color: #b5e7a0' : 'width: 60%; background: #b5e7a0'}`;
      case 4:
        this.statusProgressBar = 'Muy buena'
        return `${label ? 'color: #77B453' : 'width: 80%; background: #77B453'}`;
      case 5:
        this.statusProgressBar = 'Excelente'
        return `${label ? 'color: #007B00' : 'width: 100%; background: #007B00'}`;
    }
    this.statusProgressBar=''
    return 'width:0%'
  }
  getRulesCorrect(){
    let strength = 0;
    this.checkrules.forEach((item) => {
      if (item.status) {
        strength++
      }
    })
    if(this.checkrules.length==strength){
      return true
    }
    return false
  }
  getNewRules(){
    this.checkrules = this.getRules()
  }
  getRules() {
    let r = this.rules.map((item) => ({
      status: false,
      rule: item.rule,
      function: item.function
    }))
    this.checkExtraRules = this.extrarules.map((item) => ({
      status: false,
      rule: item.rule,
      function: item.function
    }))
    return r;
  }
  constructor() { 
    this.checkrules = this.getRules()
  }
}
