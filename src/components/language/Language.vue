<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useGlobalStore } from '@/stores/modules/global';
import type { LanguageType } from '@/stores/interface';

const i18n = useI18n();
const globalStore = useGlobalStore();
const language = computed(() => globalStore.language ?? 'en');

const languageList = {
  'km-KH': { label: 'ភាសាខ្មែរ', value: 'km-KH', icon: '/cambodia-flag-icon.svg' },
  'en-US': { label: 'English', value: 'en-US', icon: '/united-kingdom-flag-icon.svg' },
};


const changeLanguage = (lang: string) => {
  i18n.locale.value = lang;
  globalStore.setGlobalState("language", lang as LanguageType);
};
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Button class="flex items-center justify-center" aria-label="Toggle dark mode" variant="'ghost'" :size="'icon'">
        <img class="w-[30px] h-[30px]" :src="languageList[language as keyof typeof languageList].icon" alt="Vue logo" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem v-for="lang in languageList" v-show="lang.value !== language" @click="changeLanguage(lang.value)">
        {{ lang.label }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
