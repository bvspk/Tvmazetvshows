import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ShowsService } from './shows.service';
import { HttpApiServiceMock } from './http-api.service.mock';
import { HttpService } from './http.service';

describe('ShowsService', () => {
  let service: ShowsService;
  const httpApiServiceMock = new HttpApiServiceMock();
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        { provide: HttpService, useValue: httpApiServiceMock }
      ],
    });
    service = TestBed.inject(ShowsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should get tvShowsList', () => {
    spyOn(httpApiServiceMock, 'get').and.callThrough();
    service.getAllShows();
    expect(httpApiServiceMock.get).toHaveBeenCalled();
  });
  it('should get showDetails', () => {
    spyOn(httpApiServiceMock, 'get').and.callThrough();
    service.getDetails(1);
    expect(httpApiServiceMock.get).toHaveBeenCalled();
  });
  it('should get searchResults', () => {
    spyOn(httpApiServiceMock, 'get').and.callThrough();
    service.search('blood');
    expect(httpApiServiceMock.get).toHaveBeenCalled();
  });
});
