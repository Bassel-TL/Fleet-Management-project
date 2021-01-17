import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Request } from '../domains/Request';

@Injectable()
export class RequestService {

    constructor(private http: HttpClient) { }

    private URL:string = "https://fleetmanagement-srv-unexpected-possum-sr.cfapps.eu10.hana.ondemand.com/admin";
    private postURL:string = "https://fleetmanagement-srv-unexpected-possum-sr.cfapps.eu10.hana.ondemand.com/add";

    getAllRequests() {
        return this.http.get<any>(this.URL + '/Requests')
            .toPromise()
            .then(res => res)
            .then(data => { return <Request[]>data.value; });
    }

    getRequestById(id:number){
        return this.http.get<any>(this.URL + '/Requests('+id.toString()+')')
        .toPromise()
        .then(res => res)
        .then(data => { return data.value; });
    }

    updateRequest(request:Request){
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.put<any>(this.URL + '/Requests('+request.ID.toString()+')', JSON.stringify(request), {headers})
        .toPromise()
        .then(res => res)
        .then(data => { return data.value; });
    }

    addRequest(request:Request){
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.post<any>(this.postURL + '/Requests', JSON.stringify(request), {headers})
        .toPromise()
        .then(res => res)
        .then(data => { return data.value; });
    }

}