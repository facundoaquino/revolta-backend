# 🔐 Api/Backend para pagina de revolta Express/MongoDb

-   `npm install` para instalar librerias de node
-   crear archivo `development.env` en raiz

### cargar variable de entorno con conexion a mongo , ejemplo para conexion local

```javascript
MONGODB_CNN=mongodb://127.0.0.1:27017/carpeta
```

`npm run dev` para correr el proyecto y crear variable NODE_ENV en desarrollo
ya esta declarado en el `package.json`

```javascript
"scripts": {
		"dev": "set NODE_ENV=development&& nodemon server.js"...
```

[Front-React](https://github.com/facundoaquino/revolta-front-react)
