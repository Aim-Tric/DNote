import { getFolders, getLatestFiles } from "@/service/FileService";
import vuex from "@/store";

export function initSider() {
  getFolders().then(resp => {
    vuex.dispatch("initFolders", resp.data)
  });
}

export async function initFileList() {
  let resp = await getLatestFiles();
  vuex.dispatch("setFiles", resp.data);
}