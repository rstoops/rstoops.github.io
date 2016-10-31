import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { DealService } from "../services/deal.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { JsonData } from "../models/jsondata";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { BoxService } from "../services/box.service";
import { Boxdata } from "../models/boxdata";
import { Dealdata } from "../models/dealdata";
import { Existingdealdata } from "../models/existingdealdata";

@Component({
    selector: 'app-deal',
    templateUrl: './deal.component.html',
    styleUrls: ['./deal.component.css']
})
export class DealComponent implements OnInit, OnDestroy {
    @ViewChild("dealName") dealName: ElementRef;
    @ViewChild("newDealName") newDealName: ElementRef;
    @ViewChild("dealType") dealType: ElementRef;
    @ViewChild("leadAnalyst") leadAnalyst: ElementRef;
    @ViewChild("analystFavorite") analystFavorite: ElementRef;

    private dealsSubscription: Subscription;
    private dealTypesSubscription: Subscription;
    private analystsSubscription: Subscription;

    dealForm: FormGroup;
    existingDeals: Existingdealdata[];
    dealTypes: Boxdata[];
    analysts: JsonData[];

    constructor(private dealService: DealService, private boxService: BoxService,
                private formBulder: FormBuilder, private router: Router,
                private dealData: Dealdata) {
    }

    ngOnInit() {
        this.dealsSubscription = this.dealService.getDeals()
            .subscribe((data: Existingdealdata[]) => {
                 this.existingDeals = data;
            });

        this.dealTypesSubscription = this.boxService.getDealTypes()
            .subscribe((data: any) => {
                this.dealTypes = data.item_collection.entries;
            });

        this.analystsSubscription = this.dealService.getAnalysts()
            .subscribe((data: JsonData[]) => {
                this.analysts = data;
            });

        this.dealForm = this.formBulder.group(
            {
                newDealName: [''],
                dealName: [''],
                dealType: [''],
                leadAnalyst: [''],
                analystFavorite: [false]
            }
        );
    }

    ngOnDestroy() {
        this.dealsSubscription.unsubscribe();
        this.dealTypesSubscription.unsubscribe();
        this.analystsSubscription.unsubscribe();
    }

    isValid() {
        let invalid = true;

        if (this.leadAnalyst.nativeElement['selectedIndex'] > 0) {
            if (this.dealName.nativeElement['selectedIndex'] > 0) {
                invalid = false;
            } else if (this.dealType.nativeElement['selectedIndex'] > 0) {
                invalid = this.dealForm.controls['newDealName'].value.length == 0;
            }
        }

        return invalid;
    }

    onSubmit() {
        if (this.dealForm.controls['newDealName'].value.length != 0) {
            this.dealData.dealName = this.dealForm.controls['newDealName'].value;
            this.dealData.templateFolderId = this.dealType.nativeElement['value'];
        } else {
            let index = this.dealName.nativeElement['selectedIndex']-1;
            this.dealData.dealName = this.existingDeals[index].name;
            this.dealData.templateFolderId = this.lookupByDealType(this.existingDeals[index].dealType);
        }

        this.dealData.addAsFavorite = this.analystFavorite.nativeElement['checked'];
        this.router.navigate(['/deal-creating']);
    }

    lookupByDealType(dealType: string) : string {
        for(let i=0;i<this.dealTypes.length;i++) {
            if (this.dealTypes[i].name === dealType) {
                return this.dealTypes[i].id;
            }
        }

        return null;
    }

    pickExistingDeal(value: string) {
        if (value.length != 0) {
            this.dealType.nativeElement['selectedIndex'] = 0;
            this.dealForm.controls['newDealName'].reset('');
        }

        this.isValid();
    }

    valueChanged(value: string) {
        if (value.length != 0) {
            this.dealName.nativeElement['selectedIndex'] = 0;
        }

        this.isValid();
    }

}
