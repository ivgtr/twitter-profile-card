import { VercelRequestQuery } from "@vercel/node";

export type OptionalColor = "blue" | "yellow" | "pink" | "purple" | "orange" | "green";
export type OptionalType = "jpeg" | "png";

export type Options = {
  id?: string;
  color?: OptionalColor;
  type?: OptionalType;
};

export const parseRequest = (query: VercelRequestQuery & Options) => {
  const { id = "ivgtr", color = "blue", type = "png" } = query;

  return { id, color, type };
};
