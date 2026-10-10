import { allPosts } from "content-collections";
import { formatDate } from "@/lib/utils";
import { DATA } from "@/data/resume";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXContent } from "@content-collections/mdx/react";
import { mdxComponents } from "@/mdx-components";
import Link from "next/link";
import { ChevronLeft, ChevronRight, CalendarDays, ArrowRight } from "lucide-react";
import { BlogToc } from "@/components/blog-toc";
import { ShareDialog } from "@/components/share-dialog";
import { BlogComments } from "@/components/blog-comments";

function getSortedPosts() {
  return [...allPosts].sort((a, b) => {
    if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
      return -1;
    }
    return 1;
  });
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._meta.path.replace(/\.mdx$/, ""),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  const post = allPosts.find((p) => p._meta.path.replace(/\.mdx$/, "") === slug);

  if (!post) {
    return undefined;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${DATA.url}/blog/${slug}`,
      ...(image && {
        images: [
          {
            url: `${DATA.url}${image}`,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image && {
        images: [`${DATA.url}${image}`],
      }),
    },
  };
}

export default async function Blog({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;
  const sortedPosts = getSortedPosts();
  const currentIndex = sortedPosts.findIndex(
    (p) => p._meta.path.replace(/\.mdx$/, "") === slug
  );
  const post = sortedPosts[currentIndex];

  if (!post) {
    notFound();
  }

  const previousPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null;

  const getSlug = (post: (typeof sortedPosts)[0]) =>
    post._meta.path.replace(/\.mdx$/, "");

  const jsonLdContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    description: post.summary,
    image: post.image
      ? `${DATA.url}${post.image}`
      : `${DATA.url}/blog/${slug}/opengraph-image`,
    url: `${DATA.url}/blog/${slug}`,
    author: {
      "@type": "Person",
      name: DATA.name,
    },
  }).replace(/</g, "\\u003c");

  return (
    <section id="blog">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: jsonLdContent,
        }}
      />
      <div className="flex justify-start gap-4 items-center">
        <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors border border-border rounded-lg px-2 py-1 inline-flex items-center gap-1 mb-6 group" aria-label="Back to Blog">
          <ChevronLeft className="size-3 group-hover:-translate-x-px transition-transform" />
          Back to Blog
        </Link>
      </div>
      {post.image && (
        <div className="blog-reveal mb-8 overflow-hidden rounded-2xl border border-border bg-muted shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.image} alt="" className="aspect-[16/9] w-full object-cover" />
        </div>
      )}
      <div className="blog-reveal blog-reveal-delay flex flex-col gap-4">
        <h1 className="title font-serif text-4xl font-medium md:text-5xl tracking-tight leading-[1.08]">{post.title}</h1>
        <p className="text-lg text-muted-foreground">{post.summary}</p>
        <div className="flex items-center justify-between gap-4">
          <p className="flex items-center gap-2 text-sm text-muted-foreground"><CalendarDays className="size-4" />{formatDate(post.publishedAt)}</p>
          <ShareDialog title={post.title} />
        </div>
      </div>
      <div className="my-6 flex w-full items-center">
        <div
          className="flex-1 h-px bg-border"
          style={{
            maskImage:
              "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
          }}
        />
      </div>
      <article className="blog-article prose prose-zinc max-w-full scroll-mt-24 text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert prose-headings:scroll-mt-24 prose-headings:text-foreground prose-h2:mt-14 prose-h2:text-2xl prose-h3:mt-10">
        <MDXContent code={post.mdx} components={mdxComponents} />
      </article>

      <BlogToc />
      <BlogComments />

      {sortedPosts.filter(p => getSlug(p) !== slug).length > 0 && (
        <section className="mt-16 border-t border-border pt-8 pb-28">
          <h2 className="mb-8 text-2xl font-semibold">Related Posts</h2>
          <div className="space-y-7">
            {sortedPosts.filter(p => getSlug(p) !== slug).slice(0, 3).map((related) => (
              <Link key={getSlug(related)} href={`/blog/${getSlug(related)}`} className="group flex items-center justify-between gap-6 rounded-xl p-2 -m-2 transition hover:bg-accent/40">
                <div className="min-w-0"><h3 className="font-semibold text-lg group-hover:underline underline-offset-4">{related.title}</h3><p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{related.summary}</p><p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground"><CalendarDays className="size-3.5"/>{formatDate(related.publishedAt)}</p></div>
                <span className="shrink-0 inline-flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground">Read more <ArrowRight className="size-4 transition-transform group-hover:translate-x-1"/></span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}
