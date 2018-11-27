import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { ResetpasswordComponent } from './views/resetpassword/resetpassword.component';
import { ActivationLinkComponent } from './views/activationlink/activationlink.component';
import { ForgotpasswordComponent } from './views/forgotpassword/forgotpassword.component';
import {MaterialModule} from './material.module';
import {AuthGuard} from './services/AuthGuard';

import { HttpErrorHandler }   from './http-error-handler.service';

import { MessageService } from './message.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';


const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ToastrModule } from 'ngx-toastr';
import { HttpModule } from '@angular/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import {AuthInterceptor} from './interceptors/auth-interceptor';
import {AuthenticationService} from './services/authentication.service';
import { HttpClientModule } from '@angular/common/http'; 
import { ClipboardModule } from 'ngx-clipboard';
import { AdminAuthGuard } from './services/AdminAuthGuard';
import { HomePageModule } from './views/homepage/homepage.module';
import { SignUpComponent } from './views/signup/signup.component';

import { NgxStripeModule } from 'ngx-stripe';
import { MyStripeService } from './services/MyStripeService';
import { PickColorDialogComponent } from './views/pickcolor-dialog/pickcolor-dialog.component';
import { BuyPlanDialogComponent } from './views/buyplan-dialog/buyplan-dialog.component';
import { ChangePlanDialogComponent } from './views/changeplan-dialog/changeplan-dialog.component';
import { StripeFormDialogComponent } from './views/stripeform-dialog/stripeform-dialog.component';
import { SubscriptionDetailDialogComponent } from './views/subscriptiondetail-dialog/subscriptiondetail-dialog.component';
import { CustomerDetailDialgoComponent } from './views/customerdetail-dialog/customerdetail-dialog.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    ClipboardModule,
    CommonModule,
    AppRoutingModule,
    AppAsideModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    MaterialModule,
    MatSnackBarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-full-width',
      preventDuplicates: true,
      closeButton : true,
      easing : 'ease-in-out',
      easeTime : 200,
      progressBar : false

    }),
    HomePageModule,
    NgxStripeModule.forRoot('pk_test_kVTRNkZf8RffabKEyt93GI8V'),
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    SignUpComponent,
    ResetpasswordComponent,
    ActivationLinkComponent,
    ForgotpasswordComponent,
    PickColorDialogComponent,
    BuyPlanDialogComponent,
    ChangePlanDialogComponent,
    StripeFormDialogComponent,
    SubscriptionDetailDialogComponent,
    CustomerDetailDialgoComponent
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },
  AdminAuthGuard,
  AuthGuard,
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  AuthenticationService,
  HttpErrorHandler,
  MessageService,
  MyStripeService

],
  entryComponents: [PickColorDialogComponent,
    BuyPlanDialogComponent,
    ChangePlanDialogComponent,
    StripeFormDialogComponent,
    SubscriptionDetailDialogComponent,
    CustomerDetailDialgoComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
