const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('carta', {
    idCarta: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    ataque: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    defensa: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    imagen: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    estrellas: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    Atributo_idAtributo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'atributo',
        key: 'idAtributo'
      }
    },
    TipoCarta_idTipoCarta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tipocarta',
        key: 'idTipoCarta'
      }
    },
    Rareza_idRareza: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'rareza',
        key: 'idRareza'
      }
    },
    Tipo_idTipo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tipo',
        key: 'idTipo'
      }
    }
  }, {
    sequelize,
    tableName: 'carta',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idCarta" },
        ]
      },
      {
        name: "idCarta_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idCarta" },
        ]
      },
      {
        name: "fk_Carta_Atributo_idx",
        using: "BTREE",
        fields: [
          { name: "Atributo_idAtributo" },
        ]
      },
      {
        name: "fk_Carta_TipoCarta1_idx",
        using: "BTREE",
        fields: [
          { name: "TipoCarta_idTipoCarta" },
        ]
      },
      {
        name: "fk_Carta_Rareza1_idx",
        using: "BTREE",
        fields: [
          { name: "Rareza_idRareza" },
        ]
      },
      {
        name: "fk_Carta_Tipo1_idx",
        using: "BTREE",
        fields: [
          { name: "Tipo_idTipo" },
        ]
      },
    ]
  });
};
