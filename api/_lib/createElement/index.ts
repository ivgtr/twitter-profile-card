import { PersonalData } from "../getTwitterData";
import { OptionalColor, Options } from "../parser";
import s from "./style";
import h from "./tag";

const getCss = (options: Options): string[] => {
  const height = 288;
  const width = height * Math.sqrt(2);

  const color: { [key in OptionalColor]: string } = {
    blue: "#fff",
    yellow: "#ffad1f",
    pink: "#e0245e",
    purple: "#794bc4",
    orange: "#f45d22",
    green: "#17bf63",
  };

  return [
    s("body", { width: `${width}px`, height: `${height}px` }),
    s("#wrapper", {
      position: "relative",
      height: "100%",
      width: "100%",
      borderRadius: "10px",
      backgroundColor: "#fff",
      overflow: "hidden",
    }),
    s("#header", {
      position: "absolute",
      height: "33%",
      width: "100%",
      overflow: "hidden",
    }),
    s("#header_image", { height: "100%", width: "100%", objectFit: "cover" }),
    s("#icon", {
      position: "absolute",
      left: "25px",
      top: "calc(33% - 65px)",
      height: "130px",
      width: "130px",
      borderRadius: "50%",
      backgroundColor: `${color[options.color || "blue"]}`,
    }),
    s("#icon_wrapper", {
      position: "absolute",
      left: "5px",
      top: "5px",
      height: "120px",
      width: "120px",
      borderRadius: "50%",
      overflow: "hidden",
    }),
    s("#icon_image", { height: "100%", width: "100%", objectFit: "cover" }),
    s("#profile", { position: "absolute", left: "30px", top: "42%", width: "calc(100% - 60px)" }),
    s("#profile_name", {
      color: "#111",
      fontSize: "2.1rem",
    }),
    s("#profile_id", {
      marginTop: "-1rem",
      fontSize: "1.3rem",
      color: "#555",
    }),
    s("#profile_description", {
      marginTop: "-0.5rem",
      fontSize: "1.3rem",
    }),
    s("#profile_bottom", {
      position: "absolute",
      left: "30px",
      bottom: "10px",
    }),
    s("#profile_data", {
      fontSize: "1.3rem",
      margin: "0",
    }),
  ];
};

export const createElement = async (personalData: PersonalData, options: Options) =>
  h(
    "html",
    {},
    h(
      "head",
      {},
      h("meta", { charset: "UTF-8" }),
      h("meta", {
        "http-equiv": "X-UA-Compatible",
        content: "IE=edge",
      }),
      h("meta", { name: "viewport", content: "width=device-width, initial-scale=1.0" }),
      h("title", {}, "Twitter Profile Card"),
      h("style", {}, getCss(options).join(""))
    ),
    h(
      "body",
      {},
      h(
        "div",
        {
          id: "wrapper",
        },
        h(
          "div",
          {
            id: "header",
          },
          h("img", {
            src: personalData.banner_url ?? "",
            alt: "header_image",

            height: "100px",
            width: "300px",
            id: "header_image",
          })
        ),
        h(
          "div",
          {
            id: "icon",
          },
          h(
            "div",
            { id: "icon_wrapper" },
            h("img", {
              src: personalData.image_url,
              alt: "icon image",
              height: "120px",
              width: "120px",
              id: "icon_image",
            })
          )
        ),
        h(
          "div",
          {
            id: "profile",
          },
          h("h1", { id: "profile_name" }, personalData.name),
          h("h2", { id: "profile_id" }, `@${personalData.screen_name}`),
          personalData.description
            ? h("p", { id: "profile_description" }, personalData.description)
            : ""
        ),
        h(
          "div",
          { id: "profile_bottom" },
          personalData.location ? h("p", { id: "profile_data" }, personalData.location) : "",
          h(
            "p",
            { id: "profile_bottom" },
            `follows: ${personalData.friends_count} / followers: ${personalData.followers_count}`
          )
        )
      )
    )
  );
