import { ComponentFixture, TestBed } from '@angular/core/testing'

import { Component, input } from '@angular/core'
import { LogoutButtonComponent, UserInformationsComponent, UserTopicsComponent } from '@components/index'
import { BackButtonComponent } from '@shared/index'
import { ProfileComponent } from './profile.component'
import { ProfileViewModel } from './profile.viewmodel'

@Component({
  selector: 'app-logout-button',
  template: `<span>app-logout-button</span>`,
  providers: [
    {
      provide: LogoutButtonComponent,
      useClass: MockLogoutButtonComponent,
    },
  ],
})
class MockLogoutButtonComponent {
  public redirectUrl = input<string>()
}

@Component({
  selector: 'app-back-button',
  template: `<span>app-back-button</span>`,
  providers: [
    {
      provide: BackButtonComponent,
      useClass: MockBackButtonComponent,
    },
  ],
})
class MockBackButtonComponent { }

@Component({
  selector: 'app-topics',
  template: `<span>app-topics</span>`,
  providers: [
    {
      provide: UserTopicsComponent,
      useClass: MockUserTopicsComponent,
    },
  ],
})
class MockUserTopicsComponent { }

@Component({
  selector: 'app-informations',
  template: `<span>app-informations</span>`,
  providers: [
    {
      provide: UserInformationsComponent,
      useClass: MockUserInformationsComponent,
    },
  ],
})
class MockUserInformationsComponent {}

describe('ProfileComponent', () => {
  let component: ProfileComponent
  let fixture: ComponentFixture<ProfileComponent>
  let viewModel: ProfileViewModel

  beforeEach(async () => {
    viewModel = jasmine.createSpyObj('ProfileViewModel', ['logout'], {
      empty: null,
    })
    await TestBed.configureTestingModule({
      imports: [
        ProfileComponent,
      ],
      providers: [
        {
          provide: ProfileViewModel,
          useValue: viewModel,
        },
      ],
    })
      .overrideComponent(ProfileComponent, {
        remove: {
          imports: [
            LogoutButtonComponent,
            BackButtonComponent,
            UserTopicsComponent,
            UserInformationsComponent,
          ],
          providers: [ProfileViewModel],
        },
        add: {
          imports: [
            MockLogoutButtonComponent,
            MockBackButtonComponent,
            MockUserTopicsComponent,
            MockUserInformationsComponent,
          ],
          providers: [
            {
              provide: ProfileViewModel,
              useValue: viewModel,
            },
          ],
        },
      })
      .compileComponents()

    fixture = TestBed.createComponent(ProfileComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
