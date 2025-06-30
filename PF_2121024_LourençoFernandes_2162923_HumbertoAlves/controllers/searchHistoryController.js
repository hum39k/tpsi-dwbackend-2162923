const SearchHistory = require('../db_sequelize.js').SearchHistory;

exports.getHistory = async function (req, res) {
  try {
   const id = req.user.user_id;
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

exports.clearHistory = async function (req, res) {
  try {
    const id = req.user.user_id;
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

exports.addHistory = async function (req,res) {

        var id = req.user.user_id;
        var text = req.body.text;
        var product = await SearchHistory.create({ user_id : id, search_text : text});
        res.status(201).send(product);

}