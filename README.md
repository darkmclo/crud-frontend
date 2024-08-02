# crud-frontend

Este es proyecto se encuentra desarrollado con Vue, Vite, y demás paquetes y herramientas.
Para acceder al proyecto de **backend desarrollado con PHP y Laravel** [haz clic sobre este enlace](https://github.com/darkmclo/crud-backend).

## Software necesario

Para ejecutar el proyecto, es necesario tener el siguiente software instalado:

1. **Node.js** (v20.15.1 o superior) [Canal LTS] - [Descargar](https://nodejs.org/en/download/prebuilt-installer)
2. **yarn** (última versión estable)
    - Al finalizar la instalación de Node.js, ejecutar el siguiente comando en la terminal (Shell, CMD, PowerShell, etc) de su sistema:
    ```sh
    npm install --global yarn
    ```

## Instalación del proyecto

Clone o descargue este repositorio en la ubicación de su preferencia. Seguido de esto entre a el directorio raíz (`crud-frontend`), y ejecute los siguientes comandos:

#### 1. Configuración del proyecto e instalación de dependencias
```sh
yarn
```

#### 2. Compile el proyecto para desarrollo
```sh
yarn dev
```
El proyecto se encontrará desplegado y ejecutando de manera local, por lo general mediante la dirección `http://localhost:5173/`.

##### (Opcional) Genere una build para producción si lo desea
```sh
yarn build
```