"use client";

import { useEffect, useState } from "react";
import { CTA } from "./ui";
import { siteConfig } from "@/lib/site-config";
import styles from "./pricing-page.module.css";

interface PublicPlan {
  name: string;
  description: string;
  model: string;
  currency: string;
  monthlyPricePerSeat: number | null;
  annualPricePerSeat: number | null;
  setupFee: number | null;
}

type PricingState = { status: "loading" | "unavailable" } | { status: "loaded"; plans: PublicPlan[] };

function isPublicPlan(value: unknown): value is PublicPlan {
  if (!value || typeof value !== "object") return false;
  const plan = value as Record<string, unknown>;
  const validAmount = (amount: unknown) => amount === null || (typeof amount === "number" && Number.isFinite(amount) && amount >= 0);
  return typeof plan.name === "string" && typeof plan.description === "string" &&
    typeof plan.model === "string" && typeof plan.currency === "string" &&
    validAmount(plan.monthlyPricePerSeat) && validAmount(plan.annualPricePerSeat) && validAmount(plan.setupFee);
}

function amount(value: number, currency: string): string {
  try {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency, maximumFractionDigits: 2 }).format(value);
  } catch {
    return `${currency} ${value.toLocaleString("en-IN")}`;
  }
}

export function PricingPage() {
  const [state, setState] = useState<PricingState>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();
    fetch("https://crm.gromoze.com/api/organizations/public-plans", {
      signal: controller.signal,
      cache: "no-store",
      credentials: "omit",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Pricing unavailable");
        return response.json() as Promise<unknown>;
      })
      .then((data) => {
        if (!Array.isArray(data) || !data.every(isPublicPlan)) throw new Error("Invalid pricing response");
        setState({ status: "loaded", plans: data });
      })
      .catch(() => {
        if (!controller.signal.aborted) setState({ status: "unavailable" });
      });
    return () => controller.abort();
  }, []);

  return (
    <section className={`container interior ${styles.pricing}`} aria-labelledby="pricing-heading">
      <div className={styles.intro}>
        <span className="eyebrow">Plans and pricing</span>
        <h1 id="pricing-heading">A workspace for your team.</h1>
        <p>Explore the current Gromoze plans and choose the setup that fits your sales operation.</p>
      </div>
      <noscript><p>Enable JavaScript to view current plans, or email <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.</p></noscript>
      {state.status === "loading" && <p role="status">Loading current plans?</p>}
      {state.status === "unavailable" && <p role="status">Pricing is temporarily unavailable. Please email <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a> for current plans.</p>}
      {state.status === "loaded" && state.plans.length === 0 && <p role="status">There are no plans available to display right now. Please email <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a> for pricing.</p>}
      {state.status === "loaded" && state.plans.length > 0 && (
        <div className={styles.grid}>
          {state.plans.map((plan, index) => {
            const perUser = plan.model.toLowerCase() === "per user";
            return <article className={styles.card} key={`${plan.name}-${index}`}>
              <h2>{plan.name}</h2>
              {plan.description && <p>{plan.description}</p>}
              {perUser ? <div className={styles.rates}>
                {plan.monthlyPricePerSeat !== null && <p><strong>{amount(plan.monthlyPricePerSeat, plan.currency)}</strong><span> per user / month, monthly plan rate</span></p>}
                {plan.annualPricePerSeat !== null && <p><strong>{amount(plan.annualPricePerSeat, plan.currency)}</strong><span> per user / month, annual plan rate</span></p>}
                {plan.monthlyPricePerSeat === null && plan.annualPricePerSeat === null && <p>Contact us for pricing.</p>}
              </div> : <div className={styles.rates}><strong>Contact us for pricing</strong><p>{plan.model}</p></div>}
              {perUser && plan.setupFee !== null && <p className={styles.setup}>One-time setup fee: {amount(plan.setupFee, plan.currency)}</p>}
              <CTA href={`mailto:${siteConfig.contactEmail}`}>Contact sales</CTA>
            </article>;
          })}
        </div>
      )}
      <p className={styles.note}>These are configured plan rates. Contact sales to confirm the final price, billing arrangements and applicable terms.</p>
    </section>
  );
}
