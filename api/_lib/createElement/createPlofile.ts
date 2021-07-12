import { PersonalData } from "../getTwitterData";
import { OptionalColor, OptionalMode, Options } from "../parser";
import { resetcss } from "../utils/resetcss";
import s from "../utils/style";
import h from "../utils/tag";

const getCss = (options: Options): string[] => {
  const height = 360;
  const width = 480;

  const color: { [key in OptionalColor]: string } = {
    blue: "#1b95e0",
    yellow: "#ffad1f",
    pink: "#e0245e",
    purple: "#794bc4",
    orange: "#f45d22",
    green: "#17bf63",
    white: "#fff",
    gradient: "linear-gradient(-45deg, #40e0d0, #41e081, #e0d041, #ff8c00, #ff0080, #d041e0)",
  };

  const mode: { [key in OptionalMode]: { color: string; bgColor: string } } = {
    default: {
      color: "#111",
      bgColor: "#fff",
    },
    dark: {
      color: "#fff",
      bgColor: "#111",
    },
    darkBlue: {
      color: "#fff",
      bgColor: "#15202b",
    },
  };

  return [
    resetcss(),
    s("html", { fontSize: "62.5%" }),
    s("body", {
      fontSize: "1.4rem",
      fontFamily: options.font,
    }),
    s("#root", {
      width: `${width}px`,
      height: `${height}px`,
    }),
    s("#wrapper", {
      position: "relative",
      height: "100%",
      width: "100%",
      backgroundColor: `${mode[options.mode].bgColor}`,
      color: `${mode[options.mode].color}`,
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
      left: "5%",
      top: "calc(33% - 50px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100px",
      width: "100px",
      borderRadius: "50%",
      background: `${color[options.color]}`,
    }),
    s("#icon_wrapper", {
      height: "90px",
      width: "90px",
      borderRadius: "50%",
      overflow: "hidden",
    }),
    s("#icon_image", { height: "100%", width: "100%", objectFit: "cover" }),
    s("#profile", {
      position: "absolute",
      left: "5%",
      top: "calc(33% + 55px)",
      width: "calc(100% - 60px)",
      overflow: "hidden",
    }),
    s("#profile_name", {
      fontSize: "2.8rem",
      fontWeight: "bold",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
    }),
    s("#profile_id", {
      marginTop: "0.5rem",
      fontSize: "1.4rem",
      fontWeight: "100",
      opacity: "0.8",
    }),
    s("#profile_description", {
      marginTop: "0.5rem",
      fontSize: "1.3rem",
      lineHeight: "1.2em",
    }),
    s("#profile_bottom", {
      position: "absolute",
      left: "5%",
      bottom: "10px",
      whiteSpace: "nowrap",
    }),
    s("#profile_data", {
      fontSize: "1.3rem",
      marginBottom: "3px",
    }),
    s("#profile_link", {
      color: `${color[options.color]}`,
    }),
  ];
};

export const createPlofile = async (personalData: PersonalData, options: Options) =>
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
      h("link", { rel: "preconnect", href: "https://fonts.googleapis.com" }),
      h("link", {
        rel: "stylesheet",
        href: `https://fonts.googleapis.com/css2?display=swap&text=${Object.entries(
          personalData
        )}&family=${options.font.split(" ").join("+")}`,
      }),
      h("style", {}, getCss(options).join("\n"))
    ),
    h(
      "body",
      {},
      h(
        "div",
        { id: "root" },
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
              src: `${personalData.banner_url}/1500x500` ?? "",
              alt: "header_image",
              height: "100",
              width: "300",
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
                src: personalData.image_url.replace(/_normal/, ""),
                alt: "icon image",
                height: "120",
                width: "120",
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
              ? h(
                  "p",
                  { id: "profile_description" },
                  personalData.description
                    .replace(
                      /https?:\/\/[-_.!~*'()a-zA-Z0-9;/?:@&=+$,%#\u3000-\u30FE\u4E00-\u9FA0\uFF01-\uFFE3]+/gm,
                      (url) => `<span id="profile_link">${url}</span>`
                    )
                    .replace(
                      /[@＠][A-Za-z0-9._-]+/gm,
                      (account) => `<span id="profile_link">${account}</span>`
                    )
                    .replace(
                      /[#＃][a-zA-Z0-9\u3000-\u30FE\u4E00-\u9FA0\uFF01-\uFFE3]+/gm,
                      (hashtag) => `<span id="profile_link">${hashtag}</span>`
                    )
                    .split("\n")
                    .map((str, index) => (index < 7 ? `${str}<br />` : ""))
                    .join("")
                )
              : ""
          ),
          h(
            "div",
            { id: "profile_bottom" },
            personalData.location
              ? h("p", { id: "profile_data" }, `location:${personalData.location}`)
              : "",
            h(
              "p",
              { id: "profile_data" },
              `follows:${personalData.friends_count} / followers:${personalData.followers_count}`
            )
          )
        )
      )
    )
  );
