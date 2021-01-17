import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnRouteCity } from '../domains/EnRouteCity';

@Injectable()
export class EnRouteCityService {

    constructor(private http: HttpClient) { }

    private URL:string = "https://fleetmanagement-srv-unexpected-possum-sr.cfapps.eu10.hana.ondemand.com/admin";
    private postURL:string = "https://fleetmanagement-srv-unexpected-possum-sr.cfapps.eu10.hana.ondemand.com/add";

    getAllEnRouteCities() {
        return this.http.get<any>(this.URL + '/EnRouteCities')
            .toPromise()
            .then(res => res)
            .then(data => { return <EnRouteCity[]>data.value; });
    }

    getEnRouteCityById(id:number){
        return this.http.get<any>(this.URL + '/EnRouteCities('+id.toString()+')')
        .toPromise()
        .then(res => res)
        .then(data => { return data.value; });
    }

    updateEnRouteCity(city:EnRouteCity){
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.put<any>(this.URL + '/EnRouteCities('+city.ID.toString()+')', JSON.stringify(city), {headers})
        .toPromise()
        .then(res => res)
        .then(data => { return data.value; });
    }

    addEnRouteCity(city:EnRouteCity){
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.post<any>(this.postURL + '/EnRouteCities', JSON.stringify(city), {headers})
        .toPromise()
        .then(res => res)
        .then(data => { return data.value; });
    }

}