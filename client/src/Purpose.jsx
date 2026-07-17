import { useState } from "react";
import {
  ArrowRight,
  GraduationCap,
  Home,
  Briefcase,
  HeartPulse,
  ShoppingCart,
  Wrench,
  Landmark,
  MoreHorizontal,
} from "lucide-react";
import logo from "/src/assets/Nyotalogo.png";
import Topbar from "./Topbar";
import { useNavigate } from "react-router-dom";
import { PageLoader } from "./Loader";

const inputClass =
  "w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-2.5 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20";

const PURPOSE_OPTIONS = [
  { id: "business", label: "Business", icon: Briefcase },
  { id: "asset", label: "Asset purchase", icon: Wrench },
  { id: "rent", label: "Rent", icon: Home },
  { id: "medical", label: "Medical", icon: HeartPulse },
  { id: "shopping", label: "Shopping / stock", icon: ShoppingCart },
  { id: "debt", label: "Debt repayment", icon: Landmark },
  { id: "school", label: "School fees", icon: GraduationCap },
  { id: "other", label: "Other", icon: MoreHorizontal },
];

export default function GrantPurpose() {
  const [purpose, setPurpose] = useState("");
  const [otherText, setOtherText] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isOther = purpose === "other";

  const handleSelect = (id) => {
    setPurpose(id);
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!purpose) {
      setError("Please select a reason for your Grant.");
      return;
    }

    if (isOther && !otherText.trim()) {
      setError("Please tell us what the Grant is for.");
      return;
    }

    setError("");
    setLoading(true);
    // Proceed to the next step
    setTimeout(() => {
      setLoading(false);
      navigate("/processing");
    }, 6500);
  };
  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen bg-white text-stone-900 sm:py-16">
      <Topbar />

      <img src={logo} alt="Nyota Logo" />

      <div className="mx-auto max-w-2xl px-5">
        <div>
          <h1 className="ml-4 font-serif text-2xl font-semibold text-black">
            Grant Purpose
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 px-6 py-8 sm:px-10"
          >
            <fieldset>
              <legend className="mb-4 text-xs font-semibold uppercase tracking-wider color-b">
                What is this Grant for?
              </legend>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {PURPOSE_OPTIONS.map((option) => {
                  const Icon = option.icon;
                  const selected = purpose === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleSelect(option.id)}
                      className={`flex flex-col items-center gap-2 rounded-xl border px-3 py-4 text-center text-xs font-medium transition ${
                        selected
                          ? "border-emerald-700 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-700/20"
                          : "border-stone-300 bg-stone-50 text-stone-600 hover:border-emerald-300"
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 ${
                          selected ? "text-emerald-700" : "text-stone-400"
                        }`}
                      />
                      {option.label}
                    </button>
                  );
                })}
              </div>

              {isOther && (
                <div className="mt-4">
                  <textarea
                    rows={5}
                    className={`${inputClass} resize-none`}
                    placeholder="Tell us what the Grant is for..."
                    value={otherText}
                    onChange={(e) => {
                      setOtherText(e.target.value);
                      if (error) setError("");
                    }}
                  />
                </div>
              )}

              {error && (
                <span className="mt-2 block text-xs font-medium text-red-600">
                  {error}
                </span>
              )}
            </fieldset>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-700 px-7 py-3.5 text-sm font-semibold text-stone-50 shadow-sm transition hover:bg-emerald-900"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>

            <p className="text-center text-xs text-stone-400">
              The Official Website | Copyright © 2026. National Youth
              Opportunities Towards Advancement (NYOTA) Project.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
