import type { GlobalState } from "@/stores/interface";
import { defineStore } from "pinia";

export const useGlobalStore = defineStore({
    id: "global-store",
    state: (): GlobalState => ({
        language: null
    }),
    actions: {
        setGlobalState(...args: ObjToKeyValArray<GlobalState>) {
            this.$patch({ [args[0]] : args[1] })
        }
    },
    persist: true
})