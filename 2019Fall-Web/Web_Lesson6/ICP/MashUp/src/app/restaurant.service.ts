import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  places: any;
  isLoading = true;
  CLIENT_ID = '';
  CLIENT_SECRET= '';
  BASE_URL= '';
  limit;

  constructor(private _http: HttpClient) {
    this.CLIENT_ID = 'MEFZOFNBCT4APZVI42MNQTX3QPTB4LRYAGQDVRYCYWXLVYJB';
    this.CLIENT_SECRET= 'IWPA20CJ1YWY2BSWWCQ0NX332PGEBKWZHNWOFBIZNPRZR3LV';
    this.BASE_URL = 'https://api.foursquare.com/v2/venues/explore';
    this.limit = 10;
  }

  suggestRestaurant( food_type: string, lat: any, long: any ){
        this._http.jsonp(`${this.BASE_URL}?client_id=${this.CLIENT_ID}&client_secret=${this.CLIENT_SECRET}&v=20180323&limit=${this.limit}&ll=${lat},${long}&query=${food_type}`, 'callback')
            .subscribe((data: any) => {
                this.isLoading = false;
                this.places = Object.keys(data.response.groups[0].items).map(function (k) {
                    var i = data.response.groups[0].items[k];
                    return {title: i.venue.name, address: i.venue.location.address, lat: i.venue.location.lat, lng: i.venue.location.lng}
                });
                console.log(data);
            });
        return this.places;
    }

}
