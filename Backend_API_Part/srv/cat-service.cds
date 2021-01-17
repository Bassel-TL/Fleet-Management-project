using { sap.capire.fleetmanagement as my } from '../db/schema';
service CatalogService @(path:'/add') {

  // @readonly entity Requests as SELECT from my.Requests {*, owner.ID as owner }; //excluding { createdBy, modifiedBy }; 
  // @requires_: 'authenticated-user'
  @insertonly entity Cities as projection on my.Cities;
  @insertonly entity Member as projection on my.Member; 
  @insertonly entity Ride as projection on my.Ride;
  @insertonly entity Requests as projection on my.Requests;
  @insertonly entity EnRouteCities as projection on my.EnRouteCities;
  @insertonly entity Chitchat as projection on my.Chitchat;
  @insertonly entity Music as projection on my.Music;
  @insertonly entity Luggage as projection on my.Luggage;
  @insertonly entity Review as projection on my.Review;

}