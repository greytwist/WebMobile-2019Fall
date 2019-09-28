import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  items: any;
  isLoading = true;
  BASE_URL = '';
  ID = '';
  KEY = '';

  constructor(private _http: HttpClient) {
    this.ID = '3098bb32';
    this.KEY = '74df48de9932144fcbe073239644c346';
    this.BASE_URL = 'https://api.edamam.com/search';
  }

  suggestRecipe( food_type: string){
    this._http.jsonp(`${this.BASE_URL}?q=${food_type}&app_id=${this.ID}&app_key=${this.KEY}`, 'callback')
        .subscribe((data: any) => {
          this.isLoading = false;
          this.items = Object.keys(data.hits).map(function (k) {
              const i = data.hits[k];
              return {title: i.recipe.label, image: i.recipe.image, page: i.recipe.url};
          });
          console.log(data);
        });
    return this.items;
  }

}
