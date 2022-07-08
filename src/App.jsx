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
    date: [],
  });
  const { data, loading, error } = useQuery(FILMS_QUERY);

  useEffect(() => {
    let finalObj = {};
    data?.launchesPast.forEach((item) => {
      const date = item.launch_date_local.split("T")[0];
      if (finalObj[date]) {
        finalObj[date].push(item);
      } else {
        finalObj[date] = [item];
      }
    });
    // console.log(finalObj);

    setState((prevState) => ({
      ...prevState,
      data: finalObj,
      date: Object.keys(finalObj),
    }));

    // setState((prevState) => ({
    //   ...prevState,
    //   data: data,
    //   date: Object.keys(finalObj),
    // }));
  }, [loading]);
  console.log(state);

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
          <input
            type="text"
            placeholder="Search"
            onChange={(event) => {
              // var filter = Object.values(state.data.mission_name).filter(items => items.toLowerCase().includes((event.target.value.toLowerCase()))).map(items => items);
              var filter = Object.values(state.data).filter(items => items[0].id.includes(event.target.value)).map(items => items);
              console.log(filter)
              setState(prevState => ({
                ...prevState,
                data: filter
              }))
            }}
          />
        </div>
        <div>
          <Filter />
        </div>
      </div>

      <div className="data-section">
        {Object.keys(state.data).map((date, i) => {
          return (
            <div className="bar">
              <div className="date">{date}</div>
              {Object.values(state.data).map((item, j) => {
                // console.log(item[0].launch_date_local.split("T")[0] === date)
                if (item[0].launch_date_local.split("T")[0] === date) {
                  return (
                    <div className="data">
                      <p>{item[0].id}</p>
                      <div className="info">
                        <p>{item[0].mission_name}</p>
                        <p>{item[0].launcher}</p>
                        <p>{item[0].launch_site.site_name_long}</p>
                        <a target="_blank" href={item[0].links.video_link}>
                        <AiOutlineLink fontSize={20}/>

                        </a>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

// <div>
//               {item}
//               {Object.values(state.data).map((x, i) => {
//                 return <div className="item">
//                   <p>{x[i].id}</p>
//                   <div className="info">
//                   {x[i].mission_name}
//                   </div>
//                 </div>
//               })}
//             </div>
