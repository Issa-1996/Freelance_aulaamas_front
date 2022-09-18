import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit{
    showPassword: boolean = false;
    ngOnInit(){
    }
    showHidePassword() {
        this.showPassword = !this.showPassword;
      }
}
