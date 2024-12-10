import "./framework.css";
import "./master.css";
import photo from "./profile-user.png"
import change from "./cigarette.png"
import setting from "./settings.png"
import multipe from "./multiple-users-silhouette.png"
import React from "react";
import friend from "./friends.png"
import { Link } from 'react-router-dom';
export default function Habit() { 
    return (
<div class="page d-flex">
            <div class="sidebar bg-white p-20 p-relative">
                <h3 class="p-relative txt-c mt-0">habit-up</h3>
                <ul>
                    <li>
                        <Link to="/dashboard" className=" d-flex align-center fs-14 c-black rad-6 p-10"><img src={photo} style={{ width: '24px' }} /><span>Dashboard</span></Link>
                    </li>
                    <li>
                        <Link to="/setting" className=" d-flex align-center fs-14 c-black rad-6 p-10"><img src={setting} style={{ width: '24px' }} /><span>Setting</span></Link>
                    </li>
                    <li>
                        <Link to="/yourhabits" className=" d-flex align-center fs-14 c-black rad-6 p-10"><img src={change} style={{ width: '24px' }} /><span>habit</span></Link>
                    </li>
                    <li>
                        <Link to="/challenges" className=" d-flex align-center fs-14 c-black rad-6 p-10"><img src={multipe} style={{ width: '24px' }} /><span>challenge</span></Link>
                    </li>
                    <li>
                        <Link to="/friends" className=" d-flex align-center fs-14 c-black rad-6 p-10"><img src={friend} style={{ width: '24px' }} /><span>friends</span></Link>
                    </li>
                </ul>
            </div>
            <div class="content w-full">
        <div class="habit-sections">
          <div id="currentHabits" class="habit-box">
            <h2>Current Habits</h2>
            <div id="habitsContainer">
            </div>
          </div>
          <div id="completedHabits" class="habit-box">
            <h2>Completed Habits</h2>
            <div id="completedHabitsContainer">
            </div>
          </div>
        </div>

        <button id="openPopup" class="add-habit-btn">Add New Habit</button>
        <div id="popup" class="popup">
          <div class="popup-content">
            <span class="close" id="closePopup">&times;</span>
            <h2>Add New Habit</h2>
            <form id="habitForm">
              <div class="labels">
                <input
                  type="text"
                  id="habitName"
                  placeholder="Enter habit name"
                  required
                  class="input-form"
                />
                <label for="habitName" class="form-label">Habit Name:</label>
              </div>


                    <div class="labels">
                        <label style={{ color: '#789DBC', for: 'goal' }}>Goal:</label>
                        <div class="goal-inputs">
                            <input class="input-form" type="number" id="goal" min="1" value="1" required />
                            <select id="goalType" style={{ color: '#aaa', for: 'goal' }}>
                                <option value="times">Times</option>
                                <option value="minutes">Minutes</option>
                                <option value="minutes">Hours</option>
                            </select>
                            <select id="goalFrequency" style={{ color: '#aaa', for: 'goal' }}>
                                <option value="day">Per Day</option>
                                <option value="week">Per Week</option>
                            </select>
                        </div>
                    </div>
                    <div class="labels">
                        <input
                            class="input-form"
                            type="text"
                            id="reminder"
                            placeholder="e.g., Drink water at 10 AM" />
                        <label for="reminder" class="form-label">Reminder:</label>
                    </div>
                    <div class="popup-buttons">
                        <button type="button" id="cancelButton" class="btn">
                            Cancel
                        </button>
                        <button type="submit" id="saveButton" class="btn btn-primary">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </div>
    );
    };