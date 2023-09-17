const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/jornalismo-cidadao.db');

exports.criarUsuario = (username, password, bio, callback) => {
    const sql = `
      INSERT INTO user (username, password, bio)
      VALUES (?, ?, ?)
    `;

    db.run(sql, [username, password, bio], (err) => {
        if (err) {
            console.error(err.message);
            return callback(err, null);
        }
        callback(null, { message: "Usuário cadastrado com sucesso: " + username });
    });
};

exports.buscarUsuarioPorUsername = (username, callback) => {
    const sql = `
    SELECT * FROM user WHERE username ="${username}"
  `;
    db.all(sql, (err, rows) => {
        if (err) {
            console.log(err);
            return callback(err, null);
        }
        callback(null, { usuarios: rows });
    });
};
