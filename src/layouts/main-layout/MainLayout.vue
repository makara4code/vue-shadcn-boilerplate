<script setup lang="ts">
import { Command, CommandEmpty, CommandInput } from "@/components/ui/command";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogDescription, VisuallyHidden } from 'radix-vue'
import { ref, watch } from "vue";
import { SearchIcon } from "lucide-vue-next";
import { type NavItem, navConfig } from "@/config/globalSearch";
import { useMagicKeys, useToggle, useDark } from "@vueuse/core";

import File from "~icons/radix-icons/file";
import Logo from "@/components/Logo.vue";
import RadixIconsMoon from "~icons/radix-icons/moon";
import RadixIconsSun from "~icons/radix-icons/sun";
import router from "@/router";

const isDark = useDark();
const toggleDark = useToggle(isDark);

const isOpen = ref(false);

const { Meta_K, Ctrl_K } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
      console.log("Event fired");
      e.preventDefault();
    }
  },
});

watch([Meta_K, Ctrl_K], (v) => {
  if (v[0] || v[1]) {
    isOpen.value = true;
  }
});

function handleSelectLink(item: NavItem) {
  if (item.external) {
    window.open(item.href, "_blank");
  } else if (item.href) {
    router.push(item.href);
  }

  isOpen.value = false;
}
</script>

<template>
  <div class="flex min-h-screen flex-col bg-background">
    <header
      class="sticky z-40 top-0 bg-background/80 backdrop-blur-lg border-b border-border">
      <div class="container flex justify-between h-14 items-center">
        <MobileNav />

        <div class="mr-4 hidden md:flex">
          <Logo />

          <nav class="flex items-center space-x-6 text-sm font-medium">
            <a
              v-for="route in navConfig.mainNav"
              :key="route.title"
              :href="route.href"
              :target="route.external ? '_target' : undefined"
              class="transition-colors hover:text-foreground/80 text-foreground/60"
              :class="{
                'font-semibold !text-foreground':
                  $route.path === `${route.href}.html`,
              }">
              {{ route.title }}
            </a>
          </nav>
        </div>

        <div class="flex items-center justify-end space-x-4">
          <Button
            variant="outline"
            class="w-72 h-8 px-3 hidden lg:flex lg:justify-between lg:items-center"
            @click="isOpen = true">
            <div class="flex items-center">
              <SearchIcon class="w-4 h-4 mr-2 text-muted-foreground" />
              <span class="text-muted-foreground">
                Search for anything...
              </span>
            </div>
            <div class="flex items-center gap-x-1">
              <Kbd> <span>⌘</span>K </Kbd>
            </div>
          </Button>

          <div class="flex items-center gap-x-1">
            <Button
              class="flex items-center justify-center"
              aria-label="Toggle dark mode"
              :variant="'ghost'"
              :size="'icon'"
              @click="toggleDark()">
              <component
                :is="isDark ? RadixIconsSun : RadixIconsMoon"
                class="w-[20px] h-[20px] text-foreground" />
            </Button>

            <Button
              class=" p-4"
              :variant="'ghost'"
              @click="router.push('sign-in')">
              <span class="p-5">Login</span>
            </Button>
          </div>
        </div> 
      </div>
    </header>

    <div class="flex-1 bg-background">
      <main class="container">
        <slot></slot>
      </main>
    </div>

    <footer class="py-6 md:px-8 md:py-0">
      <div
        class="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div
          class="text-center text-sm leading-loose text-muted-foreground md:text-left">
          <span class="inline-block">
            Built and designed by
            <a
              href="https://twitter.com/shadcn"
              target="_blank"
              class="underline underline-offset-4 font-bold decoration-foreground">
              shadcn
            </a>
          </span>
          <span class="ml-0.5"> . </span>
          <span class="inline-block ml-2">
            Ported to Vue by
            <a
              href="https://github.com/radix-vue"
              target="_blank"
              class="underline underline-offset-4 font-bold decoration-foreground">
              Radix Vue
            </a>
          </span>
          <span class="ml-0.5"> . </span>
          <span class="inline-block ml-2">
            The code source is available on
            <a
              href="https://github.com/radix-vue/shadcn-vue"
              target="_blank"
              class="underline underline-offset-4 font-bold decoration-foreground">
              GitHub
            </a>
          </span>
        </div>
      </div>
    </footer>

    <Dialog v-model:open="isOpen">
      <DialogContent class="p-0">
        <VisuallyHidden>
          <DialogDescription />
          <DialogTitle />
        </VisuallyHidden>
        <Command>
          <CommandInput placeholder="Type a command or a search..." />
          <CommandEmpty>No result found.</CommandEmpty>
          <CommandList @escape-key-down="isOpen = false">
            <CommandGroup heading="Links">
              <CommandItem
                v-for="item in navConfig.mainNav"
                :key="item.title"
                :heading="item.title"
                :value="item.title"
                class="py-3"
                @select="handleSelectLink(item)">
                <File class="mr-2 h-5 w-5" />
                <span>{{ item.title }}</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  </div>
</template>
