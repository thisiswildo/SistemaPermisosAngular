export class Permisos {
    id: number = 0;
    nombreEmpleado: string;
    apellidosEmpleado: string;
    tipoPermisoId: number;
    tipoPermisoDescripcion: string;
    fechaPermiso: string;

    constructor(){
        this.id = 0;
        this.nombreEmpleado = '';
        this.apellidosEmpleado = '';
        this.tipoPermisoId = 0;
        this.tipoPermisoDescripcion = '';
        this.fechaPermiso = '';
    }
}