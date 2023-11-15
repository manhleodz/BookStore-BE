module.exports = (sequelize, DataTypes) => {
    const DetailProduct = sequelize.define("DetailProduct", {
        
        ratingstars: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        release: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        publisher: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });

    DetailProduct.associate = (models) => {
        DetailProduct.hasMany(models.ImageProducts, {
            onDelete: "cascade",
            foreignKey: 'DetailProductId'
        })
        DetailProduct.belongsTo(models.Products, {
            onDelete: "cascade",
            foreignKey: 'id'
        })
    }
    return DetailProduct;
}