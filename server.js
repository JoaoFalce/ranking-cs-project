// Importando dependências
const express = require("express");
const mysql = require("mysql"); 
const cors = require("cors"); // CORS para permitir requisições de outros domínios

// Iniciando o aplicativo Express
const app = express();
const PORT = 3001; 

// Configuração do banco de dados MySQL
const db = mysql.createConnection({
  host: "localhost", 
  user: "root",
  password: "*********",
  database: "rankingCS",
});

// Conectando ao banco de dados MySQL
db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
  } else {
    console.log("Conectado ao banco de dados!");
  }
});

// Configurando middleware para permitir requisições de qualquer origem
app.use(cors());
app.use(express.json());

// Rota para buscar os dados do ranking
app.get("/ranking", (req, res) => {
  const query = `
        SELECT jogadores.nickname AS jogador, 
               estatisticas.kills, 
               estatisticas.deaths, 
               estatisticas.assists
        FROM estatisticas
        JOIN jogadores ON estatisticas.id_jogador = jogadores.id_jogador
        ORDER BY estatisticas.kills DESC;
    `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Erro ao buscar o ranking:", err);
      res.status(500).send("Erro no servidor");
    } else {
      res.json(results); // Retorna os dados do ranking em formato JSON
    }
  });
});

// Iniciando o servidor Express
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

//CASO EU QUEIRA QUE OS DADOS SEJAM INSERIDOS AUTOMATICAMENTE A PARTIR DO LOG DO JOGO, SEGUIR OS SEGUINTES PASSOS:
// Leitura do log: Use o Node.js para ler o arquivo de log e extrair as informações relevantes.
// Inserção no banco: Insira os dados extraídos do log no banco de dados.
// Frontend: Seu HTML e JavaScript já estão configurados para exibir esses dados.
