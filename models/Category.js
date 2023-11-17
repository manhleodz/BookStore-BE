module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define("Category", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });
    return Category;
}