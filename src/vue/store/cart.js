import Vue from 'vue';

const state = {
  items: {},
  count: 0,
};

const getters = {
  GET_ITEM: (state) => (id) => {
    return state.items[id]
  }
};

const mutations = {
  ADD_ITEM: (state, item) => {
    Vue.set(
      state.items,
      item.id, {
        "product": item.product,
        'quantity': item.quantity
      }
    )

    let tmpCount = 0;
    for (let key in state.items) {
      tmpCount += state.items[key].quantity
    }

    state.count = tmpCount
  },
  MODIFY_QUANTITY: (state, item) => {
    console.log("MODIFY_QUANTITY ", item)
    state.items[item.id].quantity = item.quantity

    let tmpCount = 0;
    for (let key in state.items) {
      tmpCount += state.items[key].quantity
    }

    state.count = tmpCount
  }
};

const actions = {
  ADD_ITEM: (context, item) => {
    context.commit('ADD_ITEM', item);

    let handle = item.product.handle;
    console.log(handle);
    Vue.prototype.$productService.getOne(handle).then(response => {
      let variant_id = response.variants[0].id


      Vue.prototype.$productService.getOneVariant(handle, variant_id).then(response => {
        console.log(response)
      })


      Vue.prototype.$cart.addItem(variant_id).then(response => {
        console.log(response)
      })
    });


  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
