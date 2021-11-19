import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import PreloadContext from "./lib/PreloadContext";

function About() {
  const preloadedData = useContext(PreloadContext);
  const [data, setData] = useState(
    preloadedData &&
      preloadedData.data.find((item) => item.routeKey === "about") &&
      preloadedData.data.find((item) => item.routeKey === "about").props.data
  );

  useEffect(() => {
    if (data) {
      return;
    }
    const fetch = async () => {
      const res = await axios.get(
        "https://hacker-news.firebaseio.com/v0/item/8863.json"
      );
      setData(res.data);
    };
    fetch();
  }, []);
  return (
    <div>
      <h1>{data && data.title}</h1>
      <h3>This is about page</h3>
    </div>
  );
}

About.serverFetch = async () => {
  const res = await axios.get(
    "https://hacker-news.firebaseio.com/v0/item/8863.json"
  );
  return {
    routeKey: "about",
    props: {
      data: res.data,
    },
  };
};

export default About;
