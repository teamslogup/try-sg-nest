export const errorConstant = {
  loginInvalidAccount: {
    code: "",
    mgs: "존재하지 않는 회원입니다.",
    value: null,
  },
  loginWrongPasswordOne: {
    code: "wrongPassword",
    msg: "비밀번호가 틀렸습니다.",
  },
  loginWrongPasswordTwo: {
    code: "wrongPassword",
    msg: "비밀번호가 틀렸습니다, 연속 3회 입력 오류시 로그인이 제한됩니다.",
  },
  loginWrongPasswordThree: {
    code: "wrongPassword",
    msg: "비밀번호가 연속 3회 틀렸습니다.",
  },
  loginLockedSignIn: {
    code: "lockedSignIn",
    msg: "비밀번호 3회 입력 오류로 인한 잠김계정입니다. 본인인증 후 재시도해주세요.",
  },
  TokenError: {
    code: "invalidAuthToken",
    msg: "사용자 인증 토큰이 유효하지 않습니다. 다시 로그인해주세요.",
    value: null,
  },
  duplicatedId: {
    code: "duplicatedId",
    msg: "중복된 아이디입니다.",
  },
  sendMessageEmptyPhone: {
    code: "requirePhone",
    msg: "전화번호를 입력해 주세요",
  },
  sendMessageWrongPhone: {
    code: "invalidPhone",
    msg: "유효하지 않은 전화번호 형식입니다.",
    value: null,
  },
  sendMessageInvalidCode: {
    code: "wrongAuthCode",
    msg: "잘못된 인증코드입니다.",
    value: null,
  },
  signupInvalidId: {
    code: "invalidId",
    msg: "유효하지 않은 ID입니다. 영문 또는 숫자 6자리 이상 입력해주세요.",
    value: null,
  },
  signupInvalidName: {
    code: "invalidName",
    msg: "유효하지 않은 이름입니다. 한글 또는 영문 2자리 이상 입력해주세요.",
    value: null,
  },
  signupInvalidEmail: {
    code: "invalidEmail",
    msg: "유효하지 않은 이메일 형식입니다.",
    value: null,
  },
  signupInvalidPassword: {
    code: "invalidPassword",
    msg: "유효하지 비밀번호 형식입니다. 영문, 숫자, 특수문자가 조합된 6자리 이상 입력해주세요.",
  },
  signupInvalidPhone: {
    code: "invalidPhone",
    msg: "유효하지 않은 전화번호 형식입니다.",
    value: null,
  },
  signupEmptyId: {
    code: "requireId",
    msg: "아이디를 입력해주세요.",
  },
  signupEmptyName: {
    code: "requireName",
    msg: "이름을 입력해주세요",
  },
  signupEmptyPhone: {
    code: "requirePhone",
    msg: "전화번호를 입력해주세요",
  },
  signupEmptyPassword: {
    code: "requirePassword",
    msg: "비밀번호를 입력해주세요",
  },
  signupEmptyToken: {
    code: "requireCert",
    msg: "인증토큰을 입력해주세요",
  },
  signupWrongCert: {
    code: "wrongCert",
    msg: "잘못된 인증토큰입니다.",
    value: null,
  },
  signupExpiredCert: {
    code: "expiredCert",
    msg: "인증토큰이 만료되었습니다.",
    value: null,
  },
  postTitleError: {
    code: "requireTitle",
    msg: "제목을 입력해주세요.",
  },
  postUserError: {
    code: "invalidUser",
    msg: "타인이 작성한 글은 수정 할 수 없습니다.",
  },
};
