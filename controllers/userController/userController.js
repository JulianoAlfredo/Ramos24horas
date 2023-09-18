const { criarUsuario, buscarUsuarioPorUsername } = require('../../service/userService/userService');

exports.createUser = (req, res) => {
    const { username, password, bio } = req.body;
  
    criarUsuario(username, password, bio, (err, result) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Algo deu errado" });
      }
      return res.status(200).json(result);
    });
  };

exports.getUserByUsername = (req, res) => {
 buscarUsuarioPorUsername(req.params.usuario, (err, result) =>{
    if(err){
        console.error(err.message);
        return res.status(500).json({ error: "Algo deu errado" });
    }
    return res.status(200).json(result)
 })
};
