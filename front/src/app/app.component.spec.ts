import { TestBed } from '@angular/core/testing'
import { MessageService } from 'primeng/api'
import { AppComponent } from './app.component'

describe('AppComponent', () => {
  let messageService: MessageService

  beforeEach(async () => {
    messageService = jasmine.createSpyObj('MessageService', ['add'])

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{
        provide: MessageService,
        useValue: messageService,
      }],
    }).compileComponents()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })
})
