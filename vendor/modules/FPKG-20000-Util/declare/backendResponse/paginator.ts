/* eslint-disable camelcase */
type sort_type = 'DESC' | 'ASC' // 降序 升序

declare interface pageinator {
  sort?: string,
  sort_type?: sort_type,
  count?: number,
  page?: number,
  page_num?: number,
  perpage?: number,
}
