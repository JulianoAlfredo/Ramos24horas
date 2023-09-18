const { tratarResponse } = require('../../miscellaneous/tratarResponse');
const { inserirNoticia, buscarNoticias, interacaoNoticia } = require('../../service/noticiasService/noticiasServices');

exports.uploadNoticia = (req, res) => {
    const { title, description, location, likes } = req.body;
    inserirNoticia(title, description, location, likes,(err, result) =>{
        tratarResponse(err, result, req, res)
    })
};

exports.getNoticias = (req, res) => {
    buscarNoticias((err,result) =>{
        tratarResponse(err, result, req, res)
    })
};

exports.interactionNoticia = (req, res) =>{
    interacaoNoticia(req.params.idNoticia, (err, result) =>{
        tratarResponse(err, result, req, res)
    })
}
