import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "../fireba/firebase";
import photo from "./profile-user.png";
import change from "./cigarette.png";
import setting from "./settings.png";
import multipe from "./multiple-users-silhouette.png";
import friend from "./friends.png";

function Setting() {
  const { currentUser, updateUserPassword, updateUserEmail } = useAuth();
  const [userData, setUserData] = useState({ name: "" });
  const [email, setemail] = useState(currentUser?.email || "");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadUserData() {
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }
    }
    loadUserData();
  }, [currentUser]);

  async function handleUpdateProfile() {
    const userRef = doc(db, "users", currentUser.uid);
    setLoading(true);
    setError("");

    try {
      await updateDoc(userRef, { name: userData.name });
      await updateUserEmail(email);
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile");
    } finally {
      setLoading(false);
    }
  }

  function handlePasswordChange(e) {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    updateUserPassword(password)
      .then(() => {
        alert("Password updated successfully");
        setPassword("");
        setPasswordConfirm("");
      })
      .catch((err) => {
        setError("Failed to update password. " + err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <div className="page d-flex">
    {/* Sidebar */}
    <div className="sidebar bg-white p-20 p-relative">
      <h3 className="p-relative txt-c mt-0">habit-up</h3>
      <ul>
        <li>
          <Link to="/dashboard" className="d-flex align-center fs-14 c-black rad-6 p-10">
            <img src={photo} style={{ width: "24px" }} alt="Dashboard Icon" />
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/setting" className="d-flex align-center fs-14 c-black rad-6 p-10">
            <img src={setting} style={{ width: "24px" }} alt="Settings Icon" />
            <span>Setting</span>
          </Link>
        </li>
        <li>
          <Link to="/yourhabits" className="d-flex align-center fs-14 c-black rad-6 p-10">
            <img src={change} style={{ width: "24px" }} alt="Habit Icon" />
            <span>Habit</span>
          </Link>
        </li>
        <li>
          <Link to="/challenges" className="d-flex align-center fs-14 c-black rad-6 p-10">
            <img src={multipe} style={{ width: "24px" }} alt="Challenge Icon" />
            <span>Challenge</span>
          </Link>
        </li>
        <li>
          <Link to="/friends" className="d-flex align-center fs-14 c-black rad-6 p-10">
            <img src={friend} style={{ width: "24px" }} alt="Friends Icon" />
            <span>Friends</span>
          </Link>
        </li>
      </ul>
    </div>

      <div className="content w-full">
        <h1>Settings</h1>
        <div className="settings-page m-20 d-grid gap-20">
          <div className="p-20 bg-white rad-10">
            <h2>General Info</h2>
            <input
              type="text"
              value={userData.name}
              name="name"
              onChange={handleInputChange}
              className="d-block mb-10"
              placeholder="Name"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="d-block mb-10"
              placeholder="Email"
            />
            <button onClick={handleUpdateProfile} className="btn bg-blue c-white">
              Save Changes
            </button>
          </div>
          <div className="p-20 bg-white rad-10">
            <h2>Security Info</h2>
            {error && <p className="error c-red">{error}</p>}
            <form onSubmit={handlePasswordChange}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New Password"
                className="d-block mb-10"
              />
              <input
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                placeholder="Confirm Password"
                className="d-block mb-10"
              />
              <button type="submit" className="btn bg-blue c-white" disabled={loading}>
                {loading ? "Updating..." : "Update Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;
