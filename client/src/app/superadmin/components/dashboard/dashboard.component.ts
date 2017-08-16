import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  hospitalLists;
  noOfHospitals;
  noOfActiveHospitals = 0;
  noOfInactiveHospitals = 0;

  constructor(
    private hospitalService:HospitalService
  ) { }

  getAllHospitals(){
    this.hospitalService.getHospitals().subscribe(data => {
      
      this.hospitalLists = data.message;
      
      this.noOfHospitals = this.hospitalLists.length;

      for(let i = 0;i<this.hospitalLists.length;i++){
        if(this.hospitalLists[i].active){
          this.noOfActiveHospitals++;
        } else {
          this.noOfInactiveHospitals++;
        }
      }
    });
  }

  

  ngOnInit() {
    this.getAllHospitals();
  }

}
