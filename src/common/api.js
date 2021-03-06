import axios from 'axios';

export default {
  register(formData) {
    return axios.post('face/insert', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  recognition(formData) {
    return axios.post('face/sign', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  regSucess(featureNo, featureType){
    return axios.get('face/enable', {
      params: {
        featureNo,
        featureType
      }
    })
  },

  getInfo() {
    return axios.post('ins_index')
  },

  download(data) {
    return axios.post('face/download', data)
  },

  /* eslint-disable */
  base64toImage(string) {
    var arr = string.split(',');
    var mime = arr[0].match(/:(.*?);/)[1];// 结果：   image/png
    var bstr = atob(arr[1].replace(/\s/g, ''));
    var n = bstr.length;
    var u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });//值，类型
  },

  getDate() {
    let time = new Date()

    let year = time.getFullYear()
    let month = time.getMonth() + 1
    let date = time.getDate()
    let day = time.getDay()

    return { year, month, date, day }
  },

  getTime() {
    let time = new Date()

    let hour = time.getHours()
    let minute = time.getMinutes()
    let second = time.getSeconds()
    if (hour > 12) {
      hour = hour - 12
    }

    return { hour, minute, second }
  }
}
