"use client";

import { Button } from "@/components/ui/button";
import {
  Facebook01Icon,
  InstagramIcon,
  Linkedin01Icon,
  NewTwitterIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import { useApplyHref } from "@/lib/use-apply-href";

const footerLinks = [
  { href: "/faq", label: "FAQs" },
  { href: "/partner", label: "Partner with Us" },
  { href: "/contact", label: "Contact Support" },
  { href: "/privacy", label: "Privacy Policy" },
];

const socialLinks = [
  {
    href: "https://www.linkedin.com/company/africantechnologyforum/",
    label: "LinkedIn",
    icon: Linkedin01Icon,
  },
  {
    href: "https://x.com/AfTechForum",
    label: "X",
    icon: NewTwitterIcon,
  },
  {
    href: "https://www.instagram.com/africantech",
    label: "Instagram",
    icon: InstagramIcon,
  },
  {
    href: "https://www.facebook.com/africantechnologyforum/",
    label: "Facebook",
    icon: Facebook01Icon,
  },
];

export function Footer() {
  const applyHref = useApplyHref();
  return (
    <footer
      id="footer"
      className="py-16 px-4 md:py-24 md:px-8 lg:px-16 bg-foreground text-background"
    >
      <div className="max-w-4xl mx-auto">
        {/* Final CTA Section */}
        <div id="apply" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Build the Future?
          </h2>
          <p className="text-lg md:text-xl text-background/80 max-w-2xl mx-auto mb-8">
            The next unicorn startup could be yours. The next breakthrough in
            African healthcare could be your code. It starts here.
          </p>
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto max-w-full whitespace-normal text-center text-base px-8 py-6 bg-background text-foreground hover:bg-background/90 hover:text-background"
          >
            <a href={applyHref}>Apply Now - Registration Closes March 31</a>
          </Button>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-12 border-t border-background/20 pt-12">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-background/70 hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-background/70 hover:text-primary transition-colors"
            >
              <HugeiconsIcon icon={link.icon} strokeWidth={1.8} className="size-6" />
            </a>
          ))}
        </div>

        {/* Powered by */}
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/atf-assets/atf-logo-vector.svg"
            alt="ATF Logo"
            width={48}
            height={48}
            className="h-14 w-auto invert= bg-white rounded-lg p-1"
          />
          <p className="text-sm text-background/60">
            Powered by{" "}
            <a
              href="https://africantechnologyforum.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors underline"
            >
              African Technology Forum
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
