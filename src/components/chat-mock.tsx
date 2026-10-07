import { CheckCheckIcon } from 'lucide-react';

const MESSAGES: { from: 'customer' | 'team'; text: string; time: string }[] = [
    { from: 'customer', text: 'Hi! Is the villa still available for viewing this weekend?', time: '10:02' },
    { from: 'team', text: 'Yes, Saturday 11am works. Shall I confirm? 🗓️', time: '10:03' },
    { from: 'customer', text: 'Perfect, please do.', time: '10:03' },
    { from: 'team', text: "Booked. You'll get a reminder here the day before.", time: '10:04' },
];

/**
 * An illustration of a conversation in the team inbox. Decorative: hidden from screen readers.
 * On phones it is shortened (two messages, no message box) so the sign-up form above it keeps
 * the first screen.
 */
export function ChatMock() {
    return (
        <div aria-hidden className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-lime/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#11150e] shadow-lift">
                <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3.5 sm:px-5 sm:py-4">
                    <span className="inline-flex size-10 items-center justify-center rounded-full bg-lime text-sm font-bold text-lime-ink">PE</span>
                    <div className="min-w-0">
                        <p className="truncate text-[15px] font-semibold text-white">Palm Estates</p>
                        <p className="text-[12.5px] text-white/50">Assigned to Sara · window open</p>
                    </div>
                    <span className="ml-auto rounded-full bg-lime/15 px-2.5 py-1 text-[11.5px] font-semibold text-lime">Live</span>
                </div>
                <div className="grid gap-2.5 bg-[#0d100b] px-4 py-4 sm:py-5">
                    {MESSAGES.map((m, i) => (
                        <div key={m.text} className={`${m.from === 'team' ? 'justify-self-end' : 'justify-self-start'} ${i >= 2 ? 'hidden sm:block' : ''}`}>
                            <div
                                className={`max-w-[17rem] rounded-2xl px-3.5 py-2.5 text-[14px] leading-snug ${m.from === 'team' ? 'rounded-br-md bg-lime text-lime-ink' : 'rounded-bl-md bg-white/10 text-white'}`}
                            >
                                {m.text}
                                <span
                                    className={`mt-1 flex items-center justify-end gap-1 text-[11px] ${m.from === 'team' ? 'text-lime-ink/60' : 'text-white/45'}`}
                                >
                                    {m.time}
                                    {m.from === 'team' && <CheckCheckIcon className="size-3.5" />}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="hidden items-center gap-2 border-t border-white/10 px-4 py-3 sm:flex">
                    <span className="h-10 flex-1 rounded-xl bg-white/5 px-3.5 text-[13.5px] leading-10 text-white/35">Type a message</span>
                    <span className="inline-flex size-10 items-center justify-center rounded-xl bg-lime text-lime-ink">➤</span>
                </div>
            </div>
        </div>
    );
}
