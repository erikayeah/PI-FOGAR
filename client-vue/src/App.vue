<template>
  <div class="app">
    <Notification
      v-if="notification.show"
      :show="notification.show"
      :message="notification.message"
      :type="notification.type"
      @close="hideNotification"
    />
    <router-view></router-view>
  </div>
</template>

<script>
import { computed } from "vue";
import { usePokemonStore } from "./stores/pokemon";
import Notification from "./components/Notification.vue";

export default {
  name: "App",
  components: {
    Notification,
  },
  setup() {
    const store = usePokemonStore();

    return {
      notification: computed(() => store.notification),
      hideNotification: () => store.hideNotification(),
    };
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "VT323", monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app {
  min-height: 100vh;
}
</style> 