# crud-frontend

Este proyecto se encuentra desarrollado con Vue, Vite, TypeScript junto a otros paquetes y librerías.
Para acceder al proyecto de **backend desarrollado con PHP y Laravel** [haz clic sobre este enlace](https://github.com/darkmclo/crud-backend).

## Software necesario

Para ejecutar el proyecto, es necesario tener el siguiente software instalado:

1. **Node.js** (v20.19.6 o superior) [Canal LTS] - [Descargar](https://nodejs.org/en/download/prebuilt-installer)
2. **pnpm** (última versión estable)
    - Al finalizar la instalación de Node.js, ejecutar el siguiente comando en la terminal (Shell, CMD, PowerShell, etc) de su sistema para
    configurar Corepack:
    ```sh
    npm install --global corepack@latest
    ```

    - Con Corepack, habilitar `pnpm`:
    ```sh
    corepack enable pnpm
    ```

    - Actualizar a última versión:
    ```sh
    corepack use pnpm@latest
    ```

## Instalación del proyecto

Clonar o descargue este repositorio en la ubicación de su preferencia. Seguido de esto entre a el directorio raíz (`crud-frontend`), y ejecute los siguientes comandos:

#### 1. Configuración del proyecto e instalación de dependencias
```sh
pnpm install
```

#### 2. Desplegar el proyecto en ambiente de desarrollo (dev)
```sh
pnpm dev
```
El proyecto se encontrará desplegado y ejecutando de manera local, por lo general mediante la dirección `http://localhost:5173/`.

##### (Opcional) Genere una build para producción si lo desea
```sh
pnpm build
```