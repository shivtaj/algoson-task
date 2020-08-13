import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from "./models/user.model";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser: User = {
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: ""
    // Caption:''
  };

  noAuthHeader = { headers: new HttpHeaders({ NoAuth: "True" }) };

  constructor(private http: HttpClient) {}
  postUser(user: User) {
    return this.http.post(
      environment.baseUrl + "/register",
      user,
      this.noAuthHeader
    );
  }

  editUser() {
    return this.http.post(
      environment.baseUrl + "/editregister",
      this.noAuthHeader
    );
  }


  showUser() {
    return this.http.get(environment.baseUrl + "/userlist");
  }

  deleteUser(id): Observable<any> {
    let url = `${environment.baseUrl}/delete/${id}`;
    return this.http.delete(url, id)
  }



  // setToken(token: string) {
  //   localStorage.setItem("token", token);
  // }

  // getToken() {
  //   return localStorage.getItem("token");
  // }

  // deleteToken() {
  //   localStorage.removeItem("token");
  // }

  // getUserPayload() {
  //   var token = this.getToken();
  //   if (token) {
  //     var userPayload = atob(token.split(".")[1]);
  //     return JSON.parse(userPayload);
  //   } else return null;
  // }
  // getUserProfile() {
  //   return this.http.get(environment.baseUrl + "/userProfile");
  // }

  // isLoggedIn() {
  //   var userPayload = this.getUserPayload();
  //   if (userPayload) return userPayload.exp > Date.now() / 1000;
  //   else return false;
  // }
}

