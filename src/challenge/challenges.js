import React, { useState, useEffect } from "react";
import "./framework.css";
import "./master.css";
import photo from "./profile-user.png";
import change from "./cigarette.png";
import setting from "./settings.png";
import multipe from "./multiple-users-silhouette.png";
import friend from "./friends.png";
import team1 from "./team-01.png";
import team2 from "./team-02.png";
import team3 from "./team-03.png";
import team4 from "./team-04.png";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../fireba/firebase";
export default function Challenge() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedChallengeId, setSelectedChallengeId] = useState(null);

  const openForm = (challengeId) => {
    setIsFormVisible(true);
    setSelectedChallengeId(challengeId); // Track which challenge's details are open
  };
    const Enrol =() => {
      const loadUserAata = async () => {
        try {
          const challengeRef = doc(db, "habit", currentUser.uid);
          await setDoc(challengeRef, { challenges: updatedChallenges });
          setChallenges(updatedChallenges);
          setNewChallenge({ title: "", date: "", description: "", progress: 0, action: "" });
        } catch (error) {
          console.error("Error saving challenge:", error);
        }
      };
    
      useEffect(() => {
        loadUserAata();
      }, [currentUser]);
    setIsFormVisible(false);
    setSelectedChallengeId(null); // Reset the challenge id when closing the popup
  };
  const closeForm = () => {
    setIsFormVisible(false);
    setSelectedChallengeId(null); // Reset the challenge id when closing the popup
  };
  
  const { currentUser } = useAuth();
    const [newChallenge, setNewChallenge] = useState({
    title: "",
    date: "",
    description: "",
    progress: 0,
    action: "",
  });
  const mainchallenge=[{
    id: 1,
    title: "Elzero Dashboard",
    date: "15/10/2021",
    description: "Elzero Dashboard Project Design And Programming And Hosting",
    action: "Learn new Language",
    team: [team1, team2, team3, team4, team4],
  },
  {
    id:2,
    title: "Academy Portal",
    date: "15/6/2022",
    description: "Academy Portal Project Design And Programming",
    action: "Go to Gym",
    team: [team3, team1, team4],
  },
  {
    id: 3,
    title: "Chatting Application",
    date: "15/6/2022",
    description: "Chatting Application Project Design",
    action: "Learn Design",
    team: [team3, team2, team4],
  },
  {
    id: 4,
    title: "Ahmed Dashboard",
    date: "15/6/2022",
    description: "Ahmed Dashboard Project Design And Programming And Hosting",
    action: "Stop smoking",
    team: [team1, team2, team3, team4],
  },
  {
    id: 5,
    title: "Ahmed Portal",
    date: "15/6/2022",
    description: "Ahmed Portal Project Design And Programming",
    action: "Play football",
    team: [team3, team4, team1],
  }]

  const [challenges, setChallenges] = useState([]);
  const loadUserData = async () => {
    try {
     const challengeRef = doc(db, "challenge", currentUser.uid);
      const challengeSnap = await getDoc(challengeRef);

      if (challengeSnap.exists()) {
        setChallenges(challengeSnap.data().challenges || []);
      }
    } catch (err) {
      console.error("Failed to load data:", err);
    }
  };

  useEffect(() => {
    loadUserData();
  }, [currentUser]);
  // Add a new challenge
  const handleAddChallenge = async () => {
    if (
      !newChallenge.title ||
      !newChallenge.date ||
      !newChallenge.description ||
      !newChallenge.action
    ) {
      alert("Please fill all fields.");
      return;
    }

    const updatedChallenges = [
      ...challenges,
      {
        id: challenges.length + 1,
        ...newChallenge,
        team: [team4]
        ,
      },
    ];

    try {
      const challengeRef = doc(db, "challenge", currentUser.uid);
      await setDoc(challengeRef, { challenges: updatedChallenges });
      setChallenges(updatedChallenges);
      setNewChallenge({ title: "", date: "", description: "", progress: 0, action: "" });
    } catch (error) {
      console.error("Error saving challenge:", error);
    }
  };
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

      {/* Contenu principal */}
      <div className="content w-full">
        <h1 className="p-relative">Community Challenges</h1>
{isFormVisible && (
        <div className="add-challenge-form bg-white p-20 rad-6 m-20">
          <h3>Add a New Challenge</h3>
          <input
            type="text"
            placeholder="Title"
            value={newChallenge.title}
            onChange={(e) => setNewChallenge({ ...newChallenge, title: e.target.value })}
            className="d-block mb-10 w-full"
          />
          <input
            type="text"
            placeholder="Date"
            value={newChallenge.date}
            onChange={(e) => setNewChallenge({ ...newChallenge, date: e.target.value })}
            className="d-block mb-10 w-full"
          />
          <input
            type="text"
            placeholder="Description"
            value={newChallenge.description}
            onChange={(e) =>
              setNewChallenge({ ...newChallenge, description: e.target.value })
            }
            className="d-block mb-10 w-full"
          />
          <input
            type="text"
            placeholder="Action"
            value={newChallenge.action}
            onChange={(e) => setNewChallenge({ ...newChallenge, action: e.target.value })}
            className="d-block mb-10 w-full"
          />
          <button onClick={handleAddChallenge} className="btn bg-blue c-white">
            Add Challenge
          </button>
          <button className="btn bg-blue c-white" onClick={closeForm} style={{margin:'5px'}}>
              Close
            </button>
        </div>)}
        <button className="btn bg-blue c-white" onClick={openForm} style={{ position: 'absolute',top: '20px',
  right: '20px'}}>
          +
        </button>
        <div className="projects-page d-grid m-20 gap-20">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="project bg-white p-20 rad-6 p-relative">
              <span className="date fs-13 c-grey">{challenge.date}</span>
              <h4 className="m-0">{challenge.title}</h4>
              <p className="c-grey mt-10 mb-10 fs-14">{challenge.description}</p>
              <div className="team">
                {challenge.team.map((team2, index) => (
                  <a key={index} href="#!">
                    <img src={team2} />
                  </a>
                ))}
              </div>
              <div className="do d-flex">
                <span className="fs-13 rad-6 bg-eee">{challenge.action}</span>
              </div>
              <button
                className="see-more d-block fs-14 bg-blue c-white w-fit btn-shape">
                See More..
              </button>
            </div>
          ))}
  {mainchallenge.map((challenge) => (
  <div key={challenge.id} className="projects-page d-grid m-20 gap-20">
    <div className="project bg-white p-20 rad-6 p-relative">
      <span className="date fs-13 c-grey">{challenge.date}</span>
      <h4 className="m-0">{challenge.title}</h4>
      <p className="c-grey mt-10 mb-10 fs-14">{challenge.description}</p>
      <div className="team">
        {challenge.team.map((team2, index) => (
          <a key={index} href="#!">
            <img src={team2} alt="Team member" />
          </a>
        ))}
      </div>
      <div className="do d-flex">
        <span className="fs-13 rad-6 bg-eee">{challenge.action}</span>
      </div>
      <button
        className="see-more d-block fs-14 bg-blue c-white w-fit btn-shape"
        onClick={() => openForm(challenge.id)} // Pass the challenge id
      >
        See More..
      </button>
    </div>

    {/* Show the popup for the specific challenge */}
    {isFormVisible && selectedChallengeId === challenge.id && (
      <div className="popup d-flex p-20 bg-eee" id={`popup-${challenge.id}`}>
        <h2 className="mt-0 mb-10 p-10">Challenge Details</h2>
        <input
          className="enrol d-block fs-14 bg-blue c-white w-fit btn-shape"
          type="submit"
          value="Enroll"
          style={{ margin: '5px' }}
          onClick={() => Enrol(challenge.id)} // Handle enroll logic
        />
        <input
          className="close d-block fs-14 bg-blue c-white w-fit btn-shape"
          type="submit"
          value="Close"
          style={{ margin: '5px' }}
          onClick={closeForm}
        />
      </div>
    )}
  </div>
))}
            </div>
            </div>
      </div>
  );
}
