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
import { BoxService } from "./services/box.service";
import { Box } from "./box/box";
import { Dealdata } from "./models/dealdata";
import { DealAddingComponent } from './deal/deal-adding.component';

@NgModule({
  declarations: [
    AppComponent,
    DealComponent,
    DealCompleteComponent,
    BoxHomeComponent,
    DealAddingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    routing
  ],
  providers: [DealService,BoxService, Box, Dealdata],
  bootstrap: [AppComponent]
})
export class AppModule {
}
