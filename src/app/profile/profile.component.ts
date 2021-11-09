import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormArray, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthConfig } from 'angular-oauth2-oidc';
import { User } from '../model/user';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  
  profileForm!: FormGroup;
  user!: User;

  constructor(private fb: FormBuilder, private userService: UserServiceService) { }
  
  ngOnInit(): void {
    this.employeeForm();
  }


  employeeForm() {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      address: this.fb.group({
        street: [''],
        city: [''],
        state: [''],
        zip: ['']
      }),
      aliases: this.fb.array([
        this.fb.control('')
      ])
    });
  }

  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }



  addAlias() {
    this.aliases.push(this.fb.control(''));
  }


  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
    this.user = Object.assign(this.user, this.profileForm.value);
    this.userService.addUser(this.user);
  }  

 
}

