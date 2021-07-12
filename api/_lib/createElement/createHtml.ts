import s from "../utils/style";
import h from "../utils/tag";

const getCss = (): string[] => [
  s("html", { fontSize: "62.5%" }),
  s("body", {
    width: "100%",
    height: "100%",
    fontSize: "1.4rem",
    margin: "0",
    padding: "0",
  }),
  s("#root", {
    width: "100%",
    height: "100%",
  }),
  s(".wrapper", {
    maxWidth: "724px",
    margin: "0 auto 0",
    padding: "0 10px",
    overflow: "hidden",
  }),
  s(".bold", {
    fontWeight: "bold",
  }),
  s(".link a:not(:first-child)", { marginLeft: "5px" }),
  s(".flex", { display: "flex", flexWrap: "wrap" }),
  s(".gap-1", { gap: "10px" }),
  s(".mt-3", { marginTop: "30px" }),
  s(".mb-0", { marginBottom: "0" }),
  s(".wrap", {
    width: "320px",
    borderRadius: "5px",
    overflow: "hidden",
    filter: "drop-shadow(0 0 0.5rem #ccc)",
  }),
  s(".wrap img", { height: "100%", width: "100%", borderRadius: "5px", objectFit: "cover" }),
  s(".code pre", {
    backgroundColor: "#f6f8fa",
    borderRadius: "6px",
    fontSize: "85%",
    lineHeight: "1.45",
    overflow: "auto",
    padding: "16px",
    overflowWrap: "normal",
    boxSizing: "border-box",
    wordBreak: "nomal",
    cursor: "pointer",
  }),
  s(".code pre:hover", {
    backgroundColor: "#ced2d6",
  }),
  s(".mark", {
    display: "inline-block",
    backgroundColor: "#4f5964",
    color: "#cdd9e5",
    padding: "0 5px",
    fontSize: "0.9em",
  }),
];

export const createHtml = () =>
  `<!DOCTYPE html>${h(
    "html",
    { lang: "en" },
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
      h("style", {}, getCss().join("\n"))
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
            class: "wrapper",
          },
          h(
            "header",
            {},
            h("h1", { class: "bold" }, "Twitter Profile Card"),
            h("p", {}, "🐣 Get dynamically generated Twitter Profile on your readmes!"),
            h(
              "div",
              { class: "link" },
              h(
                "a",
                {
                  href: "https://github.com/ivgtr/twitter-profile-card",
                  target: "_brank",
                  rel: "noopener noreferrer",
                },
                "GitHub"
              )
            )
          ),
          h(
            "section",
            {},
            h("h2", { class: "bold mb-0" }, "Usage"),
            h(
              "p",
              {},
              "sample:) ",
              h(
                "a",
                {
                  href: "https://twitter-profile-card.vercel.app/api?id=ivgtr",
                  target: "_brank",
                  rel: "noopener noreferrer",
                },
                "https://twitter-profile-card.vercel.app/api?id=ivgtr"
              )
            ),
            h(
              "div",
              { class: "wrap" },
              h("img", { src: "/api?id=ivgtr", height: "360", width: "480" })
            ),
            h("div", { class: "mt-3" }),
            h("p", {}, "You can copy-paste this into markdown content."),
            h(
              "div",
              { class: "code" },
              h(
                "pre",
                {},
                `[![Twitter Profile Card](https://twitter-profile-card.vercel.app/api?id=ivgtr)](https://twitter.com/ivgtr)
`
              )
            )
          ),
          h("div", { class: "mt-3" }),
          h(
            "section",
            {},
            h("h2", { class: "bold" }, "Multiple color variations"),
            h(
              "div",
              { class: "flex gap-1" },
              h(
                "div",
                { class: "wrap" },
                h("img", {
                  src: "/api?id=ivgtr&color=pink",
                  height: "360",
                  width: "480",
                  loading: "lazy",
                })
              ),
              h(
                "div",
                { class: "wrap" },
                h("img", {
                  src: "/api?id=ivgtr&bgColor=gradient",
                  height: "360",
                  width: "480",
                  loading: "lazy",
                })
              )
            ),

            h("p", {}, "default: ", h("span", { class: "mark" }, "blue")),
            h(
              "p",
              {},
              "Support: ",
              h("span", { class: "mark" }, "blue"),
              " | ",
              h("span", { class: "mark" }, "yellow"),
              " | ",
              h("span", { class: "mark" }, "pink"),
              " | ",
              h("span", { class: "mark" }, "purple"),
              " | ",
              h("span", { class: "mark" }, "orange"),
              " | ",
              h("span", { class: "mark" }, "green"),
              " | ",
              h("span", { class: "mark" }, "white"),
              " | ",
              h("span", { class: "mark" }, "gradient")
            ),
            h(
              "div",
              { class: "code" },
              h(
                "pre",
                {},
                `[![Twitter Profile Card](https://twitter-profile-card.vercel.app/api?id=ivgtr&color=pink)](https://twitter.com/ivgtr)
`
              )
            ),
            h(
              "div",
              { class: "code" },
              h(
                "pre",
                {},
                `[![Twitter Profile Card](https://twitter-profile-card.vercel.app/api?id=ivgtr&bgColor=gradient)](https://twitter.com/ivgtr)
`
              )
            )
          ),
          h("div", { class: "mt-3" }),
          h(
            "section",
            {},
            h("h2", { class: "bold" }, "Multiple color mode"),
            h(
              "div",
              { class: "flex gap-1" },
              h(
                "div",
                { class: "wrap" },
                h("img", {
                  src: "/api?id=ivgtr&mode=dark",
                  height: "360",
                  width: "480",
                  loading: "lazy",
                })
              ),
              h(
                "div",
                { class: "wrap" },
                h("img", {
                  src: "/api?id=ivgtr&mode=darkBlue",
                  height: "360",
                  width: "480",
                  loading: "lazy",
                })
              )
            ),

            h("p", {}, "default: ", h("span", { class: "mark" }, "normal")),
            h(
              "p",
              {},
              "Support: ",
              h("span", { class: "mark" }, "normal"),
              " | ",
              h("span", { class: "mark" }, "dark"),
              " | ",
              h("span", { class: "mark" }, "darkBlue")
            ),
            h(
              "div",
              { class: "code" },
              h(
                "pre",
                {},
                `[![Twitter Profile Card](https://twitter-profile-card.vercel.app/api?id=ivgtr&mode=dark)](https://twitter.com/ivgtr)
`
              )
            )
          ),
          h("div", { class: "mt-3" }),
          h(
            "section",
            {},
            h("h2", { class: "mb0" }, "Supported"),
            h(
              "p",
              {},
              "Please contanct ",
              h(
                "a",
                {
                  href: "https://github.com/ivgtr/twitter-profile-card",
                  target: "_brank",
                  rel: "noopener noreferrer",
                },
                "GitHub"
              ),
              " or ",
              h(
                "a",
                {
                  href: "https://twitter.com/ivgtr",
                  target: "_brank",
                  rel: "noopener noreferrer",
                },
                "Twitter"
              ),
              "."
            )
          )
        )
      )
    )
  )}`;
