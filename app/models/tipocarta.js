const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tipocarta', {
    idTipoCarta: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    descripcion: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tipocarta',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idTipoCarta" },
        ]
      },
      {
        name: "idtipocarta_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idTipoCarta" },
        ]
      },
    ]
  });
};
