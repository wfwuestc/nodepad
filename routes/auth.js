var express = require('express');
var router = express.Router();

var passport = require('passport')
var GitHubStrategy = require('passport-github').Strategy;

/* GET auth . */
// save session
passport.serializeUser(function(user, done) {
  console.log('---serializeUser---')
  console.log(user)
  done(null, user);
});
// find session
passport.deserializeUser(function(obj, done) {
  console.log('---deserializeUser---')
  done(null, obj);
});

passport.use(new GitHubStrategy({
  clientID: 'a5f28c3e23bf7cd839c4',
  clientSecret: 'd043ffcd0263fcd4affc249bddba3df2b55ea7e3',
  callbackURL: "http://localhost:3000/auth/github/callback"
}, function(accessToken, refreshToken, profile, done) {
  done(null, profile);
}));

router.get('/github', passport.authenticate('github'));

router.get('/github/callback', passport.authenticate('github', {failureRedirect: '/login'}), function(req, res) {

  console.log('-------------req.user-----------')
  console.log(req.user)
  req.session.user = {
    id: req.user.id,
    username: req.user.displayName || req.user.username,
    avatar: req.user._json.avatar_url,
    provider: req.user.provider
  };
  // Successful authentication, redirect home.
  res.redirect('/');
});

router.get('/logout', function(req, res) {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;