import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import PreloadContext from "./lib/PreloadContext";

function About() {
  const preloadedData = useContext(PreloadContext);
  const [data, setData] = useState(
    preloadedData.data.find((item) => item.routeKey === "about").props.data
  );
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
