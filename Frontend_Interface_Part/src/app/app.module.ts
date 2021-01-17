import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserService } from "./services/user.service";
import { HttpClientModule } from "@angular/common/http";
import { RideService } from "./services/ride.service";
import { ReviewService } from "./services/review.service";
import { RequestService } from "./services/request.service";
import { MusicService } from "./services/music.service";
import { LuggageService } from "./services/luggage.service";
import { EnRouteCityService } from "./services/enRouteCity.service";
import { LocalStorageService } from "./services/localStorageService";
import { ChitchatService } from "./services/chitchat.service";
import { NewRideComponent } from './new-ride/new-ride.component';
import { ViewRideComponent } from './view-ride/view-ride.component';
import { CityService } from "./services/city.service";
import { FormsModule } from '@angular/forms';
import { DropdownModule  } from 'primeng/dropdown';
import { MultiSelectModule  } from 'primeng/multiselect';
import { ButtonModule  } from 'primeng/button'
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {​​ CityComponent }​​ from './city/city.component';
import {​​ MusicComponent }​​ from './music/music.component';
import {​​ ChitChatComponent }​​ from './chit-chat/chit-chat.component';
import { ProductService } from "./services/product.service";
import { ViewRequestComponent } from './view-request/view-request.component';
import { RequestRideComponent } from "./request-ride/request-ride.component";
import { UserMgmtComponent } from "./user-mgmt/user-mgmt.component";

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    NewRideComponent,
    ViewRideComponent,
    CityComponent,
    MusicComponent,
    ChitChatComponent,
    ViewRequestComponent,
    RequestRideComponent,
    UserMgmtComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    RippleModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    SidebarModule,
    ToolbarModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    RatingModule,
    NavbarModule,
    DialogModule,
    ToastModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    HttpClientModule,
    DropdownModule,
    MultiSelectModule,
    ButtonModule,
    TableModule,
    CalendarModule
  ],
  providers: [UserService, RideService, ReviewService, RequestService, 
    MusicService, LuggageService, EnRouteCityService, ChitchatService,
    CityService, LocalStorageService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
