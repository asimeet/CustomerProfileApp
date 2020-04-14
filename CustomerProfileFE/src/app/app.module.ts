import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerFilterPipe } from './filters/customer-filter.pipe';


import { AppComponent } from './app.component';
import { MasterSideNavComponent } from './master-side-nav/master-side-nav.component';
import { DetailContComponent } from './detail-cont/detail-cont.component';
import { MasterDetailComponent } from './master-detail/master-detail.component';
import { HeaderComponent } from './header/header.component';
import { CustomerService } from './service/customer.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    MasterSideNavComponent,
    DetailContComponent,
    MasterDetailComponent,
    HeaderComponent,
    CustomerFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
