<script setup lang="ts">
import { ref } from "vue";
import { Label } from "@/components/ui/label";

const isLoading = ref();

const onSubmit = (event: Event) => {
    event.preventDefault();

    isLoading.value = true;

    setTimeout(() => {
        isLoading.value = false;
    }, 3000)
}

</script>

<template>
    <div class="cn('grid gap-6', $attrs.class ?? '')">
        <form @submit="onSubmit">
            <div class="grid gap-2">
                <div class="grid gap-1">
                    <Label class="sr-only" for="email"> Email </Label>
                    <Input id="email" placeholder="name@example.com" auto-capitalize="none" autocomplete="email" auto-correct="off" :disabled="isLoading"/>
                </div>
            </div>
        </form>
    </div>
</template>