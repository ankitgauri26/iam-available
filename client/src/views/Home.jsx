import React, { useState, useEffect } from "react";
import ToggleSwitch from "../components/Toggle/toggle";
import DataService from "../utils/services";

export default function Home() {
  const [userInfo, setUserInfoItems] = useState({
    name: "",
    email: "",
    expertise: "default",
    isAvailable: false,
  });
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage && localStorage.getItem("myState")) {
      const myItems = JSON.parse(localStorage.getItem("myState"));
      setUserInfoItems({
        name: myItems.name,
        email: myItems.email,
        isAvailable: myItems.isAvailable,
      });
      if (myItems) {
        setLoggedIn(true);
      }
    }
  }, []);

  const handleNameChange = (e) => {
    setUserInfoItems({ ...userInfo, name: e.target.value });
  };

  const handleEmailChange = (e) => {
    setUserInfoItems({ ...userInfo, email: e.target.value });
  };

  const formSubmit = (event) => {
    event.preventDefault();

    const myState = {
      name: userInfo.name,
      email: userInfo.email,
      expertise: userInfo.expertise,
      isAvailable: userInfo.isAvailable,
    };

    if ((userInfo.name, userInfo.email)) {
      DataService.registerUser(userInfo)
        .then((resp) => {
          if (resp && resp.success) {
            setLoggedIn(true);
            localStorage.setItem("myState", JSON.stringify(myState));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const toggleNotifications = (payload) => {
    const myItems = JSON.parse(localStorage.getItem("myState"));
    myItems.isAvailable = payload;
    console.log(myItems);
    localStorage.setItem("myState", JSON.stringify(myItems));
    setUserInfoItems({ ...userInfo, isAvailable: payload });
  };

  useEffect(() => {
    DataService.updateAvailability(userInfo)
      .then((resp) => {})
      .catch((err) => console.log(err));
  }, [userInfo.isAvailable]);

  const handleExpertiseChange = (e) => {
    setUserInfoItems({ ...userInfo, expertise: e.target.value });
  };

  return (
    <div>
      {isLoggedIn ? (
        <div className="container">
          <h1>Hello {userInfo.name}</h1>
          <p>Please click on the switch to change your availability.</p>
          <div className="toogle-switch">
            <ToggleSwitch
              id="available-save"
              onChange={toggleNotifications}
              defaultChecked={userInfo.isAvailable}
            />
            <br></br>
            <br></br>
            <br></br>
            <p><i>This is an app is built to speed up my assigning time to my fellow developers.<br></br>Feel free to use it</i></p>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="add-user">
            <h1>Please add your information</h1>
            <h3>Trust me this is a one time process.</h3>
            <form noValidate onSubmit={formSubmit} className="add-form">
              <div class="form-group">
                <label for="exampleInputEmail1">Your Name*</label>

                <input
                  type="text"
                  className="form-control"
                  value={userInfo.name}
                  onChange={handleNameChange}
                />
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Your Deloitte Email*</label>
                <input
                      type="email"
                      className="form-control"
                      value={userInfo.email}
                      onChange={handleEmailChange}
                    />

                <small id="emailHelp" class="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Your Expertise</label>
                <div>
                  <select
                    onChange={handleExpertiseChange}
                    className="form-control"
                  >
                    <option value="default" selected disabled>
                      Select your expertise
                    </option>
                    <option value="Front End">Front End</option>
                    <option value="Back End">Back End</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-success"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
