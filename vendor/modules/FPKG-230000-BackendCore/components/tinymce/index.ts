import { ref } from 'vue';
import mce from '@tinymce/tinymce-vue';
export const editor = mce;

type image = { id: number; url: string; name: string };

/** tinyMCE 的初始化 */
export const useEditor = (data?: {
  FileUpload?: any;
  options?: Record<string, number | string | boolean | string[]>;
}) => {
  const options = ref({
    height: 500,
    plugins: [
      'advlist autolink lists link image charmap print preview hr anchor pagebreak',
      'searchreplace wordcount visualblocks visualchars code fullscreen',
      'insertdatetime media nonbreaking save table directionality',
      'emoticons template paste textpattern',
    ],
    toolbar1:
      'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
    toolbar2: 'print preview | forecolor backcolor',
    image_advtab: true,
    file_picker_callback: initImageUpload,
  } as Record<string, number | string | boolean | string[] | Function>);

  options.value = { ...options.value, ...data?.options };

  /** 圖片ID陣列 */
  const ImgLists = ref([] as number[]);

  function initImageUpload(
    callback: Function,
    value: any,
    meta: { fieldname: string; filetype: 'image' | string },
  ) {
    // https://www.tiny.cloud/docs/configure/file-image-upload/
    const FileUpload = data?.FileUpload;
    if (meta.filetype !== 'image' || !FileUpload) return;
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');

    input.onchange = function() {
      const INPUT = this as HTMLInputElement;
      const CLIENT_FILES: File[] = INPUT.files ? [...INPUT.files] : [];
      const getter = new FileUpload(CLIENT_FILES);
      getter.action().then((res: image[]) => {
        res.forEach(element => {
          ImgLists.value.push(element.id);
          callback(element.url, {
            alt: element.name,
          });
        });
      });
    };

    input.click();
  }

  return { options, ImgLists };
};
