// Layout specific

import ExampleAddToCart from "@vue/components/custom-element/ExampleAddToCart.vue";
import ExampleCartCounter from "@vue/components/custom-element/ExampleCartCounter.vue";
import MainMenu from "@vue/components/custom-element/MainMenu.vue";
import ProductCard from "@vue/components/custom-element/ProductCard.vue";

import Vue from 'vue'
import {
  Button,
  Card
} from 'element-ui'
import lang from 'element-ui/lib/locale/lang/fr'
import locale from 'element-ui/lib/locale'

locale.use(lang)

Vue.use(Button)
Vue.use(Card)

export default {
  "theme-add-to-cart": ExampleAddToCart,
  "theme-cart-counter": ExampleCartCounter,
  "main-menu": MainMenu,
  "product-card": ProductCard,
};
