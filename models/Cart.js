module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
        total: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        BillId: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    })
    Cart.associate = (models) => {
        Cart.belongsTo(models.Bill, {
            foreignKey: 'BillId',
            onDelete: "cascade",
        })
        Cart.belongsTo(models.Users, {
            onDelete: "cascade"
        })
        Cart.belongsTo(models.Products, {
            onDelete: "cascade"
        })
    }
    return Cart;
}