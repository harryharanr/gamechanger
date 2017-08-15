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
  showEditForm = false;
  editFromHospital = false;
  showTable = false;
  showAddBranchPage = false;

  newBranch = {
    hospitalId :'',
    newBranchId:'',
    newBranchName:'',
    newBranchEmail:''
  };

  branch = {
    hospitalId:'',
    branchName:'',
    branchEmail:''
  };

  newBranchEdit = {
    hospitalId :'',
    newBranchId:'',
    newBranchName:'',
    newBranchEmail:''
  }

  removeBranch = {
    hospitalId:'',
    branchId:''
  };

  removeBranchEdit = {
    hospitalId:'',
    branchId:''
  };



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
      for(let i=0;i<this.branchLists.length;i++){
        this.branchLists[i].hospitalId = id;
      }
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

  editBranch(id){
    this.newBranch.hospitalId = this.currentUrl.id;
    this.newBranch.newBranchId = id;
    this.showEditForm = true;
    this.hospitalService.getSingleBranch(this.newBranch).subscribe(data => {
      if(data.success){
        console.log(data.message);
        this.newBranch.newBranchId = data.message._id;
        this.newBranch.newBranchName = data.message.branchName;
        this.newBranch.newBranchEmail = data.message.branchEmail;
        this.newBranch.hospitalId = this.currentUrl.id;
      }
    });
  }

  updateBranch(newBranch){
    this.hospitalService.updateBranch(newBranch).subscribe(data => {
        if(data.success){
          this.showEditForm = false;
          this.hospitalService.getBranches(this.currentUrl.id).subscribe(data => {
            this.branchLists = data.message;
          });
        }
    });
  }

  deleteBranch(id){
    this.removeBranch.hospitalId = this.currentUrl.id;
    this.removeBranch.branchId = id;
    this.hospitalService.deleteBranch(this.removeBranch).subscribe(data => {
      if(data.success){
        this.hospitalService.getBranches(this.currentUrl.id).subscribe(data => {
            this.branchLists = data.message;
          });
      }
    });
  }

  editBranchFromSelectHospital(branchId,hospitalId){
    this.newBranchEdit.hospitalId = hospitalId;
    this.newBranchEdit.newBranchId = branchId;
    this.editFromHospital = true;
    this.hospitalService.getSingleBranch(this.newBranchEdit).subscribe(data => {
      if(data.success){
        console.log(data.message);
        this.newBranchEdit.newBranchId = data.message._id;
        this.newBranchEdit.newBranchName = data.message.branchName;
        this.newBranchEdit.newBranchEmail = data.message.branchEmail;
        this.newBranchEdit.hospitalId = hospitalId;
      }
    });
  }

  deleteBranchFromSelectHospital(branchId,hospitalId){
    this.removeBranchEdit.hospitalId = hospitalId;
    this.removeBranchEdit.branchId = branchId;
    this.hospitalService.deleteBranch(this.removeBranchEdit).subscribe(data => {
      if(data.success){
        this.hospitalService.getBranches(hospitalId).subscribe(data => {
            this.branchLists = data.message;
            for(let i=0;i<this.branchLists.length;i++){
                this.branchLists[i].hospitalId = hospitalId;
            }
          });
      }
    });
  }

  updateBranchEdit(newBranch){
    this.hospitalService.updateBranch(newBranch).subscribe(data => {
        if(data.success){
          this.editFromHospital = false;
          this.hospitalService.getBranches(newBranch.hospitalId).subscribe(data => {
            this.branchLists = data.message;
            for(let i=0;i<this.branchLists.length;i++){
                this.branchLists[i].hospitalId = newBranch.hospitalId;
            }
          });
        }
    });
  }

  goBack(){
    this.showEditForm = false;
  }

  goBackFromEdit(){
    this.editFromHospital = false;
  }

  ngOnInit() {
    this.hospitalService.getHospitals().subscribe(data => {
        this.hospitalLists = data.message;
        if(this.hospitalLists.length < 1){
          this.showAddBranchPage = false;
        } else {
          this.showAddBranchPage = true;
        }
      });

    this.currentUrl = this.activatedRoute.snapshot.params;
    if(this.currentUrl.id == undefined){
      this.selectHospital = true;
      this.hospitalService.getHospitals().subscribe(data => {
        this.hospitalLists = data.message;
        if(this.hospitalLists.length < 1){
          this.showAddBranchPage = false;
        }
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
