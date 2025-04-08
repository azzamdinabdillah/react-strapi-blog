export default ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  app: {
    keys: env.array("APP_KEYS"),
  },
  url: 'https://blog-api.azamportfolio.my.id',
  // cors: {
  //   enabled: true,
  //   origin: ["*"],
  //   methods: ["GET", "POST", "PUT", "DELETE"], // Allow required methods
  //   headers: ["Content-Type", "Authorization"], // Include required headers
  //   credentials: true,
  // },
});
