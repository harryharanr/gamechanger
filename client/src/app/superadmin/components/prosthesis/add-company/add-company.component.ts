import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  constructor() { }

  name = '';
  hobbies: any= [
    {'hobby': 'Sport', 'selected': false},
    {'hobby': 'Music', 'selected': false},
    {'hobby': 'Reading', 'selected': false},
    {'hobby': 'Travelling', 'selected': false},
    {'hobby': 'Movies', 'selected': false},
    {'hobby': 'Cooking', 'selected': false},
];

data = {
  name:'',
  hobbies:''
}

// consoleHobbies()
// {
//    console.log(this.hobbies);
// }

save(){
  // console.log(this.name);
  // console.log(this.hobbies);
  this.data.name = this.name;
  this.data.hobbies = this.hobbies; 
  console.log(this.data);
}

  ngOnInit() {
  }

}
