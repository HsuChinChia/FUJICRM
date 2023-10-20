/* eslint-disable camelcase */
import $i18n from '@/modules/FPKG-230000-BackendCore/lang';

const Account = {
  account: {
    id: 'p3_ant_account',
    label: 'Account.manage.account',
    rules: {
      required: true,
      message: $i18n.global.t('Util.isRequired', {
        label: $i18n.global.t('Account.manage.account'),
      }),
    },
  },
  name: {
    id: 'cp9_cape_name',
    label: 'Account.manage.name',
    rules: {
      required: true,
      message: $i18n.global.t('Util.isRequired', {
        label: $i18n.global.t('Account.manage.name'),
      }),
    },
  },
  tel: {
    id: 'cp9_cape_tel',
    label: 'Account.manage.tel',

  },
  mail: {
    id: 'cp9_cape_email',
    label: 'Account.manage.email',

  },

  gender: {
    label: 'Account.manage.gender',
    id: 'cp9_cape_gender',
    options: [
      {
        value: '1',
        label: 'Account.manage.gender_1',
      },
      {
        value: '2',
        label: 'Account.manage.gender_2',
      },
      {
        value: '3',
        label: 'Account.manage.gender_3',
      },
    ],
  },

  status: {
    label: 'Util.status',
    id: 'p3_ant_status',
    options: [
      {
        value: '3',
        label: 'Util.abled',
        icon: 'fas fa-check',
        color: 'success',
      },
      {
        value: '-2',
        label: 'Util.disabled',
        icon: 'fas fa-ban',
        color: 'danger',
      },
    ],
  },

  created_at: {
    label: 'Account.manage.created_at',
    id: 'p3_ant_created_at',
  },

  last_login_time: {
    label: 'Account.manage.last_login_time',
    id: 'p3_ant_last_login_time',
  },

  role_name: {
    label: 'Account.manage.role_name',
    id: 'p3_ant_role_name',
  },

  role_status: {
    label: 'Account.manage.role_status',
    id: 'p3_ant_role_status',
  },

  memo: {
    id: 'p3_ant_memo',
    label: 'Util.memo',
  },
};

export default Account;
