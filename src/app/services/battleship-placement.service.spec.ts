import { TestBed, inject } from '@angular/core/testing';

import { BattleshipPlacementService } from './battleship-placement.service';

describe('BattleshipPlacementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BattleshipPlacementService]
    });
  });

  it('should be created', inject([BattleshipPlacementService], (service: BattleshipPlacementService) => {
    expect(service).toBeTruthy();
  }));
});
