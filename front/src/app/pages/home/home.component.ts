import { Component } from '@angular/core'
import { ButtonModule } from 'primeng/button'

@Component({
  selector: 'app-home',
  imports: [ButtonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  start(): void {
    alert('Commencez par lire le README et à vous de jouer !')
  }
}
