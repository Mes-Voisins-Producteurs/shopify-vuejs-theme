<template>
  <div>
    <div v-if="collection">
      <h1 class="page-heading h1 text-2xl md:text-3xl lg:text-4xl">
        {{ collection.title }} -
        <span v-if="collectionProductsCount">{{ loadedProducts.length }} / {{ collectionProductsCount }}</span>
      </h1>
      <p v-html="collection.body_html"></p>
      <div class="flex-wrap flex">
        <product-card v-for="product in this.loadedProducts" class="w-72 m-4" :product="product" :key="product.id"></product-card>
      </div>
      <infinite-loading spinner="waveDots" class="w-full	h-16 border-2" @infinite="infiniteHandler"></infinite-loading>
    </div>
    <div v-else>
      Chargement de la collection
    </div>
  </div>
</template>

<script>
import Vue from "vue";

import InfiniteLoading from "vue-infinite-loading";
import moment from "moment";
import ProductCard from "@vue/components/custom-element/ProductCard.vue";

export default {
  props: ["config"],
  components: {
    InfiniteLoading,
    ProductCard
  },
  computed: {
    allProductsFetched: function() {
      if (this.collectionProductsCount == 0) return false;

      if (this.loadedProducts.length == this.collectionProductsCount) return true;
      return false;
    }
  },
  data() {
    return {
      collection: null,
      page: 1,
      handle: null,
      loadedProducts: [],
      collectionProductsCount: 0
    };
  },
  methods: {
    infiniteHandler($state) {
      console.log("infinite called");
      if (this.allProductsFetched) $state.complete();
      else this.fetchProducts($state);
    },
    fetchProducts($state) {
      let handle = this.handle;
      let tags = [];
      let page = this.page;
      let sortBy = null;

      console.log("fetchProduct ", handle, " page ", page);

      this.$productService
        .getAllGraphQL({
          handle,
          tags,
          page,
          sortBy
        })
        .then(response => {
          this.collectionProductsCount = response.info.productsCount;
          this.loadedProducts = this.loadedProducts.concat(response.items);

          if (this.allProductsFetched) {
            console.log("COMPLETE");
            $state.complete();
          } else {
            $state.loaded();
            console.log("PAGE ++");
            this.page++;
          }

          this.$store.commit("collection/SET_CACHED_COLLECTIONS", {
            handle: this.handle,
            page: this.page,
            loadedProducts: this.loadedProducts,
            collectionProductsCount: this.collectionProductsCount
          });
        });
    }
  },
  mounted() {
    this.collection = JSON.parse(this.config);

    // this.$store.commit("collection/SET_COLLECTION", this.collection.handle);

    this.handle = this.collection.handle;
    this.page = 1;
    this.loadedProducts = [];

    let cachedCollection = this.$store.getters["collection/GET_CACHED_COLLECTION"](this.collection.handle);

    if (cachedCollection != null) {
      let updated_at = moment(this.collection.updated_at);
      let cached_at = moment(cachedCollection.save_date);

      if (cached_at > updated_at) {
        console.log("the cached collection is still relrevant");

        this.page = cachedCollection.page;
        this.loadedProducts = cachedCollection.loadedProducts;
        this.collectionProductsCount = cachedCollection.collectionProductsCount;
      } else {
        console.log("the cached collection is no more relevant ==> flush");
        this.$store.commit("collection/DEL_CACHED_COLLECTION", this.collection.handle);
      }
    }
  }
};
</script>

<style scoped>
.v-lazy-image {
  filter: blur(10px);
  transition: filter 0.7s;
}
.v-lazy-image-loaded {
  filter: blur(0);
}
</style>
