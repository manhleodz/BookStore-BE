
module.exports = (sequelize, DataTypes) => {
    const UserRole = sequelize.define("UserRole", {
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });

    return UserRole;
}