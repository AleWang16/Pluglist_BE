
export default (sequelize, DataTypes) => {
    const Plugs = sequelize.define("Plugs", {
        id : {
            type: DataTypes.UUID,
            autoIncrement: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true
        },
        category: {
            type: DataTypes.STRING,
            allowNull:true
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true
        },
        trustScore: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        totalVotes: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        lastActive: {
            type: DataTypes.UUID,
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },

    }, {
        tablename: "Plugs",
        timestamps: true,
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    });
    return Plugs;
}


