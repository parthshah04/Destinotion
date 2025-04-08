module.exports = {
  // No need to override webpack's node configuration anymore.
  env: {
    customKey: 'my-value'
    // Firebase env variables removed since we're using file-based storage.
    // If you ever need them again, you can add them back:
    // FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    // FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    // FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
  },
};
