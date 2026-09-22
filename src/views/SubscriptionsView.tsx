import React, { useState } from 'react';
import { 
  CalendarClock, 
  Plus, 
  Trash2, 
  ExternalLink, 
  AlertCircle, 
  ShieldCheck, 
  Bell, 
  DollarSign, 
  HelpCircle,
  X
} from 'lucide-react';
import { useSafeCart } from '../context/SafeCartContext';
import { SavedSubscription } from '../types';

export const SubscriptionsView: React.FC = () => {
  const { savedSubscriptions, addSubscription, removeSubscription } = useSafeCart();
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // Form State
  const [serviceName, setServiceName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [price, setPrice] = useState('499');
  const [billingFrequency, setBillingFrequency] = useState<'monthly' | 'annual' | 'weekly'>('monthly');
  const [nextRenewalDate, setNextRenewalDate] = useState('2026-10-15');
  const [cancellationMethod, setCancellationMethod] = useState('');
  const [remindDaysBefore, setRemindDaysBefore] = useState(3);
  const [notes, setNotes] = useState('');

  // Calculate annual total
  const annualTotal = savedSubscriptions.reduce((sum, sub) => {
    if (sub.billingFrequency === 'monthly') return sum + sub.price * 12;
    if (sub.billingFrequency === 'weekly') return sum + sub.price * 52;
    return sum + sub.price;
  }, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceName.trim()) return;

    addSubscription({
      serviceName: serviceName.trim(),
      websiteUrl: websiteUrl.trim() || 'https://example.com',
      price: parseFloat(price) || 0,
      currency: '₹',
      billingFrequency,
      nextRenewalDate,
      cancellationMethod: cancellationMethod.trim() || 'Cancel in account settings',
      remindDaysBefore,
      notes: notes.trim()
    });

    setShowAddModal(false);
    setServiceName('');
    setCancellationMethod('');
    setNotes('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" id="subscriptions-view-root">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Forced Continuity Protection
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Subscription & Renewal Tracker
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Monitor converted trials and auto-renewals before unexpected charges hit your card.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Subscription</span>
        </button>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Active Tracked Plans
          </span>
          <div className="font-display text-2xl font-bold text-slate-900 mt-1">
            {savedSubscriptions.length}
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">Recurring commitments</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Estimated Annual Outflow
          </span>
          <div className="font-display text-2xl font-bold text-amber-600 mt-1">
            ₹{annualTotal.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">Calculated across all tracked services</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Renewal Protection
          </span>
          <div className="font-display text-2xl font-bold text-emerald-600 mt-1 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-500" />
            <span>Active</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">Alerts active 3-7 days before renewal</p>
        </div>
      </div>

      {/* Subscription Cards List */}
      <div className="space-y-4">
        <h3 className="font-display font-bold text-base text-slate-900">
          Your Tracked Subscriptions ({savedSubscriptions.length})
        </h3>

        {savedSubscriptions.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
            <CalendarClock className="w-8 h-8 text-slate-400 mx-auto" />
            <h4 className="font-bold text-sm text-slate-800">No Subscriptions Tracked Yet</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              When SafeCart audits a checkout with a free trial or recurring billing, you can save it here to track renewal dates and cancellation instructions.
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 text-xs font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Add First Subscription
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedSubscriptions.map((sub) => {
              const renewalDate = new Date(sub.nextRenewalDate);
              const daysLeft = Math.ceil((renewalDate.getTime() - Date.now()) / (1000 * 3600 * 24));
              const isUrgent = daysLeft >= 0 && daysLeft <= 7;

              return (
                <div
                  key={sub.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4 flex flex-col justify-between"
                  id={`subscription-card-${sub.id}`}
                >
                  <div>
                    {/* Top Row: Title + Price */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="font-display font-bold text-base text-slate-900">
                          {sub.serviceName}
                        </h4>
                        <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                          {sub.websiteUrl}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="font-mono text-base font-bold text-slate-900">
                          {sub.currency}{sub.price.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-slate-500 block uppercase">
                          /{sub.billingFrequency}
                        </span>
                      </div>
                    </div>

                    {/* Renewal Countdown Badge */}
                    <div className="mt-3 flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold border flex items-center gap-1.5 ${
                        isUrgent 
                          ? 'bg-amber-50 text-amber-800 border-amber-300' 
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}>
                        <CalendarClock className="w-3.5 h-3.5" />
                        <span>Renews: {sub.nextRenewalDate}</span>
                        {daysLeft >= 0 ? ` (${daysLeft} days remaining)` : ' (Past due)'}
                      </span>
                    </div>

                    {/* Cancellation Method & Advice */}
                    <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                      <span className="font-bold text-slate-700 block">Cancellation Method:</span>
                      <p className="text-slate-600 font-medium">{sub.cancellationMethod}</p>
                      {sub.notes && (
                        <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-200">
                          Note: {sub.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Bell className="w-3 h-3 text-slate-400" />
                      Remind {sub.remindDaysBefore} days before
                    </span>

                    <button
                      onClick={() => removeSubscription(sub.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete subscription"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Subscription Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-display font-bold text-base text-slate-900">
                Track a Subscription or Free Trial
              </h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Service / Website Name</label>
                <input
                  type="text"
                  required
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  placeholder="e.g. FitPulse Gym Pass or StreamWave"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Recurring Cost (₹)</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Frequency</label>
                  <select
                    value={billingFrequency}
                    onChange={(e) => setBillingFrequency(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="annual">Annual</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Next Renewal Date</label>
                <input
                  type="date"
                  required
                  value={nextRenewalDate}
                  onChange={(e) => setNextRenewalDate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">How to Cancel</label>
                <input
                  type="text"
                  value={cancellationMethod}
                  onChange={(e) => setCancellationMethod(e.target.value)}
                  placeholder="e.g. Account -> Subscriptions -> Cancel before Oct 14"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Notes / Trial Terms</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Started 14-day free trial on Sep 20"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
                >
                  Save Subscription
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
