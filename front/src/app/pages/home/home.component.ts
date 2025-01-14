import { Component } from '@angular/core'

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  start(): void {
    alert('Commencez par lire le README et à vous de jouer !')
  }
}
