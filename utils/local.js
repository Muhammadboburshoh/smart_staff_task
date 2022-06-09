const passport = require('passport');
const LocalStrategy = require('passport-local');
const { row } = require('./database');

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
  try {
    const searchUser = `SELECT * FROM users WHERE username = $1`;
    const result = await row(searchUser, username);
    if (result) {
      done(null, result);
    }
  } catch (err) {
    done(err, null)
  }
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const searchUser = `SELECT * FROM users WHERE username = $1 and password = crypt($2, password)`;
      const result = await row(searchUser, username, password);
      console.log(username, password, result);
      if (!result) {
        done(null, false);
      } else {
        done(null, result);
        // if (result.password === password) {
        // } else {
        //   done(null, false);
        // }
      }
    } catch (err) {
      console.log(err);
      done(err, false);
    }
  })
);
