const { Hotel } = require("../config/dbConnect");

const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.findAll();
    if (!hotels) {
      throw Error("Not Found Any Hoyels");
    }
    res
      .status(200)
      .json({ message: "All Hotels Get Successfully", data: hotels });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createHotel = async (req, res) => {
  try {
    const { name, location, price, availableRooms } = req.body;

    const hotel = await Hotel.create({ name, location, price, availableRooms });

    res
      .status(201)
      .json({ message: "Hotel Created Successfully", data: hotel });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getAllHotels, createHotel };
