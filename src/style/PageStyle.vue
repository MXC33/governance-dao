<template>
  <div class="page-background"></div>
</template>

<script>
export default {
  mounted() {
    this.$el.parentNode.classList.add("page-style");
  },
  beforeUnmount() {
    this.$el.parentNode.classList.remove("page-style");
  },
};
</script>

<style scoped>
.page-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: solid black;
  z-index: 0;
}
</style>
