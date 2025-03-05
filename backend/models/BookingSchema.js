module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define(
    "Booking",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      hotelId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bookingDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    { timestamps: true }
  );

  Booking.associate = (models) => {
    Booking.belongsTo(models.User, { foreignKey: "userId" });
    Booking.belongsTo(models.Hotel, { foreignKey: "hotelId" });
  };

  return Booking;
};
