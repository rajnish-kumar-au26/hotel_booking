module.exports = (sequelize, DataTypes) => {
  const Checkin = sequelize.define(
    "Checkin",
    {
      bookingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      aadhaarNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      totalPersons: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: true }
  );

  Checkin.associate = (models) => {
    Checkin.belongsTo(models.Booking, { foreignKey: "bookingId" });
  };

  return Checkin;
};
