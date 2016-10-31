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
import { Router } from "@angular/router";
import { Dealdata } from "../models/dealdata";
import { BoxService } from "../services/box.service";
import { Box } from "../box/box";
export var DealAddingComponent = (function () {
    function DealAddingComponent(dealData, box, boxService, router) {
        this.dealData = dealData;
        this.box = box;
        this.boxService = boxService;
        this.router = router;
    }
    DealAddingComponent.prototype.copyFolders = function (dealId) {
        var _this = this;
        this.boxService.getDealFolders(this.dealData.templateFolderId)
            .subscribe(function (data) {
            for (var i = 0; i < data.total_count; i++) {
                _this.copyFolder(dealId, data.entries[i].id);
            }
            _this.router.navigate(['/deal-added']);
        });
    };
    DealAddingComponent.prototype.copyFolder = function (targetId, sourceId) {
        this.boxService.copyToFolder(targetId, sourceId)
            .subscribe();
    };
    DealAddingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscripeCreateFolder = this.boxService.createFolder(this.dealData.dealName, this.box.folderDealsId).subscribe(function (data) {
            if (_this.dealData.addAsFavorite) {
                _this.boxService.addToFavorites(data.id);
            }
            _this.copyFolders(data.id);
        });
    };
    DealAddingComponent.prototype.ngOnDestroy = function () {
        this.subscripeCreateFolder.unsubscribe();
    };
    DealAddingComponent = __decorate([
        Component({
            selector: 'app-deal-adding',
            templateUrl: './deal-adding.component.html',
            styleUrls: ['./deal.component.css']
        }), 
        __metadata('design:paramtypes', [Dealdata, Box, BoxService, Router])
    ], DealAddingComponent);
    return DealAddingComponent;
}());
//# sourceMappingURL=C:/development/projects/MSI/box-deal/src/app/deal/deal-adding.component.js.map