import React, { useState, useEffect } from "react";
import DataService from "../utils/services";
import "../assets/css/dashboard.scss";
import moment from "moment";
import { mainLogo, searchLogo } from "../assets/images/images";

export default function Admin() {
  const [allResources, setAllResources] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  useEffect(() => {
    if (!searchInput) {
      console.log("alerts is called");
      getAlerts();
      const interval = setInterval(() => getAlerts(), 10000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [!searchInput]);

  const getAlerts = () => {
    DataService.getAllData()
      .then((resp) => {
        if (resp) {
          setLastUpdated(Date.now());
          setAllResources(resp);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (searchInput) {
      filterSearcheTable(searchInput);
    }
  }, [searchInput]);

  const filterSearcheTable = (searchValue) => {
    const tempData = [...allResources];
    const filteredData = (tempData || []).filter((item) =>
      item.name.toLowerCase().includes(searchValue)
    );
    setAllResources(filteredData);
  };

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <div className="header">
            <div className="logo">
              <img src={mainLogo} alt="logo" />
            </div>
          </div>
          <h2>Resource Availability Tracker - Admin</h2>
          <p>This page is auto-refreshed every 10 seconds</p>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      {allResources && allResources.length > 0 ? (
        <div className="resource-tracking">
          <div className="row">
            <div className="col-md-5">
              <div className="search-bar">
                <input
                  type="text"
                  onChange={handleSearch}
                  value={searchInput}
                  className="form-control"
                  placeholder="Search by Name..."
                />
                <img src={searchLogo} alt="search" />
              </div>
            </div>
            <div className="col-md-7 text-right">
              <b>Last Updated:{" "}</b>
              {moment(lastUpdated).format("DD/MM/YYYY hh:mm A")}
              {" "}{" "}{" "}<button className="btn btn-primary" onClick={getAlerts}>
                Refresh
              </button>
            </div>
          </div>
          <br></br>
          <table className="log-table">
            <thead>
              <tr>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>EXPERTISE</th>
                <th>STATUS</th>
                <th>LAST STATUS UPDATED</th>
              </tr>
            </thead>
            <tbody>
              {(allResources || []).map((item) => {
                return (
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.expertise}</td>
                    <td>
                      {item.isAvailable ? (
                        <span class="available">Available</span>
                      ) : (
                        <span class="not-available">Not Available</span>
                      )}
                    </td>
                    <td>
                      {moment(
                        new Date(item.lastUpdated),
                        "DD/MM/YYYY hh:mm a"
                      ).format("LL")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center">
          <h1>No Data</h1>
        </div>
      )}
    </div>
  );
}
