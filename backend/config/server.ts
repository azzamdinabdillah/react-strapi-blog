export default ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  app: {
    keys: env.array("APP_KEYS"),
  },
  cors: {
    enabled: true,
    origin: ["http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow required methods
    headers: ["Content-Type", "Authorization"], // Include required headers
    credentials: true,
  },
});
