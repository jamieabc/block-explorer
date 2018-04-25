import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppComponent } from './app.component';

import { HttpModule } from '@angular/http';
import { DataService } from './data.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
      BrowserModule,
      HttpModule,
      InfiniteScrollModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
