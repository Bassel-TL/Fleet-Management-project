import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chitchat } from '../domains/Chitchat';

@Injectable()
export class ChitchatService {

    constructor(private http: HttpClient) { }

    private URL:string = "https://fleetmanagement-srv-unexpected-possum-sr.cfapps.eu10.hana.ondemand.com/admin";
    private postURL:string = "https://fleetmanagement-srv-unexpected-possum-sr.cfapps.eu10.hana.ondemand.com/add";

    getAllChitchat() {
        return this.http.get<any>(this.URL + '/Chitchat')
            .toPromise()
            .then(res => res)
            .then(data => { return <Chitchat[]>data.value; });
    }

    getChitchatById(id:number){
        return this.http.get<any>(this.URL + '/Chitchat('+id.toString()+')')
        .toPromise()
        .then(res => res)
        .then(data => { return data.value; });
    }

    updateChitchat(chitchat:Chitchat){
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.put<any>(this.URL + '/Chitchat('+chitchat.ID.toString()+')', JSON.stringify(chitchat), {headers})
        .toPromise()
        .then(res => res)
        .then(data => { return data.value; });
    }

    addChitchat(chitchat:Chitchat){
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.post<any>(this.postURL + '/Chitchat', JSON.stringify(chitchat), {headers})
        .toPromise()
        .then(res => res)
        .then(data => { return data.value; });
    }

}