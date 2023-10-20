import $i18n from '@/modules/FPKG-230000-BackendCore/lang';

const login = {
  username: {
    id: 'username',
    rule: [
      {
        required: true,
        message: $i18n.global.t('Account.ruleName'),
      },
    ],
  },
  password: {
    id: 'password',
    rule: [
      {
        required: true,
        message: $i18n.global.t('Account.rulePass'),
      },
    ],
  },
  captcha: {
    id: 'captcha',
    rule: [
      {
        required: true,
        message: $i18n.global.t('Account.ruleCaptcha'),
      },
    ],
  },
  GoogleMFA: {
    id: 'google_mfa_code',
    rule: [
      {
        required: true,
        message: 'Google Code',
      },
    ],
  },
};

export default login;
