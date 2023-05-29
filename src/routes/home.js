const { Layout } = require("../templates.js");
const { getSession } = require("../model/session.js");

function get(req, res) {
  const session = getSession(req.session.id);
  const form = /*html*/ `<form method="POST" action="/log-out"><button>Log Out</button></form>`;
  const logLinks = /*html*/ `<nav><a href="/sign-up">Sign up</a> or <a href="/log-in">log in</a></nav>`;

  const title = "Confess your secrets!";
  const content = /*html*/ `
    <div class="Cover">
      <h1>${title}</h1>
      ${session ? form : logLinks}
    </div>
  `;

  const body = Layout({ title, content });
  res.send(body);
}

module.exports = { get };
