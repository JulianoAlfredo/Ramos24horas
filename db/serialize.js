const db = new sqlite3.Database('jornalismo-cidadao.db');
exports.serialize = () =>{
    db.serialize(() => {
        db.run(`
          CREATE TABLE IF NOT EXISTS noticias (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT,
            descricao TEXT,
            localizacao TEXT,
            arquivo TEXT
          )
        `);
        db.run(`CREATE TABLE IF NOT EXISTS user(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT,
          password TEXT,
          bio TEXT
          )
        `)
      });
}
