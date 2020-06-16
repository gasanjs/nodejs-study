const KakaoStrategy = require('passport-kakao').Strategy;

const { User } = require('../models');

require('dotenv').config();


module.exports = (passport) => {
  passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_ID,
    callbackURL: '/auth/kakao/callback',
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const exUser = await User.findOne({ where: { snsId: profile.id.toString(), provider: 'kakao' } });
      if (exUser) {
        done(null, exUser);
      } else {
        console.log('KAKAO PRIFLE')
        console.log(profile);
        const newUser = await User.create({
          email: profile._json && profile._json.kakao_account && profile._json.kakao_account.email,
          nick: profile.displayName,
          snsId: profile.id.toString(),
          provider: 'kakao',
        });
        done(null, newUser);
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};
