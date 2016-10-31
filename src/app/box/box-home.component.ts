import { Component } from '@angular/core';
import { Box } from "./box";

@Component({
    selector: 'app-box-home',
    template: `
      `,
    styles: []
})
export class BoxHomeComponent {

    constructor(private box: Box) {
        window.location.href = box.getTokenUrl();
    }

}
