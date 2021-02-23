// Layout specific
import layoutElements from "@vue/components/layout.js";

// home specific
import Testo from "@vue/entry/collection/custom-elements/Testo.vue";
import Collection from "@vue/entry/collection/custom-elements/Collection.vue";
// import ProductCard from "@vue/components/custom-element/ProductCard.vue";

console.log(layoutElements)

export default {
  ...layoutElements,
  "tes-to": Testo,
  "collection-main": Collection,
};
