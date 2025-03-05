module.exports = (sequelize, DataTypes) => {
  const Hotel = sequelize.define(
    "Hotel",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      availableRooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: true }
  );

  Hotel.associate = (models) => {
    Hotel.hasMany(models.Booking, { as: "bookings", foreignKey: "hotelId" }); // Corrected foreignKey
  };

  return Hotel;
};
