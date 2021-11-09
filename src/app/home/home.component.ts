import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { ThrowStmt } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/user';
import { NotifierService } from '../notifier.service';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  EmployeeForm!: FormGroup;
  user!: User;
  userSubmitted: boolean = false;
  isLinear = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  ThirdFormGroup!: FormGroup;



  constructor(private notifierService: NotifierService, private fb: FormBuilder, private userService: UserServiceService) { }

  ngOnInit() {
   this.employeeAdd();
    // this.firstFormGroup = this.fb.group({
    //   firstCtrl: ['', Validators.required],
    // });
    // this.secondFormGroup = this.fb.group({
    //   age: ['', [Validators.required,Validators.maxLength(2)]],
    // });
    // this.ThirdFormGroup = this.fb.group({
    //   secondCtrl: ['', Validators.required]
    // })
  }

  employeeAdd() {
    this.firstFormGroup = this.fb.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this.fb.group({
      age: ['', [Validators.required,Validators.maxLength(2)]],
    });
    this.ThirdFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required]
    })
  }

  // employeeAdd() {
  //   this.EmployeeForm = this.fb.group({
  //     name: [null, Validators.required],
  //     age: [null, Validators.required],
  //     city: [null, Validators.required],
  //     place: [null, Validators.required],
  //     state: [null, Validators.required],
  //     zipCode: [null, [Validators.required, Validators.maxLength(6)]]
  //   })
  // }

  myFunction() {
    console.warn(this.firstFormGroup.value);
    console.log(this.secondFormGroup.value);
    console.log(this.ThirdFormGroup.value);
    this.userService.addUser(this.userData());
    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
    this.ThirdFormGroup.reset();
    this.notifierService.showNotification('Employee Added', 'OK');
  }
  // myFunction() {
  //   console.warn(this.EmployeeForm.value);
  //   this.userSubmitted = true;
  //   if(this.EmployeeForm.valid){
  //     //this.user = Object.assign(this.user, this.EmployeeForm.value);
  //     this.userService.addUser(this.userData());
  //     this.EmployeeForm.reset();
  //     this.notifierService.showNotification('Employee Added', 'OK');
  //     this.userSubmitted = false;
  //   }  
  // }

  userData(): User {
    return this.user = {
      name: this.name.value,
      age: this.age.value,
      address: this.address.value
    } 
  }

  get name() {
    return this.firstFormGroup.get('firstCtrl') as FormControl;
  }

  get age() {
    return this.secondFormGroup.get('age') as FormControl;
  }

  get address() {
    return this.ThirdFormGroup.get('secondCtrl') as FormControl;
  }
  // userData(): User {
  //   return this.user = {
  //     name: this.name.value,
  //     age: this.age.value,
  //     city: this.city.value,
  //     place: this.place.value,
  //     state: this.state.value,
  //     zipCode: this.zipCode.value
  //   }
  // }
  
  // get name() {
  //   return this.EmployeeForm.get('name') as FormControl;
  // }

  // get city() {
  //   return this.EmployeeForm.get('city') as FormControl;
  // }

  // get age() {
  //   return this.EmployeeForm.get('age') as FormControl;
  // }

  // get place() {
  //   return this.EmployeeForm.get('place') as FormControl;
  // }

  // get state() {
  //   return this.EmployeeForm.get('state') as FormControl;
  // }

  // get zipCode() {
  //   return this.EmployeeForm.get('zipCode') as FormControl;
  // }
}
