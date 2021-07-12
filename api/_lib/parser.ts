import { VercelRequestQuery } from "@vercel/node";

export type OptionalColor =
  | "blue"
  | "yellow"
  | "pink"
  | "purple"
  | "orange"
  | "green"
  | "white"
  | "gradient";
export type OptionalType = "jpeg" | "png";
export type OptionalMode = "default" | "dark" | "darkBlue";

export type Options = {
  id: string;
  color: OptionalColor;
  mode: OptionalMode;
  type: OptionalType;
  font: string;
};

export type RequestQueryOptions = {
  id: string;
  color?: OptionalColor;
  mode?: OptionalMode;
  type?: OptionalType;
  font?: string;
};

export const parseRequest = (query: VercelRequestQuery & RequestQueryOptions) => {
  const { id, color = "blue", mode = "default", type = "png", font = "Noto Sans JP" } = query;

  return { id, color, mode, type, font };
};
