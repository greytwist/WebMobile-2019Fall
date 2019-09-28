import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoading = true;
  @ViewChild('searchText') foodFinder: ElementRef;

  constructor(private _http: HttpClient) { }

  ngOnInit() {
  }

  submit() {
    console.log(this.foodFinder.nativeElement.value);
    // this._http.jsonp("http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&callback=archive&gsrsearch=" + this.searchTerm.nativeElement.value, 'callback')
    //   .subscribe((data: any) => {
    //     this.isLoading = false;
    //     this.pages = Object.keys(data.query.pages).map(function (k) {
    //       var i = data.query.pages[k];
    //       return {title: i.title, body: i.extract, page: 'http://en.wikipedia.org/?curid=' + i.pageid}
    //     });
    //     console.log(this.pages);
    //   });
  }

}
