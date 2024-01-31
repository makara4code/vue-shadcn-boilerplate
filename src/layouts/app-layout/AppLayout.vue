<script setup lang="ts">
import { Sidebar } from './components';
</script>
<template>
  <div class="hidden md:block">
    <div class="flex h-screen">
      <Sidebar class="flex-grow" />
      <div class="w-64 bg-gray-200">
        <!-- Sidebar content goes here -->
      </div>

      <!-- Content -->
      <div class="flex-grow bg-white">
        <router-view />
      </div>
    </div>
  </div>
</template>
