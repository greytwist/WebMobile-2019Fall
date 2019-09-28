import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-restaurant',
  templateUrl: './search-restaurant.component.html',
  styleUrls: ['./search-restaurant.component.css']
})
export class SearchRestaurantComponent implements OnInit {

  constructor() {
    let CLIENT_ID = 'MEFZOFNBCT4APZVI42MNQTX3QPTB4LRYAGQDVRYCYWXLVYJB';
    let CLIENT_SECRET = 'IWPA20CJ1YWY2BSWWCQ0NX332PGEBKWZHNWOFBIZNPRZR3LV';
  }

  ngOnInit() {
  }

}
