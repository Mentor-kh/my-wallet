import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const firestoreStub: object = {
  collection: (name: string) => ({
    doc: (_id: string) => ({
      valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
      set: (_d: any) => new Promise((resolve, _reject) => resolve()),
    }),
  }),
};

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
      ],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: firestoreStub },
        AngularFireAuth,
        AngularFireAuthModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
