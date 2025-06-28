
export default (sequelize, DataTypes) => {
    const TrustVotes = sequelize.define("TrustVotes", {
        id : {
            type: DataTypes.UUID,
            autoIncrement: false,
            primaryKey: true
        },
        plugId : {
            type: DataTypes.UUID,
            autoIncrement: false,
            primaryKey: false
        },
        ipAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        deviceId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },

    }, {
        tablename: "TrustVotes",
        timestamps: true,
        createdAt: "createdAt",
    });
    return TrustVotes;
}


