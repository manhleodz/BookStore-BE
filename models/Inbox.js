module.exports = (sequelize, DataTypes) => {
    const Inbox = sequelize.define("Inbox", {
        receiver: {
            type: DataTypes.STRING,
            allowNull : false    
        },
        author: {
            type: DataTypes.STRING,
            allowNull : false    
        },
        message: {
            type: DataTypes.STRING,
            allowNull : false    
        },
        room: {
            type: DataTypes.STRING,
            allowNull : false    
        },
        time: {
            type: DataTypes.STRING,
            allowNull : false    
        }
    });

    Inbox.associate = (models) => {
        Inbox.hasOne(models.Users, {
            onDelete: "cascade",
        })
    }

    return Inbox;
};