var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { BoxService } from "../services/box.service";
export var BoxTokenComponent = (function () {
    function BoxTokenComponent(router, route, boxService) {
        this.router = router;
        this.route = route;
        this.readySubscription = boxService.foldersFound.subscribe(function (data) { return router.navigate(['/deal']); });
        var code = this.route.snapshot.queryParams['code'];
        this.subscription = boxService.getToken(code).subscribe(function (data) {
            boxService.setAccessToken(data.access_token);
            boxService.findFolders();
        }, function (error) {
            console.log(error);
        });
    }
    BoxTokenComponent.prototype.ngOnDestroy = function () {
        this.readySubscription.unsubscribe();
        this.subscription.unsubscribe();
    };
    BoxTokenComponent = __decorate([
        Component({
            selector: 'app-box-token',
            template: "",
            styles: []
        }), 
        __metadata('design:paramtypes', [Router, ActivatedRoute, BoxService])
    ], BoxTokenComponent);
    return BoxTokenComponent;
}());
//# sourceMappingURL=C:/development/projects/MSI/box-deal/src/app/box/box-token.component.js.map