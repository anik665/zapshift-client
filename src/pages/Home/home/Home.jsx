import React, { useEffect, useState } from "react";
import Banner from "../Banner/Banner";
import WorkSection from "../WorkSection/WorkSection";
import Service from "../Service/Service";
import Helps from "../Helps/Helps";
import Reviews from "../Reviews/Reviews";

const Home = () => {
  // const reviewsPromise = fetch("/reviews.json").then((res) => res.json());
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("/reviews.json")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);
  return (
    <div className=" mt-9">
      <Banner />
      <WorkSection />
      <Service />
      <Helps />
      <Reviews reviews={reviews} />
    </div>
  );
};

export default Home;
