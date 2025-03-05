const dotenv = require("dotenv");
dotenv.config();
const { sequelize } = require("./config/dbConnect");

const app = require("./app");

const PORT = process.env.PORT || 6000;

app.listen(PORT, async () => {
  console.log(`server in running on http://localhost:${PORT}`);

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Database Connection Faield", error);
  }
});
