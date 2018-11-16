import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { ActivationLinkComponent } from './views/activationlink/activationlink.component';
import { ResetpasswordComponent } from './views/resetpassword/resetpassword.component';
import { ChangepasswordComponent } from './views/changepassword/changepassword.component';
import { ForgotpasswordComponent } from './views/forgotpassword/forgotpassword.component';
import { AuthGuard } from './services/AuthGuard';
import { HomePageComponent } from './views/homepage/homepage.component';
import { AdminAuthGuard } from './services/AdminAuthGuard';
import { SignUpComponent } from './views/signup/signup.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Home'
    }
  },

  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },

  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'signup',
    component: SignUpComponent,
    data: {
      title: 'SignUp Page'
    }
  },
  {
    path: 'resetpassword/:id',
    component: ResetpasswordComponent,
    data: {
      title: 'Reset Password Page'
    }
  },
  {
    path: 'activationlink/:id',
    component: ActivationLinkComponent,
    data: {
      title: 'Activation Link Page'
    }
  },
  
  {
    path: 'forgotpassword',
    component: ForgotpasswordComponent,
    data: {
      title: 'Forgot Password Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'customers',
        loadChildren: './admin/customers/customers.module#CustomersModule',
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'callreports',
        loadChildren: './admin/callreports/callreports.module#CallReportsModule',
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'widgetslist',
        loadChildren: './admin/widgetslist/widgetslist.module#WidgetsListModule',
        canActivate: [AdminAuthGuard]
      },

      // {
      //   path: 'home',
      //   loadChildren: './views/homepage/homepage.module#HomePageModule'
      // },

      {
        path: 'mycalls',
        loadChildren: './views/mycalls/mycalls.module#MyCallsModule'
      },
      {
        path: 'mysubscriptions',
        loadChildren: './views/mysubscriptions/mysubscriptions.module#MySubscriptionsModule'
      },

      {
        path: 'widgets',
        loadChildren: './views/widgets/widgets.module#WidgetsModule'
      },
      {
        path: 'createwidget',
        loadChildren: './views/createwidget/createwidget.module#CreateWidgetModule'
      },
      {
        path: 'editwidget/:id',
        loadChildren: './views/editwidget/editwidget.module#EditWidgetModule'
      },
      {
        path: 'changepassword',
        loadChildren: './views/changepassword/changepassword.module#ChangepasswordModule'
      },
      {
        path: 'about',
        loadChildren: './views/about/about.module#AboutModule'
      },
      {
        path: 'contactus',
        loadChildren: './views/contactus/contactus.module#ContactusModule'
      }

    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
