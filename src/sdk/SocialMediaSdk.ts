import { FacebookAPI } from "../apis/FacebookApi";
import { TwitterAPI } from "../apis/TwitterApi";

// Define a union type for API classes to avoid using 'any'
type SocialMediaAPI = FacebookAPI | TwitterAPI;

export class SocialMediaSDK {
  private platform: string;
  private api: SocialMediaAPI;

  constructor(
    platform: string,
    accessToken: string,
    apiKey: string,
    apiSecretKey: string,
    accessTokenSecret: string
  ) {
    this.platform = platform.toLowerCase();

    switch (this.platform) {
      case "facebook":
        this.api = new FacebookAPI(accessToken);
        break;
      case "twitter":
        this.api = new TwitterAPI(
          accessToken,
          apiKey,
          apiSecretKey,
          accessTokenSecret
        );
        break;
      default:
        throw new Error(`Unsupported platform: ${this.platform}`);
    }
  }

  // Get user profile from the selected platform
  async getUserProfile() {
    try {
      const profile = await this.api.getUserProfile();
      return profile;
    } catch (error) {
      console.error(`Error fetching user profile for ${this.platform}:`, error);
      throw error; // Rethrow for further handling if needed
    }
  }

  // Get posts from the selected platform
  // async getPosts() {
  //   try {
  //     const posts = await this.api.getUserProfile();
  //     return posts;
  //   } catch (error) {
  //     console.error(`Error fetching posts for ${this.platform}:`, error);
  //     throw error;
  //   }
  // }

  // Create a post on the selected platform
  async post(message: string) {
    switch (this.platform) {
      case "facebook":
        return await this.api.post(message);
      case "twitter":
        return await this.api.post(message);
      default:
        throw new Error(`Unsupported platform for posting: ${this.platform}`);
    }
  }
}
