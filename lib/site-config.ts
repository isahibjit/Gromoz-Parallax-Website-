/** Unverified business details stay unset until supplied by the owner. */
export const siteConfig = {
  legalEntity: null,
  businessAddress: null,
  contactEmail: null,
  contactPhone: null,
  signInUrl: null,
  demoSubmissionEndpoint: null,
  formsMode: "preview",
  legalStatus: "draft",
  legalPreparedDate: "15 October 2026",
} as const;
