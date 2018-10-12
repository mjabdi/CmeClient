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

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'widgets',
    pathMatch: 'full',
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
    path: 'resetpassword/:id',
    component: ResetpasswordComponent,
    data: {
      title: 'Resetpassword Page'
    }
  },
  {
    path: 'activationlink/:id',
    component: ActivationLinkComponent,
    data: {
      title: 'Activationlink Page'
    }
  },
  
  {
    path: 'forgotpassword',
    component: ForgotpasswordComponent,
    data: {
      title: 'Forgotpassword Page'
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
