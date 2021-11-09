import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthConfig } from 'angular-oauth2-oidc';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authservice: AuthService,	private router: Router) {

  }
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //     var isAuthenticated = this.authservice.getAuthStatus();
	//   // 	if (!isAuthenticated) {
	//   // 		this.router.navigate(['/login']);
	//   // 	}
	// 	// return isAuthenticated;
  // }
  
}
// import { Injectable } from "@angular/core";
// import {
// 	ActivatedRouteSnapshot,
// 	CanActivate,
// 	Router,
// 	RouterStateSnapshot,
// 	UrlTree
// } from "@angular/router";
// import { AuthService } from "./auth.service";

// @Injectable()
// export class AuthGuard implements CanActivate {
// 	constructor(
// 		private authService: AuthService,
// 		private router: Router) { }
// 	canActivate(
// 		route: ActivatedRouteSnapshot,
// 		state: RouterStateSnapshot): boolean | Promise<boolean> {
// 		var isAuthenticated = this.authService.getAuthStatus();
// 		if (!isAuthenticated) {
// 			this.router.navigate(['/login']);
// 		}
// 		return isAuthenticated;
// 	}
// }
