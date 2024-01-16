<script setup lang="ts">
import { cn } from "@/lib/utils";
</script>
<template>
  <section
    :class="
      cn(
        'flex max-w-[980px] flex-col items-start gap-2 px-4 pt-8 md:pt-12',

        $attrs.class ?? ''
      )
    ">
    <slot />
  </section>
</template>
