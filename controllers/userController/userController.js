const { tratarResponse } = require('../../miscellaneous/tratarResponse');
const { criarUsuario, buscarUsuarioPorUsername } = require('../../service/userService/userService');

exports.createUser = (req, res) => {
  const { username, password, bio } = req.body;

  criarUsuario(username, password, bio, (err, result) => {
    tratarResponse(err, result, req, res)
  });
};

exports.getUserByUsername = (req, res) => {
  buscarUsuarioPorUsername(req.params.usuario, (err, result) => {
    tratarResponse(err, result, req, res)
  })
};
