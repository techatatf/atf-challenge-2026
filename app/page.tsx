import {
  Header,
  Hero,
  Mission,
  Journey,
  WhyJoin,
  Eligibility,
  KeyDates,
  Footer,
} from "@/components/sections";
import { BriefInterestPopup } from "@/components/brief-interest-popup";

export default function Page() {
  return (
    <>
      <BriefInterestPopup />
      <Header />
      <main>
        <Hero />
        <Mission />
        <Journey />
        <WhyJoin />
        <Eligibility />
        <KeyDates />
        <Footer />
      </main>
    </>
  );
}
