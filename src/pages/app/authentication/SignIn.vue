<script setup lang="ts">
import { UserAuthForm } from '@/components';
import { buttonVariants, Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import router from "@/router";
</script>

<template>
  <div class="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-1 lg:px-0" >
    <Button
    variant="ghost"
    @click="router.push('/')"
      :class="cn(buttonVariants({ variant: 'ghost' }), 'absolute right-4 top-4 md:right-8 md:top-8')"
    >
      Back
    </Button>

    <div class="lg:p-8">
      <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div class="flex flex-col space-y-2 text-center">
          <h1 class="text-2xl font-semibold tracking-tight">Login</h1>
          <p class="text-sm text-muted-foreground">Enter your email and password to login</p>
        </div>
        <UserAuthForm />
      </div>
    </div>
  </div>
</template>
