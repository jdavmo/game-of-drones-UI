import { TestBed, inject } from '@angular/core/testing';

import { GameOfDronesService } from './game-of-drones.service';

describe('GameOfDronesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameOfDronesService]
    });
  });

  it('should be created', inject([GameOfDronesService], (service: GameOfDronesService) => {
    expect(service).toBeTruthy();
  }));
});
