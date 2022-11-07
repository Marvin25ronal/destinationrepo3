import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.css']
})
export class MultiselectComponent implements OnInit {
  dropdownList = [];
  cities = [];
  selectedItems = [];
  singleselectedItems = [];
  dropdownSettings = {};
  singledropdownSettings = {};
  closeDropdownSelection = false;
  ngOnInit() {
    
    this.dropdownList = [
      { item_id: 1, item_text: 'Administrador' },
      { item_id: 2, item_text: 'Auditor' },
      { item_id: 3, item_text: 'Colaborador' },
      { item_id: 4, item_text: 'Contador' },
      { item_id: 5, item_text: 'Gerencia' }
    ];
    this.cities = ['Mumbai', 'New Delhi', 'Bangaluru', 'Pune', 'Navsari'];
    this.selectedItems = [
    ];
    this.singleselectedItems = ['Pune'];
    this.singledropdownSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownSelection
    };
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'rol_id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3
      /* allowSearchFilter: true */
    };
  }
  onItemSelect(item: any) {
    
  }
  onSelectAll(items: any) {
 
  }
}
