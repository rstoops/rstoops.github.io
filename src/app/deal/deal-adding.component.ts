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
    private subscripeCreateFolder: Subscription;
    private subscripeCopyFolder: Subscription;
    private subscripeCopyFolders: Subscription;

    constructor(private dealData: Dealdata, private box: Box, private boxService: BoxService, private router: Router) {
    }

    copyFolders(dealId) {
        this.subscripeCopyFolders = this.boxService.getDealFolders(this.dealData.templateFolderId)
            .subscribe((data: any) => {
                    for (let i = 0 ; i < data.total_count ; i++) {
                        this.copyFolder(dealId, data.entries[i].id);
                    }

                    this.router.navigate(['/deal-added']);
                }
            );

    }

    copyFolder(targetId: string, sourceId: string) {
        this.subscripeCopyFolder = this.boxService.copyToFolder(targetId, sourceId)
            .subscribe();
    }

    ngOnInit() {
        this.subscripeCreateFolder = this.boxService.createFolder(this.dealData.dealName, this.box.folderDealsId).subscribe(
            (data: any) => {
                if (this.dealData.addAsFavorite) {
                    this.boxService.addToFavorites(data.id);
                }
                this.copyFolders(data.id);
            }
        )
    }

    ngOnDestroy() {
        this.subscripeCreateFolder.unsubscribe();
        this.subscripeCopyFolder.unsubscribe();
        this.subscripeCopyFolders.unsubscribe();
    }

}
