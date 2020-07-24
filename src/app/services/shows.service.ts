import { Injectable } from '@angular/core';
import { HttpService } from '../services/http.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ITvShows } from '../model/tvshow.interface';

@Injectable({
  providedIn: 'root'
})
export class ShowsService {

  isLoading = false;
  showsData: ITvShows[] = [];
  constructor(
    private httpService: HttpService,
  ) {
  }
  // Below method fetches all shows from tvmaze API
  getAllShows(): Observable<any> {
    return this.httpService.get(environment.url + '/shows?page=1');
  }
  // Below method fetch results based on the input text provided
  search(searchText: string): Observable<any> {
    return this.httpService.get(environment.url + '/search/shows?q=' + searchText);
  }
  // Below method fetch details based on the show id provided
  getDetails(id: number): Observable<any> {
    return this.httpService.get(environment.url + '/shows/' + id);
  }
}
