const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Soccer Api",
    description: "Soccer Api",
  },
  host: "localhost:3000",
  schemes: ["https", "http"],
};

const outputFile = "./swagger.json";
const endpointFile = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointFile, doc);
