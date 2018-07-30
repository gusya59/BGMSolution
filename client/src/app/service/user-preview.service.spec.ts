import { TestBed, inject } from '@angular/core/testing';

import { UserPreviewService } from './user-preview.service';

describe('UserPreviewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserPreviewService]
    });
  });

  it('should be created', inject([UserPreviewService], (service: UserPreviewService) => {
    expect(service).toBeTruthy();
  }));
});
