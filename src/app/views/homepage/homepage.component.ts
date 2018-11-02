import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Title } from '@angular/platform-browser';

@Component({
    templateUrl: 'homepage.component.html',
    styleUrls: ['homepage.component.scss']
})
export class HomePageComponent {

    MyRole = "";

    constructor(private router : Router,
                private activeRoute : ActivatedRoute,
                private authService : AuthenticationService            
        ) { 

    }

    NameOfUser ="";

    ngOnInit()
    {

        this.NameOfUser = this.authService.getCachedName();

        let returnUrl = this.activeRoute.snapshot.queryParams["returnUrl"];

        this.authService.getMyRole().subscribe( (val : string[]) => {
            this.MyRole = val[0];
            this.authService.setMyRole(this.MyRole);  

            if (returnUrl)
            {
                this.router.navigate([returnUrl]);
            }
            else if (this.MyRole.indexOf('admin') >= 0)
            {
              this.router.navigate(['/widgetslist']);
            }
            else
            {
                this.router.navigate(['/widgets']);
            }
          }
              );
    }

    
}
