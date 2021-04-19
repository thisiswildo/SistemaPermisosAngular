import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Permisos } from '../shared/permisos.model';
import { PermisosService } from '../shared/permisos.service';
import { TipoPermiso } from '../shared/tipo-permiso.model';
import { TipoPermisoService } from '../shared/tipo-permiso.service';

@Component({
  selector: 'app-permiso-form',
  templateUrl: './permiso-form.component.html',
  styles: [
  ]
})
export class PermisoFormComponent implements OnInit {

  constructor(public service: PermisosService, public tipoPermisoService: TipoPermisoService,
              private toastr: ToastrService, private route: ActivatedRoute, private router: Router) { }

  tiposPermisos: TipoPermiso[] = [];
  loading: boolean = false;
  id: number = 0;
  notFound: boolean = false;

  ngOnInit(): void {
    this.service.formData = new Permisos();
    
    this.route.params.subscribe(
      params => {
        const paramsId = parseInt(params['id']);
        this.id = isNaN(paramsId) ? 0 : paramsId;
        if(!this.id)return;

        this.service.fetchPermiso(paramsId).subscribe(
          res => {
            Object.assign(this.service.formData, res);
            this.service.formData.fechaPermiso = new Date(this.service.formData.fechaPermiso).toISOString().substr(0, 10);
          },
          err => {
            this.notFound = err?.status === 404;
            if(!this.notFound) this.toastr.error('Ha ocurrido un error al cargar el permiso', 'Error');
          }
        );
      }
    );
    
    this.tipoPermisoService.fetchTipoPermisos().subscribe(
      res => this.tiposPermisos = res as TipoPermiso[],
      err => this.toastr.error('Ha ocurrido un error al cargar los tipos permisos', 'Error')
    );
  }

  resetForm(form: NgForm){
    form.form.reset();
    this.service.formData = new Permisos();
  }

  goBack(){
    this.router.navigateByUrl('permisos');
  }

  onSubmit(form: NgForm){
    this.loading = true;

    if(!this.service.formData.apellidosEmpleado || !this.service.formData.nombreEmpleado ||
      !this.service.formData.tipoPermisoId || !this.service.formData.fechaPermiso){
      this.toastr.error('Complete los campos requeridos por favor!', 'Error');
      return;
    }

    if(this.id){
      this.service.putPermiso(this.id)
      .subscribe(
        res => this.toastr.success('Se ha actualizado el permiso correctamente', 'Completado'),
        err => this.toastr.error('Ha ocurrido un error durante la petición', 'Error'),
        () => {
          this.loading = false;
          this.resetForm(form);
          this.router.navigateByUrl('permisos');
        }
      )
      return;
    }
    this.service.postPermiso()
    .subscribe(
      res => this.toastr.success('Se ha solicitado el permiso correctamente', 'Completado'),
      err => this.toastr.error('Ha ocurrido un error durante la petición', 'Error'),
      () => {
        this.loading = false;
        this.resetForm(form);
        this.router.navigateByUrl('permisos');
      }
    )
  }
}
