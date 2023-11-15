module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define("Products", {
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        sold: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    });

    Products.associate = (models) => {
        Products.hasOne(models.DetailProduct, {
            onDelete: "cascade",
            foreignKey: "id",
        })
        Products.hasOne(models.FlashSale, {
            onDelete: "cascade",
        })
        Products.hasMany(models.Cart, {
            onDelete: "cascade",
        })
        Products.hasMany(models.Comments, {
            onDelete: "cascade",
            foreignKey: 'ProductId',
        });
    }
    return Products;
}