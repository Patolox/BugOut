import { Component } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BugOut-Frontend';
  showFiller = false;
  mode: MatDrawerMode = 'over';


  MenuButton() {
    console.log('teste');
  }
}
