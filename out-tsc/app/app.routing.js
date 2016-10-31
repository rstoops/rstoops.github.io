import { RouterModule } from "@angular/router";
import { DealCompleteComponent } from "./deal/deal-complete.component";
import { BoxHomeComponent } from "./box/box-home.component";
import { BoxTokenComponent } from "./box/box-token.component";
import { DealComponent } from "./deal/deal.component";
import { DealAddingComponent } from "./deal/deal-adding.component";
var APP_ROUTES = [
    { path: '', component: BoxHomeComponent },
    { path: 'deal', component: DealComponent },
    { path: 'token', component: BoxTokenComponent },
    { path: 'deal-creating', component: DealAddingComponent },
    { path: 'deal-added', component: DealCompleteComponent }
];
export var routing = RouterModule.forRoot(APP_ROUTES);
//# sourceMappingURL=C:/development/projects/MSI/box-deal/src/app/app.routing.js.map