<template>
  <div></div>
</template>

<script>
// import ProductCard from "product-card";
import ProductCard from "@vue/components/custom-element/ProductCard.vue";

export default {
  components: {
    ProductCard
  },
  data() {
    return {
      collection: null,
      page: 1,
      handle: null,
      loadedProducts: [],
      collectionProductsCount: 0
    };
  }
};
</script>
