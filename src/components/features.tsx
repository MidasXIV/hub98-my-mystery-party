import { useRef, useEffect, JSX, SVGProps } from "react";
import { gsap } from "gsap";

const features = [
  {
    title: "Instant Access",
    description:
      "No downloads, no printing. Start your investigation the moment you purchase.",
    icon: "play",
    type: "iconCard",
  },
  {
    title: "Immersive Experience",
    description:
      "Feel like a real detective with high-quality photos, audio clips, and realistic documents.",
    // imageUrl: 'https://images.unsplash.com/photo-1586473216828-8b2c45535327?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3',
    imageUrl: "/features_section/immersive-experience-2.png",
    type: "imageCard",
  },
  {
    title: "Interactive Case Tools",
    description:
      "Use our dynamic timeline and evidence board to connect the dots and track suspect movements.",
    // imageUrl: 'https://images.unsplash.com/photo-1611118724219-974108855423?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3',
    // type: 'imageCard'
    icon: "users",
    type: "iconCard",
  },
  {
    title: "Solve Together",
    description:
      "Invite friends to your private investigation room. Share theories and crack the case as a team.",
    imageUrl: "/features_section/party.png",
    type: "imageCard",
  },
  {
    title: "All Your Evidence",
    description:
      "Police reports, witness interviews, crime scene photos—all organized in one place.",
    // imageUrl: 'https://images.unsplash.com/photo-1521737892302-3c82d4d42634?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3',
    imageUrl: "/features_section/all-your-evidence.png",
    type: "imageCard",
  },
  {
    title: "Hints On Demand",
    description:
      "Feeling stuck? Get a nudge in the right direction with our tiered hint system. No spoilers.",
    icon: "lightbulb",
    type: "iconCard",
  },
  {
    title: "New Cases Added",
    description:
      "A growing library of mysteries means your next thrilling investigation is always waiting.",
    icon: "plus",
    type: "iconCard",
  },
  {
    title: "Join 50K+ Detectives",
    description:
      "Become part of a thriving community of sleuths who have successfully closed cases on our platform.",
    type: "statCard",
  },
];

const icons = {
  play: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.742 1.295 2.545 0 3.286L7.279 20.99c-1.25.717-2.779-.217-2.779-1.643V5.653z"
        clipRule="evenodd"
      />
    </svg>
  ),
  users: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM5.25 9.75a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3zM5.25 12.75a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3zM15 9.75a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3zM15 12.75a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3zM8.25 17.306a3.375 3.375 0 00-5.223 2.72.75.75 0 00.528.726 33.72 33.72 0 0013.892 0 .75.75 0 00.528-.726 3.375 3.375 0 00-5.223-2.72 4.125 4.125 0 01-4.5 0z" />
    </svg>
  ),
  lightbulb: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.106a.75.75 0 010 1.06l-1.591 1.591a.75.75 0 11-1.06-1.06l1.591-1.591a.75.75 0 011.06 0zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5h2.25a.75.75 0 01.75.75zM17.803 17.803a.75.75 0 01-1.06 0l-1.591-1.591a.75.75 0 111.06-1.06l1.591 1.591a.75.75 0 010 1.06zM12 21.75a.75.75 0 01-.75-.75v-2.25a.75.75 0 011.5 0v2.25a.75.75 0 01-.75.75zM6.106 18.894a.75.75 0 01-1.06 0l-1.591-1.591a.75.75 0 111.06-1.06l1.591 1.591a.75.75 0 010 1.06zM3 12a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H3.75A.75.75 0 013 12zM6.197 7.197a.75.75 0 010-1.06l1.591-1.591a.75.75 0 111.06 1.06L7.258 7.197a.75.75 0 01-1.06 0z" />
    </svg>
  ),
  plus: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
        clipRule="evenodd"
      />
    </svg>
  ),
};

type IconKey = keyof typeof icons;

function FeatureCard({ feature }: { feature: (typeof features)[0] }) {
  const Icon = feature.icon ? icons[feature.icon as IconKey] : null;

  if (feature.type === "imageCard") {
    return (
      <div className="group relative aspect-[4/5] bg-surface rounded-3xl overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-110"
          style={{ backgroundImage: `url(${feature.imageUrl})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 text-white flex flex-col justify-end h-full">
          <div>
            <h3 className="text-2xl font-bold">{feature.title}</h3>
            <p className="mt-2 text-white/80 text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (feature.type === "statCard") {
    return (
      <div className="bg-surface-accent p-8 rounded-3xl flex flex-col justify-center items-center aspect-[4/5] text-center transition-transform duration-300 ease-in-out hover:-translate-y-2">
        <h3 className="text-5xl md:text-6xl font-bold text-text-primary">
          50K+
        </h3>
        <p className="mt-2 text-text-secondary font-semibold">Detectives</p>
        <p className="mt-4 text-text-secondary text-sm leading-relaxed">
          {feature.description}
        </p>
      </div>
    );
  }

  // Default is 'iconCard'
  return (
    <div className="bg-surface-accent p-8 rounded-3xl flex flex-col justify-between aspect-[4/5] transition-transform duration-300 ease-in-out hover:-translate-y-2">
      <div>
        {Icon && (
          <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center mb-6">
            <Icon className="w-6 h-6 text-text-secondary" />
          </div>
        )}
        <h3 className="text-2xl font-bold text-text-primary">
          {feature.title}
        </h3>
      </div>
      <p className="text-text-secondary leading-relaxed text-sm">
        {feature.description}
      </p>
    </div>
  );
}

function Features() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;
      gsap.from(sectionRef.current.querySelectorAll(".feature-card"), {
        opacity: 0,
        y: 50,
        stagger: 0.05,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-surface text-text-primary py-24 md:py-32 font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Everything You Need to Crack the Case
          </h2>
          <p className="mt-6 text-lg text-text-secondary">
            Our all-in-one digital platform provides an immersive, interactive,
            and collaborative way to solve mysteries. Here&apos;s how we&apos;ve changed
            the game.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <FeatureCard feature={feature} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
