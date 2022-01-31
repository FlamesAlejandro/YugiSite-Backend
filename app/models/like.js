const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('like', {
    idLike: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Mazo_idMazo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'mazo',
        key: 'idMazo'
      }
    },
    Usuario_idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuario',
        key: 'idUsuario'
      }
    }
  }, {
    sequelize,
    tableName: 'like',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idLike" },
        ]
      },
      {
        name: "idLike_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idLike" },
        ]
      },
      {
        name: "fk_Like_Mazo1_idx",
        using: "BTREE",
        fields: [
          { name: "Mazo_idMazo" },
        ]
      },
      {
        name: "fk_Like_Usuario1_idx",
        using: "BTREE",
        fields: [
          { name: "Usuario_idUsuario" },
        ]
      },
    ]
  });
};
