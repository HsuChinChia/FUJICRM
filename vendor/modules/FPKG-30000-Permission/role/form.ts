/* eslint-disable camelcase */
import $i18n from '@/modules/FPKG-230000-BackendCore/lang';

const role = {
  guid: {
    id: "p5_role_id"
  },
  name: {
    id: "p5_role_name",
    label: "Permission.role.name"
  },
  branch_account: {
    id: "p3_bre_branch_account",
    label: "Permission.role.branch_account"
  },
  memo: {
    id: "p5_role_memo",
    label: "Permission.role.memo"
  },
  status: {
    id: "p5_role_status",
    label: "Permission.role.status",
    options: [
      {
        value: "3",
        label: "Util.abled",
        icon: "fas fa-check",
        color: "success"
      },
      {
        value: "-2",
        label: "Util.disabled",
        icon: "fas fa-ban",
        color: "danger"
      }
    ]
  }
};

export default role;
