<script setup lang="ts">
import router from "@/router";
import { Button } from "@/components/ui/button";
import { PageHeader, PageHeaderHeading } from "@/components";
</script>

<template>
  <div class="flex h-screen">
    <div class="m-auto">
      <div class="flex flex-col items-center">
        <PageHeader>
          <PageHeaderHeading>Page Not Found!</PageHeaderHeading>
        </PageHeader>
        <Button @click="router.back()" class="mt-6">Go Back</Button>
      </div>
    </div>
  </div>
</template>
