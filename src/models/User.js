const [db, Model, DataTypes] = require(global.constant.PATH_BASE);
const bcrypt = require('bcrypt');

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    login: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: db,
    modelName: 'users'
});

const saltRounds = 10;

User.getHash = async (text) => bcrypt.hash(text, saltRounds);
User.checkHash = async (hash, entry) => bcrypt.compare(hash, entry);
User.isAuth = async (session) => {
    if (!session.token || !session.login) return false;
    const user = await User.findOne({ where: { login: session.login } });

    const md5 = require('md5');
    const token = md5(user.login + user.password + user.role);

    return await User.checkHash(token, session.token);
}
module.exports = User;