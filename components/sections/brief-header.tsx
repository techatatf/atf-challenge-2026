"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function BriefHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-border bg-background/95 shadow-sm backdrop-blur-sm"
          : "bg-background/60 text-foreground backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
        <nav className="flex h-14 items-center justify-between md:h-20">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/atf-assets/atf-logo-vector.svg"
              alt="ATF Logo"
              width={10}
              height={10}
              className="h-8 w-auto md:h-10"
            />
          </Link>

          <Button asChild size="lg">
            <Link href="/subscribe">Get Updates</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
