import { Component, OnInit } from '@angular/core';
import { ShowsService } from '../services/shows.service';
import { ITvShows } from '../model/tvshow.interface';

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
  actionData: ITvShows[] = []
  isLoading: boolean = false;
  hasError: boolean = false;
  timer: any;
  constructor(private shows: ShowsService) { }

  ngOnInit(): void {
    this.getShows();
  }
  // Below function fetches all the shows from tvmaze API and split data based on genre
  getShows() {
    this.isLoading = true;
    this.shows.getAllShows().subscribe(
      (data: ITvShows[]) => {
        this.showsData = data;
        this.showsData.sort((a, b) => a.rating.average > b.rating.average ? -1 : 1);
        this.dramaData = this.showsData.filter(item => item.genres.indexOf('Drama') >= 0);
        this.comedyData = this.showsData.filter(item => item.genres.indexOf('Comedy') >= 0);
        this.sportsData = this.showsData.filter(item => item.genres.indexOf('Sports') >= 0);
        this.actionData = this.showsData.filter(item => item.genres.indexOf('Action') >= 0);
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
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (this.searchData) {
        this.getSearchResults(this.searchData);
      } else {
        this.getShows();
      }
    }, 1000);
  }
  // Below function fetches results for the text entered in Seach Input box
  getSearchResults(searchText: string) {
    this.shows.search(searchText).subscribe(
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
