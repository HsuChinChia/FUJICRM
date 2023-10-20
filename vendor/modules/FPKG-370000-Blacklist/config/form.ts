/* eslint-disable camelcase */
import $i18n from '@/modules/FPKG-230000-BackendCore/lang';

const Form = {
  content: {
    id: 'p41_bst_content',
    label: 'Blacklist.content',
    searchId: 'search_p41_bst_content',
    rules: {
      required: true,
      message: $i18n.global.t('Util.isRequired', {
        label: $i18n.global.t('Blacklist.content'),
      }),
    },
  },

  type: {
    id: 'p41_bst_type',
    label: 'Blacklist.type',
    searchId: 'search_p41_bst_type',
    options: [
      { label: 'IP', value: 'IP' },
      {
        label: $i18n.global.t('Blacklist.PHONE_NUMBER'),
        value: 'PHONE_NUMBER',
      },
      {
        label: $i18n.global.t('Blacklist.TRANSACTION_ACCOUNT'),
        value: 'TRANSACTION_ACCOUNT',
      },
      {
        label: $i18n.global.t('Blacklist.COMMUNICATION_SOFTWARE'),
        value: 'COMMUNICATION_SOFTWARE',
      },
    ],
    rules: {
      required: true,
      message: $i18n.global.t('Util.isRequired', {
        label: $i18n.global.t('Blacklist.type'),
      }),
    },
  },

  commName: {
    id: 'p41_bst_sub_type',
    label: 'Blacklist.commName',
    options: [
      { label: 'Blacklist.LINE', value: 'LINE_ID' },
      { label: 'Blacklist.WHATAPP', value: 'WHATAPP' },
      { label: 'Blacklist.FACEBOOK_MESSENGER', value: 'FACEBOOK_MESSENGER' },
      { label: 'Blacklist.TELEGRAM', value: 'TELEGRAM' },
      { label: 'Blacklist.WEIXIN', value: 'WEIXIN' },
      { label: 'Blacklist.QQ', value: 'QQ' },
      { label: 'Blacklist.VIBER', value: 'VIBER' },
    ],
    rules: {
      required: true,
      message: $i18n.global.t('Util.isRequired', {
        label: $i18n.global.t('Blacklist.commName'),
      }),
    },
  },

  created_at: {
    id: 'p41_bst_created_at',
    label: 'Util.created_at',
  },
  memo: {
    id: 'p41_bst_memo',
    label: 'Util.memo',
  },
  creator: {
    label: 'Blacklist.creator',
  },
};

export default Form;
