import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  original: string;
  showSuccessMessage: boolean;
  serverErrorMessage: any;

  
  constructor(public http: HttpClient,public router : Router, public userService: UserService, private activeModal: NgbActiveModal,
    private fb: FormBuilder
  ) {}

  ngOnInit() {

    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
  });
    
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    this.userService.postUser(this.registerForm.value).subscribe( res =>{
          console.log(res);
          this.original = JSON.stringify(res);
          this.showSuccessMessage =true;
          setTimeout(() =>this.showSuccessMessage = false,4000);
           this.router.navigateByUrl('/list');
        }, err =>{
          if(err.status === 422){
            this.serverErrorMessage = err.error.join('<br/>');
          }else{
            this.serverErrorMessage="something goes wrong ..check server side";
    
          }
        })  
}

}
