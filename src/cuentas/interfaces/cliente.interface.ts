export interface Cliente {
  clientid: string;
  nombre: string;
  genero: string;
  edad: number;
  identificacion: string;
  direccion: string;
  telefono: string;
  estado: boolean;
  contrasena: string;
  createdAt: Date;
  updatedAt: Date;
}
