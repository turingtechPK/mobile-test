const settings = {
  dev: {
    apiUrl: 'https://frontend-test-api.aircall.io',
  },
  staging: {
    apiUrl: 'https://frontend-test-api.aircall.io',
  },
  prod: {
    apiUrl: 'https://frontend-test-api.aircall.io',
  },
};

const getCurrentSettings = () => {
  // if (__DEV__) return settings.dev;
  // if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.dev;
};

export default getCurrentSettings();

//http://74.50.94.10:800

//https://dev.fairlyeven.com
