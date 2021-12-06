import mongoose from "mongoose";

const { mongodbUrl } = process.env;

// if (!mongodbUrl) {
//   throw new Error("mongodbUrl 값이 존재하지 않습니다.");
// }

const db = mongoose.connection;

async function dbConnect() {
  db.on("error", console.error);
  db.on("open", () => {
    console.log("Connecting mongodb!");
  });

  // mongoDB 엑세스
  return mongoose.connect(mongodbUrl);
}

export default dbConnect;
