import { create } from "zustand";
import { openDB } from "idb";

const DB_NAME = "MysticSikkimOffline";
const DB_VERSION = 1;

// Initialize IndexedDB
async function getDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("monasteries")) {
        db.createObjectStore("monasteries", { keyPath: "name" });
      }
      if (!db.objectStoreNames.contains("archives")) {
        db.createObjectStore("archives", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("festivals")) {
        db.createObjectStore("festivals", { keyPath: "name" });
      }
      if (!db.objectStoreNames.contains("meta")) {
        db.createObjectStore("meta", { keyPath: "key" });
      }
    },
  });
}

const useOfflineStore = create((set, get) => ({
  isOnline: navigator.onLine,
  monasteries: [],
  monasteriesLoaded: false,
  lastSync: null,

  // Initialize online/offline listener
  initListeners: () => {
    window.addEventListener("online", () => set({ isOnline: true }));
    window.addEventListener("offline", () => set({ isOnline: false }));
  },

  // Load monasteries (try network first, fallback to IndexedDB)
  loadMonasteries: async () => {
    try {
      // Try fetching from network
      const res = await fetch("/info/monasteries.json");
      const data = await res.json();
      const monasteries = data.monasteries || [];

      // Cache in IndexedDB
      const db = await getDB();
      const tx = db.transaction("monasteries", "readwrite");
      for (const m of monasteries) {
        await tx.store.put(m);
      }
      await tx.done;

      // Save sync time
      const metaTx = db.transaction("meta", "readwrite");
      await metaTx.store.put({ key: "lastSync", value: Date.now() });
      await metaTx.done;

      set({ monasteries, monasteriesLoaded: true, lastSync: Date.now() });
      return monasteries;
    } catch {
      // Offline — read from IndexedDB
      try {
        const db = await getDB();
        const monasteries = await db.getAll("monasteries");
        const meta = await db.get("meta", "lastSync");
        set({
          monasteries,
          monasteriesLoaded: true,
          lastSync: meta?.value || null,
        });
        return monasteries;
      } catch {
        set({ monasteries: [], monasteriesLoaded: true });
        return [];
      }
    }
  },

  // Cache archive data
  cacheArchives: async (archives) => {
    try {
      const db = await getDB();
      const tx = db.transaction("archives", "readwrite");
      for (const item of archives) {
        await tx.store.put(item);
      }
      await tx.done;
    } catch (err) {
      console.warn("Failed to cache archives:", err);
    }
  },

  // Get cached archives
  getCachedArchives: async () => {
    try {
      const db = await getDB();
      return await db.getAll("archives");
    } catch {
      return [];
    }
  },
}));

export default useOfflineStore;
