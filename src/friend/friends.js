import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./framework.css";
import "./master.css";
import photo from "./profile-user.png";
import change from "./cigarette.png";
import setting from "./settings.png";
import multipe from "./multiple-users-silhouette.png";
import friend from "./friends.png";

export default function Friend() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const openForm = () => setIsFormVisible(true);
  const closeForm = () => setIsFormVisible(false);

  return (
    <div className="page d-flex">
      <div className="sidebar bg-white p-20 p-relative">
        <h3 className="p-relative txt-c mt-0">habit-up</h3>
        <ul>
          <li>
            <Link
              to="/dashboard"
              className="d-flex align-center fs-14 c-black rad-6 p-10"
            >
              <img src={photo} alt="Dashboard" style={{ width: "24px" }} />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/setting"
              className="d-flex align-center fs-14 c-black rad-6 p-10"
            >
              <img src={setting} alt="Setting" style={{ width: "24px" }} />
              <span>Setting</span>
            </Link>
          </li>
          <li>
            <Link
              to="/yourhabits"
              className="d-flex align-center fs-14 c-black rad-6 p-10"
            >
              <img src={change} alt="Habit" style={{ width: "24px" }} />
              <span>Habit</span>
            </Link>
          </li>
          <li>
            <Link
              to="/challenges"
              className="d-flex align-center fs-14 c-black rad-6 p-10"
            >
              <img src={multipe} alt="Challenge" style={{ width: "24px" }} />
              <span>Challenge</span>
            </Link>
          </li>
          <li>
            <Link
              to="/friends"
              className="d-flex align-center fs-14 c-black rad-6 p-10"
            >
              <img src={friend} alt="Friends" style={{ width: "24px" }} />
              <span>Friends</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="content w-full">
        <h1 className="p-relative">Friends</h1>
        {isFormVisible && (
          <><input
            type="search"
            placeholder="friends..."
            className="search-bar d-block mb-20 p-10 rad-6" /><button className="btn bg-blue c-white" onClick={closeForm}>
              Close
            </button></>
        )}
        <button className="btn bg-blue c-white" onClick={openForm} style={{ position: 'absolute',top: '20px',
  right: '20px'}}>
          +
        </button>
       
      
    <div className="wrapper d-grid gap-20">
    <div className="welcome bg-white rad-10 txt-c-mobile block-mobile">
      <h2 className="m-0">List of friends</h2>
            <div className="body txt-c d-flex p-20 mt-20 mb-20 block-mobile">
              <ul>
                <li>mohamed</li>
                <li>gotti</li>
              </ul>
              </div>
                </div>
              <div className="tasks p-20 bg-white rad-10">
            <h2 className="mt-0 mb-20">chat</h2>
            
            <div className="body txt-c d-flex p-20 mt-20 mb-20 block-mobile">
              <ul>
                <li>mohamed</li>
                <li>gotti</li>
              </ul>
              </div>
              </div>
              <div className="tasks p-20 bg-white rad-10">
            <h2 className="mt-0 mb-20">groups</h2>
            
            <div className="body txt-c d-flex p-20 mt-20 mb-20 block-mobile">
              <ul>
                <li>mohamed</li>
                <li>gotti</li>
              </ul>
              </div>
              </div>
      </div>
      </div>
      </div>
  );
}
