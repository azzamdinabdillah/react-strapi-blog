import { register } from "module";

export default () => ({
  documentation: {
    enabled: true,
  },
  "users-permissions": {
    config: {
      register: {
        allowedFields: ['firstname', 'lastname']
      }
    }
  }
});
