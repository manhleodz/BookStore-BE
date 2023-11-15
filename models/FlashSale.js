module.exports = (sequelize, DataTypes) => {
    const FlashSale = sequelize.define("FlashSale", {
        endTime: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }

    });
    FlashSale.associate = (models) => {
        FlashSale.belongsTo(models.Products, {
            onDelete: "cascade",
        })
    }
    return FlashSale;
}