import { inject, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { BehaviorSubject, Observable } from 'rxjs';

import { DataEffects } from './data.effects';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

const firestoreStub: object = {
  collection: (name: string) => ({
    doc: (_id: string) => ({
      valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
      set: (_d: any) => new Promise((resolve, _reject) => resolve()),
    }),
  }),
};

describe('DataEffects', () => {
  let actions$: Observable<any>;
  let effects: DataEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        HttpTestingController,
        { provide: AuthService, useValue: firestoreStub },
        { provide: AngularFirestore, useValue: {} },
        DataEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(DataEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
