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
    return axios.post('face/query', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  base64toImage(string) {
    var arr = string.split(',');
    var mime = arr[0].match(/:(.*?);/)[1];
    var bstr = atob(arr[1].replace(/\s/g, ''));
    var n = bstr.length;
    var u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }
}
