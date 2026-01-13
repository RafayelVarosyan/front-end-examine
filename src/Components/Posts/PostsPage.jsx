import { useEffect, useMemo, useState } from "react";
import PostsGrid from "./PostsGrid";
import Modal from "../UI/Modal";
import "./PostsPage.css";

export default function PostsPage({ query }) {
  const [posts, setPosts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setStatus("loading");
        const res = await fetch("https://cloud.codesupply.co/endpoint/react/data.json");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          setPosts(Array.isArray(data) ? data : []);
          setStatus("idle");
        }
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  const filtered = useMemo(() => {
    const s = (query || "").trim().toLowerCase();
    if (!s) return posts;
    return posts.filter(p =>{
      const title = (p.title || "").toLowerCase();
      const text = (p.text || "").toLowerCase();
      return title.includes(s) || text.includes(s);
  });
  }, [posts, query]);

  return (
    <main className="page">
      <div className="container">
        
        {status === "loading" && <p className="hint">Loading…</p>}
        {status === "error" && <p className="hint">Failed to load posts.</p>}
        {status === "idle" && filtered.length === 0 && query.trim() !== "" && ( <p style={{ margin: "2rem auto", opacity: 0.7 , textAlign:"center"}}>No posts found.</p>)}

        {/* Spec: offset between menu and posts is 3rem */}
        <div className="postsOffset">
          <PostsGrid posts={filtered} onOpen={setSelected} />
        </div>
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <div className="postModalContent">
           
          <div className="postImgWrap">
            <img
              className="postImg"
              src={selected.img}
              srcSet={`${selected.img} 1x, ${selected.img_2x} 2x`}
              alt={selected.title || "Post image"}
              loading="lazy"
            />
          </div>
            <div className="postPopUpKicker">{selected.tags}</div>
            <h2 className="postTitle">{selected.title}</h2>
            <div className="postMeta">
              <span>{selected.autor}</span>
              <span className="dot">•</span>
              <span>{selected.date}</span>
              <span className="dot">•</span>
              <span>{selected.views}</span>
            </div>
            <p className="postText">{selected.text}</p>
          </div>
        )}
      </Modal>
    </main>
  );
}
