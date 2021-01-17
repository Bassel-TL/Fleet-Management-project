
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../domains/User';

@Injectable()
export class UserService {

    constructor(private http: HttpClient) { }
    private URL:string = "https://fleetmanagement-srv-unexpected-possum-sr.cfapps.eu10.hana.ondemand.com/admin";
    private postURL:string = "https://fleetmanagement-srv-unexpected-possum-sr.cfapps.eu10.hana.ondemand.com/add";

    getAllUsers() {
        console.log("hello");
        return this.http.get<any>(this.URL + '/Member')
            .toPromise()
            .then(res => res)
            .then(data => { return data.value; });
    }

    getUserById(id:number){
        return this.http.get<any>(this.URL + '/Member('+id.toString()+')')
        .toPromise()
        .then(res => res)
        .then(data => { return data.value; });
    }

    updateUser(user:User){
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.put<any>(this.URL + '/Member('+user.ID.toString()+')', JSON.stringify(user), {headers})
        .toPromise()
        .then(res => res)
        .then(data => { return data.value; });
    }

    addUser(user:User){
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.post<any>(this.postURL + '/Member', JSON.stringify(user), {headers})
        .toPromise()
        .then(res => res)
        .then(data => { return data.value; });
    }

}