import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { Dealdata } from "../models/dealdata";
import { BoxService } from "../services/box.service";
import { Subscription } from "rxjs";
import { Box } from "../box/box";

@Component({
    selector: 'app-deal-adding',
    templateUrl: './deal-adding.component.html',
    styleUrls: ['./deal.component.css']
})
export class DealAddingComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];

    constructor(private dealData: Dealdata, private box: Box, private boxService: BoxService, private router: Router) {
    }

    copyFolders(dealId) {
        this.subscriptions.push(this.boxService.getDealFolders(this.dealData.templateFolderId)
            .subscribe((data: any) => this.processFolders(dealId, data)));
    }

    processFolders(dealId, data) {
        let foldersCreated: number = 0;

        for (let i = 0 ; i < data.total_count ; i++) {
            this.subscriptions.push(this.boxService.copyToFolder(dealId, data.entries[i].id)
                .subscribe(
                    () => {
                        if (++foldersCreated === data.total_count) {
                            this.router.navigate(['/deal-added']);
                        }
                    }
                ));
        }
    }

    ngOnInit() {
        this.subscriptions.push(this.boxService.createFolder(this.dealData.dealName, this.box.folderDealsId).subscribe(
            (data: any) => {
                if (this.dealData.addAsFavorite) {
                    this.subscriptions.push(this.boxService.addToFavorites(data.id));
                }
                this.copyFolders(data.id);
            }
        ));
    }

    ngOnDestroy() {
        for (let subscription of this.subscriptions) {
            subscription.unsubscribe();
        }
    }

}
