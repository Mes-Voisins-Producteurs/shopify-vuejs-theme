<template>
  <div>
    <h2>{{ product.title }}</h2>
    <v-lazy-image class="object-cover h-48 w-full" :alt="product.title" :src="product.featured_image" :src-placeholder="product.placeholder_image" />

    <button class="add-button">
      Ajouter au panier
    </button>
  </div>
</template>

<script>
import VLazyImage from "v-lazy-image";

export default {
  components: {
    VLazyImage
  },
  props: {
    product: { type: Object }
  },
  data() {
    return {
      // product: null
    };
  },
  created() {
    // this.product = JSON.parse(this.productstr);
    // console.log(this.pro);
  }
};
</script>
