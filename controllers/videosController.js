const { uploadFile } = require('../helpers/uploadFile')
const Video = require('./../models/video')
const fs = require('fs')
const path = require('path')

const uploadVideo = async (req, res) => {
	const { folder } = req.params
	const { description, name, ritmo } = req.body
	console.log(ritmo)
	console.log(req.body)

	try {
		const fileName = await uploadFile(req.files, undefined, ritmo)
		const video = new Video({
			name,
			description,
			ritmo,
			path: fileName,
		})
		// console.log(fileName)

		await video.save()

		res.status(200).json({
			msg: name,
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			msg: 'algo salio mal intentalo mas tarde',
		})
	}
}

const getFolders = (req, res) => {
	const folders = fs.readdirSync(__dirname + '/../uploads')
	// console.log(folders)
	res.send({ folders })
}

const getVideosName = async (req, res) => {
	const { folder } = req.params

	const videos = await Video.find({ ritmo: folder })
	// console.log(videos)
	res.status(200).json({
		msg: 'ok',
		data: videos,
	})
}

const getVideo = (req, res) => {
	const { folder, route } = req.params
	const pathFile = path.join(__dirname, '/../uploads', folder, route)
	res.sendFile(pathFile)
}

module.exports = {
	uploadVideo,
	getFolders,
	getVideosName,
	getVideo,
}
