const { getSession } = require("../model/session.js");

const {
  listConfessions,
  createConfession,
} = require("../model/confessions.js");
const { Layout } = require("../templates.js");

function get(req, res) {
  const sid = req.signedCookies.sid;
  const session = getSession(sid);
  const loggedUser = session && session.user_id; //still logs undefined - WHY??
  const currentUser = Number(req.params.user_id);

  if (loggedUser !== currentUser) {
    res.status(401).send("<h1>You have been logged out</h1>");
  } else {
    const confessions = listConfessions(req.params.user_id);
    const title = "Your secrets";
    const content = /*html*/ `
      <div class="Cover">
        <h1>${title}</h1>
        <form method="POST" class="Stack" style="--gap: 0.5rem">
          <textarea name="content" aria-label="your confession" rows="4" cols="30" style="resize: vertical"></textarea>
          <button class="Button">Confess 🤫</button>
        </form>
        <ul class="Center Stack">
          ${confessions
            .map(
              (entry) => `
              <li>
                <h2>${entry.created_at}</h2>
                <p>${entry.content}</p>
              </li>
              `
            )
            .join("")}
        </ul>
      </div>
    `;
    const body = Layout({ title, content });
    res.send(body);
  }
}

function post(req, res) {
  const loggedUser = req.session && req.session.user_id;

  if (!loggedUser || req.body.content) {
    return res.status(401).send("<h1>Log in to submit a confession</h1>");
  }

  createConfession(req.body.content, loggedUser);
  res.redirect(`/confessions/${loggedUser}`);
}

module.exports = { get, post };
