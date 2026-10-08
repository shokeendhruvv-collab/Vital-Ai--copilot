import React, { useState } from 'react';
import { X, Pill, CheckCircle2, ShieldCheck, MapPin, Truck } from 'lucide-react';
import { Medicine } from '../types';

interface MedicineOrderModalProps {
  medicine: Medicine | null;
  onClose: () => void;
  onConfirmOrder: (medicineName: string, quantity: number) => void;
}

export const MedicineOrderModal: React.FC<MedicineOrderModalProps> = ({
  medicine,
  onClose,
  onConfirmOrder,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [deliveryAddress, setDeliveryAddress] = useState('Budhera, Gurugram, Haryana 122505');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!medicine) return null;

  const totalPrice = medicine.priceInINR * quantity;

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmOrder(medicine.name, quantity);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 bg-slate-50 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Pill className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Express Pharmacy Refill</h3>
              <p className="text-xs text-slate-500">SGT Hospital Pharmacy Desk</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-xl">
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Refill Order Placed!</h4>
            <p className="text-xs text-slate-500">
              Your prescription for {medicine.name} ({quantity} pack) is queued for dispatch within 3 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleOrder} className="p-6 space-y-4 text-xs">
            {/* Med Summary */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">{medicine.name}</span>
                <span className="font-bold text-[#0878E8]">{medicine.dosage}</span>
              </div>
              <p className="text-slate-500">{medicine.instructions}</p>
              <div className="text-[11px] text-slate-400">
                Prescribed by: {medicine.prescribingDoctor}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="font-bold text-slate-700 block mb-1">Refill Quantity (Strips/Bottles)</label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 rounded-xl border border-slate-200 font-bold hover:bg-slate-100 flex items-center justify-center text-slate-700"
                >
                  -
                </button>
                <span className="font-bold text-base text-slate-900 px-2">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 rounded-xl border border-slate-200 font-bold hover:bg-slate-100 flex items-center justify-center text-slate-700"
                >
                  +
                </button>
              </div>
            </div>

            {/* Delivery address */}
            <div>
              <label className="font-bold text-slate-700 block mb-1">Delivery Address</label>
              <textarea
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                rows={2}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0878E8]"
                required
              />
            </div>

            {/* Express delivery note */}
            <div className="flex items-center gap-2 p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-800">
              <Truck className="w-4 h-4 shrink-0 text-teal-600" />
              <span>Same-day temperature-controlled dispatch from SGT Hospital Pharmacy.</span>
            </div>

            {/* Price breakdown */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="font-medium text-slate-600">Total Amount Payable</span>
              <span className="text-base font-black text-slate-900">₹{totalPrice}</span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#0878E8] hover:bg-[#0665c7] text-white font-bold text-xs shadow-md transition-colors"
            >
              Confirm Express Refill Order
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
