import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-deal-complete',
  templateUrl: './deal-complete.component.html',
  styleUrls: ['./deal.component.css']
})
export class DealCompleteComponent {

  constructor(private router: Router) { }

  onBack() {
      this.router.navigate(['deal']);
  }

}
