const { Schema, model } = require('mongoose')

const VideoShema = Schema({
	name: {
		type: String,
		required: [true, 'el nombre es obligatorio'],
	},
	ritmo: {
		type: String,
		required: [true, 'ingrese un ritmo'],
	},
	description: {
		type: String,
	},
	path: {
		type: String,
	},
})

VideoShema.methods.toJSON = function () {
	const { __v, _id, ...video } = this.toObject()
	return { ...video, uid: _id }
}

//mongoose le agrega el prural automatiamente a la coleccion por eso se pone en minuscula
module.exports = model('Video', VideoShema)
