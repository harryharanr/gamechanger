import { Injectable } from '@angular/core';
import { CanActivate,Router,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { HospitalService } from '../services/hospital.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private hospitalService:HospitalService,
        private router:Router
    ) {

    }

    canActivate(
        router : ActivatedRouteSnapshot,
        state : RouterStateSnapshot
    ){
        if(this.hospitalService.loggedIn()){
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}