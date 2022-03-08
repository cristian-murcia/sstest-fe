import { TestBed } from '@angular/core/testing';

import { ShellRouteService } from './shell-route.service';

describe('ShellRouteService', () => {
  let service: ShellRouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShellRouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
