import { Component, OnInit } from '@angular/core';
import { City } from 'app/domains/City';
import { Luggage } from 'app/domains/Luggage';
import { RequestUser } from 'app/domains/RequestUser';
import { Ride } from 'app/domains/Ride';
import { RideTable } from 'app/domains/RideTable';
import { Request } from 'app/domains/Request';
import { CityService } from 'app/services/city.service';
import { LuggageService } from 'app/services/luggage.service';
import { RequestService } from 'app/services/request.service';
import { RideService } from 'app/services/ride.service';
import { User } from 'app/domains/User';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.css']
})
export class ViewRequestComponent implements OnInit {

  rides:RideTable[];
  selectedRide: RideTable;
  dbRides:Ride[];
  dbCities:City[];
  dbLuggage:Luggage[];
  requests:RequestUser[];
  dbRequests:Request[];
  dbUsers:User[];

  constructor(private rideService:RideService, private cityService:CityService, 
    private luggageService:LuggageService, 
    private requestSrvice:RequestService, private userService:UserService) { }

  ngOnInit(): void {
    this.rides = [];
    this.requests = [];
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
          this.userService.getAllUsers().then(data =>{
            this.dbUsers = data;
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

  onRowSelect(event) {
    this.requestSrvice.getAllRequests().then(data => {
      this.dbRequests = data;
      var _this = this;
      this.dbRequests.forEach(function(request){
        //&& request.status === "requested"
          if(_this.selectedRide.ID === request.ride_ID){
              var requestCur:RequestUser = new RequestUser();
              var userCur:User = _this.getUserById(request.requester_ID);
              requestCur.ID = request.ID;
              requestCur.birthdate = userCur.birthdate;
              requestCur.credit = userCur.credit;
              requestCur.first_name = userCur.first_name;
              requestCur.gender = userCur.gender;
              requestCur.last_name = userCur.last_name;
              requestCur.requester_ID = userCur.ID;
              requestCur.ride_ID = request.ride_ID;
              requestCur.role_n = userCur.role_n;
              requestCur.status = request.status;
              _this.requests.push(requestCur);
          }
      });
    });   
  }

  getUserById(userId:number):User{
    var userVal:User;
    this.dbUsers.forEach(function(user){
      if(user.ID === userId){
        userVal = user;
      }
    });
    return userVal;
  }

  approveRequest(request:RequestUser){
    request.status = "approved"
    this.requests[this.getIndexOfRequest(request)] = request;
    var newRequest:Request = this.getRequestById(request.ID);
    newRequest.status = "approved";
    this.requestSrvice.updateRequest(newRequest).then(data => {
      console.log(data);
    });
  }

  rejectRequest(request:RequestUser){
    request.status = "rejected"
    this.requests[this.getIndexOfRequest(request)] = request;
    var newRequest:Request = this.getRequestById(request.ID);
    newRequest.status = "rejected";
    this.requestSrvice.updateRequest(newRequest).then(data => {
      console.log(data);
    });
    var newRide:Ride = this.getRideById(request.ride_ID);
    var newUser:User = this.getUserById(request.requester_ID);
    newUser.credit = newUser.credit + newRide.ride_fee;
    newRide.seats_booked = newRide.seats_booked - 1;
    this.rideService.updateRide(newRide).then(data => {
      console.log(data);
    });
    this.userService.updateUser(newUser).then(data => {
      console.log(data);
    });
  }

  getIndexOfRequest(request: RequestUser):number{
    var index:number = 0;
    var counter:number = 0;
    this.requests.forEach(function(requestElem){
      if(requestElem.requester_ID === request.requester_ID){
        index = counter;
      }
      counter++;
    });
    return index;
  }

  getRequestById(requestId:number):Request{
    var requestVal:Request;
    this.dbRequests.forEach(function(request){
      if(request.ID === requestId){
        requestVal = request;
      }
    });
    return requestVal;
  }

  getRideById(rideId:number):Ride{
    var rideVal:Ride;
    this.dbRides.forEach(function(ride){
      if(ride.ID === rideId){
        rideVal = ride;
      }
    });
    return rideVal;
  }

}
