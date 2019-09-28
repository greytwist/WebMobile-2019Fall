import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  //pages: any;
  isLoading = true;
  CLIENT_ID = '';
  CLIENT_SECRET= '';
  BASE_URL = '';

  constructor(private _http: HttpClient) {
    this.CLIENT_ID = 'MEFZOFNBCT4APZVI42MNQTX3QPTB4LRYAGQDVRYCYWXLVYJB';
    this.CLIENT_SECRET= 'IWPA20CJ1YWY2BSWWCQ0NX332PGEBKWZHNWOFBIZNPRZR3LV';
    this.BASE_URL = 'https://api.foursquare.com/v2/venues/explore';
  }

  suggestRestaurant( food_type: string, lat: any, long: any ){
      this._http.jsonp(`${this.BASE_URL}?client_id=${this.CLIENT_ID}&client_secret=${this.CLIENT_SECRET}&v=20180323&limit=1&ll=${lat},${long}&query=${food_type}&radius=10000`, 'callback')
          .subscribe((data: any) => {
               this.isLoading = false;
              // this.pages = Object.keys(data.query.pages).map(function (k) {
              //     var i = data.query.pages[k];
              //     return {title: i.title, body: i.extract, page: 'http://en.wikipedia.org/?curid=' + i.pageid}
               //});
              console.log(data);
          });
  }

}
