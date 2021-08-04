const express = require('express')

const cors = require('cors')

const fileUpload = require('express-fileupload')
const { dbConnection } = require('../database/config')

class Server {
	constructor() {
		this.app = express()
		this.port = process.env.PORT || 3001
		this.paths = {
			user: '/api/users',
			videos: '/api/videos',
			uploads: '/api/uploads',
		}

		this.connectDb()

		this.middlewares()

		this.routes()
	}

	async connectDb() {
		await dbConnection()
	}

	middlewares() {
		this.app.use(cors())
		this.app.use(express.json())

		this.app.use(
			fileUpload({
				useTempFiles: true,
				tempFileDir: '/tmp/',
				// cuando ejecutamos la funcion mv para guardar el archivo en un directorio con esta opcion crea la carpeta si no existe (createParentPath)
				createParentPath: true,
			})
		)
	}

	routes() {
		this.app.use(this.paths.user, require('./../routes/user')),
			this.app.use(this.paths.uploads, require('./../routes/videos'))
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log('server ready')
		})
	}
}

module.exports = Server
