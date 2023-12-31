const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/jornalismo-cidadao.db');

exports.inserirNoticia = (title, description, location, like, callback) => {

    const sql = `
          INSERT INTO noticias (titulo, descricao, localizacao, likes)
          VALUES (?, ?, ?, ?)
        `;

    db.run(sql, [title, description, location, like], (err) => {
        if (err) {
            console.error(err.message);
            return callback(null, { error: 'Erro ao salvar no banco de dados.' });

        }

        callback(null, { message: 'Arquivo enviado com sucesso.' });
    });
};

exports.buscarNoticias = (callback) => {
    const sql = `
    SELECT * FROM noticias
  `;

    db.all(sql, [], (err, rows) => {
        if (err) {
            console.log(err);

            return callback(null, { error: 'Erro ao buscar notícias.' });
        }

        console.log(rows);
        callback(null, { noticias: rows });
    });
};

exports.interacaoNoticia = (idNoticia, callback) =>{
    const sql = `
    UPDATE noticias SET likes = likes+1 WHERE id = ${idNoticia}
  `;
  db.run(sql, [], (err) =>{
    if (err) {
        console.error(err.message);
        return callback(null, { error: 'Erro ao salvar no banco de dados.' });

    }

    callback(null, { message: 'Like adicionado' });
  })
}
