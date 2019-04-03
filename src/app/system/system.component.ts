import { Component } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html'
})
export class SystemComponent {

  constructor(private title: Title) {
    title.setTitle('System');
  }
}
