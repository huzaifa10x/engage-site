import type { Interval } from '@/config/site';

import type { Plan, PlanFeature } from './plans';

/**
 * Presentation helpers for the catalog. These decide HOW values are shown (wording, order,
 * grouping); the values themselves always come from the API.
 */

export function formatMoney(minor: number, currency: string): string {
    const amount = minor / 100;

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
        maximumFractionDigits: 2,
    }).format(amount);
}

/** The price to show per month for the chosen billing period, in minor units (null = custom). */
export function monthlyEquivalent(plan: Plan, interval: Interval): number | null {
    if (plan.price_monthly_minor === null) return null;
    if (interval === 'yearly' && plan.price_yearly_minor !== null) return Math.round(plan.price_yearly_minor / 12);

    return plan.price_monthly_minor;
}

/** Whole-percent saving of yearly over twelve monthly payments; 0 when there is none. */
export function yearlySaving(plan: Plan): number {
    if (!plan.price_monthly_minor || !plan.price_yearly_minor) return 0;

    return Math.max(0, Math.round((1 - plan.price_yearly_minor / (plan.price_monthly_minor * 12)) * 100));
}

export function bestYearlySaving(plans: Plan[]): number {
    return Math.max(0, ...plans.map(yearlySaving));
}

const number = (value: number) => new Intl.NumberFormat('en-US').format(value);

/** "5 GB", "512 MB" for storage; plain numbers otherwise. */
function quantity(feature: PlanFeature): string {
    if (feature.unlimited) return 'Unlimited';
    if (feature.limit === null) return '—';
    if (feature.unit === 'MB') return feature.limit >= 1024 ? `${number(Math.round((feature.limit / 1024) * 10) / 10)} GB` : `${number(feature.limit)} MB`;

    return number(feature.limit);
}

/** A value for one cell of the comparison table. `true`/`false` render as a tick or a dash. */
export function featureValue(feature: PlanFeature | undefined): string | boolean {
    if (!feature || !feature.enabled) return false;
    if (feature.type === 'limit' || feature.type === 'metered') {
        const unit = feature.unit && feature.unit !== 'MB' ? ` ${feature.unit.replace('/', ' / ')}` : '';

        return feature.unlimited ? 'Unlimited' : `${quantity(feature)}${unit}`;
    }
    if (feature.key === 'support' && typeof feature.config.level === 'string') return titleCase(feature.config.level);

    return true;
}

const titleCase = (text: string) => text.replace(/[_-]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

/** One line for a plan card, e.g. "3 WhatsApp numbers" or "Shared inbox". */
export function featureLine(feature: PlanFeature): string {
    if (feature.type === 'limit' || feature.type === 'metered') {
        const label = feature.label.toLowerCase();
        if (feature.unlimited) return `Unlimited ${label}`;
        if (feature.unit === 'MB') return `${quantity(feature)} ${label}`;
        if (feature.unit?.includes('/')) return `${quantity(feature)} ${feature.unit.replace('/', ' per ')}`;

        return `${quantity(feature)} ${feature.limit === 1 ? label.replace(/s$/, '') : label}`;
    }
    const value = featureValue(feature);

    return typeof value === 'string' ? `${value} ${feature.label.toLowerCase()}` : feature.label;
}

/**
 * Which features a plan card leads with, in order. Only the ORDER lives here; a key that the API
 * does not return, or that a plan does not include, is skipped. The full list is always in the
 * comparison table.
 */
export const CARD_FEATURE_ORDER = [
    'whatsapp_numbers',
    'team_seats',
    'campaign_reach_monthly',
    'broadcasts',
    'coexistence',
    'automations',
    'automation_executions_monthly',
    'ticketing',
    'analytics',
    'api_access',
    'webhooks',
    'sso',
    'support',
];

export function cardFeatures(plan: Plan, max = 7): string[] {
    const byKey = new Map(plan.features.map((f) => [f.key, f]));
    const lines: string[] = [];
    for (const key of CARD_FEATURE_ORDER) {
        const feature = byKey.get(key);
        if (feature?.enabled) lines.push(featureLine(feature));
        if (lines.length >= max) break;
    }

    return lines;
}

/** Groups for the comparison table. A feature key not listed lands in "More". */
const GROUPS: { title: string; keys: string[] }[] = [
    { title: 'Workspace', keys: ['whatsapp_numbers', 'team_seats', 'media_storage_mb', 'coexistence', 'rbac', 'sub_accounts', 'white_label', 'sso'] },
    {
        title: 'Team inbox',
        keys: ['conversation_assignment', 'internal_notes', 'canned_responses', 'snooze', 'business_hours', 'auto_routing', 'ticketing', 'csat'],
    },
    {
        title: 'Campaigns',
        keys: [
            'broadcasts',
            'campaign_reach_monthly',
            'campaign_scheduling',
            'campaign_retry',
            'campaign_send_rate_per_hour',
            'messages_per_second',
            'click_tracking',
        ],
    },
    {
        title: 'Contacts & templates',
        keys: ['message_templates', 'segments', 'saved_segments', 'tags', 'custom_fields', 'lead_source_tracking', 'qr_generator'],
    },
    { title: 'Automation', keys: ['automations', 'automation_executions_monthly', 'chatbots', 'whatsapp_flows', 'web_chatbot'] },
    { title: 'Insights', keys: ['analytics', 'agent_reports', 'number_health'] },
    { title: 'Developers', keys: ['api_access', 'api_rate_limit_per_minute', 'webhooks', 'integrations'] },
    { title: 'Trust & support', keys: ['compliance', 'audit_log_retention_days', 'support'] },
];

export type ComparisonGroup = { title: string; rows: { key: string; label: string; values: (string | boolean)[] }[] };

export function comparison(plans: Plan[]): ComparisonGroup[] {
    const labels = new Map<string, string>();
    plans.forEach((p) => p.features.forEach((f) => labels.set(f.key, f.label)));
    const row = (key: string) => ({ key, label: labels.get(key) ?? key, values: plans.map((p) => featureValue(p.features.find((f) => f.key === key))) });
    // A row nobody has (a feature that is not offered on any public plan yet) is not shown.
    const offered = (r: ReturnType<typeof row>) => r.values.some((v) => v !== false);

    const used = new Set<string>();
    const groups = GROUPS.map((group) => ({
        title: group.title,
        rows: group.keys
            .filter((key) => labels.has(key))
            .map((key) => (used.add(key), row(key)))
            .filter(offered),
    }));
    const rest = [...labels.keys()]
        .filter((key) => !used.has(key))
        .map(row)
        .filter(offered);
    if (rest.length > 0) groups.push({ title: 'More', rows: rest });

    return groups.filter((g) => g.rows.length > 0);
}
