import { Component, OnInit } from '@angular/core';
import { City } from 'app/domains/City';
import { Luggage } from 'app/domains/Luggage';
import { Ride } from 'app/domains/Ride';
import { CityService } from 'app/services/city.service';
import { LocalStorageService } from 'app/services/localStorageService';
import { LuggageService } from 'app/services/luggage.service';
import { RideService } from 'app/services/ride.service';
import { ConfirmationService, MessageService } from 'primeng/api';

interface CityDropdown {
  name: string,
  code: string
}

interface LuggageDropdown {
  name: string,
  code: string
}

@Component({
  selector: 'app-new-ride',
  templateUrl: './new-ride.component.html',
  styleUrls: ['./new-ride.component.css'],
  providers: [MessageService,ConfirmationService]
})



export class NewRideComponent implements OnInit {

  constructor(private cityService:CityService, private luggageService:LuggageService, 
    private storage:LocalStorageService, private rideService:RideService, private messageService: MessageService,) { }

  newRide:Ride;
  selectedCityS:CityDropdown;
  selectedCityD:CityDropdown;
  selectedLuggage:LuggageDropdown;
  cities:CityDropdown[];
  dbCities:City[];
  luggages:LuggageDropdown[];
  dbLuggages:Luggage[];


  ngOnInit(): void {
    this.newRide = new Ride();
    this.cities = [];
    this.luggages = [];
    this.cityService.getAllCities().then(data => {
        this.dbCities = data;
        var _this = this;
        this.dbCities.forEach(function(city){
          _this.cities.push({name: city.name, code: city.ID.toString()})
        });
        this.luggageService.getAllLuggages().then(data =>{
          this.dbLuggages = data;
          var _this = this;
          this.dbLuggages.forEach(function(luggage){
            _this.luggages.push({name: luggage.description, code: luggage.ID.toString()})
          });
        })
        
    });
  }

  submitRide(event){
    this.newRide.ride_status = "New";
    this.newRide.driver_ID = this.storage.getFromLocalStorage().ID;
    this.newRide.source_ID = parseInt(this.selectedCityS.code);
    this.newRide.destination_ID = parseInt(this.selectedCityD.code);
    this.newRide.luggage_ID = parseInt(this.selectedLuggage.code);
    this.newRide.ID = Math.floor(Math.random() * 1000000);
    this.newRide.cancel_reason = null;
    console.log(this.newRide);
    this.rideService.addRide(this.newRide).then(data => {
      console.log(data);
    });
    this.messageService.add({severity:'success', summary: 'Successful', detail: 'Ride Created', life: 3000});
  }

}
