// Dynamic config: on EAS Build the google-services.json comes from a secret
// file env var; locally it falls back to the file in the project root.
module.exports = ({ config }) => ({
  ...config,
  android: {
    ...config.android,
    googleServicesFile:
      process.env.GOOGLE_SERVICES_JSON ?? "./google-services.json",
  },
});
