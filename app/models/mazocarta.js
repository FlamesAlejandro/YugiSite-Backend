const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mazocarta', {
    idMazoCarta: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Carta_idCarta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'carta',
        key: 'idCarta'
      }
    },
    Mazo_idMazo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'mazo',
        key: 'idMazo'
      }
    }
  }, {
    sequelize,
    tableName: 'mazocarta',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idMazoCarta" },
        ]
      },
      {
        name: "idMazoCarta_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idMazoCarta" },
        ]
      },
      {
        name: "fk_MazoCarta_Carta1_idx",
        using: "BTREE",
        fields: [
          { name: "Carta_idCarta" },
        ]
      },
      {
        name: "fk_MazoCarta_Mazo1_idx",
        using: "BTREE",
        fields: [
          { name: "Mazo_idMazo" },
        ]
      },
    ]
  });
};
