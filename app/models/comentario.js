const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comentario', {
    idComentario: {
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
    },
    comentariotexto: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'comentario',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idComentario" },
        ]
      },
      {
        name: "idComentario_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idComentario" },
        ]
      },
      {
        name: "fk_Comentario_Mazo1_idx",
        using: "BTREE",
        fields: [
          { name: "Mazo_idMazo" },
        ]
      },
      {
        name: "fk_Comentario_Usuario1_idx",
        using: "BTREE",
        fields: [
          { name: "Usuario_idUsuario" },
        ]
      },
    ]
  });
};
