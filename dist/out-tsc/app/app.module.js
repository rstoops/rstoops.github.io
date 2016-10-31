var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { DealComponent } from './deal/deal.component';
import { DealService } from "./services/deal.service";
import { routing } from "./app.routing";
import { DealCompleteComponent } from './deal/deal-complete.component';
import { BoxHomeComponent } from './box/box-home.component';
import { BoxTokenComponent } from './box/box-token.component';
import { BoxService } from "./services/box.service";
import { Box } from "./box/box";
import { Dealdata } from "./models/dealdata";
import { DealAddingComponent } from './deal/deal-adding.component';
export var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                AppComponent,
                DealComponent,
                DealCompleteComponent,
                BoxTokenComponent,
                BoxHomeComponent,
                BoxTokenComponent,
                DealAddingComponent
            ],
            imports: [
                BrowserModule,
                FormsModule,
                HttpModule,
                ReactiveFormsModule,
                routing
            ],
            providers: [DealService, BoxService, Box, Dealdata],
            bootstrap: [AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=C:/development/projects/MSI/box-deal/src/app/app.module.js.map