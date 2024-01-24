import { defineStore } from 'pinia';
import { nanoid } from 'nanoid';

export const useRequestStore = defineStore({
  id: 'requestStore',
  state: () => ({
    queue: [] as string[],
  }),
  getters: {
    queueHasItems(): boolean {
      return this.queue.length > 0;
    },
  },
  actions: {
    startRequest() {
        const id = nanoid();
        this.queue = [...this.queue, id];

        setTimeout(() => this.endRequest(id), 3500);

        return id;
    },
    endRequest(id: string) {
        this.queue = this.queue.filter((queueID: string) => queueID !== id);
    }
  }
});
