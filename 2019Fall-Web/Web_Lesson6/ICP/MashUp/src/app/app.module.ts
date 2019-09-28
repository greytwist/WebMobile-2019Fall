import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HeaderComponent} from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SearchRecipeComponent } from './search-recipe/search-recipe.component';
import {HttpClientJsonpModule, HttpClientModule} from "@angular/common/http";
import { SearchRestaurantComponent } from './search-restaurant/search-restaurant.component';
import {RestaurantService} from "./restaurant.service";
import {RecipeService} from "./recipe.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchRecipeComponent,
    SearchRestaurantComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
  ],
  providers: [ RestaurantService, RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
