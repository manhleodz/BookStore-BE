module.exports = (sequelize, DataTypes) => {
    const Coupon = sequelize.define("Coupon", {
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        code: {
            type: DataTypes.STRING,
            allowNull: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        OrderDate: {
            type: DataTypes.DATE,
            allowNull: true
        }
    })
    Coupon.associate = (models) => {
        Coupon.hasMany(models.Bill, {
            onDelete: "cascade",
        })
    }
    return Coupon;
}