import Vue from "vue";

const axios = Vue.axios

// 获取文件夹
export async function getFolders(page = 1) {
  return await axios.get(`/api/folder/${page}`)
}

// 获取文件夹内的文档
export async function getFolderFiles(id, page = 1) {
  let resp = await axios.get(`/api/folder/${id}/page/${page}`)
  return resp
}

// 获取最新文档
export async function getLatestFiles(page = 1) {
  let resp = await axios.get(`/api/file/page/${page}`)
  return resp
}

// 创建文档
export async function createFile(file) {
  let resp = await axios.post(`/api/file`, JSON.stringify(file))
  return resp
}

// 删除文档/文件夹
export async function deleteFile(id) {
  let resp = await axios.delete(`/api/file/${id}`)
  return resp
}

// 更新文档
export async function update(file) {
  let resp = await axios.put(`/api/file`, JSON.stringify(file), {
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
  return resp
}

// 打开文档
export async function openFileApi(id) {
  let resp = await axios.get(`/api/file/${id}`)
  return resp
}

// 置顶文档
export async function toppingFile(id) {
  let resp = await axios.get(`/api/file/topping/${id}`)
  return resp
}

// 下载文档
export async function download(id) {
  let resp = await axios.get(`/api/file/download/${id}`, {
    headers: {
      'content-type': 'application/json;charset=UTF-8'
    },
    responseType: 'blob',
  })
  return resp
}

// 获取共享链接
export async function shareFile(id) {
  return {
    data: "www.share.com/Je2Lix"
  }
}