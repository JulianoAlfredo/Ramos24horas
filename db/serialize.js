const db = new sqlite3.Database('jornalismo-cidadao.db');
exports.serialize = () =>{
    db.serialize(() => {

        db.run(`
          CREATE TABLE IF NOT EXISTS noticias (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT,
            descricao TEXT,
            localizacao TEXT,
            likes INTEGER,
            arquivo TEXT
          )
        `);
    
        db.run(`CREATE TABLE IF NOT EXISTS user(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT,
          password TEXT,
          bio TEXT
          )
        `);
        db.run(`
        CREATE TABLE IF NOT EXISTS comentarios (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          noticia_id INTEGER, 
          texto TEXT,
          autor TEXT,
          data_publicacao DATETIME,
          FOREIGN KEY (noticia_id) REFERENCES noticias (id)
        );
        `)
      });
}
