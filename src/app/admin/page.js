"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import {
  Lock,
  Search,
  RefreshCw,
  LogOut,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Phone,
  MessageSquare,
  ExternalLink,
  Printer,
  Copy,
  Check,
  X,
  AlertCircle,
  IndianRupee,
  ShieldCheck,
  Eye,
  EyeOff,
} from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  // Orders State
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // Status updating state in drawer
  const [savingStatus, setSavingStatus] = useState(false);
  const [bookingShiprocket, setBookingShiprocket] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [newAwb, setNewAwb] = useState("");
  const [newCourier, setNewCourier] = useState("");

  // Check auth on load
  useEffect(() => {
    fetchOrders(true);
  }, []);

  async function fetchOrders(initial = false) {
    if (!initial) setLoadingOrders(true);
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setOrders(data.orders || []);
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    } finally {
      setCheckingAuth(false);
      if (!initial) setLoadingOrders(false);
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    if (!password.trim()) return;
    setLoggingIn(true);
    setAuthError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setPassword("");
        fetchOrders();
      } else {
        setAuthError(data.message || "Invalid password");
      }
    } catch {
      setAuthError("Failed to connect to authentication service");
    } finally {
      setLoggingIn(false);
    }
  }

  async function handleLogout() {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      setIsAuthenticated(false);
      setOrders([]);
    } catch {
      setIsAuthenticated(false);
    }
  }

  async function handleUpdateOrder() {
    if (!selectedOrder) return;
    setSavingStatus(true);

    try {
      const res = await fetch(`/api/admin/orders/${selectedOrder.orderNumber}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fulfillmentStatus: newStatus,
          awbNumber: newAwb,
          courier: newCourier,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setOrders((prev) =>
          prev.map((o) =>
            o.orderNumber === selectedOrder.orderNumber
              ? {
                  ...o,
                  fulfillmentStatus: newStatus,
                  shipment: {
                    ...(o.shipment || {}),
                    status: newStatus,
                    awbNumber: newAwb,
                    courier: newCourier,
                    trackingUrl: newAwb
                      ? `https://www.delhivery.com/track/package/${newAwb}`
                      : o.shipment?.trackingUrl,
                  },
                }
              : o
          )
        );
        setSelectedOrder((prev) => ({
          ...prev,
          fulfillmentStatus: newStatus,
          shipment: {
            ...(prev.shipment || {}),
            status: newStatus,
            awbNumber: newAwb,
            courier: newCourier,
            trackingUrl: newAwb
              ? `https://www.delhivery.com/track/package/${newAwb}`
              : prev.shipment?.trackingUrl,
          },
        }));
      }
    } catch (err) {
      alert("Failed to update order status");
    } finally {
      setSavingStatus(false);
    }
  }

  async function handleShiprocketBooking() {
    if (!selectedOrder) return;
    setBookingShiprocket(true);
    try {
      const res = await fetch("/api/admin/shiprocket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderNumber: selectedOrder.orderNumber }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        alert(`Shiprocket Order Created! AWB: ${data.shipment?.awbNumber}`);
        fetchOrders();
        setSelectedOrder(data.order || selectedOrder);
        setNewAwb(data.shipment?.awbNumber || "");
        setNewCourier(data.shipment?.courier || "");
      } else {
        alert(data.message || "Shiprocket booking failed");
      }
    } catch {
      alert("Error contacting Shiprocket API");
    } finally {
      setBookingShiprocket(false);
    }
  }

  function openOrderDrawer(order) {
    setSelectedOrder(order);
    setNewStatus(order.fulfillmentStatus || "PROCESSING");
    setNewAwb(order.shipment?.awbNumber || "");
    setNewCourier(order.shipment?.courier || "Delhivery Surface");
  }

  function copyToClipboard(text, id) {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  // ── Metrics ────────────────────────────────────────────────────────────────
  const metrics = useMemo(() => {
    const totalOrders = orders.length;
    const paidOrders = orders.filter((o) => o.paymentStatus === "PAID");
    const totalRevenue = paidOrders.reduce(
      (sum, o) => sum + (o.pricing?.totalAmount || 0),
      0
    );
    const pendingDispatch = paidOrders.filter(
      (o) => o.fulfillmentStatus === "PROCESSING" || o.fulfillmentStatus === "UNFULFILLED"
    ).length;

    return {
      totalRevenue,
      totalOrders,
      paidCount: paidOrders.length,
      pendingDispatch,
    };
  }, [orders]);

  // ── Filtered Orders ────────────────────────────────────────────────────────
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Status filter
      if (statusFilter !== "ALL") {
        if (statusFilter === "PAID" && order.paymentStatus !== "PAID") return false;
        if (statusFilter === "PENDING_PAYMENT" && order.paymentStatus !== "PENDING_PAYMENT")
          return false;
        if (
          ["PROCESSING", "SHIPPED", "DELIVERED"].includes(statusFilter) &&
          order.fulfillmentStatus !== statusFilter
        )
          return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const num = (order.orderNumber || "").toLowerCase();
        const name = (order.customer?.name || "").toLowerCase();
        const phone = (order.customer?.phone || "").toLowerCase();
        const city = (order.customer?.city || "").toLowerCase();
        const rzp = (order.razorpayPaymentId || "").toLowerCase();
        return (
          num.includes(q) ||
          name.includes(q) ||
          phone.includes(q) ||
          city.includes(q) ||
          rzp.includes(q)
        );
      }

      return true;
    });
  }, [orders, statusFilter, searchQuery]);

  // ── 1. LOADING SCREEN ──────────────────────────────────────────────────────
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f4ec]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#0b3b24] border-t-transparent rounded-full animate-spin" />
          <p className="font-serif text-sm text-[#0b3b24] font-bold tracking-wider">
            Loading Admin Portal…
          </p>
        </div>
      </div>
    );
  }

  // ── 2. LOGIN SCREEN ────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#f4efe4]">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-[#ebdcc4] p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-[#0b3b24] text-[#ffd978] mx-auto flex items-center justify-center mb-4 shadow-md">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-[#0b3b24]">
              GHRITKALASH
            </h1>
            <p className="text-xs uppercase tracking-widest text-[#736350] font-bold mt-1">
              Internal Orders & Dispatch Portal
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#142d1f] mb-1.5">
                Admin Access Key
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter secret key…"
                  className="w-full px-4 py-3 rounded-xl border border-[#ebdcc4] bg-[#faf7ef] text-sm text-[#142d1f] focus:outline-none focus:ring-2 focus:ring-[#0b3b24] pr-10"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#736350] hover:text-[#142d1f]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {authError && (
              <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 p-3 rounded-xl border border-red-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loggingIn || !password}
              className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#0b3b24] text-[#ffd978] hover:bg-[#072417] transition-all shadow-md disabled:opacity-50"
            >
              {loggingIn ? "Verifying Credentials…" : "Unlock Dashboard"}
            </button>
          </form>

          <p className="text-center text-[10.5px] text-[#8c7b68] mt-6 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#09733c]" />
            <span>End-to-End Encrypted Session</span>
          </p>
        </div>
      </div>
    );
  }

  // ── 3. AUTHENTICATED DASHBOARD ─────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Header */}
      <header className="bg-[#0b3b24] text-white px-6 py-4 border-b border-[#072819] sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#ffd978] text-[#0b3b24] font-serif font-black flex items-center justify-center text-lg shadow-sm">
              GK
            </div>
            <div>
              <h1 className="font-serif text-lg font-bold tracking-wide">
                GHRITKALASH Dispatch Admin
              </h1>
              <p className="text-[11px] text-[#d8ebdf]">
                Live Orders · Supabase Database Sync
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchOrders()}
              disabled={loadingOrders}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-[#ffd978] transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingOrders ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-xs font-semibold text-red-200 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* KPI Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-[#ebdcc4] shadow-sm">
            <div className="flex items-center justify-between text-[#736350] mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Total Revenue</span>
              <IndianRupee className="w-4 h-4 text-[#0b3b24]" />
            </div>
            <p className="text-2xl font-serif font-bold text-[#0b3b24]">
              ₹{metrics.totalRevenue.toLocaleString("en-IN")}
            </p>
            <span className="text-[10.5px] text-[#09733c] font-semibold">
              From {metrics.paidCount} paid order{metrics.paidCount !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#ebdcc4] shadow-sm">
            <div className="flex items-center justify-between text-[#736350] mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Total Orders</span>
              <Package className="w-4 h-4 text-[#0b3b24]" />
            </div>
            <p className="text-2xl font-serif font-bold text-[#142d1f]">
              {metrics.totalOrders}
            </p>
            <span className="text-[10.5px] text-[#736350]">
              All logged transactions
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#ebdcc4] shadow-sm">
            <div className="flex items-center justify-between text-[#736350] mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Pending Dispatch</span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <p className="text-2xl font-serif font-bold text-amber-600">
              {metrics.pendingDispatch}
            </p>
            <span className="text-[10.5px] text-[#736350]">
              Paid & ready for packing
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#ebdcc4] shadow-sm">
            <div className="flex items-center justify-between text-[#736350] mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Shipped / Completed</span>
              <CheckCircle2 className="w-4 h-4 text-[#09733c]" />
            </div>
            <p className="text-2xl font-serif font-bold text-[#09733c]">
              {orders.filter((o) => ["SHIPPED", "DELIVERED"].includes(o.fulfillmentStatus)).length}
            </p>
            <span className="text-[10.5px] text-[#736350]">
              Dispatched with AWB
            </span>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white rounded-2xl border border-[#ebdcc4] p-4 shadow-sm space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#736350] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Order #, Name, Phone, City…"
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#ebdcc4] bg-[#faf7ef] text-xs text-[#142d1f] focus:outline-none focus:ring-2 focus:ring-[#0b3b24]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {["ALL", "PAID", "PROCESSING", "SHIPPED", "DELIVERED", "PENDING_PAYMENT"].map(
              (st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                    statusFilter === st
                      ? "bg-[#0b3b24] text-[#ffd978] shadow-sm"
                      : "bg-[#faf7ef] text-[#736350] hover:bg-[#ebdcc4]"
                  }`}
                >
                  {st.replace("_", " ")}
                </button>
              )
            )}
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl border border-[#ebdcc4] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#faf7ef] border-b border-[#ebdcc4] text-[#736350] uppercase tracking-wider font-bold">
                <tr>
                  <th className="py-3 px-4">Order ID & Date</th>
                  <th className="py-3 px-4">Customer & City</th>
                  <th className="py-3 px-4">Items</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Payment</th>
                  <th className="py-3 px-4">Fulfillment</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f2e7d7]">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-[#736350]">
                      <Package className="w-10 h-10 mx-auto text-[#c7b59e] mb-2" />
                      <p className="font-serif text-base font-bold text-[#142d1f]">
                        No orders found
                      </p>
                      <p className="text-xs">Try adjusting your search or filters.</p>
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => {
                    const isPaid = order.paymentStatus === "PAID";
                    const isShipped = ["SHIPPED", "DELIVERED"].includes(
                      order.fulfillmentStatus
                    );

                    return (
                      <tr
                        key={order.orderNumber}
                        className="hover:bg-[#faf7ef]/70 transition-colors"
                      >
                        {/* Order ID & Date */}
                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => openOrderDrawer(order)}
                            className="font-mono font-bold text-[#0b3b24] hover:underline block text-left"
                          >
                            {order.orderNumber}
                          </button>
                          <span className="text-[10px] text-[#736350]">
                            {new Date(order.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </td>

                        {/* Customer & City */}
                        <td className="py-3.5 px-4">
                          <p className="font-semibold text-[#142d1f]">
                            {order.customer?.name || "Customer"}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[11px] text-[#736350]">
                              {order.customer?.phone}
                            </span>
                            {order.customer?.phone && (
                              <a
                                href={`https://wa.me/91${order.customer.phone.replace(
                                  /\D/g,
                                  ""
                                )}?text=${encodeURIComponent(
                                  `Hi ${order.customer.name}, regarding your Ghritkalash order ${order.orderNumber}:`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-emerald-600 hover:text-emerald-700"
                                title="Chat on WhatsApp"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                          <span className="text-[10px] text-[#8c7b68]">
                            {order.customer?.city}, {order.customer?.pincode}
                          </span>
                        </td>

                        {/* Items */}
                        <td className="py-3.5 px-4 max-w-[200px]">
                          {(order.items || []).map((i, idx) => (
                            <p key={idx} className="truncate text-[#142d1f]">
                              {i.name} ({i.variantLabel}) ×<strong>{i.qty}</strong>
                            </p>
                          ))}
                        </td>

                        {/* Total */}
                        <td className="py-3.5 px-4">
                          <span className="font-black text-sm text-[#0b3b24]">
                            ₹{order.pricing?.totalAmount || 0}
                          </span>
                        </td>

                        {/* Payment Status */}
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10.5px] font-extrabold tracking-wide uppercase ${
                              isPaid
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {order.paymentStatus || "PENDING"}
                          </span>
                        </td>

                        {/* Fulfillment Status */}
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10.5px] font-extrabold tracking-wide uppercase ${
                              isShipped
                                ? "bg-blue-100 text-blue-800"
                                : order.fulfillmentStatus === "PROCESSING"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {order.fulfillmentStatus || "UNFULFILLED"}
                          </span>
                          {order.shipment?.awbNumber && (
                            <span className="block text-[10px] font-mono text-[#736350] mt-0.5">
                              AWB: {order.shipment.awbNumber}
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => openOrderDrawer(order)}
                            className="px-3 py-1.5 rounded-lg bg-[#0b3b24] text-[#ffd978] hover:bg-[#072417] font-bold text-xs transition-colors"
                          >
                            View & Manage
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* ── 4. ORDER DETAIL & PACKING DRAWER ─────────────────────────────────── */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedOrder(null)}
          />

          <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col border-l border-[#ebdcc4] z-10 overflow-y-auto">
            {/* Drawer Header */}
            <div className="px-6 py-4 border-b border-[#ebdcc4] bg-[#0b3b24] text-white flex items-center justify-between sticky top-0 z-20">
              <div>
                <h2 className="font-serif text-lg font-bold">
                  Order Details · {selectedOrder.orderNumber}
                </h2>
                <p className="text-xs text-[#ffd978]">
                  Created {new Date(selectedOrder.createdAt).toLocaleString("en-IN")}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1 rounded-full hover:bg-white/20 text-[#d8ebdf]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 flex-1 text-xs text-[#2c221a]">
              {/* Customer & Address Card */}
              <div className="bg-[#faf7ef] rounded-2xl p-4 border border-[#ebdcc4] space-y-3">
                <div className="flex items-center justify-between border-b border-[#ebdcc4] pb-2">
                  <span className="font-bold text-sm text-[#0b3b24]">
                    Customer & Shipping Address
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `${selectedOrder.customer?.name}\n${selectedOrder.customer?.address}\n${selectedOrder.customer?.city}, ${selectedOrder.customer?.state} - ${selectedOrder.customer?.pincode}\nPhone: ${selectedOrder.customer?.phone}`,
                        "address"
                      )
                    }
                    className="flex items-center gap-1 text-[11px] text-[#736350] hover:text-[#0b3b24]"
                  >
                    {copiedId === "address" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedId === "address" ? "Copied" : "Copy Address"}</span>
                  </button>
                </div>

                <div className="space-y-1">
                  <p className="font-bold text-sm text-[#142d1f]">
                    {selectedOrder.customer?.name}
                  </p>
                  <p className="text-[#524434] leading-relaxed">
                    {selectedOrder.customer?.address}
                  </p>
                  {selectedOrder.customer?.landmark && (
                    <p className="text-[#736350]">
                      Landmark: {selectedOrder.customer.landmark}
                    </p>
                  )}
                  <p className="font-semibold text-[#142d1f]">
                    {selectedOrder.customer?.city}, {selectedOrder.customer?.state} -{" "}
                    <strong>{selectedOrder.customer?.pincode}</strong>
                  </p>
                </div>

                {/* Contact Actions */}
                <div className="flex items-center gap-2 pt-2 border-t border-[#ebdcc4]">
                  {selectedOrder.customer?.phone && (
                    <>
                      <a
                        href={`tel:${selectedOrder.customer.phone}`}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#ebdcc4] font-bold text-[#0b3b24] hover:bg-[#f2e7d7]"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call</span>
                      </a>
                      <a
                        href={`https://wa.me/91${selectedOrder.customer.phone.replace(
                          /\D/g,
                          ""
                        )}?text=${encodeURIComponent(
                          `Hi ${selectedOrder.customer.name}, updates regarding your Ghritkalash order ${selectedOrder.orderNumber}:`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp Customer</span>
                      </a>
                    </>
                  )}
                </div>
              </div>

              {/* Items Card */}
              <div className="bg-white rounded-2xl p-4 border border-[#ebdcc4] space-y-3">
                <span className="font-bold text-sm text-[#0b3b24] block border-b border-[#f0e6d6] pb-2">
                  Items to Pack ({selectedOrder.items?.length || 0})
                </span>

                <div className="space-y-2">
                  {(selectedOrder.items || []).map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-xl bg-[#faf7ef] border border-[#f0e6d6]"
                    >
                      <div>
                        <p className="font-bold text-[#142d1f]">{item.name}</p>
                        <p className="text-[11px] text-[#736350]">{item.variantLabel}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-sm text-[#0b3b24]">
                          ₹{item.price} × {item.qty}
                        </span>
                        <p className="text-[11px] font-black text-[#142d1f]">
                          ₹{item.price * item.qty}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#f0e6d6] space-y-1 text-[#736350]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{selectedOrder.pricing?.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>₹{selectedOrder.pricing?.deliveryFee}</span>
                  </div>
                  <div className="flex justify-between font-black text-sm text-[#0b3b24] pt-1 border-t border-[#f0e6d6]">
                    <span>Total Amount Paid</span>
                    <span>₹{selectedOrder.pricing?.totalAmount}</span>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-[#faf7ef] rounded-2xl p-4 border border-[#ebdcc4] space-y-2">
                <span className="font-bold text-sm text-[#0b3b24] block">
                  Payment Verification
                </span>
                <p>
                  Status:{" "}
                  <strong className="text-emerald-700 uppercase">
                    {selectedOrder.paymentStatus}
                  </strong>
                </p>
                {selectedOrder.razorpayPaymentId && (
                  <p className="font-mono text-[11px]">
                    Razorpay Payment ID: <strong>{selectedOrder.razorpayPaymentId}</strong>
                  </p>
                )}
                {selectedOrder.razorpayOrderId && (
                  <p className="font-mono text-[11px]">
                    Razorpay Order ID: {selectedOrder.razorpayOrderId}
                  </p>
                )}
              </div>

              {/* Shiprocket 1-Click Dispatch */}
              <div className="bg-[#eef7f1] rounded-2xl p-4 border border-[#cde5d6] space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[#0b3b24] font-bold text-sm">
                    <Truck className="w-4 h-4" />
                    <span>Shiprocket Automated Dispatch</span>
                  </div>
                  <span className="text-[10px] bg-[#0b3b24] text-[#ffd978] px-2 py-0.5 rounded-full font-extrabold uppercase">
                    Live API
                  </span>
                </div>
                <p className="text-[11px] text-[#524434] leading-relaxed">
                  Automatically push this order to Shiprocket, calculate jar parcel dimensions, assign fastest courier (BlueDart/Delhivery), and generate live AWB.
                </p>
                <button
                  onClick={handleShiprocketBooking}
                  disabled={bookingShiprocket || selectedOrder.paymentStatus !== "PAID"}
                  className="w-full py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider hover:bg-emerald-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
                >
                  <Truck className="w-4 h-4" />
                  <span>
                    {bookingShiprocket ? "Connecting Shiprocket…" : "Push to Shiprocket & Generate AWB"}
                  </span>
                </button>
              </div>

              {/* Fulfillment & Tracking Updater */}
              <div className="bg-white rounded-2xl p-4 border border-[#ebdcc4] space-y-3">
                <span className="font-bold text-sm text-[#0b3b24] block border-b border-[#f0e6d6] pb-2">
                  Dispatch & Tracking Controls
                </span>

                <div className="space-y-3">
                  <div>
                    <label className="block font-bold text-[#142d1f] mb-1">
                      Fulfillment Status
                    </label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[#ebdcc4] bg-[#faf7ef] font-semibold text-xs"
                    >
                      <option value="PROCESSING">PROCESSING (Packing in warehouse)</option>
                      <option value="SHIPPED">SHIPPED (Picked up by courier)</option>
                      <option value="DELIVERED">DELIVERED (Handed to customer)</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-[#142d1f] mb-1">
                      Assigned Courier Partner
                    </label>
                    <input
                      type="text"
                      value={newCourier}
                      onChange={(e) => setNewCourier(e.target.value)}
                      placeholder="e.g. Delhivery Surface / BlueDart"
                      className="w-full p-2.5 rounded-xl border border-[#ebdcc4] bg-[#faf7ef] text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#142d1f] mb-1">
                      AWB Tracking Number
                    </label>
                    <input
                      type="text"
                      value={newAwb}
                      onChange={(e) => setNewAwb(e.target.value)}
                      placeholder="e.g. DLH123456789"
                      className="w-full p-2.5 rounded-xl border border-[#ebdcc4] bg-[#faf7ef] text-xs font-mono"
                    />
                  </div>

                  <button
                    onClick={handleUpdateOrder}
                    disabled={savingStatus}
                    className="w-full py-2.5 rounded-xl bg-[#0b3b24] text-[#ffd978] font-bold text-xs uppercase tracking-wider hover:bg-[#072417] transition-colors disabled:opacity-50"
                  >
                    {savingStatus ? "Saving Changes…" : "Update Order Status & AWB"}
                  </button>
                </div>
              </div>

              {/* Print Packing Slip */}
              <button
                onClick={() => window.print()}
                className="w-full py-3 rounded-xl border border-[#0b3b24] text-[#0b3b24] font-bold text-xs uppercase tracking-wider hover:bg-[#faf7ef] transition-colors flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Packing Slip</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
