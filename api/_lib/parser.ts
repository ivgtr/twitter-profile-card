import { VercelRequestQuery } from "@vercel/node";

export type OptionalColor = "blue" | "yellow" | "pink" | "purple" | "orange" | "green" | "gradient";
export type OptionalType = "jpeg" | "png";

export type Options = {
  id: string;
  color: OptionalColor;
  type: OptionalType;
  font: string;
};

export type RequestQueryOptions = {
  id?: string;
  color?: OptionalColor;
  type?: OptionalType;
  font?: string;
};

export const parseRequest = (query: VercelRequestQuery & RequestQueryOptions) => {
  const { id = "ivgtr", color = "blue", type = "png", font = "Noto Sans JP" } = query;

  return { id, color, type, font };
};
