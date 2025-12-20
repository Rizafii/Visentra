"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const tabs = [
  { id: "insight", label: "Insight" },
  { id: "pricing", label: "Pricing" },
  { id: "quality", label: "Quality" },
];
export default function Feature() {
  const [activeTab, setActiveTab] = useState("insight");
  return (
    <section className="w-full">
      <div className="container mx-auto px-24 py-16">
        <div className="left flex flex-col items-start gap-6">
          <h2 className="text-5xl font-bold leading-15">
            Brand<span className="text-primary">Force</span> <br />
            Feature
          </h2>
          <p className="max-w-120 font-medium text-lg leading-7 text-muted-foreground">
            Coba fitur BrandForce dan mulai bangun brand-mu dengan cara yang
            simpel.
          </p>
          <div className="flex items-center gap-3">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "outline"}
                onClick={() => setActiveTab(tab.id)}
                className="rounded-full"
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
