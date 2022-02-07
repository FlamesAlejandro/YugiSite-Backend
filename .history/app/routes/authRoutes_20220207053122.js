const { Router } = require('express');

const { PostLogin, } = require('../controllers/authController');

const router = Router();


router.get('/', usuariosGet );

router.put('/:id', usuariosPut );

router.post('/', usuariosPost );

router.delete('/', usuariosDelete );

router.patch('/', usuariosPatch );





module.exports = router;