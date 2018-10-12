import { Component } from '@angular/core';

import {AuthenticationService} from '../../services/authentication.service';

@Component({
    templateUrl: 'about.component.html',
    styleUrls: ['about.component.css']
})
export class AboutComponent {
    constructor(private authService : AuthenticationService) { }

    onSubmit(srcphone,destphone)
    {
        this.authService.callmeTest(srcphone,destphone).subscribe(
          
            data => 
            {
                alert(data);
            }

           ,
           error =>
           {
               alert('Error!');
               alert(JSON.stringify (error));
           }
            
            
        );

        return false;
    }
}
