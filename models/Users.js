module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phonenumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        active: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        avatar: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });
    Users.associate = (models) => {
        Users.hasOne(models.UserRole, {
            onDelete: "cascade",
        })
        Users.hasOne(models.Cart, {
            onDelete: "cascade",
        })
        Users.hasMany(models.Comments, {
            onDelete: "cascade",
        })
        Users.hasMany(models.Bill, {
            onDelete: "cascade",
        })
        Users.hasMany(models.Inbox, {
            onDelete: "cascade",
        });

    }
    return Users;
}