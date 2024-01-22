<script setup lang="ts">
import { useGlobalStore } from '@/stores/modules/global';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { getBrowserLang } from './utils';
import type { LanguageType } from '@/stores/interface';

const i18n = useI18n();
const globalStore = useGlobalStore();

onMounted(() => {
  const language = globalStore.language ?? getBrowserLang();
  i18n.locale.value = language;
  globalStore.setGlobalState("language", language as LanguageType)
})
</script>
<template>
  <RouterView />
</template>
