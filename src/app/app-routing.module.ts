import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { NuevoproductoComponent } from './components/nuevoproducto/nuevoproducto.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'nuevoproducto/:id', component: NuevoproductoComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
