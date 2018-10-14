import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';


@Injectable()
export class AdminAuthGuard implements CanActivate {

    constructor(private router: Router,
        private activeRoute : ActivatedRoute,
        private authservice : AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

      if (this.authservice.isLogin()) {


            if (!this.authservice.getMyCachedRole())
            {
                    this.router.navigate(['/home'],{ queryParams: { returnUrl:state.url}});
            }
            else if (this.authservice.getMyCachedRole().indexOf('admin') < 0 ){
                    this.router.navigate(['/widgets']);
            }

            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['login']);
        return false;
    }
}
