import { TestBed, inject } from '@angular/core/testing';

import { GameStatusService } from './game-status.service';

describe('GameStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameStatusService]
    });
  });

  it('should be created', inject([GameStatusService], (service: GameStatusService) => {
    expect(service).toBeTruthy();
  }));
});
