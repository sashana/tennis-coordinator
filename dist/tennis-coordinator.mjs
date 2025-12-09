function i(s) {
  return s.toLowerCase().trim().replace(/\s+/g, " ");
}
function P(s) {
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
function S(s) {
  if (!s) return "";
  const [t, e] = s.split(":"), n = parseInt(t), r = n >= 12 ? "PM" : "AM";
  return `${n % 12 || 12}:${e}${r}`;
}
function C(s, t) {
  return !s && !t ? "" : s && t ? `${S(s)}-${S(t)}` : s ? `from ${S(s)}` : t ? `until ${S(t)}` : "";
}
function x(s) {
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
function G(s) {
  const t = new Date(s), e = /* @__PURE__ */ new Date(), n = t.toDateString() === e.toDateString(), r = t.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit"
  });
  return n ? r : `${t.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric"
  })} ${r}`;
}
function T() {
  return (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
}
function z(s) {
  const t = /* @__PURE__ */ new Date();
  return t.setDate(t.getDate() + s), t.toISOString().split("T")[0];
}
function j(s, t) {
  return i(s) === i(t);
}
function B(s, t) {
  if (!s || !t || !s.start && !s.end || !t.start && !t.end)
    return !0;
  const e = (d) => {
    const h = d.match(/(\d+):?(\d*)?\s*(AM|PM)?/i);
    if (!h) return 0;
    let u = parseInt(h[1]);
    const f = h[2] ? parseInt(h[2]) : 0, y = h[3]?.toUpperCase();
    return y === "PM" && u !== 12 && (u += 12), y === "AM" && u === 12 && (u = 0), u * 60 + f;
  }, n = s.start ? e(s.start) : 0, r = s.end ? e(s.end) : 1440, a = t.start ? e(t.start) : 0, p = t.end ? e(t.end) : 1440;
  return n < p && a < r;
}
function H(s) {
  return s.replace(/[\s\-\(\)]/g, "");
}
function V(s) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}
function W(s) {
  return s.replace(/\D/g, "").length >= 10;
}
function Y(s) {
  const t = document.createElement("div");
  return t.textContent = s, t.innerHTML;
}
function K(s, t) {
  let e = null;
  return function(...n) {
    e && clearTimeout(e), e = setTimeout(() => {
      s.apply(this, n);
    }, t);
  };
}
function q() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
function M(s, t) {
  return t[i(s)] || { include: [], exclude: [] };
}
function R(s, t, e) {
  const n = M(s, e), r = M(t, e), a = i(s), p = i(t);
  return !n.exclude.includes(p) && !r.exclude.includes(a);
}
function E(s, t) {
  if (!s || !t || !s.start && !s.end && !t.start && !t.end) return !0;
  const e = (l) => {
    if (!l) return null;
    const [m, b] = l.split(":").map(Number);
    return m * 60 + b;
  }, n = e(s.start), r = e(s.end), a = e(t.start), p = e(t.end), d = 360, h = 1260, u = n ?? d, f = r ?? h, y = a ?? d;
  return u < (p ?? h) && y < f;
}
function v(s, t, e) {
  return R(s.name, t.name, e) ? E(s.timeRange, t.timeRange) : !1;
}
function J(s, t = {}) {
  const e = [], n = [];
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
    e.push({
      type: "doubles",
      number: e.filter((l) => l.type === "doubles").length + 1,
      players: o
    }), h.splice(0, 4);
  }
  let u = [...p].sort((o, l) => o.timestamp - l.timestamp);
  for (; u.length >= 2; ) {
    let o = null;
    for (let l = 0; l < u.length - 1; l++) {
      for (let m = l + 1; m < u.length; m++)
        if (v(u[l], u[m], t)) {
          o = [u[l], u[m]];
          break;
        }
      if (o) break;
    }
    if (o)
      e.push({
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
    ), k = f.every(
      (g) => g.allowRotation !== !1
    ), A = f.length === 3 && v(
      f[0],
      f[1],
      t
    ) && v(
      f[0],
      f[2],
      t
    ) && v(
      f[1],
      f[2],
      t
    );
    let N = !1;
    m >= 2 && (N = v(
      l[0],
      l[1],
      t
    )), e.push({
      type: "doubles-forming",
      players: f,
      needed: o,
      canRotate: f.length === 3 && b && k && A,
      eitherCount: m,
      canPlaySingles: N
    });
  }
  return y.length > 0 && y.forEach((o) => {
    e.push({
      type: "singles-forming",
      players: [o],
      needed: 1
    });
  }), { matches: e, warnings: n };
}
function Q(s, t) {
  const e = i(s);
  return t.some(
    (n) => (n.type === "doubles" || n.type === "singles") && n.players.some((r) => i(r.name) === e)
  );
}
function X(s, t) {
  const e = i(s);
  for (const n of t)
    if (n.players.some((r) => i(r.name) === e))
      return n.type;
  return null;
}
function L(s, t) {
  return (t.mutedMembers || []).some(
    (n) => i(n) === i(s)
  );
}
function Z(s, t, e) {
  return !(!t.activityAlerts || i(s) === i(e) || L(e, t));
}
function tt(s, t) {
  return t.matchConfirmations === !0;
}
function et(s, t, e = {}) {
  const n = w(t), r = [];
  if (e.playStyle && r.push(P(e.playStyle)), e.timeStart || e.timeEnd) {
    const d = C(e.timeStart, e.timeEnd);
    d && r.push(d);
  }
  let a = "";
  e.addedBy && i(e.addedBy) !== i(s) && (a = ` (added by ${e.addedBy})`);
  const p = r.length > 0 ? ` [${r.join(", ")}]` : "";
  return `🎾 ${s} checked in for ${n}${p}${a}`;
}
function st(s, t, e) {
  const n = w(t);
  let r = "";
  return e && i(e) !== i(s) && (r = ` (by ${e})`), `👋 ${s} is no longer available for ${n}${r}`;
}
function nt(s, t, e, n) {
  const r = w(t);
  return `✅ You're in ${e === "doubles" ? "Doubles" : "Singles"} for ${r} with ${n.join(", ")}`;
}
function rt(s, t) {
  return `👤 ${s} was added to the group by ${t}`;
}
function it(s, t) {
  return `🚫 ${s} was removed from the group by ${t}`;
}
function at(s, t, e = {}) {
  return {
    message: t,
    timestamp: Date.now(),
    read: !1,
    type: s,
    ...e
  };
}
function ot(s, t, e, n = {}) {
  return {
    timestamp: Date.now(),
    action: s,
    player: t,
    by: e,
    ...n
  };
}
function ct(s) {
  const t = new Date(s.timestamp).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit"
  });
  switch (s.action) {
    case "check-in": {
      const e = [];
      if (s.playStyle && e.push(P(s.playStyle)), s.timeRange) {
        const a = C(s.timeRange.start, s.timeRange.end);
        a && e.push(a);
      }
      const n = e.length > 0 ? ` [${e.join(", ")}]` : "", r = i(s.by) !== i(s.player) ? ` (added by ${s.by})` : "";
      return `${t} - ${s.player} checked in${n}${r}`;
    }
    case "removal": {
      const e = i(s.by) !== i(s.player) ? ` (by ${s.by})` : "";
      return `${t} - ${s.player} removed${e}`;
    }
    case "member_added": {
      const e = s.contact ? ` (${s.contact})` : "";
      return `${t} - ${s.player}${e} added by ${s.by}`;
    }
    case "member_removed":
      return `${t} - ${s.player} removed by ${s.by}`;
    case "whatsapp_share": {
      const e = s.type ? ` (${s.type})` : "";
      return `${t} - ${s.by} shared to WhatsApp${e}`;
    }
    case "notes_saved": {
      const e = s.matchKey ? ` for ${s.matchKey}` : "";
      return `${t} - Notes saved${e} by ${s.by}`;
    }
    default:
      return `${t} - ${s.action} by ${s.by}`;
  }
}
function lt(s, t) {
  return !(t.player && i(s.player) !== i(t.player) || t.action && s.action !== t.action || t.by && i(s.by) !== i(t.by));
}
function ut(s, t = !1) {
  return [...s].sort(
    (e, n) => t ? e.timestamp - n.timestamp : n.timestamp - e.timestamp
  );
}
function ft(s) {
  return s.reduce(
    (t, e) => {
      switch (e.action) {
        case "check-in":
          t.checkins++;
          break;
        case "removal":
          t.removals++;
          break;
        case "member_added":
        case "member_removed":
          t.memberChanges++;
          break;
        case "whatsapp_share":
          t.shares++;
          break;
      }
      return t;
    },
    { checkins: 0, removals: 0, memberChanges: 0, shares: 0 }
  );
}
function ht(s) {
  const t = /* @__PURE__ */ new Set();
  for (const e of s)
    e.player && t.add(e.player);
  return Array.from(t);
}
const c = {
  groups: () => "groups",
  group: (s) => `groups/${s}`,
  checkins: (s) => `groups/${s}/checkins`,
  checkinsDate: (s, t) => `groups/${s}/checkins/${t}`,
  settings: (s) => `groups/${s}/settings`,
  activity: (s, t) => `groups/${s}/activity/${t}`,
  activityAll: (s) => `groups/${s}/activity`,
  matchNotes: (s, t) => `groups/${s}/matchNotes/${t}`,
  matchNote: (s, t, e) => `groups/${s}/matchNotes/${t}/${e}`,
  userPreferences: () => "userPreferences",
  siteSettings: () => "siteSettings",
  userNotificationPrefs: (s, t) => `groups/${s}/userNotifications/${i(t)}/preferences`,
  userNotifications: (s, t) => `groups/${s}/userNotifications/${i(t)}/items`,
  groupNotifications: (s) => `groups/${s}/userNotifications`
};
class O {
  db;
  constructor(t) {
    this.db = t;
  }
  /**
   * Get a reference to a path
   */
  ref(t) {
    return this.db.ref(t);
  }
  // ============================================
  // Groups
  // ============================================
  async loadAvailableGroups() {
    return (await this.ref(c.groups()).once("value")).val() || {};
  }
  async saveGroup(t, e) {
    await this.ref(c.group(t)).update(e);
  }
  async deleteGroup(t) {
    await this.ref(c.group(t)).remove();
  }
  // ============================================
  // Settings
  // ============================================
  async loadSettings(t) {
    const n = (await this.ref(c.settings(t)).once("value")).val();
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
  async saveSettings(t, e) {
    await this.ref(c.settings(t)).update(e);
  }
  async updateMembers(t, e, n) {
    await this.ref(c.settings(t)).update({
      members: e,
      memberDetails: n
    });
  }
  // ============================================
  // Check-ins
  // ============================================
  async loadCheckins(t) {
    return (await this.ref(c.checkins(t)).once("value")).val() || {};
  }
  async loadCheckinsForDate(t, e) {
    return (await this.ref(c.checkinsDate(t, e)).once("value")).val() || [];
  }
  async saveCheckinsForDate(t, e, n) {
    await this.ref(c.checkinsDate(t, e)).set(n);
  }
  async verifyCheckinsForDate(t, e, n) {
    return ((await this.ref(c.checkinsDate(t, e)).once("value")).val() || []).length === n;
  }
  // ============================================
  // User Preferences
  // ============================================
  async loadUserPreferences() {
    return (await this.ref(c.userPreferences()).once("value")).val() || {};
  }
  async saveUserPreferences(t) {
    await this.ref(c.userPreferences()).set(t);
  }
  // ============================================
  // Activity Log
  // ============================================
  async loadActivityForDate(t, e) {
    return (await this.ref(c.activity(t, e)).once("value")).val() || {};
  }
  async loadAllActivity(t) {
    return (await this.ref(c.activityAll(t)).once("value")).val() || {};
  }
  async logActivity(t, e, n) {
    await this.ref(c.activity(t, e)).push().set(n);
  }
  // ============================================
  // Match Notes
  // ============================================
  async loadMatchNotes(t, e) {
    return (await this.ref(c.matchNotes(t, e)).once("value")).val() || {};
  }
  async saveMatchNote(t, e, n, r) {
    await this.ref(c.matchNote(t, e, n)).set(r);
  }
  // ============================================
  // Notifications
  // ============================================
  async loadNotificationPrefs(t, e) {
    const r = (await this.ref(
      c.userNotificationPrefs(t, e)
    ).once("value")).val();
    return {
      activityAlerts: r?.activityAlerts ?? !0,
      matchConfirmations: r?.matchConfirmations ?? !0,
      mutedMembers: r?.mutedMembers || []
    };
  }
  async saveNotificationPrefs(t, e, n) {
    await this.ref(c.userNotificationPrefs(t, e)).set(n);
  }
  async loadNotifications(t, e) {
    return (await this.ref(
      c.userNotifications(t, e)
    ).once("value")).val() || {};
  }
  async addNotification(t, e, n) {
    await this.ref(c.userNotifications(t, e)).push().set(n);
  }
  async markNotificationRead(t, e, n) {
    await this.ref(
      `${c.userNotifications(t, e)}/${n}/read`
    ).set(!0);
  }
  async markAllNotificationsRead(t, e) {
    const n = await this.loadNotifications(t, e), r = {};
    for (const a of Object.keys(n))
      r[`${a}/read`] = !0;
    Object.keys(r).length > 0 && await this.ref(c.userNotifications(t, e)).update(r);
  }
  async clearNotifications(t, e) {
    await this.ref(c.userNotifications(t, e)).remove();
  }
  // ============================================
  // Site Settings
  // ============================================
  async loadSiteSettings() {
    return (await this.ref(c.siteSettings()).once("value")).val() || {};
  }
  async saveSiteSettings(t) {
    await this.ref(c.siteSettings()).set(t);
  }
}
function mt(s) {
  return new O(s);
}
const F = {
  activityAlerts: !0,
  matchConfirmations: !0,
  mutedMembers: []
}, _ = {
  lat: 37.2358,
  lon: -121.9623,
  name: "Los Gatos, CA"
};
function D() {
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
    weatherLocation: _,
    weatherCache: {},
    // UI state
    selectedDate: T(),
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
    userNotificationPrefs: F
  };
}
class I {
  state;
  listeners;
  constructor(t) {
    this.state = { ...D(), ...t }, this.listeners = /* @__PURE__ */ new Map();
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
  get(t) {
    return this.state[t];
  }
  /**
   * Set a specific state value
   */
  set(t, e) {
    const n = this.state[t];
    this.state[t] = e, this.notifyListeners(t, e, n);
  }
  /**
   * Update multiple state values at once
   */
  update(t) {
    for (const [e, n] of Object.entries(t)) {
      const r = e, a = this.state[r];
      this.state[r] = n, this.notifyListeners(r, n, a);
    }
  }
  /**
   * Subscribe to state changes for a specific key
   */
  subscribe(t, e) {
    return this.listeners.has(t) || this.listeners.set(t, /* @__PURE__ */ new Set()), this.listeners.get(t).add(e), () => {
      this.listeners.get(t)?.delete(e);
    };
  }
  /**
   * Notify listeners of a state change
   */
  notifyListeners(t, e, n) {
    const r = this.listeners.get(t);
    if (r)
      for (const a of r)
        a(e, n);
  }
  // ============================================
  // Convenience methods for common operations
  // ============================================
  /**
   * Get check-ins for the selected date
   */
  getCheckinsForSelectedDate() {
    const t = this.state.selectedDate;
    return t ? this.state.allCheckins[t] || [] : [];
  }
  /**
   * Get check-ins for a specific date
   */
  getCheckinsForDate(t) {
    return this.state.allCheckins[t] || [];
  }
  /**
   * Add a check-in for the selected date
   */
  addCheckin(t) {
    const e = this.state.selectedDate;
    if (!e) return;
    const n = this.state.allCheckins[e] || [], r = {
      ...this.state.allCheckins,
      [e]: [...n, t]
    };
    this.set("allCheckins", r);
  }
  /**
   * Remove a check-in by index for the selected date
   */
  removeCheckin(t) {
    const e = this.state.selectedDate;
    if (!e) return null;
    const n = this.state.allCheckins[e] || [];
    if (t < 0 || t >= n.length) return null;
    const r = n[t], a = {
      ...this.state.allCheckins,
      [e]: n.filter((p, d) => d !== t)
    };
    return this.set("allCheckins", a), r;
  }
  /**
   * Update check-ins for a specific date
   */
  setCheckinsForDate(t, e) {
    const n = {
      ...this.state.allCheckins,
      [t]: e
    };
    this.set("allCheckins", n);
  }
  /**
   * Get user preference for a normalized name
   */
  getUserPreference(t) {
    const e = i(t);
    return this.state.userPreferences[e] || { include: [], exclude: [] };
  }
  /**
   * Set user preference
   */
  setUserPreference(t, e) {
    const n = i(t), r = {
      ...this.state.userPreferences,
      [n]: e
    };
    this.set("userPreferences", r);
  }
  /**
   * Check if a member is in core members
   */
  isCoreMember(t) {
    const e = i(t);
    return this.state.coreMembers.some(
      (n) => i(n) === e
    );
  }
  /**
   * Add a core member
   */
  addCoreMember(t) {
    this.isCoreMember(t) || this.set("coreMembers", [...this.state.coreMembers, t]);
  }
  /**
   * Remove a core member
   */
  removeCoreMember(t) {
    const e = i(t);
    this.set(
      "coreMembers",
      this.state.coreMembers.filter((n) => i(n) !== e)
    );
  }
  /**
   * Get match note for a match key
   */
  getMatchNote(t) {
    return this.state.matchNotes[t] || "";
  }
  /**
   * Set match note
   */
  setMatchNote(t, e) {
    const n = {
      ...this.state.matchNotes,
      [t]: e
    };
    this.set("matchNotes", n);
  }
  /**
   * Check if a member is muted
   */
  isMemberMuted(t) {
    const e = this.state.userNotificationPrefs.mutedMembers || [], n = i(t);
    return e.some((r) => i(r) === n);
  }
  /**
   * Toggle muted status for a member
   */
  toggleMutedMember(t) {
    const e = this.state.userNotificationPrefs.mutedMembers || [], n = i(t);
    let r;
    this.isMemberMuted(t) ? r = e.filter(
      (a) => i(a) !== n
    ) : r = [...e, t], this.set("userNotificationPrefs", {
      ...this.state.userNotificationPrefs,
      mutedMembers: r
    });
  }
  /**
   * Reset state to initial values
   */
  reset() {
    this.state = D();
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
  return new I(s);
}
let $ = null;
function dt() {
  return $ || ($ = U()), $;
}
function pt() {
  $ = null;
}
export {
  I as AppStore,
  O as FirebaseService,
  v as canPlayTogetherWithTime,
  H as cleanPhoneNumber,
  ot as createActivityEntry,
  U as createAppStore,
  mt as createFirebaseService,
  D as createInitialState,
  at as createNotificationData,
  K as debounce,
  Y as escapeHtml,
  c as firebasePaths,
  ct as formatActivityDisplay,
  et as formatCheckinNotification,
  x as formatDate,
  w as formatDateForNotification,
  nt as formatMatchFormedNotification,
  rt as formatMemberAddedNotification,
  it as formatMemberRemovedNotification,
  st as formatRemovalNotification,
  G as formatTime,
  C as formatTimeRange,
  q as generateId,
  ft as getActivitySummary,
  z as getDateOffset,
  dt as getDefaultStore,
  X as getPlayerMatchType,
  P as getPreferenceLabel,
  T as getTodayDate,
  ht as getUniquePlayers,
  L as isMemberMuted,
  Q as isPlayerInMatch,
  j as isSameName,
  V as isValidEmail,
  W as isValidPhone,
  lt as matchesActivityFilter,
  i as normalizeName,
  J as organizeMatches,
  pt as resetDefaultStore,
  Z as shouldReceiveActivityNotification,
  tt as shouldReceiveMatchNotification,
  ut as sortActivitiesByTime,
  B as timeRangesOverlap,
  E as timesOverlap
};
