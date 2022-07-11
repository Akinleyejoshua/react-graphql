import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useQuery, gql } from "@apollo/client";
import { Filter } from "./components/Filter";
import {
  AiFillInfoCircle,
  AiOutlineLink,
  AiOutlineReload,
  AiOutlineSearch,
} from "react-icons/ai";
import { Bar } from "./components/Bar";
import { Search } from "./components/Search";

const FILMS_QUERY = gql`
  {
    launchesPast(limit: 20) {
      id
      mission_name
      launch_date_local
      launch_site {
        site_name_long
      }
      links {
        article_link
        video_link
      }
      rocket {
        rocket_name
      }
    }
  }
`;

function App() {
  const [state, setState] = useState({
    data: [],
    search: [],
    date: [],
    onSearch: false,
  });
  const { data, loading, error } = useQuery(FILMS_QUERY);

  const formatData = (data) => {
    let finalObj = {};
    data?.launchesPast.forEach((item) => {
      const date = item.launch_date_local.split("T")[0];
      if (finalObj[date]) {
        finalObj[date].push(item);
      } else {
        finalObj[date] = [item];
      }
    });

    return finalObj;
  };

  const filterSearch = (val) => {
    const filter = Object.values(state.data)
      .filter((items) =>
        items.mission_name
          .toLowerCase()
          .includes(val.toLowerCase())
      )
      .map((item) => item);

    // console.log(filter);

    if (filter === []) {
      setState((prevState) => ({
        ...prevState,
        search: filter,
        onSearch: false,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        search: filter,
        onSearch: true,
      }));
    }
  };

  useEffect(() => {
    // console.log(finalObj);
    let finalObj = {};
    let final = [];
    data?.launchesPast.forEach((item) => {
      final.push(item);
    });

    // console.log(final);

    setState((prevState) => ({
      ...prevState,
      data: final,
      date: Object.keys(finalObj),
    }));

    // console.log(state);
  }, [loading]);

  if (loading)
    return (
      <div className="loading">
        <div className="loader"></div>
        <p>Kindly be patient</p>
      </div>
    );

  if (error)
    return (
      <div className="error">
        <AiFillInfoCircle fontSize={100} />
        <br />
        <p>Oops!, unstable internet connection</p>
        <a href="/">
          <AiOutlineReload />
        </a>
      </div>
    );

  return (
    <div className="App">
      <div className="search">
        <div className="search-bar">
          <AiOutlineSearch fontSize={30} />
          <input type="text" placeholder="Search" onChange={(event) => filterSearch(event.target.value)} />
        </div>
        <div>
          <Filter
            onClick={(val) => filterSearch(val)}
          />
        </div>
      </div>

      <div className="data-section">
        {!state.onSearch ? (
          <Bar data={state.data} />
        ) : (
          <Search data={state.search} />
        )}
      </div>
    </div>
  );
}

export default App;
