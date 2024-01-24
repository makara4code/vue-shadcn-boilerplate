import { reactive, toRefs } from 'vue';

import { readonly } from 'vue';

const state = reactive({
  isOpen: false,
});

export const userAlert = () => {
  const { isOpen } = toRefs(state);

  const open = () => {
    state.isOpen = true;
  };

  const close = () => {
    state.isOpen = false;
  };

  return {
    isOpen: readonly(isOpen),
    open,
    close,
  };
};
