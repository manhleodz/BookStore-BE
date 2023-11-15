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