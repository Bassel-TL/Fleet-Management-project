import { Component, OnInit } from '@angular/core';
import { City } from 'app/domains/City';
import { Ride } from 'app/domains/Ride';
import { User } from 'app/domains/User';
import { CityService } from 'app/services/city.service';
import { LocalStorageService } from 'app/services/localStorageService';
import { RequestService } from 'app/services/request.service';
import { RideService } from 'app/services/ride.service';
import { UserService } from 'app/services/user.service';
import { Request } from '../domains/Request';
import {DialogModule} from 'primeng/dialog';
import { RideExten } from 'app/domains/RideExten';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-request-ride',
  templateUrl: './request-ride.component.html',
  styleUrls: ['./request-ride.component.css'],
  providers: [MessageService,ConfirmationService]

})
export class RequestRideComponent implements OnInit {
  display: boolean = false;

  rides: Ride[]= [];
  ridesExten : RideExten[] = [];
  rideExten : RideExten = null;
  rideExtenS : RideExten = null;
  selectedRide: Ride = null;
  usr : User = null;
  req:Request = new Request();
  city : City = null;
  cites : City [] = [];
  constructor(private rideService: RideService,private requestService : RequestService, 
    private localStorage: LocalStorageService, private userService : UserService, 
    private cityService : CityService, private messageService: MessageService) { }

  async ngOnInit(): Promise<void> {
    this.rides = await this.rideService.getAllRides();
    this.cites = await this.cityService.getAllCities();
    for (let i = 0; i < this.rides.length; i++) {
      this.rideExten = new RideExten();
      this.city  = this.cites.filter(x => x.ID === (this.rides[i].source_ID))[0];
      this.rideExten.ID = this.rides[i].ID;
      this.rideExten.cancel_reason= this.rides[i].cancel_reason;
      this.rideExten.destination_ID= this.rides[i].destination_ID;
      this.rideExten.driver_ID= this.rides[i].driver_ID;
      this.rideExten.luggage_ID= this.rides[i].luggage_ID;
      this.rideExten.meeting_point= this.rides[i].meeting_point;
      this.rideExten.ride_date= this.rides[i].ride_date;
      this.rideExten.ride_fee= this.rides[i].ride_fee;
      this.rideExten.ride_status= this.rides[i].ride_status;
      this.rideExten.ride_time= this.rides[i].ride_time;
      this.rideExten.seats_available= this.rides[i].seats_available;
      this.rideExten.seats_booked= this.rides[i].seats_booked;
      this.rideExten.source_name= this.city.name;
      this.rideExten.vehicle_color= this.rides[i].vehicle_color;
      this.rideExten.vehicle_model= this.rides[i].vehicle_model;
      this.rideExten.vehicle_number= this.rides[i].vehicle_number;
      this.ridesExten[i] = this.rideExten;
    }
    this.usr = this.localStorage.getFromLocalStorage();

  }

  add(rideId:number){
    this.req.ride_ID = rideId;
    this.req.ID = Math.floor((Math.random() * 100000) + 1);
    this.req.requester_ID = this.usr.ID;
    this.selectedRide = this.rides.filter(x => x.ID === rideId)[0];
    this.rideExtenS = this.ridesExten.filter(x => x.ID === rideId)[0];
    this.req.status = "requested";
    if(this.usr.credit > this.selectedRide.ride_fee){
    this.requestService.addRequest(this.req);
    this.selectedRide.seats_booked += 1;
    this.rideExtenS.seats_booked += 1;
    this.usr.credit -= this.selectedRide.ride_fee;
    this.rideService.updateRide(this.selectedRide);
    this.userService.updateUser(this.usr);
    console.log("charged");
    this.messageService.add({severity:'success', summary: 'Successful', detail: 'Registered', life: 3000});
    }else{
      console.log("mafi m9ariiii");
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Unable to register', life: 3000});
      //this.showDialog();
    }

  }
  showDialog() {
    this.display = true;
}

}
