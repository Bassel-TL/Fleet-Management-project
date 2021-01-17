using { sap.capire.fleetmanagement as my } from '../db/schema';
service AdminService @(_requires:'admin') {
  entity Member as projection on my.Member; 
  entity Ride as projection on my.Ride;
  entity Requests as projection on my.Requests;
  entity EnRouteCities as projection on my.EnRouteCities;
  entity Cities as projection on my.Cities;
  entity Chitchat as projection on my.Chitchat;
  entity Music as projection on my.Music;
  entity Luggage as projection on my.Luggage;
  entity Review as projection on my.Review;
  // entity Orders as select from my.Orders;
  // entity Orders as select from my.Orders;
}