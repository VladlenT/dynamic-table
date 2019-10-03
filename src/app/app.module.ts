import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [AppComponent, TableComponent, PaginationComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
