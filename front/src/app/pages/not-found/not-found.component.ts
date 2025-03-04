import { Component } from '@angular/core'

import { NotFoundViewModel } from './not-found.viewmodel'

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
  providers: [NotFoundViewModel],
})
export class NotFoundComponent {
}
