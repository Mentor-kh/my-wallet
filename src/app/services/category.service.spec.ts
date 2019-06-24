import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('CategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ],
    providers: [
      HttpTestingController,
    ]
  }));

  it('should be created', () => {
    const service: CategoryService = TestBed.get(CategoryService);
    expect(service).toBeTruthy();
  });
});
