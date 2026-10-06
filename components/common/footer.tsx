import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const quickLinks = [
  { title: "Home", href: "/" },
  { title: "About Us", href: "/#about" },
  { title: "Services", href: "/#services" },
  { title: "FAQ", href: "/faq" },
  { title: "Contact", href: "/#contact" },
];

const services = [
  { title: "Site Preparation", href: "/services-details/1" },
  { title: "Residential Construction", href: "/services-details/2" },
  { title: "Commercial Construction", href: "/services-details/3" },
  { title: "Steel Fabrication", href: "/services-details/4" },
];

const facebookUrl = "https://www.facebook.com/profile.php?id=61592705168142";
const contactEmail = "shawn@a7candc.com";
const contactPhone = "(214) 578-6729";
const contactPhoneHref = "+12145786729";

const socialLinks = [
  {
    label: "Facebook",
    href: facebookUrl,
    icon: FaFacebookF,
  },
  { label: "LinkedIn", href: "/", icon: FaLinkedinIn },
  { label: "Instagram", href: "/", icon: FaInstagram },
];

export default function Footer() {
  return (
    &lt;footer id="contact" className="bg-[#F8F1E6] text-[#1F1F1F]"&gt;
      &lt;div className="container mx-auto px-5 sm:px-8 lg:px-10"&gt;

        {/* CTA */}

        &lt;div
          id="appointment"
          className="flex flex-col items-start justify-between gap-6 border-b border-[#E6D7BF] py-10 sm:py-14 md:py-16 lg:flex-row lg:items-center lg:py-20"
        &gt;
          &lt;div&gt;
            &lt;h2 className="max-w-3xl text-[32px] font-normal leading-[1.12] sm:text-[42px] md:text-5xl lg:text-[56px]"&gt;
              Ready to Start Your
              &lt;br /&gt;
              &lt;span className="font-heading font-medium italic"&gt;
                Construction Project?
              &lt;/span&gt;
            &lt;/h2&gt;
          &lt;/div&gt;

          &lt;Link
            href="/request-quote"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#C88719] px-6 text-sm font-medium text-white transition hover:bg-[#B47714] sm:h-14 sm:px-10 sm:text-base"
          &gt;
            Request a Free Quote
            &lt;ArrowRight className="h-4 w-4" /&gt;
          &lt;/Link&gt;
        &lt;/div&gt;

        {/* Footer */}

        &lt;div className="grid gap-9 py-10 sm:grid-cols-2 md:py-14 lg:grid-cols-[1.2fr_0.55fr_0.85fr_0.85fr] lg:gap-16"&gt;

          {/* Company */}

          &lt;div&gt;
            &lt;Image
              src="/blacklogo.png"
              alt="Logo"
              width={1000}
              height={1000}
              className="h-10 w-[100px] object-contain sm:h-[100px]"
            /&gt;

            &lt;p className="mt-4 max-w-[390px] text-sm leading-7 text-neutral-600 sm:mt-5 sm:text-base sm:leading-8 lg:text-lg"&gt;
              A7 Property Solutions is a full-service construction
              company specializing in residential construction,
              commercial projects, site preparation,
              foundations, welding, and fabrication.
            &lt;/p&gt;

            &lt;div className="mt-6 flex gap-3 sm:mt-7 sm:gap-4"&gt;
              {socialLinks.map((item) =&gt; {
                const Icon = item.icon;

                return (
                  &lt;Link
                    href={item.href}
                    key={item.label}
                    aria-label={item.label}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EED9B7] text-[#C88719] transition hover:bg-[#C88719] hover:text-white sm:h-10 sm:w-10"
                  &gt;
                    &lt;Icon className="h-4 w-4" /&gt;
                  &lt;/Link&gt;
                );
              })}
            &lt;/div&gt;
          &lt;/div&gt;

          {/* Quick Links */}

          &lt;div&gt;
            &lt;h3 className="mb-4 text-lg font-semibold sm:mb-6 sm:text-xl"&gt;
              Quick Links
            &lt;/h3&gt;

            &lt;ul className="space-y-3 sm:space-y-4"&gt;
              {quickLinks.map((item) =&gt; (
                &lt;li key={item.title}&gt;
                  &lt;Link
                    href={item.href}
                    className="text-base text-neutral-600 transition hover:text-[#C88719] sm:text-lg"
                  &gt;
                    {item.title}
                  &lt;/Link&gt;
                &lt;/li&gt;
              ))}
            &lt;/ul&gt;
          &lt;/div&gt;

          {/* Services */}

          &lt;div&gt;
            &lt;h3 className="mb-4 text-lg font-semibold sm:mb-6 sm:text-xl"&gt;
              Our Services
            &lt;/h3&gt;

            &lt;ul className="space-y-3 sm:space-y-4"&gt;
              {services.map((item) =&gt; (
                &lt;li key={item.title}&gt;
                  &lt;Link
                    href={item.href}
                    className="text-base text-neutral-600 transition hover:text-[#C88719] sm:text-lg"
                  &gt;
                    {item.title}
                  &lt;/Link&gt;
                &lt;/li&gt;
              ))}
            &lt;/ul&gt;
          &lt;/div&gt;

          {/* Contact */}

          &lt;div&gt;
            &lt;h3 className="mb-4 text-lg font-semibold sm:mb-6 sm:text-xl"&gt;
              Contact
            &lt;/h3&gt;

            &lt;ul className="space-y-3 text-base text-neutral-600 sm:space-y-4 sm:text-lg"&gt;
              &lt;li&gt;
                &lt;Link
                  href={`tel:${contactPhoneHref}`}
                  className="transition hover:text-[#C88719]"
                &gt;
                  {contactPhone}
                &lt;/Link&gt;
              &lt;/li&gt;
              &lt;li&gt;
                &lt;Link
                  href={`mailto:${contactEmail}`}
                  className="transition hover:text-[#C88719]"
                &gt;
                  {contactEmail}
                &lt;/Link&gt;
              &lt;/li&gt;
              &lt;li&gt;
               1020 Hwy 377 N Ste B #2151
                &lt;br /&gt;
               Whitesboro, Texas 76273
              &lt;/li&gt;
            &lt;/ul&gt;
          &lt;/div&gt;
        &lt;/div&gt;

        {/* Bottom */}

        &lt;div className="flex flex-col items-center justify-between gap-4 border-t border-[#E6D7BF] py-5 text-center text-xs text-neutral-500 sm:text-sm md:flex-row md:text-left"&gt;
          &lt;p&gt;
            © {new Date().getFullYear()} A7 Property Solutions. All rights reserved.
          &lt;/p&gt;

          {/* &lt;div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"&gt;
            &lt;Link href="/"&gt;Privacy Policy&lt;/Link&gt;
            &lt;span aria-hidden="true"&gt;•&lt;/span&gt;
            &lt;Link href="/"&gt;Terms &amp; Conditions&lt;/Link&gt;
          &lt;/div&gt; */}
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/footer&gt;
  );
                 }
