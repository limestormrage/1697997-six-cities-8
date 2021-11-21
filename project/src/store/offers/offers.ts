import { createReducer } from '@reduxjs/toolkit';
import { OffersState } from '../../types/state';
import { changeFavoriteStatusRequest, changeFavoriteStatusSucces, loadCardsError, loadCardsRequest,
  loadCardsSuccess, loadFavoritesOffersError, loadFavoritesOffersRequets, loadFavoritesOffersSuccess,
  loadNearbyError, loadNearbyRequest, loadNearbySuccess, loadOfferError, loadOfferRequest,
  loadOfferSuccess,
  resetOfferError} from '../action';

const initialState: OffersState = {
  cardList: [],
  offersLoading: false,
  offersError: false,
  offerLoading: false,
  offerError: false,
  offer: null,
  offersNearbyLoading: false,
  offersNearbyError: false,
  offersNearby: [],
  favoritesOffersLoading: false,
  favoritesOffersError: false,
  favoritesOffers: [],
  changeFavoriteStatusLoading: false,
};

const offers = createReducer(initialState, (builder) => {
  builder
    .addCase(loadCardsRequest, (state) => {
      state.offersLoading = true;
    })
    .addCase(loadCardsSuccess, (state, action) => {
      const {cards} = action.payload;
      state.offersLoading = false;
      state.cardList = cards;
    })
    .addCase(loadCardsError, (state) => {
      state.offersLoading = false;
      state.offersError = true;
    })
    .addCase(loadOfferRequest, (state) => {
      state.offerLoading = true;
    })
    .addCase(loadOfferSuccess, (state, action) => {
      const {offer} = action.payload;
      state.offerLoading = false;
      state.offer = offer;
    })
    .addCase(loadOfferError, (state) => {
      state.offerLoading = false;
      state.offerError = true;
    })
    .addCase(loadNearbyRequest, (state) => {
      state.offersNearbyLoading = true;
    })
    .addCase(loadNearbySuccess, (state, action) => {
      const {nearOffers} = action.payload;
      state.offersNearbyLoading = false;
      state.offersNearby = nearOffers;
    })
    .addCase(loadNearbyError, (state) => {
      state.offersNearbyLoading = false;
      state.offersNearbyError = true;
    })
    .addCase(loadFavoritesOffersRequets, (state) => {
      state.favoritesOffersLoading = true;
    })
    .addCase(loadFavoritesOffersSuccess, (state, action) => {
      const {favoritesOffers} = action.payload;
      state.favoritesOffersLoading = false;
      state.favoritesOffers = favoritesOffers;
    })
    .addCase(loadFavoritesOffersError, (state) => {
      state.favoritesOffersLoading = false;
      state.favoritesOffersError = true;
    })
    .addCase(changeFavoriteStatusRequest, (state) => {
      state.changeFavoriteStatusLoading = true;
    })
    .addCase(changeFavoriteStatusSucces, (state, action) => {
      const {offer} = action.payload;
      const indexOfCardList = state.cardList.findIndex((card) => card.id === offer.id);
      const indexOfNearby = state.offersNearby.findIndex((card) => card.id === offer.id);
      const indexOfFavorites = state.favoritesOffers.findIndex((card) => card.id === offer.id);
      state.cardList[indexOfCardList] = offer;
      state.offersNearby[indexOfNearby] = offer;
      state.favoritesOffers[indexOfFavorites] = offer;
      if (state.offer !== null) {
        state.offer = offer;
      }
      state.changeFavoriteStatusLoading = false;
    })
    .addCase(resetOfferError, (state) => {
      state.offer = null;
      state.offersNearby = [];
      state.offerError = false;
      state.offersNearbyError = false;
    });
});

export {offers};
