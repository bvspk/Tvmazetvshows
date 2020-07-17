import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowsService } from '../services/shows.service';
import { ITvShows } from '../model/tvshow.interface';
@Component({
  selector: 'app-tvshow-details',
  templateUrl: './tvshow-details.component.html',
  styleUrls: ['./tvshow-details.component.css']
})
export class TvshowDetailsComponent implements OnInit {
  id: any;
  showDetails: ITvShows;
  displayDetails = false;
  hasError = false;
  isLoading = false;
  routerNavigate:Router
  constructor(
    private route: ActivatedRoute,private router :Router,
    private shows: ShowsService
  ) { }

  // Get id from params and call API to get Show details
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.isLoading = true;
    this.shows.getDetails(this.id).subscribe(
      (data) => {
        this.showDetails = data;
        this.displayDetails = true;
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
  goHome() {
    this.router.navigateByUrl('/dashboard');
  }
}
