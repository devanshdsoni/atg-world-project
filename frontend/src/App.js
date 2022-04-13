import Navbar from "./components/Navbar";
import Header from "./components/Header";
import MainSection from "./components/MainSection";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import CreatePost from "./components/CreatePost";

function App() {
  const host = "https://atg-world-backend.herokuapp.com";

  // --> 'isLoggedIn' State usigng useState hook to check User is logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.token ? true : false);

  const [allPost, setAllPost] = useState([]);

  // Fetct request to Fecth all Posts
  const fetchPost = async (e) => {
    const response = await fetch(`${host}/api/post/fetchallpost`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (json.success) {
      setAllPost(json.posts);
    } else {
      alert(json.msg);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      {isLoggedIn ? (
        <CreatePost allPost={allPost} setAllPost={setAllPost} />
      ) : (
        <>
          <Signup isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </>
      )}

      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <MainSection isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} allPost={allPost} setAllPost={setAllPost} />
    </>
  );
}

export default App;
