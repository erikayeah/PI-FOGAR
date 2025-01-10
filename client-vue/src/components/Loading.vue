<template>
  <div class="loading-container">
    <h2 class="loading-text">Loading</h2>
    <img class="loading-image" src="../assets/images/loading.gif" alt="Loading..." />
  </div>
</template>

<script>
export default {
  name: "Loading",
};
</script>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  padding: 20px;
}

.loading-text {
  color: black;
  font-size: 2em;
  margin-bottom: 20px;
  font-family: "VT323", monospace;
}

.loading-image {
  width: 35%;
  height: auto;
}
</style> 