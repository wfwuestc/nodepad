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
  clientID: 'dc4d7159174106db0071',
  clientSecret: '7e53f7f21e1a531a7016376dd55fa54f1a4e4044',
  callbackURL: "http://note.wenfw.site/auth/github/callback"
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
