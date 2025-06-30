const SearchHistory = require('../db_sequelize.js').SearchHistory;

async function getHistory(req, res) {
  try {
   
    const history = await SearchHistory.findAll({ where: { user_id: id } });

    if (history.length === 0) {
      res.status(404).send("Nenhum histórico de pesquisa encontrado.");
    }
    else
        res.status(200).send(history);

  } catch (error) {
    res.status(500).send(error);
  }
}

async function clearHistory(req, res) {
  try {

    const deletedCount = await SearchHistory.destroy({ where: { user_id: id } });

    if (deletedCount === 0) {
        res.status(404).send("Nenhum histórico para apagar.");
    }
    else
        res.status(200).send("Histórico apagado com sucesso.");

  } catch (error) {
    res.status(500).send(error);
  }
}


