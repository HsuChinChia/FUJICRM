import { AxiosResponse } from "axios";
import $http from '@/modules/FPKG-230000-BackendCore/prototypes/axios'; // 後端溝通


const API = "site/locale/set";

export namespace typeDoModify {
  export interface request {
    locale: string;
  }
  export type AxiosResponse = _AxiosResponse
}
type _AxiosResponse = AxiosResponse<responseData>

interface responseData extends backendResponse {
  response: any;
}

/** 語系變更 */
export default async (request: typeDoModify.request) => {

  const request_f = formater(request);

  const getter = await $http.put(API, request_f);
  if (getter.data.code !== 0) throw getter;
  return getter;
};

/** 語系轉換 */
const formater = (request: typeDoModify.request) => {
  if (request.locale === 'VN') {
    request.locale = 'VI'
  }
  return request;
};
