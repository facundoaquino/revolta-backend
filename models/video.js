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
})

//para sobrescribir un metodo tiene que ser function porque usa contexto this
// no vamos a ver ni la version __v ni el password en la response con el json
VideoShema.methods.toJSON = function () {
	const { __v, _id, ...video } = this.toObject()
	return { ...video, uid: _id }
}

//mongoose le agrega el prural automatiamente a la coleccion por eso se pone en minuscula
module.exports = model('User', VideoShema)
