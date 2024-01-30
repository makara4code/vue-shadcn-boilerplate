<script setup lang="ts">
import { ref, computed, unref, onUnmounted } from 'vue';
import { Label, Input, Alert, AlertDescription } from "@/components/ui";
import { useUserStore } from '@/stores/modules';

import LucideSpinner from '~icons/lucide/loader-2';
import router from '@/router';

const userStore = useUserStore();

const isLoading = ref();
const email = ref("");
const password = ref("");
const remember = ref(userStore.rememberMe);

const notHaveEmailOrPassword = computed(() => !unref(email) || !unref(password));

const onSubmit = async (event: Event) => {
  event.preventDefault();
};

</script>

<template>
  <div class="cn('grid gap-6', $attrs.class ?? '')">
    <form @submit="onSubmit">
      <div class="grid gap-2">
        <div class="grid gap-2">
          <Label class="spa-only" for="email">Email</Label>
          <Input
            v-model="email"
            id="email"
            placeholder="name@example.com"
            auto-capitalize="none"
            autocomplete="email"
            auto-correct="off"
            :disabled="isLoading"
          />

          <Label class="spa-only" for="password">Password</Label>
          <Input
            v-model="password"
            id="password"
            type="password"
            placeholder="password"
            auto-capitalize="none"
            auto-correct="off"
            :disabled="isLoading"
            suggested="password"
          />

          <Button :disabled="isLoading || notHaveEmailOrPassword" class="mt-4">
            <LucideSpinner v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
            {{ isLoading ? 'Signing In...' : 'Sign In' }}
        </Button>
        </div>
      </div>
    </form>
  </div>
</template>
