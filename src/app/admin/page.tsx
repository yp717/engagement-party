"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";

interface Guest {
  id: string;
  firstName: string;
  lastName: string;
  invitedBy: string;
  role: string;
  isAttending: boolean | null;
  dietaryRequirements: string | null;
  rsvpCompletedAt: string | null;
}

interface Household {
  id: string;
  email: string | null;
  uniqueToken: string;
  inviteStatus: string;
  inviteSentAt: string | null;
  lastUpdateSentAt: string | null;
  guests: Guest[];
}

interface Stats {
  totalGuests: number;
  totalHouseholds: number;
  invitesSent: number;
  rsvpCompleted: number;
  attending: number;
  declined: number;
  pending: number;
  noEmail: number;
}

type Tab = "overview" | "guests" | "send-invites" | "send-update";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [households, setHouseholds] = useState<Household[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Send invites state
  const [inviteStatusFilter, setInviteStatusFilter] = useState<string>("Yes");
  const [dryRunResult, setDryRunResult] = useState<any>(null);
  const [isSending, setIsSending] = useState(false);
  const [sendResult, setSendResult] = useState<any>(null);

  // Send update state
  const [updateSubject, setUpdateSubject] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");
  const [includeRsvpLink, setIncludeRsvpLink] = useState(true);
  const [onlyConfirmed, setOnlyConfirmed] = useState(false);
  const [updateDryRunResult, setUpdateDryRunResult] = useState<any>(null);
  const [updateSendResult, setUpdateSendResult] = useState<any>(null);

  // Search/filter
  const [searchTerm, setSearchTerm] = useState("");

  // Edit modal state
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null);
  const [editingHousehold, setEditingHousehold] = useState<Household | null>(
    null
  );
  const [editForm, setEditForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    inviteStatus: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchData = useCallback(async () => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/data", {
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      if (!res.ok) throw new Error("Failed to fetch data");
      const data = await res.json();
      setHouseholds(data.households);
      setStats(data.stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, apiKey]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, fetchData]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    // Test the API key by making a request
    try {
      const res = await fetch("/api/admin/data", {
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      if (res.ok) {
        setIsAuthenticated(true);
        localStorage.setItem("adminApiKey", apiKey);
      } else {
        setAuthError("Invalid API key");
      }
    } catch {
      setAuthError("Failed to authenticate");
    }
  };

  // Check for saved API key on mount
  useEffect(() => {
    const savedKey = localStorage.getItem("adminApiKey");
    if (savedKey) {
      setApiKey(savedKey);
      // Verify it's still valid
      fetch("/api/admin/data", {
        headers: { Authorization: `Bearer ${savedKey}` },
      }).then((res) => {
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("adminApiKey");
        }
      });
    }
  }, []);

  const handleDryRun = async () => {
    setIsSending(true);
    setDryRunResult(null);
    setSendResult(null);

    try {
      const res = await fetch("/api/email/send-invites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          inviteStatus: inviteStatusFilter || undefined,
          dryRun: true,
        }),
      });
      const data = await res.json();
      setDryRunResult(data);
    } catch (err) {
      setError("Failed to run dry run");
    } finally {
      setIsSending(false);
    }
  };

  const handleSendInvites = async () => {
    if (!confirm("Are you sure you want to send these invitations?")) return;

    setIsSending(true);
    setSendResult(null);

    try {
      const res = await fetch("/api/email/send-invites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          inviteStatus: inviteStatusFilter || undefined,
          dryRun: false,
        }),
      });
      const data = await res.json();
      setSendResult(data);
      fetchData(); // Refresh data
    } catch (err) {
      setError("Failed to send invites");
    } finally {
      setIsSending(false);
    }
  };

  const handleSendToOne = async (householdId: string, email: string) => {
    if (!confirm(`Send invitation to ${email}?`)) return;

    try {
      const res = await fetch("/api/admin/send-single", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ householdId }),
      });
      const data = await res.json();
      if (data.success) {
        alert(`Invitation sent to ${email}!`);
        fetchData();
      } else {
        alert(`Failed: ${data.error}`);
      }
    } catch (err) {
      alert("Failed to send invitation");
    }
  };

  const handleUpdateDryRun = async () => {
    if (!updateSubject || !updateMessage) {
      alert("Subject and message are required");
      return;
    }

    setIsSending(true);
    setUpdateDryRunResult(null);
    setUpdateSendResult(null);

    try {
      const res = await fetch("/api/email/send-update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          subject: updateSubject,
          message: updateMessage,
          includeRsvpLink,
          onlyConfirmed,
          dryRun: true,
        }),
      });
      const data = await res.json();
      setUpdateDryRunResult(data);
    } catch (err) {
      setError("Failed to run dry run");
    } finally {
      setIsSending(false);
    }
  };

  const handleSendUpdate = async () => {
    if (!confirm("Are you sure you want to send this update?")) return;

    setIsSending(true);
    setUpdateSendResult(null);

    try {
      const res = await fetch("/api/email/send-update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          subject: updateSubject,
          message: updateMessage,
          includeRsvpLink,
          onlyConfirmed,
          dryRun: false,
        }),
      });
      const data = await res.json();
      setUpdateSendResult(data);
      fetchData();
    } catch (err) {
      setError("Failed to send update");
    } finally {
      setIsSending(false);
    }
  };

  // Edit guest
  const openEditGuest = (guest: Guest) => {
    setEditingGuest(guest);
    setEditForm({
      firstName: guest.firstName,
      lastName: guest.lastName,
      email: "",
      inviteStatus: "",
    });
  };

  const handleUpdateGuest = async (resetRsvp = false) => {
    if (!editingGuest) return;
    setIsUpdating(true);

    try {
      const res = await fetch("/api/admin/update-guest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          guestId: editingGuest.id,
          firstName: editForm.firstName || undefined,
          lastName: editForm.lastName || undefined,
          resetRsvp,
        }),
      });

      if (res.ok) {
        setEditingGuest(null);
        fetchData();
      } else {
        const data = await res.json();
        alert(`Failed: ${data.error}`);
      }
    } catch (err) {
      alert("Failed to update guest");
    } finally {
      setIsUpdating(false);
    }
  };

  // Edit household
  const openEditHousehold = (household: Household) => {
    setEditingHousehold(household);
    setEditForm({
      firstName: "",
      lastName: "",
      email: household.email || "",
      inviteStatus: household.inviteStatus,
    });
  };

  const handleUpdateHousehold = async (resetInvite = false) => {
    if (!editingHousehold) return;
    setIsUpdating(true);

    try {
      const res = await fetch("/api/admin/update-household", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          householdId: editingHousehold.id,
          email: editForm.email || undefined,
          inviteStatus: editForm.inviteStatus || undefined,
          resetInvite,
        }),
      });

      if (res.ok) {
        setEditingHousehold(null);
        fetchData();
      } else {
        const data = await res.json();
        alert(`Failed: ${data.error}`);
      }
    } catch (err) {
      alert("Failed to update household");
    } finally {
      setIsUpdating(false);
    }
  };

  // Filter households based on search
  const filteredHouseholds = households.filter((h) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      h.email?.toLowerCase().includes(term) ||
      h.guests.some(
        (g) =>
          g.firstName.toLowerCase().includes(term) ||
          g.lastName.toLowerCase().includes(term)
      )
    );
  });

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-cream text-primary flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <h1 className="font-pinyon text-4xl text-center mb-8">Admin</h1>
          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="block font-serif text-sm text-primary/60 mb-2">
                API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-4 py-3 bg-white/50 border-2 border-primary/20 font-serif text-primary focus:outline-none focus:border-primary/40"
                placeholder="Enter admin API key"
              />
            </div>
            {authError && (
              <p className="text-red-600 font-serif text-sm">{authError}</p>
            )}
            <button
              type="submit"
              className="w-full px-4 py-3 bg-primary text-white font-serif text-sm uppercase tracking-wide hover:bg-primary/90 transition-colors"
            >
              Login
            </button>
          </form>
          <Link
            href="/"
            className="block text-center mt-8 font-serif text-sm text-primary/60 hover:text-primary"
          >
            ← Back to site
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream text-primary">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-pinyon text-4xl">Admin Dashboard</h1>
          <div className="flex gap-4">
            <button
              onClick={fetchData}
              className="px-4 py-2 font-serif text-sm border border-primary/20 hover:border-primary/40 transition-colors"
            >
              Refresh
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("adminApiKey");
                setIsAuthenticated(false);
                setApiKey("");
              }}
              className="px-4 py-2 font-serif text-sm text-primary/60 hover:text-primary"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-primary/10 pb-2">
          {(
            [
              ["overview", "Overview"],
              ["guests", "Guests"],
              ["send-invites", "Send Invites"],
              ["send-update", "Send Update"],
            ] as const
          ).map(([tab, label]) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-2 font-serif text-sm transition-colors",
                activeTab === tab
                  ? "text-primary border-b-2 border-primary -mb-[9px]"
                  : "text-primary/60 hover:text-primary"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent" />
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 font-serif">
            {error}
          </div>
        )}

        {!isLoading && (
          <AnimatePresence mode="wait">
            {/* Overview Tab */}
            {activeTab === "overview" && stats && (
              <motion.div
                key="overview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <StatCard label="Total Guests" value={stats.totalGuests} />
                  <StatCard label="Households" value={stats.totalHouseholds} />
                  <StatCard label="Invites Sent" value={stats.invitesSent} />
                  <StatCard
                    label="RSVPs Received"
                    value={stats.rsvpCompleted}
                  />
                  <StatCard
                    label="Attending"
                    value={stats.attending}
                    color="text-green-700"
                  />
                  <StatCard
                    label="Declined"
                    value={stats.declined}
                    color="text-red-700"
                  />
                  <StatCard
                    label="Pending Response"
                    value={stats.pending}
                    color="text-amber-700"
                  />
                  <StatCard
                    label="No Email"
                    value={stats.noEmail}
                    color="text-gray-500"
                  />
                </div>

                <h2 className="font-serif text-lg mb-4">Recent Activity</h2>
                <div className="bg-white/30 border border-primary/10 rounded overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-primary/5">
                      <tr>
                        <th className="text-left px-4 py-2 font-serif font-medium">
                          Guest
                        </th>
                        <th className="text-left px-4 py-2 font-serif font-medium">
                          Status
                        </th>
                        <th className="text-left px-4 py-2 font-serif font-medium">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {households
                        .flatMap((h) => h.guests)
                        .filter((g) => g.rsvpCompletedAt)
                        .sort(
                          (a, b) =>
                            new Date(b.rsvpCompletedAt!).getTime() -
                            new Date(a.rsvpCompletedAt!).getTime()
                        )
                        .slice(0, 10)
                        .map((g) => (
                          <tr key={g.id} className="border-t border-primary/5">
                            <td className="px-4 py-2 font-serif">
                              {g.firstName} {g.lastName}
                            </td>
                            <td className="px-4 py-2 font-serif">
                              <span
                                className={cn(
                                  "px-2 py-1 rounded text-xs",
                                  g.isAttending
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                )}
                              >
                                {g.isAttending ? "Attending" : "Declined"}
                              </span>
                            </td>
                            <td className="px-4 py-2 font-serif text-primary/60">
                              {new Date(
                                g.rsvpCompletedAt!
                              ).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* Guests Tab */}
            {activeTab === "guests" && (
              <motion.div
                key="guests"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="mb-4">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name or email..."
                    className="w-full max-w-md px-4 py-2 bg-white/50 border border-primary/20 font-serif text-sm focus:outline-none focus:border-primary/40"
                  />
                </div>

                <div className="space-y-4">
                  {filteredHouseholds.map((household) => (
                    <div
                      key={household.id}
                      className="bg-white/30 border border-primary/10 rounded p-4"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-serif text-sm text-primary/60">
                            {household.email || "(no email)"}
                          </p>
                          <div className="flex gap-2 mt-1">
                            <span
                              className={cn(
                                "px-2 py-0.5 rounded text-xs font-serif",
                                household.inviteSentAt
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-100 text-gray-600"
                              )}
                            >
                              {household.inviteSentAt
                                ? `Sent ${new Date(household.inviteSentAt).toLocaleDateString()}`
                                : "Not sent"}
                            </span>
                            <span className="px-2 py-0.5 rounded text-xs font-serif bg-primary/10 text-primary/70">
                              {household.inviteStatus}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEditHousehold(household)}
                            className="px-3 py-1 text-xs font-serif border border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-colors"
                          >
                            Edit
                          </button>
                          {household.email && !household.inviteSentAt && (
                            <button
                              onClick={() =>
                                handleSendToOne(household.id, household.email!)
                              }
                              className="px-3 py-1 text-xs font-serif border border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-colors"
                            >
                              Send Invite
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        {household.guests.map((guest) => (
                          <div
                            key={guest.id}
                            className="flex items-center justify-between py-2 border-t border-primary/5"
                          >
                            <div>
                              <span className="font-serif">
                                {guest.firstName} {guest.lastName}
                              </span>
                              <span className="ml-2 text-xs text-primary/50">
                                {guest.role} • {guest.invitedBy}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              {guest.dietaryRequirements && (
                                <span className="text-xs text-primary/60 max-w-[200px] truncate">
                                  {guest.dietaryRequirements}
                                </span>
                              )}
                              <span
                                className={cn(
                                  "px-2 py-0.5 rounded text-xs font-serif",
                                  guest.isAttending === true
                                    ? "bg-green-100 text-green-700"
                                    : guest.isAttending === false
                                      ? "bg-red-100 text-red-700"
                                      : "bg-gray-100 text-gray-500"
                                )}
                              >
                                {guest.isAttending === true
                                  ? "Attending"
                                  : guest.isAttending === false
                                    ? "Declined"
                                    : "Pending"}
                              </span>
                              <button
                                onClick={() => openEditGuest(guest)}
                                className="px-2 py-0.5 text-xs font-serif text-primary/50 hover:text-primary transition-colors"
                              >
                                Edit
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-2 pt-2 border-t border-primary/5">
                        <p className="text-xs text-primary/40 font-mono">
                          RSVP link: /rsvp?token={household.uniqueToken}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Send Invites Tab */}
            {activeTab === "send-invites" && (
              <motion.div
                key="send-invites"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-2xl"
              >
                <div className="bg-white/30 border border-primary/10 rounded p-6">
                  <h2 className="font-serif text-lg mb-4">
                    Send Invitation Emails
                  </h2>

                  <div className="mb-4">
                    <label className="block font-serif text-sm text-primary/60 mb-2">
                      Filter by Invite Status
                    </label>
                    <select
                      value={inviteStatusFilter}
                      onChange={(e) => setInviteStatusFilter(e.target.value)}
                      className="w-full px-4 py-2 bg-white/50 border border-primary/20 font-serif text-sm focus:outline-none focus:border-primary/40"
                    >
                      <option value="">All</option>
                      <option value="Yes">Yes (Priority)</option>
                      <option value="Maybe">Maybe</option>
                      <option value="Yes - Unlikely to Come">
                        Yes - Unlikely to Come
                      </option>
                    </select>
                  </div>

                  <div className="flex gap-2 mb-6">
                    <button
                      onClick={handleDryRun}
                      disabled={isSending}
                      className="px-4 py-2 font-serif text-sm border border-primary/20 hover:border-primary/40 transition-colors disabled:opacity-50"
                    >
                      {isSending ? "Loading..." : "Preview Recipients"}
                    </button>
                    <button
                      onClick={handleSendInvites}
                      disabled={isSending || !dryRunResult}
                      className="px-4 py-2 font-serif text-sm bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                      Send Invitations
                    </button>
                  </div>

                  {dryRunResult && (
                    <div className="bg-amber-50 border border-amber-200 rounded p-4 mb-4">
                      <p className="font-serif text-sm mb-2">
                        <strong>{dryRunResult.count}</strong> households will
                        receive invitations:
                      </p>
                      <ul className="text-sm font-serif space-y-1 max-h-60 overflow-y-auto">
                        {dryRunResult.households?.map((h: any, i: number) => (
                          <li key={i} className="text-primary/70">
                            {h.email}: {h.guests.join(", ")}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {sendResult && (
                    <div
                      className={cn(
                        "border rounded p-4",
                        sendResult.failed > 0
                          ? "bg-red-50 border-red-200"
                          : "bg-green-50 border-green-200"
                      )}
                    >
                      <p className="font-serif text-sm">
                        Sent: <strong>{sendResult.sent}</strong> | Failed:{" "}
                        <strong>{sendResult.failed}</strong>
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Send Update Tab */}
            {activeTab === "send-update" && (
              <motion.div
                key="send-update"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-2xl"
              >
                <div className="bg-white/30 border border-primary/10 rounded p-6">
                  <h2 className="font-serif text-lg mb-4">Send Update Email</h2>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block font-serif text-sm text-primary/60 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={updateSubject}
                        onChange={(e) => setUpdateSubject(e.target.value)}
                        className="w-full px-4 py-2 bg-white/50 border border-primary/20 font-serif text-sm focus:outline-none focus:border-primary/40"
                        placeholder="e.g., Important Update About Our Engagement Party"
                      />
                    </div>

                    <div>
                      <label className="block font-serif text-sm text-primary/60 mb-2">
                        Message
                      </label>
                      <textarea
                        value={updateMessage}
                        onChange={(e) => setUpdateMessage(e.target.value)}
                        rows={6}
                        className="w-full px-4 py-2 bg-white/50 border border-primary/20 font-serif text-sm focus:outline-none focus:border-primary/40"
                        placeholder="Write your update message here..."
                      />
                    </div>

                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 font-serif text-sm cursor-pointer">
                        <input
                          type="checkbox"
                          checked={includeRsvpLink}
                          onChange={(e) => setIncludeRsvpLink(e.target.checked)}
                          className="h-4 w-4"
                        />
                        Include RSVP link
                      </label>

                      <label className="flex items-center gap-2 font-serif text-sm cursor-pointer">
                        <input
                          type="checkbox"
                          checked={onlyConfirmed}
                          onChange={(e) => setOnlyConfirmed(e.target.checked)}
                          className="h-4 w-4"
                        />
                        Only confirmed guests
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-2 mb-6">
                    <button
                      onClick={handleUpdateDryRun}
                      disabled={isSending}
                      className="px-4 py-2 font-serif text-sm border border-primary/20 hover:border-primary/40 transition-colors disabled:opacity-50"
                    >
                      {isSending ? "Loading..." : "Preview Recipients"}
                    </button>
                    <button
                      onClick={handleSendUpdate}
                      disabled={isSending || !updateDryRunResult}
                      className="px-4 py-2 font-serif text-sm bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                      Send Update
                    </button>
                  </div>

                  {updateDryRunResult && (
                    <div className="bg-amber-50 border border-amber-200 rounded p-4 mb-4">
                      <p className="font-serif text-sm mb-2">
                        <strong>{updateDryRunResult.count}</strong> households
                        will receive this update:
                      </p>
                      <ul className="text-sm font-serif space-y-1 max-h-60 overflow-y-auto">
                        {updateDryRunResult.households?.map(
                          (h: any, i: number) => (
                            <li key={i} className="text-primary/70">
                              {h.email}: {h.guests.join(", ")}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                  {updateSendResult && (
                    <div
                      className={cn(
                        "border rounded p-4",
                        updateSendResult.failed > 0
                          ? "bg-red-50 border-red-200"
                          : "bg-green-50 border-green-200"
                      )}
                    >
                      <p className="font-serif text-sm">
                        Sent: <strong>{updateSendResult.sent}</strong> | Failed:{" "}
                        <strong>{updateSendResult.failed}</strong>
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* Edit Guest Modal */}
        {editingGuest && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-cream rounded-lg p-6 w-full max-w-md">
              <h3 className="font-pinyon text-2xl mb-4">Edit Guest</h3>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block font-serif text-sm text-primary/60 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={editForm.firstName}
                    onChange={(e) =>
                      setEditForm({ ...editForm, firstName: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white/50 border border-primary/20 font-serif text-sm focus:outline-none focus:border-primary/40"
                  />
                </div>
                <div>
                  <label className="block font-serif text-sm text-primary/60 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={editForm.lastName}
                    onChange={(e) =>
                      setEditForm({ ...editForm, lastName: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white/50 border border-primary/20 font-serif text-sm focus:outline-none focus:border-primary/40"
                  />
                </div>

                <div className="pt-2 border-t border-primary/10">
                  <p className="font-serif text-sm text-primary/60 mb-2">
                    Current RSVP:{" "}
                    <span className="text-primary">
                      {editingGuest.isAttending === true
                        ? "Attending"
                        : editingGuest.isAttending === false
                          ? "Declined"
                          : "Pending"}
                    </span>
                  </p>
                  {editingGuest.dietaryRequirements && (
                    <p className="font-serif text-sm text-primary/60">
                      Dietary: {editingGuest.dietaryRequirements}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleUpdateGuest(false)}
                  disabled={isUpdating}
                  className="flex-1 px-4 py-2 bg-primary text-white font-serif text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={() => handleUpdateGuest(true)}
                  disabled={isUpdating}
                  className="px-4 py-2 font-serif text-sm border border-amber-500 text-amber-700 hover:bg-amber-50 transition-colors disabled:opacity-50"
                >
                  Reset RSVP
                </button>
                <button
                  onClick={() => setEditingGuest(null)}
                  className="px-4 py-2 font-serif text-sm border border-primary/20 hover:border-primary/40 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Household Modal */}
        {editingHousehold && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-cream rounded-lg p-6 w-full max-w-md">
              <h3 className="font-pinyon text-2xl mb-4">Edit Household</h3>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block font-serif text-sm text-primary/60 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) =>
                      setEditForm({ ...editForm, email: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white/50 border border-primary/20 font-serif text-sm focus:outline-none focus:border-primary/40"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block font-serif text-sm text-primary/60 mb-1">
                    Invite Status
                  </label>
                  <select
                    value={editForm.inviteStatus}
                    onChange={(e) =>
                      setEditForm({ ...editForm, inviteStatus: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white/50 border border-primary/20 font-serif text-sm focus:outline-none focus:border-primary/40"
                  >
                    <option value="Yes">Yes (Priority)</option>
                    <option value="Maybe">Maybe</option>
                    <option value="Yes - Unlikely to Come">
                      Yes - Unlikely to Come
                    </option>
                  </select>
                </div>

                <div className="pt-2 border-t border-primary/10">
                  <p className="font-serif text-sm text-primary/60">
                    Invite sent:{" "}
                    <span className="text-primary">
                      {editingHousehold.inviteSentAt
                        ? new Date(
                            editingHousehold.inviteSentAt
                          ).toLocaleDateString()
                        : "Not yet"}
                    </span>
                  </p>
                  <p className="font-serif text-sm text-primary/60 mt-1">
                    Guests:{" "}
                    {editingHousehold.guests
                      .map((g) => `${g.firstName} ${g.lastName}`)
                      .join(", ")}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleUpdateHousehold(false)}
                  disabled={isUpdating}
                  className="flex-1 px-4 py-2 bg-primary text-white font-serif text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
                {editingHousehold.inviteSentAt && (
                  <button
                    onClick={() => handleUpdateHousehold(true)}
                    disabled={isUpdating}
                    className="px-4 py-2 font-serif text-sm border border-amber-500 text-amber-700 hover:bg-amber-50 transition-colors disabled:opacity-50"
                  >
                    Reset Invite
                  </button>
                )}
                <button
                  onClick={() => setEditingHousehold(null)}
                  className="px-4 py-2 font-serif text-sm border border-primary/20 hover:border-primary/40 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  color = "text-primary",
}: {
  label: string;
  value: number;
  color?: string;
}) {
  return (
    <div className="bg-white/30 border border-primary/10 rounded p-4">
      <p className="font-serif text-sm text-primary/60 mb-1">{label}</p>
      <p className={cn("font-pinyon text-3xl", color)}>{value}</p>
    </div>
  );
}
