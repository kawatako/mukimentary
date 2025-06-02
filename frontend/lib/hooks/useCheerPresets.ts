//frontend/lib/hooks/useCheerPresets.ts
// このファイルは、Cheer Presetsに関連するデータを取得するためのカスタムフックを定義しています。
import useSWR from "swr";
import { fetchCheerTypes, fetchMuscles, fetchPoses } from "../api/cheerPresets";

export function useCheerTypes() {
  return useSWR("cheer_types", fetchCheerTypes);
}
export function useMuscles() {
  return useSWR("muscles", fetchMuscles);
}
export function usePoses() {
  return useSWR("poses", fetchPoses);
}
