import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Location } from "@angular/common";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  list: { type: string; value: any }[];
  showImg: any = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.showlist();
  }


  showlist(){
    this.userService.showUser().subscribe(res => {
      console.log(res)
      this.list = Object.keys(res).map(key => ({ type: key, value: res[key] }));
    });

  }


  deleteRow(i: any) {
    this.userService.deleteUser(i.value._id)
      .subscribe(res => {
        const index = this.list.indexOf(i);
        this.list.splice(index, 1);
        }, (err) => {
          console.log(err);
        }
      );
  }

}

