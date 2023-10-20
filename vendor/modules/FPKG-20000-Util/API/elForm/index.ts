import { ref } from "vue";
import { ElForm } from "node_modules/element-ui/types/form";

/** EL-FORM 的檢查與清除 */
export default () => {
  const REF_FORM = ref(null);

  /** 表單的檢查 */
  const submitForm = () => {
    const M = REF_FORM.value as unknown;
    const FORM = M as ElForm;
    return FORM.validate();
  };

  /**
   * 僅能清除登錄在 el-form-item 的 prop
   * 其他 form 內的項目仍需手動清除
   */
  const reset = () => {
    const M = REF_FORM.value as unknown;
    const FORM = M as ElForm;
    return FORM.resetFields();
  };

  return {
    REF_FORM,
    submitForm,
    reset,
  };
};
