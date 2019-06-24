import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DashboardComponent } from './dashboard.component';
import { FilterComponent } from '../filter/filter.component';
import { DataTableComponent } from '../data-table/data-table.component';
import { TransactionComponent } from '../transaction/transaction.component';
import {
  MatCardModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatTableModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const firestoreStub: object = {
  collection: (name: string) => ({
    doc: (_id: string) => ({
      valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
      set: (_d: any) => new Promise((resolve, _reject) => resolve()),
    }),
  }),
};

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTableModule,
        MatIconModule,
        MatPaginatorModule,
        MatSlideToggleModule,
        HttpClientTestingModule,
        StoreModule.forRoot({})
      ],
      declarations: [
        DashboardComponent,
        FilterComponent,
        DataTableComponent,
        TransactionComponent,
      ],
      providers: [
        AngularFireAuth,
        AngularFireAuthModule,
        Store,
        MatDatepickerModule,
        HttpTestingController,
        { provide: NotificationService, useValue: {} },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
