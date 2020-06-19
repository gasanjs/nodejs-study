const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const { User } = require('../models');

module.exports = (passport) => {
  // req.session 객체에 어떤 데이터를 저장할지 선택
  passport.serializeUser((user, done) => {
    // 세션에 사용자 정보를 모두 저장하면 세션의 용량이 커지고 데이터 일관성 문제 발생 => id만 저장
    done(null, user.id);
  });

  // 매 요청시 실행. passport.session() 미들웨어가 이 메서드를 호출한다.
  passport.deserializeUser((id, done) => {
    // 세션에 저장했던 아이디를 받아 데이터베이스에서 사용자 정보를 조회한다.
    User.findOne({
      where: { id }, include: [{ model: User, attributes: ['id', 'nick'], as: 'Followers' },
      { model: User, attributes: ['id', 'nick'], as: 'Followings' }
      ]
    }).then(user => done(null, user)).catch(err => done(err));
  });

  local(passport);
  kakao(passport);
}