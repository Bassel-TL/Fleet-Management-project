import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Music } from '../domains/Music';

@Injectable()
export class MusicService {

    constructor(private http: HttpClient) { }

    private URL:string = "https://fleetmanagement-srv-unexpected-possum-sr.cfapps.eu10.hana.ondemand.com/admin";
    private postURL:string = "https://fleetmanagement-srv-unexpected-possum-sr.cfapps.eu10.hana.ondemand.com/add";

    getAllMusics() {
        return this.http.get<any>(this.URL + '/Music')
            .toPromise()
            .then(res => res)
            .then(data => { return <Music[]>data.value; });
    }

    getMusicById(id:number){
        return this.http.get<any>(this.URL + '/Music('+id.toString()+')')
        .toPromise()
        .then(res => res)
        .then(data => { return data.value; });
    }

    updateMusic(music:Music){
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.put<any>(this.URL + '/Music('+music.ID.toString()+')', JSON.stringify(music), {headers})
        .toPromise()
        .then(res => res)
        .then(data => { return data.value; });
    }

    addMusic(music:Music){
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.post<any>(this.postURL + '/Music', JSON.stringify(music), {headers})
        .toPromise()
        .then(res => res)
        .then(data => { return data.value; });
    }

}