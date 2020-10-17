import React, { useState, useEffect } from "react";
import ToggleSwitch from "../components/Toggle/toggle";
import DataService from "../utils/services";
import { mainLogo } from "../assets/images/images";
import Modal from "../components/Modal/modal"

export default function Home() {
  const INITIAL_STATE = {
    name: "",
    email: "",
    expertise: "default",
    isAvailable: false,
  };
  const [userInfo, setUserInfoItems] = useState(INITIAL_STATE);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false)

  const closeModal = () => {
    setShowModal(false)
  }
  const openModal = () => {
    setShowModal(!showModal)
  }

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
      // check if user already present is database or not
      DataService.validateUser(userInfo.email, userInfo.expertise).then(
        (resp) => {
          if (resp && resp.isUserAlreadyPresent && resp.userData) {
            // getting back user data stored in db
            // fetch user data from the db and populate the localStorage
            const myState = {
              name: resp.userData.name || "",
              email: resp.userData.email || "",
              expertise: resp.userData.expertise || "",
              isAvailable: resp.userData.isAvailable,
            };
            setLoggedIn(true);
            localStorage.setItem("myState", JSON.stringify(myState));
          } else {
            // if user is not present then register the user
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
        }
      );
    }
  };

  /**
   * @method toggleNotifications
   * @description method to call when user clicks on swtich
   * @param {*} e
   */

  const toggleNotifications = (payload) => {
    const myItems = JSON.parse(localStorage.getItem("myState"));
    myItems.isAvailable = payload;
    console.log(myItems);
    localStorage.setItem("myState", JSON.stringify(myItems));
    setUserInfoItems({ ...userInfo, isAvailable: payload });
  };

  useEffect(() => {
    if (isLoggedIn) {
      DataService.updateAvailability(userInfo)
        .then((resp) => {})
        .catch((err) => console.log(err));
    }
  }, [userInfo.isAvailable, isLoggedIn]);

  /**
   * @method handleExpertiseChange
   * @description Change the input value of the search box
   * @param {*} e
   */

  const handleExpertiseChange = (e) => {
    setUserInfoItems({ ...userInfo, expertise: e.target.value });
  };

  /**
   * Logout functionality
   */
  const logout = () => {
    DataService.logoutAndDelete(userInfo.email)
      .then((resp) => {
        if (resp && resp.success) {
          clearLoggedInStatus();
        }
      })
      .catch((e) => {
        alert(e);
      });
      closeModal()
  };

  /**
   * Clear the loggedin Status
   */
  const clearLoggedInStatus = () => {
    setUserInfoItems(INITIAL_STATE);
    setLoggedIn(false);
    localStorage.removeItem("myState");
  };

  return (
    <div className="container">
      <div className="header text-center">
        <div className="logo">
          <img src={mainLogo} alt="logo" />
        </div>
      </div>
      {!isLoggedIn ? (
        <div className="loggedinUser text-center">
          <h1>Hello {userInfo.name}</h1>
          <p>Please click on the switch to change your availability.</p>
          <div className="toogle-switch">
            <ToggleSwitch
              id="available-save"
              onChange={toggleNotifications}
              defaultChecked={userInfo.isAvailable}
            />
            <br></br>
            <a href="#" className="link" onClick={openModal}>
              Logout
            </a>
            {showModal && <Modal modalMessage="Are you sure you want to logout?" onYes={logout} closeModal={closeModal}/>}
            <br></br>
            <br></br>
            <p>
              <i>
                This is an app is built to speed up my assigning time to my
                fellow developers.<br></br>Feel free to use it
              </i>
            </p>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="add-user">
            <h4>Please add your information</h4>
            <p>Trust me this is a one time process.</p>
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
                <label for="exampleInputPassword1">Your Email*</label>
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
                    <option value="Front End">Front-End Development</option>
                    <option value="Back End">Back-End Development</option>
                    <option value="Testing">Testing</option>
                    <option value="Business Analyst">Business Analyst</option>
                  </select>
                </div>
              </div>
              <div class="form-group text-center">
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-custom"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
