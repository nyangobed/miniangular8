import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {NgxPermissionsService} from 'ngx-permissions';
import {LocalStorage} from '@ngx-pwa/local-storage';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit {

    // tslint:disable-next-line:no-inferrable-types
    isActive: boolean = false;
    // tslint:disable-next-line:no-inferrable-types
    showMenu: string = '';
    // tslint:disable-next-line:no-inferrable-types
    pushRightClass: string = 'push-right';
    username: string;
    // tslint:disable-next-line:no-inferrable-types
    rolePerm: boolean = true;

    change(): void {
        //('===> Sidebar has changed...');
    }

    constructor(private translate: TranslateService, public router: Router, private permissionsService: NgxPermissionsService, protected locStorage: LocalStorage) {
        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de/) ? browserLang : 'en');
        this.username = localStorage.getItem('username');

        this.locStorage.getItem<string>('username').subscribe((username) => {
            this.username = username;
        });
    }

    ngOnInit(): void {
        // this.locStorage.getItem<ResponseWrapper<VerifyOtpResponse>>('userData').subscribe((userdata) => {
        //     this.permissionsService.loadPermissions(userdata.data.permissions);
        // });
    }

    ngAfterViewInit(): void {
        if (document.getElementById('test-perm')) {
            //('======> Found test permission');
        }
    }

    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    onLoggedout() {
        localStorage.clear();
        this.locStorage.clear().subscribe(() => {
        });
        this.router.navigate(['/login']);
    }
}
