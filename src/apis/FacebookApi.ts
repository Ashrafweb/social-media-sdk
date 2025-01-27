/* eslint-disable @typescript-eslint/no-require-imports */
const fetch = require("node-fetch");

export class FacebookAPI {
  private accessToken: string;
  private baseUrl: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
    this.baseUrl = "https://graph.facebook.com/v17.0";
  }

  async getUserProfile(): Promise<void> {
    const response = await fetch(
      `${this.baseUrl}/me?access_token=${this.accessToken}`
    );
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    return data;
  }

  async getPosts(): Promise<void> {
    const response = await fetch(
      `${this.baseUrl}/me/posts?access_token=${this.accessToken}`
    );
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    return data.data;
  }

  async post(message: string): Promise<void> {
    const response = await fetch(
      `${this.baseUrl}/me/feed?access_token=${this.accessToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      }
    );
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    return data;
  }

  async test(text: string): Promise<string> {
    return "hello" + text;
  }
}
