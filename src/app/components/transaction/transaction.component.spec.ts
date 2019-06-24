import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionComponent } from './transaction.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatTabsModule
} from '@angular/material';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NotificationService } from 'src/app/services/notification.service';
import { Store, StoreModule } from '@ngrx/store';

describe('TransactionComponent', () => {
  let component: TransactionComponent;
  let fixture: ComponentFixture<TransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatTabsModule,
        MatSelectModule,
        MatSlideToggleModule,
        HttpClientTestingModule,
        StoreModule.forRoot({})
      ],
      declarations: [TransactionComponent],
      providers: [
        HttpTestingController,
        Store,
        { provide: NotificationService, useValue: {} },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
