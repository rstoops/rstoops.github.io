import { Injectable } from '@angular/core';
import { Response, Http } from "@angular/http";
import "rxjs";

@Injectable()
export class DealService {
    constructor(private http: Http) {
    }

    getDeals() {
        return this.http.get("https://deals-box-36518.firebaseio.com/deals.json")
            .map((response: Response) => response.json());
    }

    getDealTypes() {
        return this.http.get("https://deals-box-36518.firebaseio.com/dealtypes.json")
            .map((response: Response) => response.json());
    }

    getAnalysts() {
        return this.http.get("https://deals-box-36518.firebaseio.com/analysts.json")
            .map((response: Response) => response.json());
    }

}
