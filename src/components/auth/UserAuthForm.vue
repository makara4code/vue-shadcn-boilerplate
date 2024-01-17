<script setup lang="ts">
import { ref, computed, unref, onUnmounted } from 'vue';
import { Label } from '@/components/ui/label';
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuthStore } from '@/stores/auth';

import LucideSpinner from '~icons/lucide/loader-2';
import router from '@/router';

const authStore = useAuthStore();

const isLoading = ref();
const email = ref("");
const password = ref("");

const notHaveEmailOrPassword = computed(() => !unref(email) || !unref(password));

const onSubmit = async (event: Event) => {
  event.preventDefault();

  isLoading.value = true;
  await authStore.login({ email: unref(email), password: unref(password) });
  isLoading.value = false;

  if (authStore.isAuthenticated) {
    router.push({ path: "/dashboard" });
  }
};

onUnmounted(() => authStore.error = "");
</script>

<template>
  <div class="cn('grid gap-6', $attrs.class ?? '')">
    <Alert variant="destructive" class="mb-4" v-if="authStore.error">
      <AlertDescription > {{ authStore.error }} </AlertDescription>
    </Alert>
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
