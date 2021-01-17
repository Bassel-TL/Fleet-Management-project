import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ride } from '../domains/Ride';

@Injectable()
export class RideService {

    constructor(private http: HttpClient) { }

    private URL:string = "https://fleetmanagement-srv-unexpected-possum-sr.cfapps.eu10.hana.ondemand.com/admin";
    private postURL:string = "https://fleetmanagement-srv-unexpected-possum-sr.cfapps.eu10.hana.ondemand.com/add";

    getAllRides() {
        return this.http.get<any>(this.URL + '/Ride')
            .toPromise()
            .then(res => res)
            .then(data => { return <Ride[]>data.value; });
    }

    getRideById(id:number){
        return this.http.get<any>(this.URL + '/Ride('+id.toString()+')')
        .toPromise()
        .then(res => res)
        .then(data => { return data.value; });
    }

    updateRide(ride:Ride){
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.put<any>(this.URL + '/Ride('+ride.ID.toString()+')', JSON.stringify(ride),{headers})
        .toPromise()
        .then(res => res)
        .then(data => { return data.value; });
    }

    addRide(ride:Ride){
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.post<any>(this.postURL + '/Ride', JSON.stringify(ride),{headers})
        .toPromise()
        .then(res => res)
        .then(data => { return data.value; });
    }

}