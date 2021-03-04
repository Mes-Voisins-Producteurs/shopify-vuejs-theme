import Vue from 'vue';
import moment from 'moment';

const state = {
  cachedCollections: {},
};

const getters = {
  GET_CACHED_COLLECTION: (state) => (handle) => {
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
};

const actions = {

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
