// Omit eslint-disable directive (if using ESLint configured for TypeScript)

import TwitterAPIv2, { UserV2Result } from "twitter-api-v2";

export class TwitterAPI {
  private client: TwitterAPIv2;

  constructor(
    accessToken: string,
    accessTokenSecret: string,
    apiKey: string,
    apiSecretKey: string
  ) {
    this.client = new TwitterAPIv2({
      appKey: apiKey,
      appSecret: apiSecretKey,
      accessToken,
      accessSecret: accessTokenSecret,
    });
  }

  // Post a tweet on Twitter
  async post(message: string): Promise<void> {
    try {
      await this.client.v2.tweet(message);
      console.log("Tweeted successfully!");
    } catch (error) {
      console.error("Error posting tweet:", error);
      // Handle specific error types here (e.g., rate limits, validation errors)
      throw error;
    }
  }

  // Get user profile from Twitter
  async getUserProfile(): Promise<UserV2Result> {
    try {
      const user = await this.client.v2.me();
      return user;
    } catch (error) {
      console.error("Error fetching user profile from Twitter:", error);
      throw error;
    }
  }
  async test(text: string): Promise<string> {
    return "hello" + text;
  }
}
