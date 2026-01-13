export default function PostCard({ post, onClick }) {
  return (
    <article
      className="postCard"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick()}
    >
      <div className="postImgWrap">
        <img
          className="postImg"
          src={post.img}
          srcSet={`${post.img} 1x, ${post.img_2x} 2x`}
          alt={post.title || "Post image"}
          loading="lazy"
        />
      </div>

      <div className="postBody">
        <div className="postKicker">{post.tags}</div>
        <h3 className="postTitle">{post.title}</h3>

        <div className="postMeta">
          <span>{post.autor}</span>
          <span className="dot">•</span>
          <span>{post.date}</span>
          <span className="dot">•</span>
          <span>{post.views}</span>
        </div>

        <p className="postText">{post.text}</p>
      </div>
    </article>
  );
}
