import React from "react";
import { Star } from "lucide-react";

const MESSAGES = [
  " 🇰🇪 Empowering youth through business grants",
  " 🇰🇪 Supporting entrepreneurs in all 47 counties",
  " 🇰🇪 Apply today and grow with NYOTA funds Phase II",
];

function Separator() {
  return <h1 className="font-bold mx-3"> ● </h1>;
}

function MarqueeContent() {
  return (
    <>
      {MESSAGES.map((msg, i) => (
        <React.Fragment key={i}>
          <span>{msg}</span>
          <Separator />
        </React.Fragment>
      ))}
    </>
  );
}

function Topbar() {
  return (
    <div className="h-8 overflow-hidden bg-green-700">
      <div className="flex h-full w-max items-center whitespace-nowrap animate-[marquee_28s_linear_infinite] text-xs font-medium tracking-wide text-white">
        {/* Duplicated once for seamless looping */}
        <MarqueeContent />
        <MarqueeContent />
      </div>
    </div>
  );
}

export default Topbar;
