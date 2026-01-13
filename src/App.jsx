import Header from "./components/Header/Header";
import StickyNav from "./Components/Header/StickyNav";
import PostsPage from "./components/Posts/PostsPage";
import { useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");

  return (
    <>
      <Header query={query} onQueryChange={setQuery} />
      <StickyNav />
      <PostsPage query={query} />
    </>
  );
}