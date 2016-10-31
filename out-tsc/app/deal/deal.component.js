var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, ViewChild } from '@angular/core';
import { DealService } from "../services/deal.service";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { BoxService } from "../services/box.service";
import { Dealdata } from "../models/dealdata";
export var DealComponent = (function () {
    function DealComponent(dealService, boxService, formBulder, router, dealData) {
        this.dealService = dealService;
        this.boxService = boxService;
        this.formBulder = formBulder;
        this.router = router;
        this.dealData = dealData;
    }
    DealComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dealsSubscription = this.dealService.getDeals()
            .subscribe(function (data) {
            _this.existingDeals = data;
        });
        this.dealTypesSubscription = this.boxService.getDealTypes()
            .subscribe(function (data) {
            _this.dealTypes = data.item_collection.entries;
        });
        this.analystsSubscription = this.dealService.getAnalysts()
            .subscribe(function (data) {
            _this.analysts = data;
        });
        this.dealForm = this.formBulder.group({
            newDealName: [''],
            dealName: [''],
            dealType: [''],
            leadAnalyst: [''],
            analystFavorite: [false]
        });
    };
    DealComponent.prototype.ngOnDestroy = function () {
        this.dealsSubscription.unsubscribe();
        this.dealTypesSubscription.unsubscribe();
        this.analystsSubscription.unsubscribe();
    };
    DealComponent.prototype.isValid = function () {
        var invalid = true;
        if (this.leadAnalyst.nativeElement['selectedIndex'] > 0) {
            if (this.dealName.nativeElement['selectedIndex'] > 0) {
                invalid = false;
            }
            else if (this.dealType.nativeElement['selectedIndex'] > 0) {
                invalid = this.dealForm.controls['newDealName'].value.length == 0;
            }
        }
        return invalid;
    };
    DealComponent.prototype.onSubmit = function () {
        if (this.dealForm.controls['newDealName'].value.length != 0) {
            this.dealData.dealName = this.dealForm.controls['newDealName'].value;
            this.dealData.templateFolderId = this.dealType.nativeElement['value'];
        }
        else {
            var index = this.dealName.nativeElement['selectedIndex'] - 1;
            this.dealData.dealName = this.existingDeals[index].name;
            this.dealData.templateFolderId = this.lookupByDealType(this.existingDeals[index].dealType);
        }
        this.dealData.addAsFavorite = this.analystFavorite.nativeElement['checked'];
        this.router.navigate(['/deal-creating']);
    };
    DealComponent.prototype.lookupByDealType = function (dealType) {
        for (var i = 0; i < this.dealTypes.length; i++) {
            if (this.dealTypes[i].name === dealType) {
                return this.dealTypes[i].id;
            }
        }
        return null;
    };
    DealComponent.prototype.pickExistingDeal = function (value) {
        if (value.length != 0) {
            this.dealType.nativeElement['selectedIndex'] = 0;
            this.dealForm.controls['newDealName'].reset('');
        }
        this.isValid();
    };
    DealComponent.prototype.valueChanged = function (value) {
        if (value.length != 0) {
            this.dealName.nativeElement['selectedIndex'] = 0;
        }
        this.isValid();
    };
    __decorate([
        ViewChild("dealName"), 
        __metadata('design:type', ElementRef)
    ], DealComponent.prototype, "dealName", void 0);
    __decorate([
        ViewChild("newDealName"), 
        __metadata('design:type', ElementRef)
    ], DealComponent.prototype, "newDealName", void 0);
    __decorate([
        ViewChild("dealType"), 
        __metadata('design:type', ElementRef)
    ], DealComponent.prototype, "dealType", void 0);
    __decorate([
        ViewChild("leadAnalyst"), 
        __metadata('design:type', ElementRef)
    ], DealComponent.prototype, "leadAnalyst", void 0);
    __decorate([
        ViewChild("analystFavorite"), 
        __metadata('design:type', ElementRef)
    ], DealComponent.prototype, "analystFavorite", void 0);
    DealComponent = __decorate([
        Component({
            selector: 'app-deal',
            templateUrl: './deal.component.html',
            styleUrls: ['./deal.component.css']
        }), 
        __metadata('design:paramtypes', [DealService, BoxService, FormBuilder, Router, Dealdata])
    ], DealComponent);
    return DealComponent;
}());
//# sourceMappingURL=C:/development/projects/MSI/box-deal/src/app/deal/deal.component.js.map