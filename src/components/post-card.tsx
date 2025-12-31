import Link from "next/link";
import Image from "next/image";
import type { PostMeta } from "@/lib/blog";

export default function PostCard({ post }: { post: PostMeta }) {
	const hasImage = Boolean(post.heroImage);
	const imageSrc = post.heroImage?.startsWith("http")
		? post.heroImage
		: post.heroImage || ""; // if relative, it should be under /public

	return (
		<article className="group relative overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm transition hover:shadow-md hover:-translate-y-[1px] cursor-pointer">
			{/* make whole card clickable */}
			<Link href={`/blog/${post.slug}`} className="absolute inset-0 z-10" aria-label={post.title} />
			{/* media */}
			<div className="relative aspect-[16/9] w-full">
				{hasImage ? (
					<Image
						src={imageSrc!}
						alt={post.title}
						fill
						className="object-cover"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						priority={false}
					/>
				) : (
					<div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/15 via-indigo-500/10 to-teal-500/15" />
				)}
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
		</article>
	);
}
