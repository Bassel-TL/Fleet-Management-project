namespace sap.capire.fleetmanagement;
using { managed, cuid } from '@sap/cds/common';

entity Requests : managed {
  key ID   : Integer;
  requester : Association to Member;
  ride    :  Association to Ride;
  status    : String(111);
  approval  : String(111);
  refund    : Integer;  //  @readonly;
}

entity EnRouteCities : managed {
  key ID   : Integer;
  city   : Association to Cities;
  ride    : Association to Ride;
  requester    : Association to Member;
}

entity Cities : managed {
  key ID   : Integer;
  name     : String(111);
  descr    : String(1111);
  status     : String(111);
  weather     : String(111);
  enRouteCities    : Association to many EnRouteCities on enRouteCities.city = $self;
  source_rides : Association to many Ride on source_rides.source = $self;
  dest_rides : Association to many Ride on dest_rides.destination = $self;
}

entity Member : managed {
  key ID   : Integer;
  first_name  : String;
  last_name  : String;
  gender  : String;
  credit : Integer;
  birthdate : String;
  role_n : String;
  password_n: String;
  traveler_requests: Association to many Requests on traveler_requests.requester = $self;
  rides : Association to many Ride on rides.driver = $self;
  driver_reviews: Association to many Review on driver_reviews.driver = $self;
  travleler_reviews: Association to many Review on travleler_reviews.traveler = $self;
  enRouteCities: Association to many EnRouteCities on enRouteCities.requester = $self;
}

entity Chitchat: managed  {
  key ID   : Integer;
  description  : String;
}
entity Music : managed {
  key ID   : Integer;
  description  : String;
}

entity Luggage : managed {
  key ID   : Integer;
  description  : String;
  rides : Association to many Ride on rides.luggage = $self;
}
entity Ride : managed {
  key ID   : Integer;
  driver: Association to Member;
  source: Association to Cities;
  destination: Association to Cities;
  luggage : Association to Luggage;
  traveler_requests: Association to many Requests on traveler_requests.ride = $self;
  enroute_cities : Association to many Requests on enroute_cities.ride = $self;

  ride_date: String(111);
  ride_time: String(111);
  seats_available: Integer;
  ride_status: String(50);
  ride_fee: Integer;
  seats_booked: Integer;
  meeting_point: String(500);
  cancel_reason: String(500);
  vehicle_model: String(100);
  vehicle_number: String(100);
  vehicle_color: String(100);
}

entity Review : managed {
  key ID   : Integer;
  traveler: Association to Member;
  driver: Association to Member;
  score : Integer;
  description  : String(500);
}