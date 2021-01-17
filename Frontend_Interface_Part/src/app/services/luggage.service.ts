import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Luggage } from '../domains/Luggage';

@Injectable()
export class LuggageService {

    constructor(private http: HttpClient) { }

    private URL:string = "https://fleetmanagement-srv-unexpected-possum-sr.cfapps.eu10.hana.ondemand.com/admin";
    private postURL:string = "https://fleetmanagement-srv-unexpected-possum-sr.cfapps.eu10.hana.ondemand.com/add";

    getAllLuggages() {
        return this.http.get<any>(this.URL + '/Luggage')
            .toPromise()
            .then(res => res)
            .then(data => { return <Luggage[]>data.value; });
    }

    getLuggageById(id:number){
        return this.http.get<any>(this.URL + '/Luggage('+id.toString()+')')
        .toPromise()
        .then(res => res)
        .then(data => { return data.value; });
    }

    updateLuggage(luggage:Luggage){
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.put<any>(this.URL + '/Luggage('+luggage.ID.toString()+')', JSON.stringify(luggage), {headers})
        .toPromise()
        .then(res => res)
        .then(data => { return data.value; });
    }

    addLuggage(luggage:Luggage){
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.post<any>(this.postURL + '/Luggage', JSON.stringify(luggage), {headers})
        .toPromise()
        .then(res => res)
        .then(data => { return data.value; });
    }

}