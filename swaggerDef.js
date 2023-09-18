/**
 * @swagger
 * components:
 *   schemas:
 *     Noticia:
 *       type: object
 *       properties:
 *         titulo:
 *           type: string
 *           description: Título da notícia.
 *         descricao:
 *           type: string
 *           description: Descrição da notícia.
 *         localizacao:
 *           type: string
 *           description: Localização da notícia.
 *         arquivo:
 *           type: string
 *           format: binary
 *           description: Nome do arquivo da notícia.
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Mensagem de erro.
 */

/**
 * @swagger
 * /noticias/upload:
 *   post:
 *     summary: Enviar uma nova notícia.
 *     description: Envia uma nova notícia para o servidor.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Título da notícia.
 *               descricao:
 *                 type: string
 *                 description: Descrição da notícia.
 *               localizacao:
 *                 type: string
 *                 description: Localização da notícia.
 *               arquivo:
 *                 type: file
 *                 description: Arquivo da notícia.
 *     responses:
 *       '200':
 *         description: Sucesso - A notícia foi enviada com sucesso.
 *       '500':
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /noticias/getNoticias:
 *   get:
 *     summary: Buscar todas as notícias.
 *     description: Retorna todas as notícias disponíveis no banco de dados.
 *     responses:
 *       '200':
 *         description: Sucesso - Retorna a lista de notícias.
 *       '500':
 *         description: Erro interno do servidor.
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: Nome de usuário.
 *         password:
 *           type: string
 *           description: Senha do usuário.
 *         bio:
 *           type: string
 *           description: Biografia do usuário.
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Mensagem de erro.
 */

/**
 * @swagger
 * /user/createUser:
 *   post:
 *     summary: Criar um novo usuário.
 *     description: Cria um novo usuário no sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       '200':
 *         description: Sucesso - O usuário foi cadastrado com sucesso.
 *       '500':
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /user/getUser/{username}:
 *   get:
 *     summary: Buscar usuário por nome de usuário.
 *     description: Retorna informações do usuário com base no nome de usuário.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome de usuário do usuário a ser buscado.
 *     responses:
 *       '200':
 *         description: Sucesso - Retorna informações do usuário.
 *       '500':
 *         description: Erro interno do servidor.
 */

module.exports = {};


module.exports = {};
