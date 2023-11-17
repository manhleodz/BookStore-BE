module.exports = (sequelize, DataTypes) => {
    const ImageProducts = sequelize.define("ImageProducts", {
        path: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        DetailProductId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

    // ImageProducts.associate = (models) => {
    //     ImageProducts.belongsTo(models.DetailProduct, {
    //         onDelete: "cascade",
    //     })
    // }
    return ImageProducts;
}