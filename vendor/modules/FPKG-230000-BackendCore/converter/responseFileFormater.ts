/* eslint-disable max-len */
/* eslint-disable no-use-before-define, camelcase */
import { options } from '../../FPKG-230000-BackendCore/prototypes/axios';

const BASE = options.baseURL;
export type img = { name: string, url: string, miniurl: string, guid: string, addDate: number, id: number }; // 圖片用的格式

/**
 * 將後端回傳的資料格式化
 */
class responseFileFormater {
  private file: p7_file = {
    p7_file_guid: '',
    p7_file_name: '',
    p7_file_add_date: 0,
    p7_file_folder: '',
    p7_file_id: 0,
    p7_file_mine: '',
    p7_file_source_name: '',
    p7_file_status: '3',
    p7_file_driver: 'local',
  }

  constructor(file: p7_file) {
    this.file = file;
  }

  /**
   * 取得單一檔案的圖片
   */
  get renderImage(): img {
    const name: string = this.file.p7_file_source_name;
    const addDate: number = this.file.p7_file_add_date;
    const url: string = getUrl(this.file);
    const miniurl: string = getMiniUrl(this.file);
    const guid: string = this.file.p7_file_guid;
    const id: number = this.file.p7_file_id;
    return {
      name, url, guid, addDate, id, miniurl,
    };
  }
}

export default responseFileFormater;

/**
 * 將檔案重新轉為網址 用在upload的回傳項目
 * @param data 後端回傳的AxiosResponse
 */
const getUrl = (data: p7_file): string => {
  const folder: string = data.p7_file_folder;
  const name: string = data.p7_file_name;
  if (folder && name) {
    if (data.p7_file_driver === 's3') {
      return `${folder}/${name}`;
    }
    const urlHead = BASE;
    return `${urlHead}/${folder}/${name}`;
  }
  return '';
};

const getMiniUrl = (data: p7_file): string => {
  const folder: string = data.p7_file_folder;
  const name: any = data.p7_file_name;
  if (folder && name) {
    if (data.p7_file_driver === 's3') {
      // 尋找前面跟後面再加上500_
      const lastNeme = name.substr(name.lastIndexOf('/') + 1);
      const firstNeme = name.substr(0, name.lastIndexOf('/') + 1);
      return `${folder}/${firstNeme}500_${lastNeme}`;
    }
    const urlHead = BASE;
    return `${urlHead}/${folder}/500_${name}`;
  }
  return '';
};
