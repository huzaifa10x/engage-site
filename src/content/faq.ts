export type Faq = { q: string; a: string };

export const homeFaq: Faq[] = [
    {
        q: 'Do you add a markup on WhatsApp messages?',
        a: "No. You pay Meta's published rates for WhatsApp messages directly, and we never add a margin on top. Your plan fee is for the software.",
    },
    {
        q: 'Can I keep using the WhatsApp Business app on my phone?',
        a: 'Yes. With coexistence you keep chatting from the WhatsApp Business app while your team works in Engage on the same number, and your recent chat history is imported.',
    },
    {
        q: 'Is there a free trial?',
        a: 'Yes. You can start a free trial yourself in a few minutes, with no card required. Agencies usually prefer a short demo so we can set up multi-client access together.',
    },
    {
        q: "Is it compliant with WhatsApp's rules?",
        a: "Opt-in capture, approved templates and opt-out handling are built in, so your sending stays within Meta's policies.",
    },
];

export const pricingFaq: Faq[] = [
    {
        q: 'What about WhatsApp message costs?',
        a: 'Meta charges for WhatsApp messages at its published rates. Those are passed through with no markup; your plan fee is separate.',
    },
    {
        q: 'Can I change plans at any time?',
        a: 'Yes. Upgrade or downgrade whenever you like. Changes are prorated to your billing cycle, and you see the exact amount before you confirm.',
    },
    {
        q: 'Do you charge VAT?',
        a: 'UAE VAT is added where it applies and shown on a tax invoice with our TRN. Customers outside the UAE are generally not charged UAE VAT.',
    },
    {
        q: 'Is there a plan for agencies?',
        a: 'Enterprise covers multi-client agency setups, with per-client roles and limits sized to your client list. Book a demo and we will tailor it.',
    },
    {
        q: 'What happens when the trial ends?',
        a: 'Your workspace moves to the Free plan automatically. Nothing is charged unless you choose a paid plan, and your data stays in place.',
    },
];
