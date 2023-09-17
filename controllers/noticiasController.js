const { inserirNoticia, buscarNoticias } = require('../services/noticiasServices');

exports.uploadNoticia = (req, res) => {
    const { title, description, location } = req.body;
    const filename = req.file.filename;
    inserirNoticia(title, description, location, filename,(err, result) =>{
        if(err){
            console.log(err.message);
            return res.status(500).json({ error: "Algo deu errado" });
        }
        return res.status(200).json(result);
    })
};

exports.getNoticias = (req, res) => {
    buscarNoticias((err,result) =>{
        if(err){
            console.error(err.message);
            return res.status(500).json({ error: "Algo deu errado" });
        }
        return res.status(200).json(result)
    })
};
