"use client";

import { Suspense, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryCta } from "@/lib/application-status";
import { usePrimaryCtaHref } from "@/lib/use-primary-cta-href";

const navLinks = [
  { href: "/#mission", label: "Mission" },
  { href: "/#journey", label: "How It Works" },
  { href: "/#why-join", label: "Why Join" },
  { href: "/#eligibility", label: "Eligibility" },
  { href: "/#dates", label: "Dates" },
];

type HeaderPrimaryCtaButtonProps = {
  label: string;
  className: string;
};

function HeaderPrimaryCtaButton({
  label,
  className,
}: HeaderPrimaryCtaButtonProps) {
  const primaryCtaHref = usePrimaryCtaHref();
  return (
    <Button asChild size="lg" className={className}>
      <Link href={primaryCtaHref}>{label}</Link>
    </Button>
  );
}

function HeaderPrimaryCtaButtonFallback({
  label,
  className,
}: HeaderPrimaryCtaButtonProps) {
  return (
    <Button asChild size="lg" className={className}>
      <Link href={primaryCta.href}>{label}</Link>
    </Button>
  );
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    const hash = href.startsWith("/") ? href.substring(1) : href;

    if (pathname === "/") {
      e.preventDefault();
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-sm border-b border-border shadow-sm"
          : "bg-background/60 backdrop-blur-sm text-foreground"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <nav className="flex items-center justify-between h-14 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/atf-assets/atf-logo-vector.svg"
              alt="ATF Logo"
              width={10}
              height={10}
              className="h-8 w-auto md:h-10"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-base font-medium hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-4">
            <Suspense
              fallback={
                <HeaderPrimaryCtaButtonFallback
                  label={primaryCta.labels.header}
                  className="hidden sm:inline-flex"
                />
              }
            >
              <HeaderPrimaryCtaButton
                label={primaryCta.labels.header}
                className="hidden sm:inline-flex"
              />
            </Suspense>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border bg-background">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-2 py-1"
                >
                  {link.label}
                </a>
              ))}
              <Suspense
                fallback={
                  <HeaderPrimaryCtaButtonFallback
                    label={primaryCta.labels.mobileHeader}
                    className="mt-2"
                  />
                }
              >
                <HeaderPrimaryCtaButton
                  label={primaryCta.labels.mobileHeader}
                  className="mt-2"
                />
              </Suspense>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
