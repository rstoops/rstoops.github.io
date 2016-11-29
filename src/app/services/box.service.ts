import { Injectable, EventEmitter, OnDestroy } from '@angular/core';
import { Response, Http, Headers } from "@angular/http";
import { Box } from "../box/box";
import "rxjs";
import { Subscription } from "rxjs";

@Injectable()
export class BoxService implements OnDestroy {
    private headers: Headers;
    private tokenUrl: string = 'https://api.box.com/oauth2/token';
    private createFolderUrl: string = 'https://api.box.com/2.0/folders';
    private getFolderItemsUrl: string = 'https://api.box.com/2.0/folders/{folderId}/items';
    private copyToFolderUrl: string = 'https://api.box.com/2.0/folders/{srcId}/copy';
    private getCollectionsUrl: string = 'https://api.box.com/2.0/collections';
    private putCollectionUrl: string = 'https://api.box.com/2.0/folders/{folderId}';
    private folderSearch: string = 'https://api.box.com/2.0/search?query={folderName}&type=folder';
    private folderList: string = 'https://api.box.com/2.0/folders/{id}';

    private findFoldersSubscription: Subscription;
    private folderSearchSubscription: Subscription;

    foldersFound = new EventEmitter<any>();

    constructor(private http: Http, private box: Box) {
    }

    getToken(code: string, redirectUrl: string) {
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        });

        let data = 'grant_type=authorization_code&code=' + code +
            '&client_id=' + this.box.getClientId() + '&client_secret=' +
            this.box.getClientSecret() + "&redirect_uri=" + encodeURI(redirectUrl);

           return this.http.post(this.tokenUrl, data, {
                headers: headers
            }
        ).map((response: Response) => response.json());
    }

    setAccessToken(token: string) {
        this.headers = new Headers(
            {
                'Authorization': 'Bearer ' + token
            });
    }

    findFolders() {
        let searchUrl = this.folderSearch.replace('{folderName}', encodeURI(this.box.getDealTypesFolderName()));

        this.findFoldersSubscription = this.http.get(searchUrl, {headers: this.headers})
            .map((response: Response) => response.json())
            .subscribe(
                (data: any) => {
                    this.box.folderTemplateId = data.entries[0].id;
                    this.foldersFound.emit("found");
                }
            );

        searchUrl = this.folderSearch.replace('{folderName}', encodeURI(this.box.getDealsFolderName()));

        this.folderSearchSubscription = this.http.get(searchUrl, {headers: this.headers})
            .map((response: Response) => response.json())
            .subscribe(
                (data: any) => this.box.folderDealsId = data.entries[0].id
            );
    }

    getDealTypes() {
        let searchUrl = this.folderList.replace('{id}', encodeURI(this.box.folderTemplateId));
        return this.http.get(searchUrl, {headers: this.headers})
            .map((response: Response) => response.json());
    }

    createFolder(name: string, parentId: string) {
        let data = {
            'name': name,
            'parent': {'id': parentId}
        };

        return this.http.post(this.createFolderUrl, data, {headers: this.headers})
            .map((response: Response) => response.json());
    }

    copyToFolder(targetId: string, srcId: string) {
        let url = this.copyToFolderUrl.replace('{srcId}', srcId);

        let data = {
            'parent': {'id': targetId}
        };

        return this.http.post(url, data, {headers: this.headers})
            .map((response: Response) => response.json());
    }

    getDealFolders(folderId: string) {
        let url = this.getFolderItemsUrl.replace('{folderId}', folderId);
        return this.http.get(url, {headers: this.headers})
            .map((response: Response) => response.json());
    }

    addToFavorites(folderId: string) {
        return this.http.get(this.getCollectionsUrl, {headers: this.headers})
            .map((response: Response) => response.json())
            .subscribe((data: any) => {
                this._addToFavorites(data.entries[0].id, folderId);
            });
    }

    private _addToFavorites(favoritesId: string, folderId: string) {
        let url = this.putCollectionUrl.replace('{folderId}', folderId);
        let data = {
            'collections': [{'id': favoritesId}]
        };

        this.http.put(url, data, {headers: this.headers})
            .subscribe();
    }

    ngOnDestroy() {
        this.findFoldersSubscription.unsubscribe();
        this.folderSearchSubscription.unsubscribe();
    }
}
