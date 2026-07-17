import { useState } from "react";
import logo from "/src/assets/Nyotalogo.png";
import {
  Star,
  User,
  Phone,
  IdCard,
  Cake,
  Briefcase,
  MapPin,
  Users,
  Mail,
  Hash,
  Radio,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import Topbar from "./Topbar";
import Navigator from "./Navigator";
import { useNavigate } from "react-router-dom";
import { PageLoader, PurposePageSkeleton } from "./Loader";

const COUNTIES = [
  "Baringo",
  "Bomet",
  "Bungoma",
  "Busia",
  "Elgeyo-Marakwet",
  "Embu",
  "Garissa",
  "Homa Bay",
  "Isiolo",
  "Kajiado",
  "Kakamega",
  "Kericho",
  "Kiambu",
  "Kilifi",
  "Kirinyaga",
  "Kisii",
  "Kisumu",
  "Kitui",
  "Kwale",
  "Laikipia",
  "Lamu",
  "Machakos",
  "Makueni",
  "Mandera",
  "Marsabit",
  "Meru",
  "Migori",
  "Mombasa",
  "Murang'a",
  "Nairobi",
  "Nakuru",
  "Nandi",
  "Narok",
  "Nyamira",
  "Nyandarua",
  "Nyeri",
  "Samburu",
  "Siaya",
  "Taita-Taveta",
  "Tana River",
  "Tharaka-Nithi",
  "Trans Nzoia",
  "Turkana",
  "Uasin Gishu",
  "Vihiga",
  "Wajir",
  "West Pokot",
];

const REFERRAL_SOURCES = [
  "Hon President William Ruto",
  "TV/Radio",
  "Newspaper/Magazine",
  "Social Media",
  "A friend or family member",
  "A Nyota agent",
];

const emptyForm = {
  fullName: "",
  phone: "",
  idNo: "",
  age: "",
  occupation: "",
  county: "",
  kinName: "",
  kinPhone: "",
  email: "",
  postalCode: "",
  referral: "",
};

function Field({ label, required, icon: Icon, children, hint }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-stone-700">
        {Icon && <Icon className="h-3.5 w-3.5 text-emerald-700" />}
        {label}
        {required && <span className="text-amber-600">*</span>}
      </span>
      {children}
      {hint && (
        <span className="mt-1 block text-xs text-stone-400">{hint}</span>
      )}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-2.5 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20";

export default function Landing() {
  const [page, setPage] = useState("form"); // "form" | "confirmation"
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [refId, setRefId] = useState("");
  const [loading, setLoading] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function validate() {
    const required = [
      "fullName",
      "phone",
      "idNo",
      "age",
      "occupation",
      "county",
      "kinName",
      "kinPhone",
    ];
    const next = {};
    required.forEach((key) => {
      if (!String(form[key]).trim()) next[key] = "Field required";
    });
    if (form.phone && !/^0\d{9}$/.test(form.phone.trim())) {
      next.phone = "Use format 07XXXXXXXX";
    }
    if (form.kinPhone && !/^0\d{9}$/.test(form.kinPhone.trim())) {
      next.kinPhone = "Use format 07XXXXXXXX";
    }
    if (form.idNo && !/^\d{6,9}$/.test(form.idNo.trim())) {
      next.idNo = "Enter a valid ID number";
    }
    if (form.age && (Number(form.age) < 18 || Number(form.age) > 100)) {
      next.age = "Must be 18 or older";
    }
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      next.email = "Enter a valid email";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    const id = "NBF-" + Math.floor(100000 + Math.random() * 900000);
    setRefId(id);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/reason");
    }, 5000);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  if (loading) {
    return <PurposePageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-white  text-stone-900 sm:py-16">
      <Topbar />
      <img src={logo} alt="" />
      <div className="mx-auto max-w-2xl px-5 ">
        {/* Brand header */}

        <div className=" ">
          <div className=" m-0">
            <h1 className="ml-4 font-serif text-2xl font-semibold sm:text-2xl text-black">
              Kindly submit the following requirements
            </h1>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-1 px-6 py-8 sm:px-10"
          >
            {/* PERSONAL DETAILS */}
            <fieldset>
              <legend className="mb-4 text-xs font-semibold uppercase tracking-wider color-b">
                Personal details
              </legend>
              <div className="grid gap-3 mb-3 ">
                <div className="sm:col-span-2 ">
                  <Field>
                    <input
                      className={inputClass}
                      placeholder="Full name"
                      value={form.fullName}
                      onChange={(e) => update("fullName", e.target.value)}
                    />
                    {errors.fullName && <ErrorText text={errors.fullName} />}
                  </Field>
                </div>

                <Field hint="Registered on M-Pesa">
                  <input
                    className={inputClass}
                    placeholder="Phone Number"
                    inputMode="numeric"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                  />
                  {errors.phone && <ErrorText text={errors.phone} />}
                </Field>

                <Field>
                  <input
                    className={inputClass}
                    placeholder="Id Number"
                    inputMode="numeric"
                    value={form.idNo}
                    onChange={(e) => update("idNo", e.target.value)}
                  />
                  {errors.idNo && <ErrorText text={errors.idNo} />}
                </Field>

                <Field>
                  <input
                    className={inputClass}
                    placeholder="Age"
                    inputMode="numeric"
                    value={form.age}
                    onChange={(e) => update("age", e.target.value)}
                  />
                  {errors.age && <ErrorText text={errors.age} />}
                </Field>

                <Field>
                  <input
                    className={inputClass}
                    placeholder="Occupation/Job"
                    value={form.occupation}
                    onChange={(e) => update("occupation", e.target.value)}
                  />
                  {errors.occupation && <ErrorText text={errors.occupation} />}
                </Field>

                <div className="sm:col-span-2">
                  <Field>
                    <select
                      className={inputClass}
                      value={form.county}
                      onChange={(e) => update("county", e.target.value)}
                    >
                      <option value="">Select your county</option>
                      {COUNTIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    {errors.county && <ErrorText text={errors.county} />}
                  </Field>
                </div>
              </div>
            </fieldset>

            {/* NEXT OF KIN */}
            <fieldset>
              <legend className="my-3 text-xs font-semibold uppercase tracking-wider color-b">
                Next of kin
              </legend>
              <div className="grid gap-2 mb-3 ">
                <Field>
                  <input
                    className={inputClass}
                    placeholder="Full name"
                    value={form.kinName}
                    onChange={(e) => update("kinName", e.target.value)}
                  />
                  {errors.kinName && <ErrorText text={errors.kinName} />}
                </Field>

                <Field>
                  <input
                    className={inputClass}
                    placeholder="Phone Number"
                    inputMode="numeric"
                    value={form.kinPhone}
                    onChange={(e) => update("kinPhone", e.target.value)}
                  />
                  {errors.kinPhone && <ErrorText text={errors.kinPhone} />}
                </Field>
              </div>
            </fieldset>

            {/* OPTIONAL */}
            <fieldset>
              <legend className="mb-4 text-xs font-semibold uppercase tracking-wider color-b">
                Optional
              </legend>
              <div className="grid gap-2">
                <Field>
                  <input
                    className={inputClass}
                    type="email"
                    placeholder="Email address"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                  />
                  {errors.email && <ErrorText text={errors.email} />}
                </Field>

                <Field>
                  <input
                    className={inputClass}
                    placeholder="Postal code"
                    value={form.postalCode}
                    onChange={(e) => update("postalCode", e.target.value)}
                  />
                </Field>
              </div>
            </fieldset>

            {/* REFERRAL */}
            <fieldset>
              <Field>
                <h1 className=" font-serif  font-semibold sm:text-2xl color-b mb-3">
                  Where did you hear about NYOTA project?
                </h1>

                <select
                  className={inputClass}
                  value={form.referral}
                  onChange={(e) => update("referral", e.target.value)}
                >
                  {REFERRAL_SOURCES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {errors.referral && <ErrorText text={errors.referral} />}
              </Field>
            </fieldset>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 my-3 rounded-full bg-green-700 px-7 py-3.5 text-sm font-semibold text-stone-50 shadow-sm transition hover:bg-emerald-900"
            >
              Submit application
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

function ErrorText({ text }) {
  return (
    <span className="mt-1 block text-xs font-medium text-red-600">{text}</span>
  );
}
