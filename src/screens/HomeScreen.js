import React from "react";
import Banner from "../Banner";
import "./HomeScreen.css";
import Nav from "../Nav";
import requests from "../requests";
import Row from "../Row";

function HomeScreen() {
  return (
    <div className="homeScreen">
      <Nav />
      <Banner />
      <div className="row_shift_up">
        <Row
          title="FAKEFLIX ORIGINALS"
          fetchUrl={requests.fetchNetflixOriginals}
          media="TV"
        />
        <Row
          title="Trending Now"
          fetchUrl={requests.fetchTrending}
          media="NA"
        />
        <Row
          title="Top Rated"
          fetchUrl={requests.fetchTopRated}
          media="Movie"
        />
        <Row
          title="Action Movies"
          fetchUrl={requests.fetchActionMovies}
          media="Movie"
        />
        <Row
          title="Comedy Movies"
          fetchUrl={requests.fetchComedyMovies}
          media="Movie"
        />
        <Row
          title="Horror Movies"
          fetchUrl={requests.fetchHorrorMovies}
          media="Movie"
        />
        <Row
          title="Romance Movies"
          fetchUrl={requests.fetchRomanceMovies}
          media="Movie"
        />
        <Row
          title="Documentaries"
          fetchUrl={requests.fetchDocumentaries}
          media="Movie"
        />
      </div>
    </div>
  );
}

export default HomeScreen;
