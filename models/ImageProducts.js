module.exports = (sequelize, DataTypes) => {
    const ImageProducts = sequelize.define("ImageProducts", {
        path: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        DetailProductId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    });

    ImageProducts.associate = (models) => {
        ImageProducts.hasOne(models.DetailProduct, {
            onDelete: "cascade",
        })
    }
    return ImageProducts;
}