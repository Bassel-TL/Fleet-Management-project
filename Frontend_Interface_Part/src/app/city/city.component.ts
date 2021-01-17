import { Component, OnInit } from '@angular/core';
import { City } from '../domains/City';
import { CityService } from '../services/city.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class CityComponent implements OnInit {
  selectedCity: City = null;

  cityDialog: boolean;

  cities: City[];

  city: City;

  selectedCities: City[];

  submitted: boolean;

  statuses: any[];


constructor(private cityService: CityService, private messageService: MessageService, private confirmationService: ConfirmationService) {​​ }​​

  ngOnInit() {

    this.statuses = [
        {label: 'Active', value: 'Active'},
        {label: 'Inactive', value: 'Inactive'}
    ];
    this.cityService.getAllCities().then(data => {
      this.cities = data;
    });
  }

    openNew() {
      this.city = {};
      this.submitted = false;
      this.cityDialog = true;
  }

  deleteSelectedCitys() {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete the selected cities?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.cities = this.cities.filter(val => !this.selectedCities.includes(val));
              this.selectedCities = null;
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Citys Deleted', life: 3000});
          }
      });
  }

  editCity(city: City) {
      this.city = {...city};
      this.cityDialog = true;
  }

  deleteCity(city: City) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + city.name + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.cities = this.cities.filter(val => val.ID !== city.ID);
              this.city = {};
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'City Deleted', life: 3000});
          }
      });
  }

  hideDialog() {
      this.cityDialog = false;
      this.submitted = false;
  }
  
  saveCity() {
      this.submitted = true;

      if (this.city.name.trim()) {
          if (this.city.ID) {
              this.cities[this.findIndexById(this.city.ID)] = this.city;
              this.cityService.updateCity(this.city);           
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'City Updated', life: 3000});
          }
          else {
              this.city.ID = this.createId();
              this.cities.push(this.city);
              this.cityService.addCity(this.city);  
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'City Created', life: 3000});
          }

          this.cities = [...this.cities];
          this.cityDialog = false;
          this.city = {};
      }
  }

  findIndexById(id:number): number {
      let index = -1;
      for (let i = 0; i < this.cities.length; i++) {
          if (this.cities[i].ID === id) {
              index = i;
              break;
          }
      }

      return index;
  }

  createId(): number {
    let max = 0;
    for ( var i = 0; i < this.cities.length; i++ ) {
       if(this.cities[i].ID > max)
       {
         max = this.cities[i].ID;
       }
    }
    return max+1;
  }
  ​​



}






 