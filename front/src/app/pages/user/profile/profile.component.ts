import { Component, computed } from '@angular/core'

import { LogoutButtonComponent, UserInformationsComponent, UserTopicsComponent } from '@components/index'
import { redirectUrls } from '@routes'
import { BackButtonComponent } from '@shared/index'

@Component({
  selector: 'app-profile',
  imports: [
    LogoutButtonComponent,
    BackButtonComponent,
    UserTopicsComponent,
    UserInformationsComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  public logoutUrl$ = computed(() => redirectUrls.login)
}
