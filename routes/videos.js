const {
	uploadVideo,
	getFolders,
	getVideosName,
	getVideo,
} = require('../controllers/videosController')
const validateFile = require('../middlewares/validateFile')

const router = require('express').Router()

router.post('/:folder', validateFile, uploadVideo)

router.get('/', getFolders)

router.get('/:folder', getVideosName)
router.get('/:folder/:route', getVideo)

module.exports = router
