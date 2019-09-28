import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import {RecipeService} from "../recipe.service";
import {RestaurantService} from "../restaurant.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoading = true;
  @ViewChild('searchText') foodFinder: ElementRef;
  values = '';

  currentLat: any;
  currentLong: any;
  geolocationPosition: any;

  constructor(private _http: HttpClient,
              private recipeService: RecipeService,
              private restaurantService: RestaurantService) { }

  ngOnInit() {

    window.navigator.geolocation.getCurrentPosition(
        position => {
          this.geolocationPosition = position;
          this.currentLat = position.coords.latitude;
          this.currentLong = position.coords.longitude;
        });

  }

  onKey(value: string) {
    this.values += value;
  }

  submit(values: string) {
    console.log(values);
    //this.restaurantService.suggestRestaurant(values, this.currentLat, this.currentLong);
    this.recipeService.suggestRecipe(values);
    this.values =  "";


  }

}
