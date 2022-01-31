var DataTypes = require("sequelize").DataTypes;
var _atributo = require("./atributo");
var _carta = require("./carta");
var _comentario = require("./comentario");
var _like = require("./like");
var _mazo = require("./mazo");
var _mazocarta = require("./mazocarta");
var _rareza = require("./rareza");
var _rol = require("./rol");
var _tipo = require("./tipo");
var _tipocarta = require("./tipocarta");
var _usuario = require("./usuario");

function initModels(sequelize) {
  var atributo = _atributo(sequelize, DataTypes);
  var carta = _carta(sequelize, DataTypes);
  var comentario = _comentario(sequelize, DataTypes);
  var like = _like(sequelize, DataTypes);
  var mazo = _mazo(sequelize, DataTypes);
  var mazocarta = _mazocarta(sequelize, DataTypes);
  var rareza = _rareza(sequelize, DataTypes);
  var rol = _rol(sequelize, DataTypes);
  var tipo = _tipo(sequelize, DataTypes);
  var tipocarta = _tipocarta(sequelize, DataTypes);
  var usuario = _usuario(sequelize, DataTypes);

  carta.belongsTo(atributo, { as: "Atributo_idAtributo_atributo", foreignKey: "Atributo_idAtributo"});
  atributo.hasMany(carta, { as: "carta", foreignKey: "Atributo_idAtributo"});
  mazocarta.belongsTo(carta, { as: "Carta_idCarta_cartum", foreignKey: "Carta_idCarta"});
  carta.hasMany(mazocarta, { as: "mazocarta", foreignKey: "Carta_idCarta"});
  comentario.belongsTo(mazo, { as: "Mazo_idMazo_mazo", foreignKey: "Mazo_idMazo"});
  mazo.hasMany(comentario, { as: "comentarios", foreignKey: "Mazo_idMazo"});
  like.belongsTo(mazo, { as: "Mazo_idMazo_mazo", foreignKey: "Mazo_idMazo"});
  mazo.hasMany(like, { as: "likes", foreignKey: "Mazo_idMazo"});
  mazocarta.belongsTo(mazo, { as: "Mazo_idMazo_mazo", foreignKey: "Mazo_idMazo"});
  mazo.hasMany(mazocarta, { as: "mazocarta", foreignKey: "Mazo_idMazo"});
  carta.belongsTo(rareza, { as: "Rareza_idRareza_rareza", foreignKey: "Rareza_idRareza"});
  rareza.hasMany(carta, { as: "carta", foreignKey: "Rareza_idRareza"});
  usuario.belongsTo(rol, { as: "Rol_idRol_rol", foreignKey: "Rol_idRol"});
  rol.hasMany(usuario, { as: "usuarios", foreignKey: "Rol_idRol"});
  carta.belongsTo(tipo, { as: "Tipo_idTipo_tipo", foreignKey: "Tipo_idTipo"});
  tipo.hasMany(carta, { as: "carta", foreignKey: "Tipo_idTipo"});
  carta.belongsTo(tipocarta, { as: "TipoCarta_idTipoCarta_tipocartum", foreignKey: "TipoCarta_idTipoCarta"});
  tipocarta.hasMany(carta, { as: "carta", foreignKey: "TipoCarta_idTipoCarta"});
  comentario.belongsTo(usuario, { as: "Usuario_idUsuario_usuario", foreignKey: "Usuario_idUsuario"});
  usuario.hasMany(comentario, { as: "comentarios", foreignKey: "Usuario_idUsuario"});
  like.belongsTo(usuario, { as: "Usuario_idUsuario_usuario", foreignKey: "Usuario_idUsuario"});
  usuario.hasMany(like, { as: "likes", foreignKey: "Usuario_idUsuario"});
  mazo.belongsTo(usuario, { as: "Usuario_idUsuario_usuario", foreignKey: "Usuario_idUsuario"});
  usuario.hasMany(mazo, { as: "mazos", foreignKey: "Usuario_idUsuario"});

  return {
    atributo,
    carta,
    comentario,
    like,
    mazo,
    mazocarta,
    rareza,
    rol,
    tipo,
    tipocarta,
    usuario,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
