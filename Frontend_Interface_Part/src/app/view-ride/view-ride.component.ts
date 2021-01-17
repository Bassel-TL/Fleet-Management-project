import { Component, OnInit } from '@angular/core';
import { City } from 'app/domains/City';
import { Luggage } from 'app/domains/Luggage';
import { Ride } from 'app/domains/Ride';
import { RideTable } from 'app/domains/RideTable';
import { CityService } from 'app/services/city.service';
import { LuggageService } from 'app/services/luggage.service';
import { RideService } from 'app/services/ride.service';

@Component({
  selector: 'app-view-ride',
  templateUrl: './view-ride.component.html',
  styleUrls: ['./view-ride.component.css']
})
export class ViewRideComponent implements OnInit {


  rides:RideTable[];
  selectedRides: RideTable[];
  dbRides:Ride[];
  dbCities:City[];
  dbLuggage:Luggage[];

  selectedRideToView:Ride;

  rideDialog: boolean;

  constructor(private rideService:RideService, private cityService:CityService, 
    private luggageService:LuggageService) { }

  ngOnInit(): void {
    this.rideDialog = false;
    this.rides = [];
    this.rideService.getAllRides().then(data => {
      this.dbRides = data;
      this.cityService.getAllCities().then(data => {
        this.dbCities = data;
        this.luggageService.getAllLuggages().then(data =>{
          this.dbLuggage = data;        
          var _this = this;
          this.dbRides.forEach(function(ride){
              _this.pushRide(ride);
          });
        });

      });

    });
  }

  pushRide(dbRide:Ride){
    var ride:RideTable = new RideTable();
    ride.ID = dbRide.ID;
    ride.cancel_reason = dbRide.cancel_reason;
    ride.destination = this.getCity(dbRide.destination_ID);
    ride.luggage = this.getLuggage(dbRide.luggage_ID);
    ride.meeting_point = dbRide.meeting_point;
    ride.ride_date = dbRide.ride_date;
    ride.ride_fee = dbRide.ride_fee;
    ride.ride_status = dbRide.ride_status;
    ride.ride_time = dbRide.ride_time;
    ride.seats_available = dbRide.seats_available;
    ride.seats_booked = dbRide.seats_booked;
    ride.source = this.getCity(dbRide.source_ID);
    ride.vehicle_color = dbRide.vehicle_color;
    ride.vehicle_model = dbRide.vehicle_model;
    ride.vehicle_number = dbRide.vehicle_number;
    this.rides.push(ride);
  }

  getCity(cityID:number):string{
    var cityRes:string = "";
    var _this = this;
    this.dbCities.forEach(function(city){
      if(city.ID === cityID)
      {
          cityRes = city.name;
      }
    });
    return cityRes;
  }

  getLuggage(luggageID:number):string{
    var luggageRes:string = "";
    var _this = this;
    this.dbLuggage.forEach(function(luggage){
      if(luggage.ID === luggageID)
      {
        luggageRes = luggage.description;
      }
    });
    return luggageRes;
  }

  editRideStatus(ride: RideTable) {
    ride.ride_status = "Complete"
    this.rides[this.getIndexOfRide(ride)] = ride;
    var newRide:Ride = this.dbRides[this.getIndexOfRide(ride)];
    newRide.ride_status = "Complete";
    this.rideService.updateRide(newRide).then(data => {
      console.log(data);
    });
  }

  deleteRide(ride: RideTable) {
    ride.ride_status = "Cancelled";
    this.rides[this.getIndexOfRide(ride)] = ride;
    var newRide:Ride = this.dbRides[this.getIndexOfRide(ride)];
    newRide.ride_status = "Cancelled";
    this.rideService.updateRide(newRide).then(data => {
      console.log(data);
    });
  }

  getIndexOfRide(ride: RideTable):number{
    var index:number = 0;
    var counter:number = 0;
    this.rides.forEach(function(rideElem){
      if(rideElem.ID === ride.ID){
        index = counter;
      }
      counter++;
    });
    return index;
  }

  viewRide(ride: RideTable){
    this.rideDialog = true;
    this.selectedRideToView = this.dbRides[this.getIndexOfRide(ride)];
    
  }

  hideRide(){
    this.rideDialog = false;
  }

}
