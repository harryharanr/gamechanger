import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import  { HospitalService } from '../services/hospital.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message;

  user = {
    username:'',
    password:''
  }

  constructor(
    private router:Router,
    private hospitalService:HospitalService
  ) { }

  loadUserModule(user){
    this.hospitalService.login(user).subscribe(data => {
      if(!data.success){
        this.message = data.message;
      }
      else {  
        this.hospitalService.storeUserData(data.token , data.user); //Stores user data in local storage
        if(data.message.usertype === 'superadmin'){
          this.router.navigate(['superadmin/dashboard']);
        } else if(data.message.usertype === 'hospitaladmin'){
          this.router.navigate(['hospitaladmin/dashboard']);
        } 
      }
    });
  }

  ngOnInit() {
  }


}
