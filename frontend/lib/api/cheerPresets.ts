//frontend/lib/api/cheerPresets.ts
//このファイルは、APIからのプリセットデータ取得を行うための関数を定義しています。
import axios from "axios";
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

export async function fetchCheerTypes() {
  return axios.get(`${API_BASE_URL}/api/v1/cheer_types`).then(r => r.data);
}
export async function fetchMuscles() {
  return axios.get(`${API_BASE_URL}/api/v1/muscles`).then(r => r.data);
}
export async function fetchPoses() {
  return axios.get(`${API_BASE_URL}/api/v1/poses`).then(r => r.data);
}