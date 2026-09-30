import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CreditCard,
  Banknote,
  QrCode,
  Building,
  Wrench,
  CheckCircle2,
  AlertCircle,
  Truck,
  FileText
} from 'lucide-react';

export default function CheckoutModal({
  isOpen,
  onClose,
  items,
  currentUser,
  onOrderSuccess,
  apiPlaceOrder,
}) {
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || '',
    city: currentUser?.city || 'Mumbai',
    state: 'Maharashtra',
    pincode: currentUser?.pincode || '',
    companyName: currentUser?.companyName || '',
    gstNumber: currentUser?.gstNumber || '',
    installationRequested: false,
    notes: '',
  });

  // Keep form synced when modal opens or user logs in
  React.useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        name: currentUser.name || prev.name,
        email: currentUser.email || prev.email,
        phone: currentUser.phone || prev.phone,
        address: currentUser.address || prev.address,
        city: currentUser.city || prev.city,
        pincode: currentUser.pincode || prev.pincode,
        companyName: currentUser.companyName || prev.companyName,
        gstNumber: currentUser.gstNumber || prev.gstNumber,
      }));
    }
  }, [currentUser, isOpen]);

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen || items.length === 0) return null;

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );
  const taxAmount = Math.round(subtotal * 0.18);
  const shippingFee = subtotal >= 3000 ? 0 : 150;
  const grandTotal = subtotal + taxAmount + shippingFee;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim() || !formData.pincode.trim()) {
      setErrorMsg('Please complete all required fields (Name, Phone, Delivery Address, Pincode).');
      return;
    }

    try {
      setIsSubmitting(true);

      const orderPayload = {
        user: currentUser?._id || null,
        customer: {
          name: formData.name,
          email: formData.email || 'customer@fireshaw.local',
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          companyName: formData.companyName,
          gstNumber: formData.gstNumber,
        },
        items: items.map((item) => ({
          product: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity || 1,
          sku: item.sku,
          image: item.image,
        })),
        paymentMethod,
        installationRequested: formData.installationRequested,
        notes: formData.notes,
      };

      const result = await apiPlaceOrder(orderPayload);
      setIsSubmitting(false);
      onOrderSuccess(result);
    } catch (err) {
      setIsSubmitting(false);
      setErrorMsg(err.message || 'Error communicating with Fireshaw order server.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200 my-8">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-fire-400 uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4 text-fire-500" />
              Secure Safety Equipment Checkout
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-display">
              Confirm Your Fireshaw Order
            </h2>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 p-2 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="bg-fire-50 border-l-4 border-fire-600 p-4 mx-6 mt-4 rounded-r-xl flex items-center gap-3 text-xs font-medium text-fire-800">
            <AlertCircle className="w-4 h-4 text-fire-600 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Customer & Delivery details */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-fire-600 text-white text-[11px] flex items-center justify-center">1</span>
                  Delivery Address & Contact
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Full Name / Contact Person *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Ramesh Patel"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-fire-500 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-fire-500 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Email Address (for Tax Invoice)
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="ramesh@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-fire-500 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Street Address, Building, Floor *
                    </label>
                    <textarea
                      name="address"
                      rows={2}
                      required
                      placeholder="e.g. Flat 302, Green Heights, Ring Road"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-fire-500 focus:bg-white focus:outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-fire-500 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Pincode / Postal Code *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      required
                      placeholder="400001"
                      value={formData.pincode}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-fire-500 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Business Tax Invoice Optional */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-slate-600" />
                  <span className="text-xs font-bold text-slate-800">GST Input Tax Credit (Optional)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Company Legal Name"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs"
                  />
                  <input
                    type="text"
                    name="gstNumber"
                    placeholder="15-digit GSTIN"
                    value={formData.gstNumber}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              {/* Installation Checkbox */}
              <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200/80">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="installationRequested"
                    checked={formData.installationRequested}
                    onChange={handleChange}
                    className="mt-0.5 w-4 h-4 text-fire-600 rounded border-slate-300 focus:ring-fire-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-amber-900 block flex items-center gap-1.5">
                      <Wrench className="w-3.5 h-3.5 text-amber-700" />
                      Request Expert On-Site Wall Mounting & Safety Demonstration
                    </span>
                    <span className="text-[11px] text-amber-800">
                      Our certified safety technicians will visit your premises to drill, mount brackets at NBC compliant height, and train your staff.
                    </span>
                  </div>
                </label>
              </div>

              {/* Payment Method Selector */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-fire-600 text-white text-[11px] flex items-center justify-center">2</span>
                  Payment Method
                </h3>

                <div className="grid grid-cols-2 gap-2.5">
                  <div
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-xl border cursor-pointer flex items-center gap-2.5 transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-fire-600 bg-fire-50 text-fire-900 font-bold ring-1 ring-fire-600'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Banknote className="w-4 h-4 text-fire-600" />
                    <span className="text-xs">Cash on Delivery</span>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 rounded-xl border cursor-pointer flex items-center gap-2.5 transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-fire-600 bg-fire-50 text-fire-900 font-bold ring-1 ring-fire-600'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <QrCode className="w-4 h-4 text-fire-600" />
                    <span className="text-xs">UPI / QR Payment</span>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border cursor-pointer flex items-center gap-2.5 transition-all ${
                      paymentMethod === 'card'
                        ? 'border-fire-600 bg-fire-50 text-fire-900 font-bold ring-1 ring-fire-600'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-fire-600" />
                    <span className="text-xs">Card / NetBanking</span>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('bank_transfer')}
                    className={`p-3 rounded-xl border cursor-pointer flex items-center gap-2.5 transition-all ${
                      paymentMethod === 'bank_transfer'
                        ? 'border-fire-600 bg-fire-50 text-fire-900 font-bold ring-1 ring-fire-600'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Building className="w-4 h-4 text-fire-600" />
                    <span className="text-xs">NEFT / Corporate RTGS</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary & Place Order Button */}
            <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-3 pb-2 border-b border-slate-200">
                  Order Summary ({items.length} {items.length === 1 ? 'item' : 'items'})
                </h3>

                {/* Items mini list */}
                <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
                  {items.map((it) => (
                    <div
                      key={it._id || it.sku}
                      className="flex items-center justify-between text-xs py-1.5 border-b border-slate-200/60"
                    >
                      <div className="flex-1 pr-2 truncate">
                        <span className="font-semibold text-slate-800">{it.name}</span>
                        <div className="text-[10px] text-slate-400">Qty: {it.quantity || 1} × ₹{it.price}</div>
                      </div>
                      <span className="font-bold text-slate-900">
                        ₹{(it.price * (it.quantity || 1)).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price Calculations */}
                <div className="space-y-2 pt-4 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-800">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>GST (18%)</span>
                    <span className="font-semibold text-slate-800">₹{taxAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Shipping</span>
                    <span className="font-semibold text-slate-800">
                      {shippingFee === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `₹${shippingFee}`}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                    <span className="font-bold text-slate-900 text-sm">Amount Due</span>
                    <span className="font-black text-fire-600 text-xl">
                      ₹{grandTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-fire-600 hover:bg-fire-700 shadow-lg shadow-fire-600/30 flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Processing Order...</span>
                  ) : (
                    <span>Confirm & Place Order</span>
                  )}
                </button>

                <p className="text-[11px] text-slate-500 text-center">
                  By clicking confirm, you agree to Fireshaw store delivery terms and warranty policy.
                </p>
              </div>
            </div>

          </div>
        </form>

      </div>
    </div>
  );
}
