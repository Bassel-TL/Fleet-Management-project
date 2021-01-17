using { sap.capire.fleetmanagement as my } from '../db/schema';
service ReqService @(path:'/req') {

  // @readonly entity Requests as SELECT from my.Requests {*, owner.ID as first_name }; 
  @readonly entity Member as SELECT from  my.Member; 
  @readonly entity Ride as SELECT from my.Ride;
  @readonly entity EnRouteCities as SELECT from my.EnRouteCities;
  @readonly entity Cities as SELECT from my.Cities;
  @readonly entity Chitchat as SELECT from my.Chitchat;
  @readonly entity Music as SELECT from my.Music;
  @readonly entity Luggage as SELECT from my.Luggage;
  @readonly entity Review as SELECT from my.Review;

}