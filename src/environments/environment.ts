import { EstadoCargo } from './../app/models/estadoCargo';
import { TipoCargo } from './../app/models/tipo-cargo';
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const URL = 'http://localhost:8080/';

export const environment = {
  production: false,
  usuarioURL: URL + 'usuarios/',
  agenteURL: URL + 'agentes/',
  authURL: URL + 'auth/',
  puntoURL: URL + 'puntos/',
  rolURL: URL + 'roles/',
  tipoDocURL: URL + 'api/v1/',
  transfURL: URL + 'transformacion/',
  unidadURL: URL + 'unidad/',
  tipoCargoURL: URL + 'tipocargos/',
  caracterURL: URL + 'caracteres/',
  EstadoCargoURL: URL + 'estadocargo/',
  cargoURL: URL + 'cargo/',
  plantaURL: URL + 'planta/',
  subunidadURL: URL + 'subunidad/',
  rolplantaURL: URL + 'rolplanta/',
  notificationURL: URL + 'notification/',
  API_URL: 'http://localhost:4200/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
