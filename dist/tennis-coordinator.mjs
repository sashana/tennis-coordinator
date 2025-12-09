function i(s) {
  return s.toLowerCase().trim().replace(/\s+/g, " ");
}
function D(s) {
  switch (s) {
    case "singles":
      return "Singles Only";
    case "doubles":
      return "Doubles Only";
    case "both":
      return "Either";
    default:
      return "Either";
  }
}
function C(s, e) {
  return s && e ? `${s} - ${e}` : s ? `From ${s}` : e ? `Until ${e}` : "";
}
function I(s) {
  return (/* @__PURE__ */ new Date(s + "T12:00:00")).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  });
}
function w(s) {
  return (/* @__PURE__ */ new Date(s + "T12:00:00")).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  });
}
function x(s) {
  const e = new Date(s), n = (/* @__PURE__ */ new Date()).getTime() - e.getTime(), r = Math.floor(n / 6e4), a = Math.floor(n / 36e5);
  return r < 1 ? "Just now" : r < 60 ? `${r} minute${r === 1 ? "" : "s"} ago` : a < 24 ? `${a} hour${a === 1 ? "" : "s"} ago` : e.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}
function A() {
  return (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
}
function G(s) {
  const e = /* @__PURE__ */ new Date();
  return e.setDate(e.getDate() + s), e.toISOString().split("T")[0];
}
function z(s, e) {
  return i(s) === i(e);
}
function j(s, e) {
  if (!s || !e || !s.start && !s.end || !e.start && !e.end)
    return !0;
  const t = (d) => {
    const h = d.match(/(\d+):?(\d*)?\s*(AM|PM)?/i);
    if (!h) return 0;
    let u = parseInt(h[1]);
    const f = h[2] ? parseInt(h[2]) : 0, y = h[3]?.toUpperCase();
    return y === "PM" && u !== 12 && (u += 12), y === "AM" && u === 12 && (u = 0), u * 60 + f;
  }, n = s.start ? t(s.start) : 0, r = s.end ? t(s.end) : 1440, a = e.start ? t(e.start) : 0, p = e.end ? t(e.end) : 1440;
  return n < p && a < r;
}
function B(s) {
  return s.replace(/[\s\-\(\)]/g, "");
}
function H(s) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}
function V(s) {
  return s.replace(/\D/g, "").length >= 10;
}
function W(s) {
  const e = document.createElement("div");
  return e.textContent = s, e.innerHTML;
}
function Y(s, e) {
  let t = null;
  return function(...n) {
    t && clearTimeout(t), t = setTimeout(() => {
      s.apply(this, n);
    }, e);
  };
}
function K() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
function N(s, e) {
  return e[i(s)] || { include: [], exclude: [] };
}
function T(s, e, t) {
  const n = N(s, t), r = N(e, t), a = i(s), p = i(e);
  return !n.exclude.includes(p) && !r.exclude.includes(a);
}
function R(s, e) {
  if (!s || !e || !s.start && !s.end && !e.start && !e.end) return !0;
  const t = (l) => {
    if (!l) return null;
    const [m, b] = l.split(":").map(Number);
    return m * 60 + b;
  }, n = t(s.start), r = t(s.end), a = t(e.start), p = t(e.end), d = 360, h = 1260, u = n ?? d, f = r ?? h, y = a ?? d;
  return u < (p ?? h) && y < f;
}
function v(s, e, t) {
  return T(s.name, e.name, t) ? R(s.timeRange, e.timeRange) : !1;
}
function q(s, e = {}) {
  const t = [], n = [];
  let r = s.map((o, l) => ({ ...o, originalIndex: l }));
  r.sort((o, l) => o.timestamp - l.timestamp);
  const a = r.filter((o) => o.playStyle === "doubles"), p = r.filter((o) => o.playStyle === "singles"), d = r.filter(
    (o) => o.playStyle === "both" || !o.playStyle
  );
  let h = [...a, ...d].sort(
    (o, l) => o.timestamp - l.timestamp
  );
  for (; h.length >= 4; ) {
    const o = h.slice(0, 4);
    t.push({
      type: "doubles",
      number: t.filter((l) => l.type === "doubles").length + 1,
      players: o
    }), h.splice(0, 4);
  }
  let u = [...p].sort((o, l) => o.timestamp - l.timestamp);
  for (; u.length >= 2; ) {
    let o = null;
    for (let l = 0; l < u.length - 1; l++) {
      for (let m = l + 1; m < u.length; m++)
        if (v(u[l], u[m], e)) {
          o = [u[l], u[m]];
          break;
        }
      if (o) break;
    }
    if (o)
      t.push({
        type: "singles",
        players: o
      }), o.forEach((l) => {
        const m = u.findIndex(
          (b) => b.originalIndex === l.originalIndex
        );
        m > -1 && u.splice(m, 1);
      });
    else
      break;
  }
  const f = h, y = u;
  if (f.length > 0) {
    const o = 4 - f.length, l = f.filter(
      (g) => g.playStyle === "both" || !g.playStyle
    ), m = l.length, b = f.every(
      (g) => g.playStyle === "both" || !g.playStyle
    ), P = f.every(
      (g) => g.allowRotation !== !1
    ), k = f.length === 3 && v(
      f[0],
      f[1],
      e
    ) && v(
      f[0],
      f[2],
      e
    ) && v(
      f[1],
      f[2],
      e
    );
    let S = !1;
    m >= 2 && (S = v(
      l[0],
      l[1],
      e
    )), t.push({
      type: "doubles-forming",
      players: f,
      needed: o,
      canRotate: f.length === 3 && b && P && k,
      eitherCount: m,
      canPlaySingles: S
    });
  }
  return y.length > 0 && y.forEach((o) => {
    t.push({
      type: "singles-forming",
      players: [o],
      needed: 1
    });
  }), { matches: t, warnings: n };
}
function J(s, e) {
  const t = i(s);
  return e.some(
    (n) => (n.type === "doubles" || n.type === "singles") && n.players.some((r) => i(r.name) === t)
  );
}
function Q(s, e) {
  const t = i(s);
  for (const n of e)
    if (n.players.some((r) => i(r.name) === t))
      return n.type;
  return null;
}
function E(s, e) {
  return (e.mutedMembers || []).some(
    (n) => i(n) === i(s)
  );
}
function X(s, e, t) {
  return !(!e.activityAlerts || i(s) === i(t) || E(t, e));
}
function Z(s, e) {
  return e.matchConfirmations === !0;
}
function ee(s, e, t = {}) {
  const n = w(e), r = [];
  if (t.playStyle && r.push(D(t.playStyle)), t.timeStart || t.timeEnd) {
    const d = C(t.timeStart, t.timeEnd);
    d && r.push(d);
  }
  let a = "";
  t.addedBy && i(t.addedBy) !== i(s) && (a = ` (added by ${t.addedBy})`);
  const p = r.length > 0 ? ` [${r.join(", ")}]` : "";
  return `🎾 ${s} checked in for ${n}${p}${a}`;
}
function te(s, e, t) {
  const n = w(e);
  let r = "";
  return t && i(t) !== i(s) && (r = ` (by ${t})`), `👋 ${s} is no longer available for ${n}${r}`;
}
function se(s, e, t, n) {
  const r = w(e);
  return `✅ You're in ${t === "doubles" ? "Doubles" : "Singles"} for ${r} with ${n.join(", ")}`;
}
function ne(s, e) {
  return `👤 ${s} was added to the group by ${e}`;
}
function re(s, e) {
  return `🚫 ${s} was removed from the group by ${e}`;
}
function ie(s, e, t = {}) {
  return {
    message: e,
    timestamp: Date.now(),
    read: !1,
    type: s,
    ...t
  };
}
function ae(s, e, t, n = {}) {
  return {
    timestamp: Date.now(),
    action: s,
    player: e,
    by: t,
    ...n
  };
}
function oe(s) {
  const e = new Date(s.timestamp).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit"
  });
  switch (s.action) {
    case "check-in": {
      const t = [];
      if (s.playStyle && t.push(D(s.playStyle)), s.timeRange) {
        const a = C(s.timeRange.start, s.timeRange.end);
        a && t.push(a);
      }
      const n = t.length > 0 ? ` [${t.join(", ")}]` : "", r = i(s.by) !== i(s.player) ? ` (added by ${s.by})` : "";
      return `${e} - ${s.player} checked in${n}${r}`;
    }
    case "removal": {
      const t = i(s.by) !== i(s.player) ? ` (by ${s.by})` : "";
      return `${e} - ${s.player} removed${t}`;
    }
    case "member_added": {
      const t = s.contact ? ` (${s.contact})` : "";
      return `${e} - ${s.player}${t} added by ${s.by}`;
    }
    case "member_removed":
      return `${e} - ${s.player} removed by ${s.by}`;
    case "whatsapp_share": {
      const t = s.type ? ` (${s.type})` : "";
      return `${e} - ${s.by} shared to WhatsApp${t}`;
    }
    case "notes_saved": {
      const t = s.matchKey ? ` for ${s.matchKey}` : "";
      return `${e} - Notes saved${t} by ${s.by}`;
    }
    default:
      return `${e} - ${s.action} by ${s.by}`;
  }
}
function ce(s, e) {
  return !(e.player && i(s.player) !== i(e.player) || e.action && s.action !== e.action || e.by && i(s.by) !== i(e.by));
}
function le(s, e = !1) {
  return [...s].sort(
    (t, n) => e ? t.timestamp - n.timestamp : n.timestamp - t.timestamp
  );
}
function ue(s) {
  return s.reduce(
    (e, t) => {
      switch (t.action) {
        case "check-in":
          e.checkins++;
          break;
        case "removal":
          e.removals++;
          break;
        case "member_added":
        case "member_removed":
          e.memberChanges++;
          break;
        case "whatsapp_share":
          e.shares++;
          break;
      }
      return e;
    },
    { checkins: 0, removals: 0, memberChanges: 0, shares: 0 }
  );
}
function fe(s) {
  const e = /* @__PURE__ */ new Set();
  for (const t of s)
    t.player && e.add(t.player);
  return Array.from(e);
}
const c = {
  groups: () => "groups",
  group: (s) => `groups/${s}`,
  checkins: (s) => `groups/${s}/checkins`,
  checkinsDate: (s, e) => `groups/${s}/checkins/${e}`,
  settings: (s) => `groups/${s}/settings`,
  activity: (s, e) => `groups/${s}/activity/${e}`,
  activityAll: (s) => `groups/${s}/activity`,
  matchNotes: (s, e) => `groups/${s}/matchNotes/${e}`,
  matchNote: (s, e, t) => `groups/${s}/matchNotes/${e}/${t}`,
  userPreferences: () => "userPreferences",
  siteSettings: () => "siteSettings",
  userNotificationPrefs: (s, e) => `groups/${s}/userNotifications/${i(e)}/preferences`,
  userNotifications: (s, e) => `groups/${s}/userNotifications/${i(e)}/items`,
  groupNotifications: (s) => `groups/${s}/userNotifications`
};
class F {
  db;
  constructor(e) {
    this.db = e;
  }
  /**
   * Get a reference to a path
   */
  ref(e) {
    return this.db.ref(e);
  }
  // ============================================
  // Groups
  // ============================================
  async loadAvailableGroups() {
    return (await this.ref(c.groups()).once("value")).val() || {};
  }
  async saveGroup(e, t) {
    await this.ref(c.group(e)).update(t);
  }
  async deleteGroup(e) {
    await this.ref(c.group(e)).remove();
  }
  // ============================================
  // Settings
  // ============================================
  async loadSettings(e) {
    const n = (await this.ref(c.settings(e)).once("value")).val();
    return n ? {
      groupName: n.groupName || "Unknown Group",
      coreMembers: n.coreMembers || [],
      memberDetails: n.memberDetails || {},
      groupPin: n.groupPin || "14675",
      adminPin: n.adminPin || "3250",
      location: n.location || {
        lat: 37.2358,
        lon: -121.9623,
        name: "Los Gatos, CA"
      }
    } : null;
  }
  async saveSettings(e, t) {
    await this.ref(c.settings(e)).update(t);
  }
  async updateMembers(e, t, n) {
    await this.ref(c.settings(e)).update({
      members: t,
      memberDetails: n
    });
  }
  // ============================================
  // Check-ins
  // ============================================
  async loadCheckins(e) {
    return (await this.ref(c.checkins(e)).once("value")).val() || {};
  }
  async loadCheckinsForDate(e, t) {
    return (await this.ref(c.checkinsDate(e, t)).once("value")).val() || [];
  }
  async saveCheckinsForDate(e, t, n) {
    await this.ref(c.checkinsDate(e, t)).set(n);
  }
  async verifyCheckinsForDate(e, t, n) {
    return ((await this.ref(c.checkinsDate(e, t)).once("value")).val() || []).length === n;
  }
  // ============================================
  // User Preferences
  // ============================================
  async loadUserPreferences() {
    return (await this.ref(c.userPreferences()).once("value")).val() || {};
  }
  async saveUserPreferences(e) {
    await this.ref(c.userPreferences()).set(e);
  }
  // ============================================
  // Activity Log
  // ============================================
  async loadActivityForDate(e, t) {
    return (await this.ref(c.activity(e, t)).once("value")).val() || {};
  }
  async loadAllActivity(e) {
    return (await this.ref(c.activityAll(e)).once("value")).val() || {};
  }
  async logActivity(e, t, n) {
    await this.ref(c.activity(e, t)).push().set(n);
  }
  // ============================================
  // Match Notes
  // ============================================
  async loadMatchNotes(e, t) {
    return (await this.ref(c.matchNotes(e, t)).once("value")).val() || {};
  }
  async saveMatchNote(e, t, n, r) {
    await this.ref(c.matchNote(e, t, n)).set(r);
  }
  // ============================================
  // Notifications
  // ============================================
  async loadNotificationPrefs(e, t) {
    const r = (await this.ref(
      c.userNotificationPrefs(e, t)
    ).once("value")).val();
    return {
      activityAlerts: r?.activityAlerts ?? !0,
      matchConfirmations: r?.matchConfirmations ?? !0,
      mutedMembers: r?.mutedMembers || []
    };
  }
  async saveNotificationPrefs(e, t, n) {
    await this.ref(c.userNotificationPrefs(e, t)).set(n);
  }
  async loadNotifications(e, t) {
    return (await this.ref(
      c.userNotifications(e, t)
    ).once("value")).val() || {};
  }
  async addNotification(e, t, n) {
    await this.ref(c.userNotifications(e, t)).push().set(n);
  }
  async markNotificationRead(e, t, n) {
    await this.ref(
      `${c.userNotifications(e, t)}/${n}/read`
    ).set(!0);
  }
  async markAllNotificationsRead(e, t) {
    const n = await this.loadNotifications(e, t), r = {};
    for (const a of Object.keys(n))
      r[`${a}/read`] = !0;
    Object.keys(r).length > 0 && await this.ref(c.userNotifications(e, t)).update(r);
  }
  async clearNotifications(e, t) {
    await this.ref(c.userNotifications(e, t)).remove();
  }
  // ============================================
  // Site Settings
  // ============================================
  async loadSiteSettings() {
    return (await this.ref(c.siteSettings()).once("value")).val() || {};
  }
  async saveSiteSettings(e) {
    await this.ref(c.siteSettings()).set(e);
  }
}
function he(s) {
  return new F(s);
}
const O = {
  activityAlerts: !0,
  matchConfirmations: !0,
  mutedMembers: []
}, L = {
  lat: 37.2358,
  lon: -121.9623,
  name: "Los Gatos, CA"
};
function M() {
  return {
    // Group state
    currentGroupId: null,
    currentGroupName: "",
    availableGroups: {},
    // Data state
    allCheckins: {},
    userPreferences: {},
    coreMembers: [],
    memberDetails: {},
    matchNotes: {},
    // Settings
    groupPin: "14675",
    adminPin: "3250",
    weatherLocation: L,
    weatherCache: {},
    // UI state
    selectedDate: A(),
    selectedPreference: "both",
    selectedName: "",
    isGuest: !1,
    addedBy: "",
    // Session state
    sessionUser: "",
    // Preferences editing state
    currentEditingUser: null,
    tempInclude: [],
    tempExclude: [],
    // Notification state
    userNotificationPrefs: O
  };
}
class _ {
  state;
  listeners;
  constructor(e) {
    this.state = { ...M(), ...e }, this.listeners = /* @__PURE__ */ new Map();
  }
  /**
   * Get the current state
   */
  getState() {
    return this.state;
  }
  /**
   * Get a specific state value
   */
  get(e) {
    return this.state[e];
  }
  /**
   * Set a specific state value
   */
  set(e, t) {
    const n = this.state[e];
    this.state[e] = t, this.notifyListeners(e, t, n);
  }
  /**
   * Update multiple state values at once
   */
  update(e) {
    for (const [t, n] of Object.entries(e)) {
      const r = t, a = this.state[r];
      this.state[r] = n, this.notifyListeners(r, n, a);
    }
  }
  /**
   * Subscribe to state changes for a specific key
   */
  subscribe(e, t) {
    return this.listeners.has(e) || this.listeners.set(e, /* @__PURE__ */ new Set()), this.listeners.get(e).add(t), () => {
      this.listeners.get(e)?.delete(t);
    };
  }
  /**
   * Notify listeners of a state change
   */
  notifyListeners(e, t, n) {
    const r = this.listeners.get(e);
    if (r)
      for (const a of r)
        a(t, n);
  }
  // ============================================
  // Convenience methods for common operations
  // ============================================
  /**
   * Get check-ins for the selected date
   */
  getCheckinsForSelectedDate() {
    const e = this.state.selectedDate;
    return e ? this.state.allCheckins[e] || [] : [];
  }
  /**
   * Get check-ins for a specific date
   */
  getCheckinsForDate(e) {
    return this.state.allCheckins[e] || [];
  }
  /**
   * Add a check-in for the selected date
   */
  addCheckin(e) {
    const t = this.state.selectedDate;
    if (!t) return;
    const n = this.state.allCheckins[t] || [], r = {
      ...this.state.allCheckins,
      [t]: [...n, e]
    };
    this.set("allCheckins", r);
  }
  /**
   * Remove a check-in by index for the selected date
   */
  removeCheckin(e) {
    const t = this.state.selectedDate;
    if (!t) return null;
    const n = this.state.allCheckins[t] || [];
    if (e < 0 || e >= n.length) return null;
    const r = n[e], a = {
      ...this.state.allCheckins,
      [t]: n.filter((p, d) => d !== e)
    };
    return this.set("allCheckins", a), r;
  }
  /**
   * Update check-ins for a specific date
   */
  setCheckinsForDate(e, t) {
    const n = {
      ...this.state.allCheckins,
      [e]: t
    };
    this.set("allCheckins", n);
  }
  /**
   * Get user preference for a normalized name
   */
  getUserPreference(e) {
    const t = i(e);
    return this.state.userPreferences[t] || { include: [], exclude: [] };
  }
  /**
   * Set user preference
   */
  setUserPreference(e, t) {
    const n = i(e), r = {
      ...this.state.userPreferences,
      [n]: t
    };
    this.set("userPreferences", r);
  }
  /**
   * Check if a member is in core members
   */
  isCoreMember(e) {
    const t = i(e);
    return this.state.coreMembers.some(
      (n) => i(n) === t
    );
  }
  /**
   * Add a core member
   */
  addCoreMember(e) {
    this.isCoreMember(e) || this.set("coreMembers", [...this.state.coreMembers, e]);
  }
  /**
   * Remove a core member
   */
  removeCoreMember(e) {
    const t = i(e);
    this.set(
      "coreMembers",
      this.state.coreMembers.filter((n) => i(n) !== t)
    );
  }
  /**
   * Get match note for a match key
   */
  getMatchNote(e) {
    return this.state.matchNotes[e] || "";
  }
  /**
   * Set match note
   */
  setMatchNote(e, t) {
    const n = {
      ...this.state.matchNotes,
      [e]: t
    };
    this.set("matchNotes", n);
  }
  /**
   * Check if a member is muted
   */
  isMemberMuted(e) {
    const t = this.state.userNotificationPrefs.mutedMembers || [], n = i(e);
    return t.some((r) => i(r) === n);
  }
  /**
   * Toggle muted status for a member
   */
  toggleMutedMember(e) {
    const t = this.state.userNotificationPrefs.mutedMembers || [], n = i(e);
    let r;
    this.isMemberMuted(e) ? r = t.filter(
      (a) => i(a) !== n
    ) : r = [...t, e], this.set("userNotificationPrefs", {
      ...this.state.userNotificationPrefs,
      mutedMembers: r
    });
  }
  /**
   * Reset state to initial values
   */
  reset() {
    this.state = M();
  }
  /**
   * Reset state for a new group
   */
  resetForNewGroup() {
    this.update({
      allCheckins: {},
      coreMembers: [],
      memberDetails: {},
      matchNotes: {},
      userPreferences: {}
    });
  }
}
function U(s) {
  return new _(s);
}
let $ = null;
function me() {
  return $ || ($ = U()), $;
}
function de() {
  $ = null;
}
export {
  _ as AppStore,
  F as FirebaseService,
  v as canPlayTogetherWithTime,
  B as cleanPhoneNumber,
  ae as createActivityEntry,
  U as createAppStore,
  he as createFirebaseService,
  M as createInitialState,
  ie as createNotificationData,
  Y as debounce,
  W as escapeHtml,
  c as firebasePaths,
  oe as formatActivityDisplay,
  ee as formatCheckinNotification,
  I as formatDate,
  w as formatDateForNotification,
  se as formatMatchFormedNotification,
  ne as formatMemberAddedNotification,
  re as formatMemberRemovedNotification,
  te as formatRemovalNotification,
  x as formatTime,
  C as formatTimeRange,
  K as generateId,
  ue as getActivitySummary,
  G as getDateOffset,
  me as getDefaultStore,
  Q as getPlayerMatchType,
  D as getPreferenceLabel,
  A as getTodayDate,
  fe as getUniquePlayers,
  E as isMemberMuted,
  J as isPlayerInMatch,
  z as isSameName,
  H as isValidEmail,
  V as isValidPhone,
  ce as matchesActivityFilter,
  i as normalizeName,
  q as organizeMatches,
  de as resetDefaultStore,
  X as shouldReceiveActivityNotification,
  Z as shouldReceiveMatchNotification,
  le as sortActivitiesByTime,
  j as timeRangesOverlap,
  R as timesOverlap
};
