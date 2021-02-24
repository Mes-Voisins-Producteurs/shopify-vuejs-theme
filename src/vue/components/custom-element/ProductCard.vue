<template>
  <div>
    <h2>{{ product.title }}</h2>
    <v-lazy-image class="object-cover h-48 w-full" :alt="product.title" :src="product.featured_image" :src-placeholder="product.placeholder_image" />
    <el-button :loading="init">Ajouter au panier</el-button>
  </div>
</template>

<script>
import VLazyImage from "v-lazy-image";
import { Button } from "element-ui";

export default {
  components: {
    VLazyImage,
    Button
  },
  props: {
    product: { type: Object }
  },
  data() {
    return {
      init: true
    };
  },
  created() {},
  mounted() {
    this.init = false;
  }
};
</script>
