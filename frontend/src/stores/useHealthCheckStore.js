import { create } from "zustand";

const useHealthCheckStore = create(set => ({
  storeOwner: null,

  setStoreOwner: name =>
    set({
      storeOwner: name,
    }),
}));

export default useHealthCheckStore;
