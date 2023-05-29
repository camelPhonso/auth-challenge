const { removeSession } = require("../model/session.js");

function post(req, res) {
  const sid = req.signedCookies.sid; //why is this coming back undefined?
  console.log("\u001b[33m", `THIS IS THE SID ${sid}`);

  removeSession(req.session.id);
  res.clearCookie("sid").status(302).redirect("/"); //why did it need the status(302)??
}

module.exports = { post };
