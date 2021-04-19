import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermisoFormComponent } from './permiso-form/permiso-form.component';
import { PermisosListComponent } from './permisos-list/permisos-list.component';

const routes: Routes = [
  { path: '',   redirectTo: '/permisos', pathMatch: 'full' },
  { path: 'permisos', component: PermisosListComponent },
  { path: 'permisos/new', component: PermisoFormComponent },
  { path: 'permisos/:id', component: PermisoFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
