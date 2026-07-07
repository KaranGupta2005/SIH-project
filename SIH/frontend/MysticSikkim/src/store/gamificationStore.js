import { create } from "zustand";
import { persist } from "zustand/middleware";

const BADGES = [
  { id: "first_visit", name: "First Steps", desc: "Viewed your first monastery", xp: 10, threshold: 1 },
  { id: "explorer_3", name: "Curious Explorer", desc: "Explored 3 monasteries", xp: 25, threshold: 3 },
  { id: "explorer_5", name: "Devoted Pilgrim", desc: "Explored 5 monasteries", xp: 50, threshold: 5 },
  { id: "explorer_10", name: "Sikkim Scholar", desc: "Explored 10 monasteries", xp: 100, threshold: 10 },
  { id: "all_regions", name: "Compass Master", desc: "Visited monasteries in all 4 regions", xp: 75, threshold: 4 },
  { id: "audio_guide", name: "Active Listener", desc: "Used the audio guide feature", xp: 15, threshold: 1 },
  { id: "shared", name: "Storyteller", desc: "Shared a monastery with someone", xp: 20, threshold: 1 },
  { id: "night_owl", name: "Night Explorer", desc: "Explored after 10 PM", xp: 10, threshold: 1 },
];

const useGamificationStore = create(
  persist(
    (set, get) => ({
      visitedMonasteries: [], // array of monastery names
      xp: 0,
      level: 1,
      unlockedBadges: [], // array of badge ids
      streakDays: 0,
      lastVisitDate: null,

      // Mark a monastery as visited
      visitMonastery: (name) => {
        const state = get();
        if (state.visitedMonasteries.includes(name)) return;

        const newVisited = [...state.visitedMonasteries, name];
        let newXp = state.xp + 5; // 5 XP per monastery view
        const newBadges = [...state.unlockedBadges];

        // Check badge unlocks
        BADGES.forEach((badge) => {
          if (newBadges.includes(badge.id)) return;

          if (badge.id === "first_visit" && newVisited.length >= 1) {
            newBadges.push(badge.id);
            newXp += badge.xp;
          }
          if (badge.id === "explorer_3" && newVisited.length >= 3) {
            newBadges.push(badge.id);
            newXp += badge.xp;
          }
          if (badge.id === "explorer_5" && newVisited.length >= 5) {
            newBadges.push(badge.id);
            newXp += badge.xp;
          }
          if (badge.id === "explorer_10" && newVisited.length >= 10) {
            newBadges.push(badge.id);
            newXp += badge.xp;
          }
          if (badge.id === "night_owl") {
            const hour = new Date().getHours();
            if (hour >= 22 || hour < 5) {
              newBadges.push(badge.id);
              newXp += badge.xp;
            }
          }
        });

        // Calculate level (every 50 XP = 1 level)
        const newLevel = Math.floor(newXp / 50) + 1;

        // Streak tracking
        const today = new Date().toDateString();
        const lastDate = state.lastVisitDate;
        let newStreak = state.streakDays;
        if (lastDate !== today) {
          const yesterday = new Date(Date.now() - 86400000).toDateString();
          newStreak = lastDate === yesterday ? state.streakDays + 1 : 1;
        }

        set({
          visitedMonasteries: newVisited,
          xp: newXp,
          level: newLevel,
          unlockedBadges: newBadges,
          streakDays: newStreak,
          lastVisitDate: today,
        });
      },

      // Unlock specific badges for actions
      unlockBadge: (badgeId) => {
        const state = get();
        if (state.unlockedBadges.includes(badgeId)) return;
        const badge = BADGES.find((b) => b.id === badgeId);
        if (!badge) return;
        set({
          unlockedBadges: [...state.unlockedBadges, badgeId],
          xp: state.xp + badge.xp,
          level: Math.floor((state.xp + badge.xp) / 50) + 1,
        });
      },

      getBadges: () => BADGES,
    }),
    {
      name: "mystic-sikkim-gamification",
    }
  )
);

export default useGamificationStore;
