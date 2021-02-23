<template>
  <div v-for="line in cartItems" :key="line.id">{{ line }}</div>
</template>

<script>
export default {
  props: ["items"],
  data() {
    return {
      cartItems: []
    };
  },
  created() {
    this.cartItems = parseJson(this.items);
  }
};
</script>
