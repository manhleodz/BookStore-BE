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
            type: DataTypes.TEXT,
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
    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
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