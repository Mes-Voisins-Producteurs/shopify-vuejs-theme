<template>
  <el-card shadow="hover">
    <h2 class="h2 h-20">{{ product.title }} ({{ quantityInCart }})</h2>
    <v-lazy-image class="object-cover h-48 w-full" :alt="product.title" :src="product.featured_image" :src-placeholder="product.placeholder_image" />
    <div v-if="product.available">
      <el-button v-if="quantityInCart == 0" @click="addToCart()" :loading="init" type="success">Ajouter au panier</el-button>
      <div v-if="quantityInCart > 0">
        <el-button circle @click="modifyQuantity('plus')" type="success" icon="el-icon-plus"></el-button>
        <span class="text-center w-8">{{ quantityInCart }}</span>
        <el-button circle @click="modifyQuantity('minus')" type="success" icon="el-icon-minus"></el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import VLazyImage from "v-lazy-image";
import { Button } from "element-ui";
import { mapActions } from "vuex";

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
  computed: {
    quantityInCart() {
      let itemInCart = this.$store.getters["cart/GET_ITEM"](this.product.id);

      if (itemInCart != null) {
        return itemInCart.quantity;
      }

      return 0;
    }
  },
  methods: {
    addToCart() {
      console.log("add to cart ", this.product.title);

      this.$store.dispatch("cart/ADD_ITEM", {
        id: this.product.id,
        quantity: 1,
        product: this.product
      });
    },
    modifyQuantity(mode = "plus") {
      let quantity = this.quantityInCart;
      if (mode == "minus") quantity--;
      else quantity++;

      this.$store.commit("cart/MODIFY_QUANTITY", {
        id: this.product.id,
        quantity: quantity
      });
    }
  },
  created() {},
  mounted() {
    this.init = false;
    // let handle = this.product.handle;
    // console.log(handle);
    // this.$productService.getOne(handle).then(response => {
    //   console.log(response);
    // });
  }
};
</script>
