import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ViewDataComponent } from './view-data/view-data.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {path: 'home',component:HomeComponent},
  {path: 'Edit',component:ProfileComponent},
  {path: 'View',component:ViewComponent},
  {path: 'ViewData',component:ViewDataComponent},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
