import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableComponent } from './data-table.component';
import {
  MatDialog,
  MatDialogRef,
  MatIconModule,
  MatPaginator,
  MatPaginatorModule,
  MatTableDataSource,
  MatTableModule
} from '@angular/material';
import { Store, StoreModule } from '@ngrx/store';
import { NotificationService } from 'src/app/services/notification.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
        MatIconModule,
        StoreModule.forRoot({})
      ],
      declarations: [DataTableComponent],
      providers: [
        MatPaginator,
        Store,
        { provide: MatTableDataSource, useValue: {} },
        { provide: MatDialog, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: NotificationService, useValue: {} },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
