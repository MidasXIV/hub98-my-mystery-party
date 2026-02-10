import Link from "next/link";
import Image from "next/image";
import type { PostMeta } from "@/lib/blog-types";
import { getPostHeroImageOrBanner } from "@/lib/images/blog-banner";

export default function PostCard({ post }: { post: PostMeta }) {
	const imageSrc = getPostHeroImageOrBanner(post);
	const hasImage = Boolean(imageSrc);

	return (
		<article className="group relative overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm transition hover:shadow-md hover:-translate-y-[1px]">
			{/*
			  NOTE: We wrap the card contents in the Link so the anchor has real text.
			  Some SEO/a11y checkers flag empty overlay links (even with aria-label).
			*/}
			<Link
				href={`/blog/${post.slug}`}
				className="block h-full cursor-pointer"
				aria-label={post.title}
			>
				{/* media */}
				<div className="relative aspect-[16/9] w-full">
					{hasImage ? (
						<Image
							src={imageSrc}
							alt={post.title}
							fill
							className="object-cover"
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							priority={false}
						/>
					) : null}
					<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black/5" />
				</div>

				{/* content */}
				<div className="p-4">
					<h3 className="text-xl font-semibold leading-tight group-hover:underline">
						{post.title}
					</h3>
					{post.description ? (
						<p className="mt-2 text-sm text-foreground/70 line-clamp-3">{post.description}</p>
					) : null}

					<div className="mt-3 flex items-center gap-2 text-xs text-foreground/50">
						<span>{new Date(post.date).toLocaleDateString()}</span>
						<span>•</span>
						<span className="capitalize">{post.category.replace(/-/g, " ")}</span>
						{post.readingTimeMinutes ? (
							<>
								<span>•</span>
								<span>{post.readingTimeMinutes} min read</span>
							</>
						) : null}
					</div>
				</div>
			</Link>
		</article>
	);
}
