# Ejecución local
npm run start

# Se debe configurar un servidor nginx para correrlo, agregando en el archivo nginx.conf el siguiente fragmento
# poniendo como ruta en lugar de /app/ la ruta donde se encuentra el proyecto respecto a la carpeta /html
# Con este ejemplo la carpeta app se encuentra dentro de html y en la carpeta app es donde se encuentran los archivos generados de angular

```
    location / {
        root   html;
        index  index.html index.htm;
        try_files $uri $uri/ /app/index.html;
    }
```


# Xtream-admin-angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
