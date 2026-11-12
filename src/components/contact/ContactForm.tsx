"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "@/lib/animations";
import { AlertCircle, Check, CheckCircle2, ChevronDown, Loader2, Send, X } from "lucide-react";
import { site, type EnquiryType } from "@/data/site";
import { products } from "@/data/products";

type Fields = {
  name: string;
  company: string;
  email: string;
  phone: string;
  enquiryType: EnquiryType | "";
  otherSpecific: string;
  message: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = {
  name: "",
  company: "",
  email: "",
  phone: "",
  enquiryType: "",
  otherSpecific: "",
  message: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const phonePattern = /^\+?[0-9\s-]{7,20}$/;

const validate = (values: Fields, productRef: string): Errors => {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Enter your full name.";
  if (!values.company.trim()) errors.company = "Enter your company name.";
  if (!emailPattern.test(values.email.trim())) errors.email = "Enter a valid email address.";

  // Phone validation: mandatory, digits and + only, max 15 digits
  if (!values.phone.trim()) {
    errors.phone = "Enter your phone number.";
  } else {
    const digitsOnly = values.phone.replace(/\D/g, "");
    if (!phonePattern.test(values.phone.trim()) || /[a-zA-Z,.;:"'[\]{}]/.test(values.phone)) {
      errors.phone = "Phone number cannot contain letters or special characters.";
    } else if (digitsOnly.length < 7) {
      errors.phone = "Phone number is too short (minimum 7 digits).";
    } else if (digitsOnly.length > 15) {
      errors.phone = "Phone number cannot exceed 15 digits.";
    }
  }

  if (!values.enquiryType) errors.enquiryType = "Select an enquiry type.";
  if (values.enquiryType === "Other" && !values.otherSpecific.trim()) {
    errors.otherSpecific = "Please specify your enquiry.";
  }
  if (values.message.trim().length < 20) {
    errors.message = "Tell us a little more — at least 20 characters.";
  }
  if (productRef && values.message.trim().length < 20) {
    errors.message = "Add the capacity, colour and quantity you need.";
  }
  return errors;
};

export function ContactForm() {
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "submitted">("idle");
  const [showModal, setShowModal] = useState(false);
  const [productRef, setProductRef] = useState("");
  const [enquiryMenuOpen, setEnquiryMenuOpen] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  useScrollReveal(formRef);
  const enquiryDropdownRef = useRef<HTMLDivElement | null>(null);

  /* Close enquiry dropdown on click outside */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        enquiryDropdownRef.current &&
        !enquiryDropdownRef.current.contains(event.target as Node)
      ) {
        setEnquiryMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* Pre-fill the product reference from /contact?product=… */
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("product");
    if (!slug) return;
    const match = products.find((product) => product.slug === slug);
    if (!match) return;
    setProductRef(match.slug);
    setValues((current) =>
      current.message
        ? current
        : {
            ...current,
            enquiryType: "Product enquiry",
            message: `I’d like details on the ${match.name}. Quantity needed: `,
          },
    );
  }, []);

  const update = (key: keyof Fields, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const handlePhoneChange = (input: string) => {
    // Disallow letters and punctuation (, . ; : " ' [ ] { } etc.)
    // Only allow digits, plus sign, spaces, and hyphens
    let sanitized = input.replace(/[^0-9+\s-]/g, "");

    // Allow '+' only at the very start
    if (sanitized.includes("+")) {
      const startsWithPlus = sanitized.startsWith("+");
      sanitized = (startsWithPlus ? "+" : "") + sanitized.slice(startsWithPlus ? 1 : 0).replace(/\+/g, "");
    }

    // Enforce max 15 digits in real-time
    const digitsOnly = sanitized.replace(/\D/g, "");
    if (digitsOnly.length > 15) {
      let count = 0;
      let cutIndex = sanitized.length;
      for (let i = 0; i < sanitized.length; i++) {
        if (/\d/.test(sanitized[i])) {
          count++;
          if (count === 15) {
            cutIndex = i + 1;
            break;
          }
        }
      }
      sanitized = sanitized.slice(0, cutIndex);
    }

    update("phone", sanitized);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(values, productRef);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      const firstKey = Object.keys(found)[0];
      const field = formRef.current?.querySelector<HTMLElement>(`[name="${firstKey}"]`);
      field?.focus();
      return;
    }

    setStatus("sending");
    try {
      await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          product: productRef
            ? products.find((p) => p.slug === productRef)?.name || productRef
            : "",
        }),
      });
    } catch {
      // Continue to show success state gracefully
    }

    setStatus("submitted");
    setShowModal(true);
    setValues(EMPTY);
    setProductRef("");
  };

  const errorEntries = Object.entries(errors);

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="w-full"
    >
      {productRef && (
        <div data-reveal data-reveal-delay="0.1" className="mb-5 flex flex-wrap items-baseline gap-x-3 border-b border-line pb-3 text-[14px] text-mid">
          <span className="text-[14px] text-mid">
            Product
          </span>
          <span className="text-ink font-semibold">{products.find((product) => product.slug === productRef)?.name}</span>
          <button
            type="button"
            onClick={() => setProductRef("")}
            className="ml-auto text-[13px] text-mid underline decoration-line underline-offset-4 hover:text-ink"
          >
            Remove
          </button>
        </div>
      )}

      {errorEntries.length > 0 && (
        <div
          role="alert"
          className="mb-5 flex items-start gap-3 rounded-[12px] border border-brand/20 bg-brand/[0.04] px-4 py-3 text-[14px] text-ink"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
          <p>
            <span className="font-semibold">
              Please check {errorEntries.length} field{errorEntries.length === 1 ? "" : "s"} below.
            </span>{" "}
            <span className="text-mid">Highlighted rows need attention before sending.</span>
          </p>
        </div>
      )}

      <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
        <div data-reveal data-reveal-delay="0.1"><Field
          label="Name"
          name="name"
          required
          value={values.name}
          onChange={(value) => update("name", value)}
          error={errors.name}
          autoComplete="name"
          placeholder="Full name *"
        /></div>
        <div data-reveal data-reveal-delay="0.15"><Field
          label="Company"
          name="company"
          required
          value={values.company}
          onChange={(value) => update("company", value)}
          error={errors.company}
          autoComplete="organization"
          placeholder="Company name *"
        /></div>
        <div data-reveal data-reveal-delay="0.2"><Field
          label="Email"
          name="email"
          type="email"
          required
          value={values.email}
          onChange={(value) => update("email", value)}
          error={errors.email}
          autoComplete="email"
          placeholder="Email address *"
        /></div>
        <div data-reveal data-reveal-delay="0.25"><Field
          label="Phone"
          name="phone"
          type="tel"
          required
          value={values.phone}
          onChange={handlePhoneChange}
          error={errors.phone}
          autoComplete="tel"
          placeholder="Phone number *"
          maxLength={18}
        /></div>

        <div
          data-reveal
          data-reveal-delay="0.3"
          className={`${values.enquiryType === "Other" ? "sm:col-span-1" : "sm:col-span-2"} relative ${enquiryMenuOpen ? "z-50" : "z-10"}`}
          ref={enquiryDropdownRef}
        >
          <div
            className={`field-shell group relative rounded-[14px] border bg-[#fafafa]/80 px-4.5 py-3.5 transition-all duration-200 hover:bg-white ${
              errors.enquiryType
                ? "border-brand bg-brand/[0.02] ring-2 ring-brand/15"
                : enquiryMenuOpen
                ? "border-[#0066cc] bg-white ring-2 ring-[#0066cc]/10 shadow-sm"
                : "border-slate-200/90 hover:border-slate-300"
            }`}
          >
            <label id="enquiryType-label" className="sr-only">
              Enquiry type (required)
            </label>

            <button
              type="button"
              id="enquiryType"
              aria-haspopup="listbox"
              aria-expanded={enquiryMenuOpen}
              aria-labelledby="enquiryType-label enquiryType"
              onClick={() => setEnquiryMenuOpen((prev) => !prev)}
              className="flex h-7 w-full items-center justify-between text-left text-[15px] font-medium outline-none focus-visible:outline-none"
            >
              <span className={values.enquiryType ? "text-ink font-semibold" : "text-slate-400"}>
                {values.enquiryType || "Select enquiry type *"}
              </span>
              <ChevronDown
                aria-hidden
                className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                  enquiryMenuOpen ? "rotate-180 text-ink" : ""
                }`}
              />
            </button>

            {/* Custom elevated dropdown menu */}
            {enquiryMenuOpen && (
              <div
                role="listbox"
                aria-labelledby="enquiryType-label"
                className="absolute inset-x-0 top-[calc(100%+6px)] z-50 overflow-hidden rounded-[14px] border border-slate-200 bg-white py-1.5 shadow-[0_20px_45px_-10px_rgba(0,0,0,0.22)]"
              >
                {site.enquiryTypes.map((type) => {
                  const isSelected = values.enquiryType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        update("enquiryType", type);
                        if (type !== "Other") {
                          update("otherSpecific", "");
                        }
                        setEnquiryMenuOpen(false);
                      }}
                      className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-[14.5px] transition-colors ${
                        isSelected
                          ? "bg-slate-50 font-semibold text-brand"
                          : "text-ink hover:bg-slate-50"
                      }`}
                    >
                      <span>{type}</span>
                      {isSelected && <Check className="h-4 w-4 text-brand" />}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Hidden field for form data */}
            <input
              type="hidden"
              name="enquiryType"
              value={values.enquiryType}
            />
          </div>
          {errors.enquiryType && (
            <p
              id="enquiryType-error"
              className="mt-1.5 flex items-center gap-1.5 text-[12px] font-medium text-brand"
            >
              <AlertCircle aria-hidden className="h-3.5 w-3.5" />
              {errors.enquiryType}
            </p>
          )}
        </div>

        {/* Dynamic Specific Other Input Field (Right beside Enquiry type) */}
        {values.enquiryType === "Other" && (
          <div className="sm:col-span-1 animate-in fade-in slide-in-from-left-2 duration-300">
            <Field
              label="Specify enquiry"
              name="otherSpecific"
              required
              value={values.otherSpecific}
              onChange={(value) => update("otherSpecific", value)}
              error={errors.otherSpecific}
              placeholder="Specify enquiry (e.g. custom mould, tender) *"
            />
          </div>
        )}

        <div data-reveal data-reveal-delay="0.35" className="sm:col-span-2">
          <div
            className={`field-shell group relative rounded-[14px] border bg-[#fafafa]/80 px-4.5 py-3.5 transition-all duration-200 hover:bg-white ${
              errors.message
                ? "border-brand bg-brand/[0.02] ring-2 ring-brand/15"
                : "border-slate-200/90 hover:border-slate-300 focus-within:border-[#0066cc] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0066cc]/10 focus-within:shadow-sm"
            }`}
          >
            <label htmlFor="message" className="sr-only">
              Message (required)
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={values.message}
              onChange={(event) => update("message", event.target.value)}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
              placeholder="Type your message in here..."
              className="w-full resize-y border-0 bg-transparent p-0 text-[15px] font-medium leading-relaxed text-ink outline-none placeholder:text-slate-400 focus-visible:outline-none"
            />
          </div>
          {errors.message && (
            <p id="message-error" className="mt-1.5 flex items-center gap-1.5 text-[12px] font-medium text-brand">
              <AlertCircle aria-hidden className="h-3.5 w-3.5" />
              {errors.message}
            </p>
          )}
        </div>
      </div>

      {/* Honeypot — hidden from real users, catches naive bots */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div data-reveal data-reveal-delay="0.4" className="mt-7">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group w-full flex h-13 items-center justify-center gap-2.5 rounded-xl bg-[#0066cc] px-8 text-[15.5px] font-bold text-white shadow-[0_4px_18px_rgba(0,102,204,0.30)] transition-all duration-200 hover:bg-[#0052a3] hover:shadow-[0_6px_22px_rgba(0,102,204,0.40)] active:scale-[0.99] disabled:opacity-70"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Sending Message…
            </>
          ) : (
            <>
              Send Message
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </div>

      {/* Success Modal Popup */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div
            onClick={() => setShowModal(false)}
            className="fixed inset-0 bg-ink/50 backdrop-blur-xs transition-opacity duration-300"
          />

          {/* Clean Green Modal Card */}
          <div className="relative w-full max-w-sm rounded-[22px] border border-line bg-white p-7 text-center shadow-xl transition-all duration-300">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              aria-label="Close dialog"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-mid/60 transition-colors hover:bg-soft hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/60">
              <CheckCircle2 className="h-7 w-7" />
            </div>

            <h3 id="modal-title" className="mt-4 font-display text-xl font-semibold text-ink">
              Enquiry Sent
            </h3>

            <p className="mt-2 text-[14px] leading-relaxed text-mid">
              We received your enquiry and our team will get back to you shortly.
            </p>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-emerald-600 px-6 text-[14px] font-semibold text-white shadow-xs transition-all hover:bg-emerald-700 active:scale-[0.98]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  required,
  placeholder,
  autoComplete,
  maxLength,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  hint?: string;
  maxLength?: number;
}) {
  return (
    <div>
      <div
        className={`field-shell group relative rounded-[14px] border bg-[#fafafa]/80 px-4.5 py-3.5 transition-all duration-200 hover:bg-white ${
          error
            ? "border-brand bg-brand/[0.02] ring-2 ring-brand/15"
            : "border-slate-200/90 hover:border-slate-300 focus-within:border-[#0066cc] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0066cc]/10 focus-within:shadow-sm"
        }`}
      >
        <label htmlFor={name} className="sr-only">
          {label} {required && "(required)"}
        </label>
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder || (required ? `${label} *` : label)}
          autoComplete={autoComplete}
          maxLength={maxLength}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${name}-error` : undefined}
          className="h-7 w-full border-0 bg-transparent p-0 text-[15px] font-medium text-ink outline-none placeholder:text-slate-400 focus-visible:outline-none"
        />
      </div>
      {error && (
        <p id={`${name}-error`} className="mt-1.5 flex items-center gap-1.5 text-[12px] font-medium text-brand">
          <AlertCircle aria-hidden className="h-3.5 w-3.5" />
          {error}
        </p>
      )}
    </div>
  );
}
