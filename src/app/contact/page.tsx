import type { Metadata } from "next";
import { Navigation } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactHero } from "@/components/contact/ContactHero";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact Us — Packaging Enquiries",
  description:
    "Contact ASIR Containers about plastic pails and industrial packaging: product enquiries, bulk and distributor orders, custom colours and technical specifications.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact ASIR Containers", url: `${site.url}/contact` },
};

/** Single-line address used for the map link. */
const mapQuery = encodeURIComponent(
  [site.contact.addressLines.join(", "), site.contact.country].filter(Boolean).join(", "),
);

export default function ContactPage() {
  const { contact } = site;
  const address =
    contact.addressLines.length > 0 ? contact.addressLines.join(", ") : null;

  return (
    <ContactHero>
      {/* Large Floating Card Popup Sitting Across the Background Image & White Section */}
      <div className="rounded-[28px] sm:rounded-[32px] border border-slate-200/80 bg-white shadow-[0_24px_70px_rgba(0,0,0,0.14)] p-6 sm:p-9 lg:p-11">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Right Column: Company Info Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 pt-2 lg:pt-0">
            <div className="space-y-5">
              {/* Card 1: Company Email/Phone */}
              <div className="rounded-2xl border border-slate-200/70 bg-slate-50/70 p-5 sm:p-6 transition-all hover:border-[#0066cc]/40 hover:bg-slate-50">
                <h3 className="font-display text-[16px] sm:text-[17px] font-bold text-slate-900">
                  Company Email/Phone
                </h3>
                <div className="mt-3.5 space-y-2 text-[14px]">
                  {contact.email && (
                    <a
                      href={`mailto:${contact.email}`}
                      className="block font-medium text-slate-600 hover:text-[#0066cc] transition-colors"
                    >
                      {contact.email}
                    </a>
                  )}
                  {contact.phone && (
                    <a
                      href={`tel:${contact.phone.replace(/\s/g, "")}`}
                      className="block font-medium text-slate-600 hover:text-[#0066cc] transition-colors"
                    >
                      {contact.phone}
                    </a>
                  )}
                  <a
                    href="tel:+919444157777"
                    className="block font-medium text-slate-600 hover:text-[#0066cc] transition-colors"
                  >
                    +91 94441 57777
                  </a>
                </div>
              </div>

              {/* Card 2: Company Address */}
              <div className="rounded-2xl border border-slate-200/70 bg-slate-50/70 p-5 sm:p-6 transition-all hover:border-[#0066cc]/40 hover:bg-slate-50">
                <h3 className="font-display text-[16px] sm:text-[17px] font-bold text-slate-900">
                  Company Address
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-slate-600 font-medium">
                  {address}
                </p>
                <a
                  href={contact.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3.5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0066cc] hover:text-[#0052a3] transition-colors"
                >
                  View on Google Maps <Navigation className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Bottom line: Opening Hours */}
            <div className="pt-4 border-t border-slate-100">
              <p className="text-[13.5px] font-medium text-slate-500">
                Opening Hours:{" "}
                <span className="font-bold text-[#0066cc]">8AM - 5PM Everyday</span> (Mon – Sat)
              </p>
            </div>
          </div>
        </div>
      </div>
    </ContactHero>
  );
}
