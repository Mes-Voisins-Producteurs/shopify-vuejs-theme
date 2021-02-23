<template>
  <div>
    <h2>{{ product.title }}</h2>
    <v-lazy-image class="object-cover h-48 w-full" :alt="product.title" :src="product.featured_image" :src-placeholder="product.placeholder_image" />
  </div>
</template>

<script>
import VLazyImage from "v-lazy-image";

export default {
  components: {
    VLazyImage
  },
  props: {
    productstr: { type: String }
  },
  data() {
    return {
      product: null
    };
  },
  created() {
    this.product = JSON.parse(this.productstr);
  }
};
</script>
