import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Permisos } from '../shared/permisos.model';
import { PermisosService } from '../shared/permisos.service';

@Component({
  selector: 'app-permisos-list',
  templateUrl: './permisos-list.component.html',
  styles: [
  ]
})
export class PermisosListComponent implements OnInit {

  constructor(private service: PermisosService, private toastr: ToastrService, private router: Router) { }

  permiso: Permisos = new Permisos();
  loading: boolean = false;
  permisos: Permisos[] = [];

  ngOnInit(): void {
    this.getPermisos();
  }

  confirmDelete(permiso: Permisos){
    if(!confirm('¿Seguro deseas eliminar esta solicitud?')) return;

    this.permiso = permiso;
    this.deletePermiso();
  }

  editPermiso(id: number){
    this.router.navigateByUrl(`permisos/${id}`);
  }

  getPermisos(){
    this.service.fetchPermisos().subscribe(
      res => {
        this.permisos = res as Permisos[];

        // Formatting date
        this.permisos.map(permiso => permiso.fechaPermiso = new Date(permiso.fechaPermiso)
                                                              .toISOString().substr(0, 10));
      },
      error => this.toastr.error('Ha ocurrido un error al cargar los permisos', 'Error'), 
    );
  }

  deletePermiso(){
    this.loading = true;

    this.service.deletePermiso(this.permiso.id).subscribe(
      res => {
        this.toastr.success('Se ha eliminado la solicitud', 'Eliminado');
        this.getPermisos();
      },
      error => this.toastr.error('Ha ocurrido un error al eliminar la solicitud', 'Error'),
      () => this.loading = false
    );
  }

  newPermiso(){
    this.router.navigateByUrl('permisos/new');
  }

}
