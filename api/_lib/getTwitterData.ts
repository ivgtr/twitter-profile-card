import axios from "axios";
import type { FullUser } from "twitter-d";

export type PersonalData = {
  image_url: string;
  banner_url?: string;
  name: string;
  screen_name: string;
  description?: string | null;
  location?: string | null;
  friends_count: number;
  followers_count: number;
};

const USER_SHOW_ENDPOINT = "https://api.twitter.com/1.1/users/show.json";

export const requestTwitter = async (id: string): Promise<PersonalData> => {
  (await import("dotenv")).config();

  const headers = {
    Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN as string}`,
  };

  const params = {
    screen_name: id,
  };

  const {
    profile_image_url_https,
    profile_banner_url,
    name,
    screen_name,
    description,
    location,
    friends_count,
    followers_count,
  } = await axios
    .get(USER_SHOW_ENDPOINT, { headers, params })
    .then<FullUser>((response) => response.data)
    .then((result) => result);

  return {
    image_url: profile_image_url_https.replace("_normal", ""),
    banner_url: profile_banner_url,
    name,
    screen_name,
    description,
    location,
    friends_count,
    followers_count,
  };
};
