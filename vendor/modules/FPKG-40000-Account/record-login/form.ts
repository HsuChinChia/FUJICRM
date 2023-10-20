import $i18n from '@/modules/FPKG-230000-BackendCore/lang';

export default {
  id: {
    label: 'Account.recordLogin.id',
    id: 'p3_ant_id',
    searchId: 'search_p3_ant_id',
    rules: {
      required: true,
      message: $i18n.global.t('Util.isRequired', {
        label: $i18n.global.t('Account.recordLogin.id'),
      }),
    },
  },
  account: {
    label: 'Account.manage.account',
    id: 'p3_ant_account',
    searchId: 'search_p3_ant_account',
    rules: {
      required: true,
      message: $i18n.global.t('Util.isRequired', {
        label: $i18n.global.t('Account.manage.account'),
      }),
    },
  },
  ip: {
    label: 'IP',
    id: 'p3_llg_ip',
    searchId: 'search_p3_llg_ip',
  },
  created_at: {
    label: 'Account.recordLogin.created_at',
    id: 'p3_ant_created_at',
    searchId: 'search_p3_ant_created_at',
  },
  login_at: {
    label: 'Account.recordLogin.login_at',
    id: 'p3_llg_created_at',
    searchId: 'search_p3_llg_created_at',
  },
}