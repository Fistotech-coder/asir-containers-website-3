import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Right Column: Company Info & Map */}
          <div className="lg:col-span-5 flex flex-col h-full">
            {/* Card: Contact Details (Phone, Email, Address with Icons) */}
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-5 sm:p-6 transition-all hover:border-[#0066cc]/40 hover:bg-slate-50 shadow-xs shrink-0">
              <h3 className="font-display text-[16px] sm:text-[17px] font-bold text-slate-900 mb-4">
                Company Information
              </h3>
              
              <div className="space-y-3.5">
                {/* 1. Phone Number */}
                <div className="flex items-center gap-3">
                  <Phone className="h-4.5 w-4.5 text-[#0066cc] shrink-0" />
                  <a
                    href={`tel:${(contact.phone || "+919876543210").replace(/\s/g, "")}`}
                    className="font-medium text-[14px] sm:text-[14.5px] text-slate-800 hover:text-[#0066cc] transition-colors"
                  >
                    {contact.phone || "+91 98765 43210"}
                  </a>
                </div>

                {/* 2. Email */}
                {contact.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-4.5 w-4.5 text-[#0066cc] shrink-0" />
                    <a
                      href={`mailto:${contact.email}`}
                      className="font-medium text-[14px] sm:text-[14.5px] text-slate-800 hover:text-[#0066cc] transition-colors break-all"
                    >
                      {contact.email}
                    </a>
                  </div>
                )}

                {/* 3. Address */}
                <div className="flex items-start gap-3">
                  <MapPin className="h-4.5 w-4.5 text-[#0066cc] shrink-0 mt-0.5" />
                  <p className="text-[13.5px] sm:text-[14px] leading-relaxed text-slate-700 font-medium">
                    1734-c1, Pallapatti Rd, near Central Excise Office,<br />
                    Thiruthangal, Sivakasi, Tamil Nadu 626130
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Google Map Embed - stretches on desktop to match Submit Button baseline */}
            {contact.mapEmbedUrl && (
              <div className="mt-5 h-[220px] lg:h-auto lg:flex-1 flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100 shadow-xs">
                <iframe
                  src={contact.mapEmbedUrl}
                  title="ASIR Containers Location Map"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full flex-1 block"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </ContactHero>
  );
}
