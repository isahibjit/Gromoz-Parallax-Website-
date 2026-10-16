import { siteConfig } from "./site-config";

export type LegalKind = "privacy" | "terms" | "cookies";
interface LegalSection {
  readonly title: string;
  readonly paragraphs: readonly string[];
  readonly links?: readonly { readonly label: string; readonly href: string }[];
}
interface LegalDocument {
  readonly title: string;
  readonly intro: string;
  readonly sections: readonly LegalSection[];
}

const contact = {
  title: "Contact and privacy requests",
  paragraphs: [
    `For questions, privacy requests or grievances concerning this website, contact ${siteConfig.legalEntity} at ${siteConfig.contactEmail}. Our business correspondence address is ${siteConfig.businessAddress}. Please identify Gromoze in your message so we can direct your request correctly.`,
    "Include enough information to explain your request, but do not email passwords, financial credentials or identity documents unless we specifically request an appropriate verification step. We may ask for information reasonably needed to verify your identity or authority before disclosing or changing personal information.",
  ],
  links: [{ label: `Email ${siteConfig.contactEmail}`, href: `mailto:${siteConfig.contactEmail}` }],
} satisfies LegalSection;

/** Website policies describe this checkout's implemented behavior, not an unconfigured CRM subscription. */
export const legalDocuments: Readonly<Record<LegalKind, LegalDocument>> = {
  privacy: {
    title: "Privacy policy",
    intro: `This policy explains how ${siteConfig.legalEntity} ("we", "us" or "our") handles information when you visit the Gromoze website, try its interactive examples or contact us about Gromoze.`,
    sections: [
      {
        title: "Who we are and what this policy covers",
        paragraphs: [
          `Gromoze is operated by ${siteConfig.legalEntity}, based at ${siteConfig.businessAddress}. We are responsible for the website practices described in this policy.`,
          "This policy covers the public website and correspondence about it. It does not replace an organisation's privacy notice or the agreement governing a separately supplied CRM service. The website's people, appointments, properties and sales records are fictional examples; trying them does not create an account or access a customer's CRM records.",
        ],
      },
      {
        title: "Information involved in your visit",
        paragraphs: [
          "Your browser sends technical information needed to request and display pages, including an IP address, requested resource, browser information and request time. Website hosting and network providers receive this information to deliver the website and may maintain operational or security logs under their service arrangements.",
          "If you email us, we receive your email address and the name, message, attachments and other details you choose to send. Our email provider also processes the message to deliver that correspondence. Please share only information relevant to your enquiry and information you have permission to disclose.",
        ],
      },
      {
        title: "Demo and enquiry forms",
        paragraphs: [
          "The current demo, contact and pricing forms validate entries locally in your browser. They do not transmit entries to us, save them to a Gromoze server or book a meeting. Form entries are not written to the website's local or session storage. Your own browser may separately offer autofill or remember form values according to its settings.",
          "A completed form preview is not a submitted enquiry. To send an enquiry, use the email contact below. We will update this policy and the form notice before enabling online form delivery or introducing a different use of form information.",
        ],
      },
      {
        title: "How information is used",
        paragraphs: [
          "Website requests are used to deliver pages and assets. Browser preferences are used to respect your motion choice and restore your position in the product story. Operational information may be used to maintain availability, diagnose failures, prevent misuse and protect the website.",
          "Information you send directly is used to answer your questions, discuss the requirements you raise, manage that correspondence and meet applicable legal obligations or address a dispute. Trying the website's sample controls does not subscribe you to marketing messages. Where a use requires consent, that consent must relate to the particular use; visiting this page is not blanket consent to unrelated processing.",
        ],
      },
      {
        title: "Browser storage and tracking",
        paragraphs: [
          "The gromoze-motion entry in local storage remembers whether you prefer reduced motion or your system setting. It remains in your browser until you change the setting or clear the site's storage. The gromoze-story-position entry in session storage contains the page URL, viewport dimensions and scroll position to restore a reload. It follows your browser's session lifecycle and may be restored if your browser restores a tab.",
          "These entries do not contain form contents or CRM records. This website's code does not set advertising or analytics cookies or include analytics or advertising pixels. Browser storage is distinct from cookies; changing cookie settings alone may not clear it. See the cookie and browser-storage notice for controls and details.",
        ],
        links: [{ label: "Cookie and browser-storage notice", href: "/cookie-policy/" }],
      },
      {
        title: "Google Fonts and other providers",
        paragraphs: [
          "The website requests Inter and Manrope fonts from fonts.googleapis.com and fonts.gstatic.com. Your browser connects directly to Google for these resources, which gives Google the connection information needed to serve them, including your IP address and request headers. Font delivery is separate from the local demo form.",
          "Hosting, network and email providers process information needed to deliver their respective services. Their infrastructure may be located outside your country, including outside India. This website does not promise that all technical processing remains in India. Third-party websites you choose to visit have their own privacy practices.",
        ],
        links: [
          { label: "Google Fonts privacy information", href: "https://fonts.googleblog.com/2022/11/your-privacy-and-google-fonts.html" },
          { label: "Google Privacy Policy", href: "https://policies.google.com/privacy" },
        ],
      },
      {
        title: "Disclosure of information",
        paragraphs: [
          "We do not sell personal information collected through this website or use it for third-party targeted advertising. Information sent to us may be accessed by people and service providers who need it to handle the enquiry, operate relevant systems or provide professional advice.",
          "Information may also be disclosed where required by law, a valid legal process, or as reasonably necessary to investigate misuse, protect rights or address a security incident. In a business transfer, information relating to Gromoze may be transferred with the relevant business, subject to applicable obligations and notice where required.",
        ],
      },
      {
        title: "Retention and deletion",
        paragraphs: [
          "The website does not retain demo-form entries on a server. You control browser-stored preferences and story position through your browser settings. The motion preference has no automatic expiry set by the website; session storage follows the browser's session lifecycle.",
          "Correspondence and any operational records available to us are retained for the purpose for which they are needed, including responding to an enquiry, maintaining security, meeting legal obligations and resolving disputes. Retention depends on the record and purpose rather than one period for every category. You may request deletion of information we hold; legal obligations, a dispute or another lawful reason may require us to retain particular records. External providers' own records are also subject to their policies.",
        ],
      },
      {
        title: "Security and information you should not send",
        paragraphs: [
          "The demo form limits collection by keeping entries in the browser. Direct correspondence is handled through our business email channel. No internet transmission, website or storage system can be guaranteed completely secure.",
          "Do not enter or email passwords, government identification numbers, payment credentials, sensitive personal records or confidential customer data through a general enquiry. If confidential information is needed for a business discussion, contact us first to agree an appropriate channel.",
        ],
      },
      {
        title: "Your choices, requests and grievances",
        paragraphs: [
          "You can change the motion preference in the footer and clear stored website data in your browser. You may contact us to ask about information we hold about you, request access, correction or deletion, withdraw consent for a use based on consent, or raise a privacy grievance. Rights, exceptions and response requirements depend on the law applicable to the request.",
          "We will assess your request under applicable law, explain any information needed to handle it, and explain a refusal or limitation where permitted or required. Withdrawing consent does not undo earlier lawful processing. You may also approach a competent authority where applicable law provides that right. The website form does not deliver privacy requests; use the email below.",
        ],
      },
      {
        title: "Children",
        paragraphs: ["Gromoze's website is intended for adults evaluating business software. It is not directed at children, and the website does not provide a child account or knowingly solicit children's personal information. If you believe a child has sent us personal information, contact us so we can investigate and take appropriate action."],
      },
      {
        title: "Changes to this policy",
        paragraphs: ["We will publish updates on this page with a revised date when website practices or applicable requirements change. Material changes will be communicated by an additional notice where required. An update does not itself authorise an incompatible use of information already collected or replace consent where consent is required."],
      },
      contact,
    ],
  },
  terms: {
    title: "Terms of service",
    intro: `These terms govern use of the Gromoze website, operated by ${siteConfig.legalEntity}. They apply to the website's pages, content and interactive demonstrations.`,
    sections: [
      {
        title: "Operator and scope",
        paragraphs: [
          `${siteConfig.legalEntity} operates Gromoze from ${siteConfig.businessAddress}. References to "we", "us" and "our" mean that company.`,
          "These are website terms. A separately agreed order, subscription agreement, service agreement or data-processing agreement governs any contracted CRM service. Website use alone does not create a subscription, customer account, payment obligation, agency or partnership.",
        ],
      },
      {
        title: "Using the website",
        paragraphs: ["Use the website lawfully and respect these terms. If you contact us for an organisation, you must have authority to provide its information and discuss its requirements. You must be legally capable of entering an agreement before entering any paid engagement. If you do not agree to these website terms, stop using the website."],
      },
      {
        title: "Demonstrations and product information",
        paragraphs: [
          "Interactive people, properties, visits, activities and tasks are illustrative examples. Changes made in a demonstration stay local to the page and do not update a real account, allocate a property, arrange a visit or complete a business task.",
          "Product illustrations, proposed features and workflow examples explain the concept and are not a promise that a feature is available in every service or plan. Property models and sample floor plans are not property listings, approved architectural plans or representations of availability or ownership. Confirm scope, availability and suitability with us before relying on a capability for a purchase decision.",
        ],
      },
      {
        title: "Enquiries, bookings and paid services",
        paragraphs: [
          "The current website forms validate details in your browser without sending an enquiry or booking a meeting. A preview-complete message is not confirmation of delivery or an appointment. Email us to send an enquiry; a meeting is arranged only when separately confirmed.",
          "The website does not process payments or activate subscriptions. Fees, taxes, renewal, cancellation, refunds, support, service levels and customer-data processing for a paid service must be set out in the applicable agreement. A product discussion or website demonstration does not replace that agreement.",
        ],
      },
      {
        title: "Acceptable use",
        paragraphs: [
          "Do not use the website for fraud, impersonation, unlawful content or infringement of another person's rights. Do not introduce malicious code, disrupt availability, bypass access controls, attempt unauthorised access, or run security testing without written authorisation.",
          "Do not harvest personal information, send spam, or use automated access that interferes with the website. Do not misuse Gromoze's or Solverix's identity to suggest an endorsement or relationship that does not exist. These restrictions do not remove activities or rights that applicable law expressly permits.",
        ],
      },
      {
        title: "Intellectual property and permitted use",
        paragraphs: [
          "Website content, branding, illustrations, models, design and software are owned by or licensed to their respective rights holders. You may view and use the website to evaluate Gromoze for legitimate personal or business purposes. This permission does not transfer ownership of the website or its content.",
          "You may not republish, sell or commercially exploit our protected content without permission, except as permitted by law. Third-party and open-source components remain governed by their applicable licences; these terms do not restrict rights granted by those licences.",
        ],
      },
      {
        title: "Information you provide",
        paragraphs: [
          "Provide accurate information you are entitled to share. You retain ownership of materials you send us and permit their use only as reasonably necessary to respond to your request, evaluate requirements or carry out a separately agreed engagement, subject to applicable law and any confidentiality agreement.",
          "Do not send another person's information without appropriate authority, or disclose credentials, sensitive personal information or confidential customer records through a general enquiry. Agree a suitable confidential channel with us where one is needed.",
        ],
      },
      {
        title: "Privacy and third parties",
        paragraphs: [
          "Our privacy policy describes this website's information practices, local browser storage and external font requests. Reading or using the website does not give blanket consent to unrelated processing.",
          "External resources and linked websites are operated by their providers and may have separate terms and privacy policies. A link does not itself constitute our endorsement. We do not control another provider's content or availability; nothing here excludes responsibility that applicable law places on us.",
        ],
        links: [{ label: "Read the privacy policy", href: "/privacy-policy/" }],
      },
      {
        title: "Availability, changes and access restrictions",
        paragraphs: ["We may change or withdraw website content and features, or restrict access for maintenance, security, operational needs or a reasonable belief of misuse. We do not guarantee continuous, uninterrupted or error-free access. An operational website change does not by itself amend a separately contracted service or remove rights under that agreement."],
      },
      {
        title: "Disclaimers and limits of liability",
        paragraphs: [
          "To the extent permitted by applicable law, this informational website and its demonstrations are provided as available, without a guarantee of completeness, uninterrupted operation or fitness for a particular business purpose. Website material is not a substitute for professional advice or for assessing a contracted service against your requirements.",
          "To the extent permitted by law, we are not liable for indirect or consequential loss arising solely from use of, or inability to use, this free informational website. Nothing in these terms excludes or limits liability for fraud, wilful misconduct or any liability, consumer right or remedy that cannot lawfully be excluded or limited. Liability for a paid service is governed by its applicable agreement and mandatory law.",
        ],
      },
      {
        title: "Applicable law and disputes",
        paragraphs: ["These website terms are governed by the laws of India. Please first contact us in writing about a dispute so the parties have an opportunity to resolve it. Subject to mandatory consumer protections and other non-excludable rights, disputes concerning these website terms fall within the jurisdiction of competent courts in Mumbai, Maharashtra, India. This does not prevent access to an authority or forum that applicable law makes available to you."],
      },
      {
        title: "Updates and general provisions",
        paragraphs: [
          "Revised terms will be published on this page with an updated date and apply to subsequent website use, subject to any notice or consent required by law. They do not retrospectively remove accrued rights or override a separately agreed contract.",
          "If a provision is unenforceable, the remaining provisions continue to the extent permitted by law. A failure to enforce a provision on one occasion is not a waiver of it. Provisions concerning intellectual property, liability and disputes continue where their nature requires it after website use ends.",
        ],
      },
      { ...contact, title: "Contact us" },
    ],
  },
  cookies: {
    title: "Cookie and browser-storage notice",
    intro: "This notice explains the storage and external resources used by the Gromoze website. It should be read with our privacy policy.",
    sections: [
      {
        title: "Storage used by this website",
        paragraphs: [
          "The website uses local storage for gromoze-motion, containing your motion preference. It persists until changed or cleared. Session storage holds gromoze-story-position: the page URL, viewport dimensions and scroll position used for story restoration. It follows your browser's session lifecycle, including any tab-restoration behavior.",
          "Neither entry contains form contents, account credentials or customer CRM records. Sample explorer and task changes stay in page memory and reset on reload.",
        ],
      },
      {
        title: "Cookies, analytics and external fonts",
        paragraphs: [
          "This website's code does not set advertising or analytics cookies or embed advertising pixels or analytics scripts. Storage used for motion and scroll restoration is browser storage rather than a cookie.",
          "Inter and Manrope fonts load directly from Google Fonts. Those requests disclose connection information, including your IP address and request headers, to Google. The absence of advertising cookies does not mean that no external network requests occur. The privacy policy describes external providers and the information needed to deliver the website.",
        ],
        links: [{ label: "Read the privacy policy", href: "/privacy-policy/" }],
      },
      {
        title: "Your controls",
        paragraphs: ["Use the motion control in the footer to change your preference. Clear this site's local and session storage through your browser to remove saved choices and story position; the next visit will use defaults. Your browser may also offer controls for font requests and external resources. Blocking resources can affect appearance, and clearing cookies alone may leave local storage intact."],
      },
      contact,
    ],
  },
};
