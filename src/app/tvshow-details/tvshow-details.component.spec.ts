import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { convertToParamMap, ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpService } from '../services/http.service';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { TvshowDetailsComponent } from './tvshow-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ShowsService } from '../services/shows.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { By } from '@angular/platform-browser';
const mockData = '{"id":1,"url": "http://www.tvmaze.com/shows/1/under-the-dome","name":"Under the Dome","type":"Scripted","language":"Englosh","genres":["Drama","Science-Fiction", "Thriller"],"status":"Ended","runtime":60,"premiered": "2013-06-24","officialSite":"http://www.cbs.com/shows/under-the-dome/","schedule":{"time":"19:00","days":["Thursday"]},"rating":{"average":6.5},"weight":97,"network":{"id":2,"name":"CBS","country":{"name":"United States","code":"US","timezone":"America/New_York"}},"webChannel":null,"externals":{"tvrage":25988,"thetvdb":264492,"imdb":"tt1553656"},"image":{"medium":"http://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg","original":"http://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg"},"summary":"<p><b>Under the Dome</b>  tells Africa\'s story (Elisabet Casanovas), a 20-year-old who lives in a shared apartment that is falling apart, has a precarious job and sees how her life changes radically when she discovers she got pregnant and does not know by whom.</p>","updated":1583514689,"_links":{"self":{"href":"http://api.tvmaze.com/shows/1"},"previousepisode":{"href":"http://api.tvmaze.com/episodes/185054"}}}';

describe('TvshowDetailsComponent', () => {
  let component: TvshowDetailsComponent;
  let fixture: ComponentFixture<TvshowDetailsComponent>;
  let router: Router;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TvshowDetailsComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([
        { path: 'dashboard', component: DashboardComponent }
      ])],
      providers: [HttpService, HttpClient, ShowsService, {
        provide: ActivatedRoute, Router, useValue: {
          paramMap: of(convertToParamMap({ id: 1 }))
        }
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvshowDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call API to get Show details', () => {

    spyOn(HttpService.prototype, 'get').and.returnValue(of(JSON.parse(mockData)));
    component.ngOnInit();
    expect(typeof (component.showDetails)).toBe('object');
  });

  it('should call API to get Show details', () => {

    spyOn(HttpService.prototype, 'get').and.returnValue(throwError('error'));
    component.ngOnInit();
    expect(component.hasError).toBeTruthy();
  });
  it('should call goHome method', () => {
    const onClickMock = spyOn(component, 'goHome');
    component.goHome();
    fixture.debugElement.query(By.css('button')).triggerEventHandler('click', null);
    expect(onClickMock).toHaveBeenCalled();
  });
 
});
