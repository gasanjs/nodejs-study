module.exports = (sequelize, DataTypes) => (
  sequelize.define('post', {
    title: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true
    }
  }, {
    timestamps: true,
    paranoid: true
  })
)
