<script setup lang="ts">
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <div :class="cn('pb-12', $attrs.class ?? '')">
    <div class="space-y-4 py-4">
      <div class="px-3 py-2">
        <h2 class="mb-2 px-4 text-lg font-semibold tracking-tight">Discover</h2>
        <div class="space-y-1">
          <Button :variant="route.path === '/dashboard' ? 'secondary' : 'ghost'" class="w-full justify-start" @click="$router.push('/dashboard')">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              class="mr-2 h-4 w-4"
            >
              <circle cx="12" cy="12" r="10" />
              <polygon points="10 8 16 12 10 16 10 8" />
            </svg>
            Dashboard
          </Button>
          <Button :variant="route.path === '/about' ? 'secondary' : 'ghost'" class="w-full justify-start" @click="$router.push('/about')" >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              class="mr-2 h-4 w-4"
            >
              <rect width="7" height="7" x="3" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="14" rx="1" />
              <rect width="7" height="7" x="3" y="14" rx="1" />
            </svg>
            About
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
