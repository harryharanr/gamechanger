import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HospitalService } from '../../../services/hospital.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router:Router,
    private hospitalService:HospitalService
  ) { }

  logout(){
    this.hospitalService.logout();
    this.router.navigateByUrl('http://localhost:4200');
  }


  ngOnInit() {
  }

}
