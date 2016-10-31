var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Box } from "../box/box";
import "rxjs";
export var BoxService = (function () {
    function BoxService(http, box) {
        this.http = http;
        this.box = box;
        this.tokenUrl = 'https://api.box.com/oauth2/token';
        this.createFolderUrl = 'https://api.box.com/2.0/folders';
        this.getFolderItemsUrl = 'https://api.box.com/2.0/folders/{folderId}/items';
        this.copyToFolderUrl = 'https://api.box.com/2.0/folders/{srcId}/copy';
        this.getCollectionsUrl = 'https://api.box.com/2.0/collections';
        this.putCollectionUrl = 'https://api.box.com/2.0/folders/{folderId}';
        this.folderSearch = 'https://api.box.com/2.0/search?query={folderName}&type=folder';
        this.folderList = 'https://api.box.com/2.0/folders/{id}';
        this.foldersFound = new EventEmitter();
    }
    BoxService.prototype.getToken = function (code) {
        var headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        });
        var data = 'grant_type=authorization_code&code=' + code +
            '&client_id=' + this.box.getClientId() + '&client_secret=' +
            this.box.getClientSecret() + encodeURI(this.box.getRedirect());
        return this.http.post(this.tokenUrl, data, {
            headers: headers
        }).map(function (response) { return response.json(); });
    };
    BoxService.prototype.setAccessToken = function (token) {
        this.headers = new Headers({
            'Authorization': 'Bearer ' + token
        });
    };
    BoxService.prototype.findFolders = function () {
        var _this = this;
        var searchUrl = this.folderSearch.replace('{folderName}', encodeURIComponent(this.box.getDealTypesFolderName()));
        this.http.get(searchUrl, { headers: this.headers })
            .map(function (response) { return response.json(); })
            .subscribe(function (data) {
            _this.box.folderTemplateId = data.entries[0].id;
            _this.foldersFound.emit("found");
        });
        searchUrl = this.folderSearch.replace('{folderName}', encodeURIComponent(this.box.getDealsFolderName()));
        this.http.get(searchUrl, { headers: this.headers })
            .map(function (response) { return response.json(); })
            .subscribe(function (data) { return _this.box.folderDealsId = data.entries[0].id; });
    };
    BoxService.prototype.getDealTypes = function () {
        var searchUrl = this.folderList.replace('{id}', encodeURIComponent(this.box.folderTemplateId));
        return this.http.get(searchUrl, { headers: this.headers })
            .map(function (response) { return response.json(); });
    };
    BoxService.prototype.createFolder = function (name, parentId) {
        var data = {
            'name': name,
            'parent': { 'id': parentId }
        };
        return this.http.post(this.createFolderUrl, data, { headers: this.headers })
            .map(function (response) { return response.json(); });
    };
    BoxService.prototype.copyToFolder = function (targetId, srcId) {
        var url = this.copyToFolderUrl.replace('{srcId}', srcId);
        var data = {
            'parent': { 'id': targetId }
        };
        return this.http.post(url, data, { headers: this.headers })
            .map(function (response) { return response.json(); });
    };
    BoxService.prototype.getDealFolders = function (folderId) {
        var url = this.getFolderItemsUrl.replace('{folderId}', folderId);
        return this.http.get(url, { headers: this.headers })
            .map(function (response) { return response.json(); });
    };
    BoxService.prototype.addToFavorites = function (folderId) {
        var _this = this;
        this.http.get(this.getCollectionsUrl, { headers: this.headers })
            .map(function (response) { return response.json(); })
            .subscribe(function (data) {
            _this._addToFaviroites(data.entries[0].id, folderId);
        });
    };
    BoxService.prototype._addToFaviroites = function (favoritesId, folderId) {
        var url = this.putCollectionUrl.replace('{folderId}', folderId);
        var data = {
            'collections': [{ 'id': favoritesId }]
        };
        this.http.put(url, data, { headers: this.headers })
            .subscribe();
    };
    BoxService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Http, Box])
    ], BoxService);
    return BoxService;
}());
//# sourceMappingURL=C:/development/projects/MSI/box-deal/src/app/services/box.service.js.map