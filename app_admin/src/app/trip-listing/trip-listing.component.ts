import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCardComponent } from '../trip-card/trip-card.component';

import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';

import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.component.html',
  styleUrl: './trip-listing.component.css',
  providers: [TripDataService],
})
export class TripListingComponent implements OnInit {
  trips: Trip[] = [];
  message = '';

  constructor(
    private tripDataService: TripDataService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    console.log('trip-listing constructor');
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();
  }

  public isLoggedIn() {
    return this.authenticationService.isLoggedIn();
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  private getStuff(): void {
    this.tripDataService.getTrips().subscribe({
      next: (value: Trip[]) => {
        this.trips = value;
        this.message =
          value.length > 0
            ? 'There are ' + value.length + ' trips available.'
            : 'There were no trips retrieved from the database';
        console.log(this.message);
      },
      error: (error) => {
        console.log('Error: ' + error);
      },
    });
  }
}
