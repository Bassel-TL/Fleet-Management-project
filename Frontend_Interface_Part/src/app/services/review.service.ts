import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '../domains/Review';

@Injectable()
export class ReviewService {

    constructor(private http: HttpClient) { }

    private URL:string = "https://fleetmanagement-srv-unexpected-possum-sr.cfapps.eu10.hana.ondemand.com/admin";
    private postURL:string = "https://fleetmanagement-srv-unexpected-possum-sr.cfapps.eu10.hana.ondemand.com/add";

    getAllReviews() {
        return this.http.get<any>(this.URL + '/Review')
            .toPromise()
            .then(res => res)
            .then(data => { return <Review[]>data.value; });
    }

    getReviewById(id:number){
        return this.http.get<any>(this.URL + '/Review('+id.toString()+')')
        .toPromise()
        .then(res => res)
        .then(data => { return data.value; });
    }

    updateReview(review:Review){
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.put<any>(this.URL + '/Review('+review.ID.toString()+')', JSON.stringify(review), {headers})
        .toPromise()
        .then(res => res)
        .then(data => { return data.value; });
    }

    addReview(review:Review){
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.post<any>(this.postURL + '/Review', JSON.stringify(review), {headers})
        .toPromise()
        .then(res => res)
        .then(data => { return data.value; });
    }

}