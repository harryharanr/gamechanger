import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  noOfHospitals;

  constructor(
    private hospitalService:HospitalService
  ) { }

  getAllHospitals(){
    this.hospitalService.getHospitals().subscribe(data => {
      this.noOfHospitals = data.message.length;
    });
  }

  

  ngOnInit() {
    this.getAllHospitals();
  }

}
