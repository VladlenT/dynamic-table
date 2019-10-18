import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from '@shared/shared.module';
import { AppComponent } from './app.component';
import { TableComponent } from '@/table/table.component';
import { PaginationComponent } from '@/pagination/pagination.component';
import { AppStoreModule } from '@store/app-store.module';
import { EntriesComponent } from '@/entries/entries.component';

@NgModule({
  declarations: [AppComponent, TableComponent, PaginationComponent, EntriesComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule, AppStoreModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
