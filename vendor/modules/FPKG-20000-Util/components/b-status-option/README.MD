# 帶狀態icon的選項顯示
在需要從options中篩選出需要的值並顯示

## 規格
放入options與後端回傳的狀態值
若希望有icon則在form定義時依項目填寫自訂的icon
可自訂顏色，並且具有文字變色、外框、標籤三種模式(type)
```
<b-status-option type="badge/border" :value="resData[formId]" :options="formId.options" id="pxx_oo_id"></b-status-option>
```
ex:
options: [
  {
    value: '1',
    label: '待批中',
    icon: 'fas fa-envelope'
  },
  {
    value: '2',
    label: '批核中',
    icon: 'fas fa-hourglass-half'
  },
  {
    value: '3',
    label: '已通過',
    icon: 'fas fa-check',
    color: 'success'
  },
  {
    value: '4',
    label: '已作廢',
    icon: 'fas fa-trash-alt',
    type: 'danger'
  }
]