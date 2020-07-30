import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TvshowListComponent } from './tvshow-list.component';
import { SimpleChange, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
const testData = '[{"score":100,"show":{"id":1,"url": "http://www.tvmaze.com/shows/1/under-the-dome","name":"Under the Dome","type":"Scripted","language":"Englosh","genres":["Drama","Science-Fiction", "Thriller"],"status":"Ended","runtime":60,"premiered": "2013-06-24","officialSite":"http://www.cbs.com/shows/under-the-dome/","schedule":{"time":"19:00","days":["Thursday"]},"rating":{"average":6.5},"weight":97,"network":{"id":2,"name":"CBS","country":{"name":"United States","code":"US","timezone":"America/New_York"}},"webChannel":null,"externals":{"tvrage":25988,"thetvdb":264492,"imdb":"tt1553656"},"image":{"medium":"http://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg","original":"http://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg"},"summary":"<p><b>Under the Dome</b>  tells Africa\'s story (Elisabet Casanovas), a 20-year-old who lives in a shared apartment that is falling apart, has a precarious job and sees how her life changes radically when she discovers she got pregnant and does not know by whom.</p>","updated":1583514689,"_links":{"self":{"href":"http://api.tvmaze.com/shows/1"},"previousepisode":{"href":"http://api.tvmaze.com/episodes/185054"}}}}]';

describe('TvshowListComponent', () => {
  let component: TvshowListComponent;
  let fixture: ComponentFixture<TvshowListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TvshowListComponent],
      imports: [RouterTestingModule],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvshowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.searchText = 'blood';
    component.searchResults = [];
    component.genresType = '';
    component.showsData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0] as any;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save data received from parent as searchData to be saved in searchText variable', () => {
    component.ngOnChanges({
      searchData: new SimpleChange(null, 'blood', false)
    });
    expect(component.searchText).toEqual('blood');
  });

  it('should save data received from parent genresType to be saved in genre variable', () => {
    component.ngOnChanges({
      genresType: new SimpleChange(null, 'Drama', false)
    });
    expect(component.genre).toEqual('Drama');
  });

  it('should save data received from parent searchResults to be saved in showsData variable', () => {
    component.ngOnChanges({
      searchResults: new SimpleChange(null, JSON.parse(testData), false)
    });
    expect(component.showsData.length).toBeGreaterThanOrEqual(0);
  });

  it('should set showsData to empty array when no data received from parent for searchResults', () => {
    component.ngOnChanges({
      searchResults: new SimpleChange(null, null, false)
    });
    expect(component.showsData.length).toEqual(0);
  });

  it('Calling Next method should increment start value and end value by 4', () => {
    component.next();
    expect(component.start).toEqual(4);
  });

  it('Calling Next method beyond available data should reset end value to max length', () => {
    component.start = 8;
    component.end = 10;
    component.next();
    expect(component.start).toEqual(12);
    expect(component.end).toEqual(14);
  });

  it('Calling Prev method should decrement start value and end value by 4', () => {
    component.start = 4;
    component.end = 8;
    component.prev();
    expect(component.start).toEqual(0);
    expect(component.end).toEqual(4);
  });

  it('Calling Prev method beyond available data should reset start value to 0', () => {
    component.start = 0;
    component.end = 4;
    component.prev();
    expect(component.start).toEqual(0);
    expect(component.end).toEqual(4);
  });
});
