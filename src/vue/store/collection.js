import Vue from 'vue';
import moment from 'moment';

const state = {
  cachedCollections: {},


  handle: null,
  products: [],
  collectionProductCount: 0,
  currentPage: 0,
};

const getters = {
  GET_CACHED_COLLECTION: (state) => (handle) => {
    // console.log('GET_CACHED_COLLECTION')
    return state.cachedCollections[handle]
  }
};

const mutations = {
  SET_CACHED_COLLECTIONS: (state, collectionState) => {
    let save_date = moment()

    if (state.cachedCollections[collectionState.handle]) {
      save_date = state.cachedCollections[collectionState.handle].save_date
      if (save_date == null) save_date = moment()
    }

    collectionState.save_date = save_date

    state.cachedCollections[collectionState.handle] = collectionState;
  },
  DEL_CACHED_COLLECTION: (state, handle) => {
    delete state.cachedCollections[handle]
  },
  SET_COLLECTION: (state, handle) => {
    // console.log("SET_COLLECTION - ", handle)
    state.handle = handle;
    state.products = [];
    state.currentPage = 0;
    state.collectionProductCount = 0;
  },
  SET_PRODUCTS: (state, products) => {
    state.products = products;
  },
  SET_HANDLE: (state, handle) => {
    state.handle = handle;
  },
  ADD_PRODUCTS: (state, products) => {
    state.products = state.products.concat(products);
  },
  SET_COLLECTION_PRODUCT_COUNT: (state, count) => {
    state.collectionProductCount = count;
  },
  ADD_PAGE: (state) => {
    state.currentPage++;
  },
};

const actions = {
  fetchProducts(context) {
    console.log(context)
    console.log(state)

    let handle = state.handle;
    let tags = [];
    let page = state.currentPage;
    let sortBy = null;


    console.log("fetchProduct ", handle, " page ", page)


    Vue.prototype.$productService.getAll({
      handle,
      tags,
      page,
      sortBy
    }).then(response => {
      context.commit('SET_COLLECTION_PRODUCT_COUNT', response.info.productsCount);
      context.commit('ADD_PRODUCTS', response.items);

      state.cachedCollections[handle] = {
        products: state.products,
        handle: handle,
        page: page,
        collectionProductCount: response.info.productsCount
      }

      if (state.products.length < response.info.productsCount) {
        context.commit('ADD_PAGE');
      }
    });
  }

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
