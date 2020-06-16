const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const { User } = require('../models');

module.exports = (passport) => {
  //req.session 객체에 저장할 데이터를 선택
  passport.serializeUser((user, done) => {
    //첫번째 인자는 에러 발생시 사용하는 것행
    // 세션에 사용자 정보를 모두 저장하면 용량이 커지고 데이터 일관성 문제가 발생하니 아이디만 저장하라
    done(null, user.id);
  });

  //매 요청시 실행
  //passport.session()이 실행함 (app.js)
  //serializeUser에서 저장한 user.id를 이용하여 데이터베이스에서 사용자 정보 조회
  //req.user에 저장함
  passport.deserializeUser((id, done) => {
    User.findOne({ where: { id } })
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  local(passport);
  kakao(passport);
};
