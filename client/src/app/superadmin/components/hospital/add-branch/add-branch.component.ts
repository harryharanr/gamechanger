import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { HospitalService } from '../../../../services/hospital.service';

@Component({
  selector: 'add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.css']
})
export class AddBranchComponent implements OnInit {

  currentUrl;
  selectHospital;
  hospitalName;
  hospitalId;
  hospitalLists;
  showAddBranch = false;
  branchLists;

  branch = {
    hospitalId:'',
    branchName:'',
    branchEmail:''
  }

  constructor(
    private hospitalService:HospitalService,
    private activatedRoute:ActivatedRoute,
    private router:Router
  ) { }

  showAddBranchForm(id){
    this.showAddBranch = true;
    this.branch.branchName = '';
    this.branch.branchEmail = '';
    this.hospitalService.getBranches(id).subscribe(data => {
      this.branchLists = data.message;
    });
  }

  addBranch(branch){
    console.log(branch);
    this.hospitalService.addBranch(branch).subscribe(data => {
      console.log(data.message);
      this.branch.branchName = '';
      this.branch.branchEmail = '';
      this.showAddBranchForm(branch.hospitalId);
    });
  }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    if(this.currentUrl.id == undefined){
      this.selectHospital = true;
      this.hospitalService.getHospitals().subscribe(data => {
        this.hospitalLists = data.message;
      });
    } else {
      this.hospitalService.getSingleHospital(this.currentUrl.id).subscribe(data =>{
        if(data.success){
          this.hospitalName = data.message.hospitalName;
          this.branch.hospitalId = this.currentUrl.id;
          this.hospitalService.getBranches(this.currentUrl.id).subscribe(data => {
            this.branchLists = data.message;
          });
        }
      });
      this.selectHospital = false;
    }
  }

}
