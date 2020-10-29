import vuex from "@/store";
import Vue from "vue"
import { getFolderFiles, getLatestFiles, update } from "@/service/FileService";

export async function initFileList() {
  let resp = await getLatestFiles();
  vuex.dispatch("setFiles", resp.data);
}

export async function asyncFileList(id) {
  let resp = await getFolderFiles(id);
  vuex.dispatch("setFiles", resp.data);
}

export async function updateFile(file, success, failure) {
  let resp = await update(file);
  if(resp.status === 200) {
    success(resp)
  } else {
    failure(resp)
  }
}