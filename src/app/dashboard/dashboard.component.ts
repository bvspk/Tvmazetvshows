import { Component, OnInit } from '@angular/core';
import { ShowsService } from '../services/shows.service';
import { ITvShows } from '../model/tvshow.interface';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  searchData = '';
  showsData: ITvShows[] = [];
  searchResults: any = [];
  dramaData: ITvShows[] = [];
  sportsData: ITvShows[] = [];
  comedyData: ITvShows[] = [];
  actionData: ITvShows[] = [];
  isLoading: boolean = false;
  hasError: boolean = false;
  constructor(private shows: ShowsService) { }

  ngOnInit(): void {
    this.getShows();
  }

  // Below function filter the Show Data based on genres
  getFilteredData(genres: string): ITvShows[] {
    return this.showsData.filter(item => item.genres.indexOf(genres) >= 0);
  }
  // Below function fetches all the shows from tvmaze API and split data based on genre
  getShows() {
    this.isLoading = true;
    this.shows.getAllShows().subscribe(
      (data: ITvShows[]) => {
        this.showsData = data;
        this.showsData.sort((a, b) => a.rating.average > b.rating.average ? -1 : 1);
        this.dramaData = this.getFilteredData('Drama');
        this.comedyData = this.getFilteredData('Comedy');
        this.sportsData = this.getFilteredData('Sports');
        this.actionData = this.getFilteredData('Action');
        this.hasError = false;
      },
      (error) => {
        this.hasError = true;
      },
      () => {
        this.isLoading = false;
      }
    );
  }
  // Below function fires when user type text in search box
  searchEvent() {
    // Debounce Keyup event
    this.isLoading = true;
    if (this.searchData) {
      this.getSearchResults(this.searchData);
    } else {
      this.getShows();
    }
  }
  // Below function fetches results for the text entered in Seach Input box
  getSearchResults(searchText: string) {
    this.shows.search(searchText).pipe(debounceTime(1000)).subscribe(
      (data: any) => {
        this.searchResults = data.map(item => item.show);
        this.hasError = false;
      },
      (error) => {
        this.hasError = true;
      },
      () => {
        this.isLoading = false;
      }
    );
  }
}
