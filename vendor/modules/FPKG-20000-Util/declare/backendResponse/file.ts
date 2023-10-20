/* eslint-disable camelcase */
/** 檔案上傳後，後端回傳的檔案資料 */
type p7_file = {
  /* ID */
  p7_file_id: number,
  /* GUID */
  p7_file_guid: string,
  /* 建立時間 */
  p7_file_add_date: number
  /* 狀態 3.使用中 0.暫存 -3.刪除 */
  p7_file_status: '3' | '0' | '-3'
  /* 所在目錄 */
  p7_file_folder: string
  /* 檔名 */
  p7_file_name: string
  /* 檔案類型 */
  p7_file_mine: string
  /* 原始檔名 */
  p7_file_source_name: string
  p7_file_driver: 'local' | 's3'
}

declare interface backendResponseFile extends backendResponse {
  response: p7_file
}
