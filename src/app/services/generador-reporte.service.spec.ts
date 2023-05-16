import { TestBed } from '@angular/core/testing';

import { GeneradorReporteService } from './generador-reporte.service';

describe('GeneradorReporteService', () => {
  let service: GeneradorReporteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneradorReporteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
