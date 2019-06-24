import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationComponent } from './navigation.component';
import { Store, StoreModule } from '@ngrx/store';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

const firestoreStub: object = {
  collection: (name: string) => ({
    doc: (_id: string) => ({
      valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
      set: (_d: any) => new Promise((resolve, _reject) => resolve()),
    }),
  }),
};

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({})
      ],
      declarations: [NavigationComponent],
      providers: [
        { provide: AuthService, useValue: firestoreStub },
        AngularFireAuth,
        AngularFireAuthModule,
        Store,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
