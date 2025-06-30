const { Model, DataTypes } = require('sequelize');

class SearchHistory extends Model {}

module.exports = (sequelize) => {
  SearchHistory.init({
    search_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    search_text: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    searched_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'SearchHistory',
    tableName: 'search_history',
    timestamps: false
  });

  return SearchHistory;
};
