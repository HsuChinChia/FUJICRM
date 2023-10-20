/* eslint-disable camelcase */
import $i18n from '@/modules/FPKG-230000-BackendCore/lang';

const form = {
  oldPassword: {
    id: 'old_password',
    label: 'Theme.oldPassword',
    rule: [
      {
        min: 6, max: 20, trigger: 'blur', message: $i18n.global.t('Theme.accountRule_1'),
      },
      {
        required: true, message: $i18n.global.t('Util.isRequired', { label: $i18n.global.t('Theme.oldPassword') }),
      },
      { pattern: /^[a-zA-Z0-9]+$/, message: $i18n.global.t('Theme.accountRule_2') },
    ],
  },
  newPassword: {
    id: 'p3_ant_password',
    label: 'Theme.newPassword',
    rule: [
      {
        min: 6, max: 20, trigger: 'blur', message: $i18n.global.t('Theme.accountRule_1'),
      },
      {
        required: true, message: $i18n.global.t('Util.isRequired', { label: $i18n.global.t('Theme.newPassword') }),
      },
      { pattern: /^[a-zA-Z0-9]+$/, message: $i18n.global.t('Theme.accountRule_2') },
    ],
  },
  newPasswordChk: {
    id: 'p3_ant_password_confirm',
    label: 'Theme.newPasswordChk',
    rule: {
      required: true,
      message: $i18n.global.t('Util.isRequired', { label: $i18n.global.t('Theme.newPasswordChk') }),
    },
  },
};

export default form;
