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
  hungryFor = '';

  recipes: any;
  restaurants: any;

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

  submit(values: string) {
    console.log(values);
    this.restaurants = this.restaurantService.suggestRestaurant(values, this.currentLat, this.currentLong);
    this.recipes = this.recipeService.suggestRecipe(values);

    console.log("TEST");
    console.log(this.restaurants);
    console.log(this.recipes);
    console.log("END");


  }

}
