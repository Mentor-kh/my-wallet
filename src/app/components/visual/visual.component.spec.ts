import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualComponent } from './visual.component';
import { ChartsModule } from 'ng2-charts';
import { MatTabsModule } from '@angular/material';
import { Store, StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('VisualComponent', () => {
  let component: VisualComponent;
  let fixture: ComponentFixture<VisualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ChartsModule,
        MatTabsModule,
        HttpClientTestingModule,
        StoreModule.forRoot({})
      ],
      declarations: [
        VisualComponent
      ],
      providers: [
        HttpTestingController,
        Store,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
