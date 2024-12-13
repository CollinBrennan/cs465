import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrl: './edit-trip.component.css',
})
export class EditTripComponent implements OnInit {
  public editForm!: FormGroup;
  trip!: Trip;
  submitted = false;
  message: string = '';
  tripCode: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripDataService: TripDataService
  ) {}

  ngOnInit(): void {
    this.tripCode = localStorage.getItem('tripCode');
    if (!this.tripCode) {
      alert("Something wrong, couldn't find where I stashed tripCode");
      this.router.navigate(['']);
      return;
    }

    this.editForm = this.formBuilder.group({
      _id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.tripDataService.getTrip(this.tripCode).subscribe({
      next: (value) => {
        this.trip = value[0];

        // transform date from database to form date format
        const datePipe = new DatePipe('en-US');
        const formattedStart = datePipe.transform(value[0].start, 'yyyy-MM-dd');

        // populate form from database call
        this.editForm.patchValue({
          ...value[0],
          start: formattedStart,
        });
        if (value.length === 0) this.message = 'No Trip Retrieved!';
        else this.message = 'Trip:' + this.tripCode + ' retrieved.';
      },
      error: (error) => {
        console.log('Error: ' + error);
      },
    });
  }

  public onSubmit() {
    this.submitted = true;

    if (this.editForm.valid && this.tripCode) {
      // update existing record in database
      this.tripDataService
        .updateTrip(this.tripCode, this.editForm.value)
        .subscribe({
          next: (value) => {
            console.log(value);
            this.router.navigate(['']);
          },

          error: (error) => {
            console.log('Error: ' + error.message);
          },
        });
    }
  }

  get f() {
    return this.editForm.controls;
  }
}
