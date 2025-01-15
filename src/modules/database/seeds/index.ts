import { bookSeedData } from "./book.seed";

/* eslint-disable no-console */
const seedData = async () => {
  await bookSeedData().catch((error) => {
    console.error("Error seeding trainign Program:", error);
  });
};

seedData()
  .then(() => {
    console.log("Seed data successfully");
  })
  .catch((error) => {
    console.error("Seed data error", error);
  });
