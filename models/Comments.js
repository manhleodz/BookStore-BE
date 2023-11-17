module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define("Comments", {
        commentBody: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

    Comments.associate = (models) => {
        Comments.belongsTo(models.Users, {
            onDelete: "cascade",
            foreignKey: 'UserId',
        })
        
        Comments.belongsTo(models.Products, {
            onDelete: "cascade",
            foreignKey: 'ProductId',
        })
    }
    return Comments;
};