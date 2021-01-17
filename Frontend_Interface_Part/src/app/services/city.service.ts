import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { City } from "../domains/City";

@Injectable()
export class CityService {

    constructor(private http: HttpClient) { }

    private URL:string = "https://fleetmanagement-srv-unexpected-possum-sr.cfapps.eu10.hana.ondemand.com/admin";
    private postURL:string = "https://fleetmanagement-srv-unexpected-possum-sr.cfapps.eu10.hana.ondemand.com/add";

    getAllCities() {
        return this.http.get<any>(this.URL + '/Cities')
            .toPromise()
            .then(res => res)
            .then(data => { return data.value; });
    }

    getCityById(id:number){
        return this.http.get<any>(this.URL + '/Cities('+id.toString()+')')
        .toPromise()
        .then(res => res)
        .then(data => { return data.value; });
    }

    updateCity(city:City){
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.put<any>(this.URL + '/Cities('+city.ID.toString()+')', JSON.stringify(city), {headers})
        .toPromise()
        .then(res => res)
        .then(data => { return data.value; });
    }

    addCity(city:City){
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.post<any>(this.postURL + '/Cities', JSON.stringify(city), {headers})
        .toPromise()
        .then(res => res)
        .then(data => { return data.value; });
    }

}