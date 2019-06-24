import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { NavigationComponent } from './components/navigation/navigation.component';
import { Store, StoreModule } from '@ngrx/store';

const firestoreStub: object = {
  collection: (name: string) => ({
    doc: (_id: string) => ({
      valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
      set: (_d: any) => new Promise((resolve, _reject) => resolve()),
    }),
  }),
};

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({})
      ],
      declarations: [
        AppComponent,
        NavigationComponent
      ],
      providers: [
        { provide: AuthService, useValue: firestoreStub },
        AngularFireAuth,
        AngularFireAuthModule,
        Store,
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
