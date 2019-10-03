import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {GlobalParams} from './globalparams';

@Injectable()
export class UserManagementServices {

    public token: string;

    constructor(private http: HttpClient, private router: Router, private globalParam: GlobalParams) {
        this.token = localStorage.getItem('access_token');
    }

    login(username: string, password: string): Observable<any> {
        let params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);
        params.append('grant_type', 'password');
        params.append('client_id', 'user_client');

        let options = {
            headers: new HttpHeaders({
                'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
                'Authorization': 'Basic ' + btoa('user_client:Gakd#394Ewok.')
            })
        };
        ;
        return this.http.post(this.globalParam.baseUrl + 'oauth/token', params.toString(), options)
            .map((response: any) => {
                // login successful if there's a jwt token in the response
                if (response.access_token.length !== 0) {
                    //(response.access_token);
                    localStorage.setItem('access_token', response.access_token);

                    // return true to indicate successful login
                    return response;
                } else {
                    // return false to indicate failed login
                    alert(response.message);
                    return response;
                }
            });

    }

    logout(): void {
        localStorage.removeItem('currentUser');
        localStorage.clear();
        this.router.navigateByUrl('/login');
    }

    verify(otp: string): Observable<any> {
        let params = new URLSearchParams();
        params.append('otp', otp);

        let options = {
            headers: new HttpHeaders({
                'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
                'Authorization': 'Bearer ' + this.token
            })
        };

        return this.http.post(this.globalParam.baseUrl + 'otp/verification', params.toString(), options)
            .map((response: any) => {
                // login successful if there's a jwt token in the response
                if (response.code === 200) {
                    // set token property
                    this.token = response.message;
                    //(response.data.userDetails.fullName);

                    // // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('username', response.data.userDetails.fullName);
                    localStorage.setItem('isLoggedin', 'true');
                    // return true to indicate successful verification
                    return response;
                } else {
                    // return false to indicate failed login
                    alert(response.message);
                    return response;
                }
            });

    }

    resetPassword(email: string): Observable<boolean> {
        let params = new URLSearchParams();
        params.append('email', email);

        let options = {
            headers: new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'})
        };
        ;
        return this.http.post(this.globalParam.baseUrl + 'users/forgot-password', params.toString(), options)
            .map((response: any) => {
                // login successful if there's a jwt token in the response
                if (response.code === 200) {
                    //(response.message);
                    return true;
                } else {
                    // return false to indicate failed login
                    alert(response.message);
                    return true;
                }
            });
    }

}


