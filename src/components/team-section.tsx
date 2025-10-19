import { useRef, useEffect } from "react";

const teamMembers = [
    { id: 1, imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop' },
    { id: 2, imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop' },
    { id: 3, imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop' },
    { id: 4, imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop' },
    { id: 5, imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop' },
    { id: 6, imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop' },
    { id: 7, imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop' },
    { id: 8, imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop' },
    { id: 9, imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400&auto=format&fit=crop' },
    { id: 10, imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop' },
    { id: 11, imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop' },
    { id: 12, imageUrl: 'https://images.unsplash.com/photo-1488161628813-04466f872d24?q=80&w=400&auto=format&fit=crop' },
];

import { gsap } from "gsap";
function TeamSection() {
    const sectionRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        const ctx = gsap.context(() => {
            if (!sectionRef.current) return;
            gsap.from(sectionRef.current.querySelectorAll('.grid-item'), {
                opacity: 0,
                y: 30,
                scale: 0.95,
                stagger: 0.05,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                    toggleActions: 'play none none none',
                },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const ImageCard = ({ src, className = '' }: { src: string; className?: string }) => (
        <div className={`grid-item bg-surface-accent rounded-2xl overflow-hidden ${className}`}>
            <img src={src} alt="Team member portrait" className="w-full h-full object-cover" />
        </div>
    );

    const TextBlock = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
        <div className={`grid-item flex items-center ${className}`}>
            <h2 className="text-6xl md:text-7xl lg:text-9xl font-bold leading-none tracking-tighter">
                {children}
            </h2>
        </div>
    );

    return (
        <section ref={sectionRef} className="bg-background text-text-primary py-24 md:py-32 font-sans overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Mobile Layout */}
                <div className="md:hidden">
                    <h2 className="text-5xl font-bold text-center leading-tight mb-12">
                        Built by the<br/>ambitious
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {teamMembers.map(member => (
                            <ImageCard key={member.id} src={member.imageUrl} className="aspect-[3/4]" />
                        ))}
                    </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:grid md:grid-cols-4 gap-4 lg:gap-6 items-center">
                    {/* Row 1 */}
                    <ImageCard src={teamMembers[0].imageUrl} className="aspect-[3/2]" />
                    <TextBlock className="justify-center">Built</TextBlock>
                    <ImageCard src={teamMembers[1].imageUrl} className="aspect-[3/2]" />
                    <ImageCard src={teamMembers[2].imageUrl} className="aspect-[3/2]" />

                    {/* Row 2 */}
                    <ImageCard src={teamMembers[3].imageUrl} className="aspect-[3/2]" />
                    <ImageCard src={teamMembers[4].imageUrl} className="aspect-[3/2]" />
                    <TextBlock className="justify-center">by</TextBlock>
                    <ImageCard src={teamMembers[5].imageUrl} className="aspect-[3/2]" />

                    {/* Row 3 */}
                    <ImageCard src={teamMembers[6].imageUrl} className="aspect-[3/2]" />
                    <TextBlock className="justify-center">the</TextBlock>
                    <ImageCard src={teamMembers[7].imageUrl} className="aspect-[3/2]" />
                    <ImageCard src={teamMembers[8].imageUrl} className="aspect-[3/2]" />

                    {/* Row 4 */}
                    <ImageCard src={teamMembers[9].imageUrl} className="aspect-[3/2]" />
                    <TextBlock className="col-span-2 pl-4 lg:pl-8">ambitious</TextBlock>
                    <ImageCard src={teamMembers[10].imageUrl} className="aspect-[3/2]" />
                </div>
            </div>
        </section>
    );
}

export default TeamSection;