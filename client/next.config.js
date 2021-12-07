require("dotenv").config();

const { MONGO_PASSWORD, MONGO_CLUSTER, MONGO_USER, MONGO_DBNAME } = process.env;

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["blind-clone-nextjs.s3.ap-northeast-2.amazonaws.com"],
  },
  env: {
    mongodbUrl: `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_CLUSTER}/${MONGO_DBNAME}?retryWrites=true&w=majority`,
  },
};
