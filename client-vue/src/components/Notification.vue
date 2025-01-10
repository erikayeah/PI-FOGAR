<template>
  <Transition name="notification">
    <div v-if="show" :class="['notification', type]">
      <span class="message">{{ message }}</span>
      <button class="close" @click="$emit('close')">&times;</button>
    </div>
  </Transition>
</template>

<script>
export default {
  name: "Notification",
  props: {
    show: Boolean,
    message: String,
    type: {
      type: String,
      default: "info",
      validator: (value) => ["success", "error", "info", "warning"].includes(value),
    },
  },
  emits: ["close"],
};
</script>

<style scoped>
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 1000;
  min-width: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.success {
  background-color: #4caf50;
  color: white;
}

.error {
  background-color: #f44336;
  color: white;
}

.warning {
  background-color: #ff9800;
  color: white;
}

.info {
  background-color: #2196f3;
  color: white;
}

.message {
  flex-grow: 1;
  font-family: "VT323", monospace;
  font-size: 1.1em;
}

.close {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  padding: 0 5px;
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style> 