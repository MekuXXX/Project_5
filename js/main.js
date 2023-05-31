var bars = document.querySelector("header .bars"),
  input = document.querySelector(".links .bottom form input"),
  span = document.querySelector(".links .bottom form .short"),
  linkCont = document.querySelector(".stats .message"),
  cont = document.querySelector(".stats .messages"),
  checkDel = !0;
let regEx = /(http(s)?:\/\/)?/i,
  regEx1 = /\w+\.\w+(?=\/)/i;
window.localStorage.getItem("check_del") && (checkDel = !1),
  bars?.addEventListener("click", (e) => {
    bars?.parentElement?.querySelector(".text")?.classList.toggle("op-1");
  });
var requset = new XMLHttpRequest();
let data,
  text,
  dataArr = [];
if (window.localStorage.getItem("short_links")) {
  0 != [...linkCont.children].length &&
    [...linkCont.querySelectorAll("gen-links")].forEach((e) => e.classList.contains("gen-links1")?"":e.remove());
  let e = JSON.parse(window.localStorage.getItem("short_links"));
  dataArr = e;
  for (var i = 0; i < Object.keys(e).length; i++) createElement(e[`${i}`].link);
}
function createElement(e) {
  let t = document.createElement("p");
  t.classList.add("gen-links");
  let n = document.createElement("span");
  n.append(e), t.append(n);
  let a = document.createElement("div"),
    r = document.createElement("span");
  r.classList.add("coppied");
  let l = document.createElement("span");
  l.classList.add("copy"),
    l.append(document.createTextNode("Copy")),
    a.append(l),
    (e = (e = e.replace(regEx, "")).match(regEx1)[0]),
    r.append(document.createTextNode(e)),
    a.prepend(r),
    t.append(a),
    linkCont.append(t);
}
function createError() {
  (text = document.createElement("p")),
    text.classList.add("eror-message"),
    text.append(
      document.createTextNode("Please add a valid long link to clear it")
    ),
    span.parentElement.parentElement.append(text),
    input.classList.add("error");
}
function copyButton() {
  [...linkCont.querySelectorAll("div .copy")].forEach((e, t) => {
    e.addEventListener("click", (e) => {});
  });
}
requset.open(
  "Get",
  "https://api.shrtco.de/v2/shorten?url=example.org/very/long/link.html"
),
  requset.send(),
  requset.addEventListener("readystatechange", (e) => {
    if (4 == requset.readyState && 201 == requset.status) {
      data = JSON.parse(requset.responseText);
      let e = [...Object.keys(data.result)];
      if (null == window.localStorage.getItem("short_links") && 1 == checkDel) {
        let n = /short_link/gi;
        for (var t = 0; t < e.length; t++)
          if (n.test(e[t])) {
            let n = document.createElement("p");
            n.classList.add("gen-links1");
            let a = document.createElement("div"),
              r = document.createElement("span");
            r.classList.add("coppied");
            let l = document.createElement("span");
            l.classList.add("copy"),
              l.append(document.createTextNode("Copy")),
              a.append(l),
              e.forEach((a) => {
                if (a === `full_${e[t]}`) {
                  let a = document.createElement("span");
                  a.append(
                    document.createTextNode(data.result[`full_${e[t]}`])
                  ),
                    n.append(a);
                }
              }),
              r.append(document.createTextNode(data.result[`${e[t]}`])),
              a.prepend(r),
              n.append(a),
              linkCont.append(n);
          }
      }
      document
        .querySelector(".links .bottom form .del")
        .addEventListener("click", () => {
          window.localStorage.setItem("check_del", !1),
            [...linkCont.children].forEach((e) => e.remove()),
            window.localStorage.removeItem("short_links");
        }),
        span.addEventListener("click", (e) => {
          null != text && (text.remove(), input.classList.remove("error")),
            (inputData = input.value.trim());
          let t = inputData;
          if (
            ((input.value = ""),
            regEx.test(t) && (t = t.replace(regEx, "")),
            "" == inputData || null == inputData)
          )
            createError();
          else if (regEx1.test(t)) {
            let e = { link: `${inputData}` };
            dataArr.push(e),
              console.log(dataArr),
              window.localStorage.setItem(
                "short_links",
                JSON.stringify(dataArr)
              ),
              createElement(inputData);
          } else createError();
        });
    }
  }),
  window.addEventListener("click", (e) => {
    if ("copy" == e.target.className) {
      (e.target.innerHTML = "Coppied"),
        setTimeout(() => {
          e.target.innerHTML = "Copy";
        }, 2500);
      let t = document.createElement("input");
      t.setAttribute("value", e.target.previousElementSibling.innerHTML),
        document.body.append(t),
        t.select(),
        document.execCommand("copy"),
        t.remove();
    }
  });
