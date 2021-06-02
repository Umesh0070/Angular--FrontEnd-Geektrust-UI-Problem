import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';

const routes: Routes = [
  {
    path: 'app',
    component: AppComponent, 
    children: [
      { path: 'home', component: HomeScreenComponent},
    ],
  },
  { path: '',   redirectTo: 'app/home',pathMatch: 'full', }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
