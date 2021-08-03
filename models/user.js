const { Schema, model } = require('mongoose')

const UserSchema = Schema({
	name: {
		type: String,
		required: [true, 'el nombre es obligatorio'],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'el password es obligatorio'],
	},
	role: {
		type: String,
		required: true,
		default: 'USER',
		// enum: ['ADMIN', 'USER','SALES'],
	},
})

//para sobrescribir un metodo tiene que ser function porque usa contexto this
// no vamos a ver ni la version __v ni el password en la response con el json
UserSchema.methods.toJSON = function () {
	const { __v, password, _id, ...user } = this.toObject()
	return { ...user, uid: _id }
}

//mongoose le agrega el prural automatiamente a la coleccion por eso se pone en minuscula
module.exports = model('User', UserSchema)
