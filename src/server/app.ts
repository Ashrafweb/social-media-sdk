/* eslint-disable @typescript-eslint/no-explicit-any */
const express = require("express");
const dotenv = require("dotenv");
import { SocialMediaSDK } from "../sdk/SocialMediaSdk";
dotenv.config();
const app = express();
const port = 3000;

// Sample Access Tokens (OAuth should be handled before)
const facebookAccessToken = "your_facebook_access_token";
const twitterAccessToken = "your_twitter_access_token";
const twitterAccessTokenSecret = "your_twitter_access_token_secret";
const twitterAPIKey = "your_twitter_api_key";
const twitterAPISecretKey = "your_twitter_api_secret_key";

app.get("/post/:platform", async (req, res): Promise<any> => {
  const { platform } = req.params;
  const message = "Hello from my SDK!";

  try {
    const sdk = new SocialMediaSDK(
      platform,
      platform === "twitter" ? twitterAccessToken : facebookAccessToken,
      twitterAPIKey,
      twitterAPISecretKey,
      platform === "twitter" ? twitterAccessTokenSecret : ""
    );
    await sdk.post(message);
    res.send(`Posted to ${platform}`);
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error posting to ${platform}: ${error}`);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
