/* eslint-disable @typescript-eslint/no-var-requires */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import ExpError from '@/modules/FPKG-20000-Util/library/ExpError';
import { ElMessageBox } from 'element-plus'; // 取得警告標籤
import $i18n from '@/modules/FPKG-230000-BackendCore/lang'; // 取得多國文本

import $http, { options } from '../../FPKG-230000-BackendCore/prototypes/axios';
const imageCmp = require("imagecmp");



const authorization = localStorage.getItem('x-authorisation');
const setting: AxiosRequestConfig | any = JSON.parse(JSON.stringify(options));

setting.headers['Content-Type'] = 'multipart/form-data';
setting.headers['x-authorisation'] = authorization;
setting.withCredentials = false;
setting.method = 'post';

class FileUploader {
  private url = ''; // 上傳的目標 url 路徑

  private uploadConfig: AxiosRequestConfig = setting; // 圖片上傳功能的特別設定

  private queue: AxiosInstance[] = [];

  constructor(url: string) {
    this.url = url;
  }

  /**
   * setFileQuee
   */
  public setFileQuee(queue: any): void {
    this.queue = queue;
  }

  public parseFile(files: File[], inputKey: string): this {
    if (!this.url || !this.uploadConfig) {
      throw new ExpError('Uplading URL and InputKeyID is missing', 20001);
    }
    const queue = files.map(async (img: File) => {
      let compressImg = img;
      /** 壓縮圖片 */
      if (img.type === 'image/jpeg') {
        const res = await imageCmp.compressAccurately(img, 500);
        const files = new window.File([res], img.name, { type: res.type })
        compressImg = files;        
      }
      const formData = new FormData();
      formData.append(inputKey, compressImg);

      return $http.post(this.url, formData, this.uploadConfig);
    });

    this.setFileQuee(queue);
    return this;
  }

  /**
   * upload
   */
  public async upload(): Promise<AxiosResponse[]> {
    return axios.all(this.queue)
      /** 這邊 response 元廠定義有誤，只好用 any 佔位避免出錯 */
      .then((response: any[]) => {
        const successFiles: any = response.filter((x: any) => x.data.code === 0);
        const errors = response.filter((x: AxiosResponse): boolean => x.data.code !== 0);

        /** 截取上傳失敗的檔案，將其作成錯誤訊息 */
        if (errors.length) {
          const errorFilNames: string[] = errors.map(x => x.config.data.get('file_upload').name);
          const msg: any = $i18n.global.t('Util.error', { code: errorFilNames.join(', ') });
          ElMessageBox.alert(msg);
        }



        return successFiles;
      })
      .catch(() => {
        throw new ExpError('Some Error causing when data response', 20002);
      });
  }
}

export default FileUploader;


// private uploadResponse: any = []; //
// const self = this;
// self.uploadResponse = response;
/** 取得結果或列印空白 */
// public get getUpload() {
//   return this.uploadResponse;
// }
