import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipe.service';
import {RestaurantService} from '../restaurant.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoading = true;
  hungryFor = null;
  hungryAt = null;

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

  submit(food: string, place: string) {

      this.suggestRestaurant(food, place, this.currentLat, this.currentLong);
      this.suggestRecipe(food);

      // this.restaurants = this.restaurantService.suggestRestaurant(food, place, this.currentLat, this.currentLong);
      // this.recipes = this.recipeService.suggestRecipe(food);

  }

  suggestRecipe( food_type: string ) {
        const ID = '3098bb32';
        const KEY = '74df48de9932144fcbe073239644c346';
        const BASE_URL = 'https://api.edamam.com/search';

        this._http.jsonp(`${BASE_URL}?q=${food_type}&app_id=${ID}&app_key=${KEY}`, 'callback')
            .subscribe((data: any) => {
                this.isLoading = false;
                this.recipes = Object.keys(data.hits).map(function (k) {
                    const i = data.hits[k];
                    return {title: i.recipe.label, image: i.recipe.image, page: i.recipe.url};
                });
               // console.log(data);
            });
    }

    suggestRestaurant( food_type: string, place: string, lat: any, long: any ) {
        const CLIENT_ID = 'MEFZOFNBCT4APZVI42MNQTX3QPTB4LRYAGQDVRYCYWXLVYJB';
        const CLIENT_SECRET = 'IWPA20CJ1YWY2BSWWCQ0NX332PGEBKWZHNWOFBIZNPRZR3LV';
        const BASE_URL = 'https://api.foursquare.com/v2/venues/explore';
        const limit = 10;

        this._http.jsonp(`${BASE_URL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20180323&limit=${limit}&ll=${lat},${long}&query=${food_type}`, 'callback')
            .subscribe((data: any) => {
                this.isLoading = false;
                this.restaurants = Object.keys(data.response.groups[0].items).map(function (k) {
                    const i = data.response.groups[0].items[k];
                    return {title: i.venue.name, address: i.venue.location.address, lat: i.venue.location.lat, lng: i.venue.location.lng}
                });
               // console.log(data);
            });
    }

}
