import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';


interface UserAttributes {
    id: number;
    name: string,
    address: string
    email: string;
    phoneNo: string;
    accountBalance: string;
    isActive: boolean;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public name!: string;
    public email!: string;
    public address!: string;
    public phoneNo !: string;
    public accountBalance!: string;
    public isActive!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneNo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        accountBalance: {
            type: DataTypes.STRING,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
        },
    },
    {
        sequelize,
        modelName: 'Account',
        tableName: 'accounts',
    }
);

export default User;
