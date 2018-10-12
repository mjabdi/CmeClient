import { Component, Input } from '@angular/core';
import { navItems_Admin, navItems_User } from './../../_nav';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls : ['./default-layout.component.css']
})
export class DefaultLayoutComponent {
  public navItems ;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;

  today = new Date();

  constructor( private snackbar : MatSnackBar,private authservice : AuthenticationService,private router : Router) 
  {
  

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, 
      {
      attributes: true
    });
  }

  NameofUser : string;
  MyRole : string;

  ngOnInit()
  {
    this.authservice.getMyRole().subscribe( (val : string[]) => {
      this.MyRole = val[0];
      if (this.MyRole.indexOf('admin') > 0)
      {
        this.navItems = navItems_Admin;
      }
      else
      {
        this.navItems = navItems_User;
      }
    }
        );

    this.authservice.getMyName().subscribe( (val : string[]) =>
    this.NameofUser = val[0]
      );
  }

  logout()
  {
    this.authservice.logout();
    location.reload();
    this.snackbar.open('You have successfully logged out','Logged out',{
      duration: 5000,
      panelClass : 'my-snackbar-style'
    });
  }

  username() : string{
    return this.authservice.getUsername();
  }

}
