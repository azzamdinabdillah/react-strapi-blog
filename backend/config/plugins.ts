import { register } from "module";

export default () => ({
  documentation: {
    enabled: true,
  },
  "users-permissions": {
    config: {
      register: {
        allowedFields: ["firstname", "lastname"],
      },
    },
  },
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
      },
    },
  },
});
