# Economy Platform backend - Francisco Castillo

### Express, Swagger, ESLint, axios, utils entre otros

## Scripts disponibles

Debido a que se trabaja con una BD Redis, se debe levantar la aplicación utilizando Docker:

### `docker-compose -f docker-compose-local.yml up --force-recreate`

y para correr los test

### `docker-compose -f docker-compose-local.yml run --rm node npm run test`

comando el cual permite correr los test unitarios levantando correctamente la instancia de REDIS.

## Resumen:
* Se divide en modelo vista controlador
* Se tiene una carpeta de utilidades transversales al servicio
* Se tiene una carpeta de configuración en donde se centraliza las conexiones a las distintas bases de datos (REDIS en este caso) y las constantes de configuración escencial para el servicio.
* ESLint y Prettier para una mejor práctica.
* Docker multistage
* Pruebas con Jest en su carpeta __TEST__
* REDIS está configurado para almacenar la data por 2 minutos, contestando así la data en caché sin tener que consultar a la API externa en caso de ser consumido con los mismos parámetros.
* En caso de no tener la data almacenada en REDIS, el servicio consulta a la API https://www.indecon.online/ y almacena la respuesta en su BD volátil con las keys 
```
const PATH_LAST = '/last';
const PATH_VALUES = ({ key }) => `/values/${key}`;
const PATH_DATE = ({ key, date }) => `/date/${key}/${date}`;
```
* Para una estandarización de la respuesta, se utiliza la función formateadora que siempre entrega un objeto con el siguiente formato:
```
{
  status: number;
  message: string;
  data: ( array | object | string );
}
```

## Estructura de carpeta:
```
.
├── app.js
├── config
│   ├── index.js
│   ├── redisClient.js
│   └── responseCodes.js
├── controllers
│   ├── economyControllers
│   │   ├── date.js
│   │   ├── last.js
│   │   └── values.js
│   └── versionControllers
│       └── index.js
├── models
├── routes
│   ├── economyRoutes
│   │   ├── dateEP.js
│   │   ├── index.js
│   │   ├── lastEP.js
│   │   └── valuesEP.js
│   ├── index.js
│   └── versionRoutes
│       ├── index.js
│       └── version.js
├── schemas
├── services
│   ├── dateService.js
│   ├── lastService.js
│   └── valuesService.js
└── utils
    ├── accessControl.js
    ├── pagination.js
    ├── request.js
    ├── responseFormatter.js
    └── validation.js
```