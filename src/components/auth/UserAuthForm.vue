<script setup lang="ts">
import { ref } from 'vue';
import { Label } from '@/components/ui/label';
import { Input } from "@/components/ui/input";

// @ts-ignore
import LucideSpinner from '~icons/lucide/loader-2'

const isLoading = ref();

const onSubmit = (event: Event) => {
  event.preventDefault();

  isLoading.value = true;

  setTimeout(() => {
    isLoading.value = false;
  }, 3000);
};
</script>

<template>
  <div class="cn('grid gap-6', $attrs.class ?? '')">
    <form @submit="onSubmit">
      <div class="grid gap-2">
        <div class="grid gap-2">
          <Label class="spa-only" for="email">Email</Label>
          <Input
            id="email"
            placeholder="name@example.com"
            auto-capitalize="none"
            autocomplete="email"
            auto-correct="off"
            :disabled="isLoading"
          />

          <Label class="spa-only" for="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="password"
            auto-capitalize="none"
            auto-correct="off"
            :disabled="isLoading"
          />

          <Button :disabled="isLoading" class="mt-4">
            <LucideSpinner v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
            {{ isLoading ? 'Signing In...' : 'Sign In' }}
        </Button>
        </div>
      </div>
    </form>
  </div>
</template>
