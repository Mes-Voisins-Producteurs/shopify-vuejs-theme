import VuexPersist from "vuex-persist";
import cart from "./cart";
import collection from "./collection";


const vuexLocal = new VuexPersist({
  key: "_theme_local",
  storage: window.localStorage
});

export default {
  modules: {
    cart,
    collection,
  },
  plugins: [vuexLocal.plugin]
};
