module.exports = (sequelize, DataTypes) => {
    const Bill = sequelize.define('Bill', {
        phone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        receiver: {
            type: DataTypes.STRING,
            allowNull: true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        payment: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        note: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })

    Bill.associate = (models) => {
        Bill.hasMany(models.Cart, {
            onDelete: "cascade",
        })
    }

    return Bill;
}