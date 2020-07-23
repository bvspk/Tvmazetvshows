import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ITvShows } from '../model/tvshow.interface';

@Component({
  selector: 'app-tvshow-list',
  templateUrl: './tvshow-list.component.html',
  styleUrls: ['./tvshow-list.component.css']
})
export class TvshowListComponent implements OnInit , OnChanges {
  @Input() searchResults: ITvShows[] = []
  @Input() searchData: ITvShows[] = []
  @Input() genresType: string;
  showsData: any[] = []
  dramaData: any[] = []
  sportsData: any[] = []
  comedyData: any[] = []
  start = 0;
  maxItems = 4;
  end = this.maxItems;
  genre: string;
  isLoading = false;
  searchText: string;
  hasError = false;

  constructor() { }

  ngOnInit(): void {
  }
  // Receive input params from parent and store in assigned variables
  ngOnChanges(changes: any) {
    if (changes.searchData) {
      this.searchText = changes.searchData.currentValue;
    }
    if (changes.genresType) {
      this.genre = changes.genresType.currentValue;
    }
    if (changes.searchResults) {
      this.showsData = changes.searchResults.currentValue ? changes.searchResults.currentValue : [];
    }
  }
  // Display previous data fetched from API based on maxItems defined
  prev() {
    this.start -= this.maxItems;
    this.end -= this.maxItems;
    if (this.start < 0) {
      this.start = 0;
      this.end = this.maxItems;
    }
  }
  // Display next data fetched from API based on maxItems defined
  next() {
    this.start += this.maxItems;
    this.end += this.maxItems;
  }
}
