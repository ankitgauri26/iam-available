import React, { useState, useEffect } from "react";
import DataService from "../utils/services";
import "./dashbaord.scss";
import moment from 'moment';


export default function Admin() {
  const [allResources, setAllResources] = useState([]);


  useEffect(() => {
    function getAlerts() {
      DataService.getAllData()
      .then((resp) => {
        if (resp) {
          setAllResources(resp);
        }
      })
      .catch((err) => console.log(err));
    }
    getAlerts()
    const interval = setInterval(() => getAlerts(), 10000)
    return () => {
      clearInterval(interval);
    }
  }, []);



  return (
    <>
    <div className="form-row">
      <div className="col">
      <h2>HPE CPQ UAT Assignment Tracker</h2>
      </div>
      <div className="col">
      <p>This page is auto-refreshed every 10 seconds</p>
      </div>
    </div>
    <br></br>
    <br></br>
    <br></br>
   
    <table className="log-table">
      <thead>
        <tr>
          <th>NAME</th>
          <th>EMAIL</th>
          <th>EXPERTISE</th>
          <th>STATUS</th>
          <th>LAST UPDATED</th>
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
              <td>{moment(new Date(item.lastUpdated), 'DD/MM/YYYY hh:mm a').format('LL')}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
    </>
  );
}
