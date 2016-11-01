import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { BoxService } from "../services/box.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-box-home',
    template: ``
})
export class BoxHomeComponent implements OnDestroy {
    subscription: Subscription;
    readySubscription: Subscription;

    constructor(private router: Router, private route: ActivatedRoute, boxService: BoxService) {
        this.readySubscription = boxService.foldersFound.subscribe(
            (data: any) => router.navigate(['deal'])
        );

        let values = window.location.href.split('/?');
        let redirectUrl = values[0];

        let code = this.route.snapshot.queryParams['code'];

        this.subscription = boxService.getToken(code, redirectUrl).subscribe(
            (data: any) => {
                boxService.setAccessToken(data.access_token);
                boxService.findFolders();
            },
            (error: any) => {
                console.log(error)
            }
        );
    }

    ngOnDestroy() {
        this.readySubscription.unsubscribe();
        this.subscription.unsubscribe();
    }
}
