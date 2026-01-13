import PostCard from "./PostCard";

export default function PostsGrid({ posts, onOpen }) {
  return (
    <section className="postsGrid" aria-label="Posts">
      {posts.map((p, idx) => (
        <PostCard key={`${p.title}-${idx}`} post={p} onClick={() => onOpen(p)} />
      ))}
    </section>
  );
}
