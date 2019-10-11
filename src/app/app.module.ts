import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from '@shared/shared.module';
import { AppComponent } from './app.component';
import { TableComponent } from '@/table/table.component';
import { PaginationComponent } from '@/pagination/pagination.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from '@store/reducers';

@NgModule({
  declarations: [AppComponent, TableComponent, PaginationComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
