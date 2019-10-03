import {Component, OnInit} from '@angular/core';
import {Spinkit} from 'ng-http-loader/spinkits';
import { HttpClient } from '@angular/common/http';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public spinkit = Spinkit;
    constructor(
        private http: HttpClient) {
    }

    ngOnInit() : void{
    //   console.log ('perm', JSON.parse(localStorage.getItem('perm'))) 
    //     const perm = JSON.parse(localStorage.getItem('perm'))
 
    //        this.permissionsService.loadPermissions(perm);
    
        //    this.http.get('url').subscribe((permissions) => {
        //      //const perm = ["ADMIN", "EDITOR"]; example of permissions
        //      this.permissionsService.loadPermissions(permissions);
        //   })
    }
}
