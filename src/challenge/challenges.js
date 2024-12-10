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
import { Link } from "react-router-dom";

export default function Challenge() {
  const [openPopupId, setOpenPopupId] = useState(null); // Popup ouvert
  const [challenges, setChallenges] = useState([
  ]);
  const [newChallenge, setNewChallenge] = useState({
    title: "",
    date: "",
    description: "",
    progress: 0,
    action: "",
  });
  const [searchQuery, setSearchQuery] = useState(""); // Recherche
  const [filteredChallenges, setFilteredChallenges] = useState(challenges); // Défis filtrés

  // Filtrer les défis à chaque modification de la recherche ou des défis
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredChallenges(challenges); // Afficher tous les défis si pas de recherche
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredChallenges(
        challenges.filter(
          (challenge) =>
            challenge.title.toLowerCase().includes(query) ||
            challenge.description.toLowerCase().includes(query) ||
            challenge.action.toLowerCase().includes(query)
        )
      );
    }
  }, [searchQuery, challenges]);

  // Ajouter un nouveau défi
  const handleAddChallenge = () => {
    if (
      !newChallenge.title ||
      !newChallenge.date ||
      !newChallenge.description ||
      !newChallenge.action
    ) {
      alert("Please fill all fields.");
      return;
    }

    const newId = challenges.length + 1;
    setChallenges([
      ...challenges,
      {
        id: newId,
        ...newChallenge,
        team: [team1, team2], // Équipe par défaut
      },
    ]);
    setNewChallenge({ title: "", date: "", description: "", progress: 0, action: "" }); // Réinitialiser
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

        {/* Recherche */}
        <input
          type="search"
          placeholder="Search challenges..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar d-block mb-20 p-10 rad-6"
        />

        {/* Formulaire d'ajout */}
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
        </div>

        {/* Liste des défis */}
        <div className="projects-page d-grid m-20 gap-20">
          {filteredChallenges.map((challenge) => (
            <div key={challenge.id} className="project bg-white p-20 rad-6 p-relative">
              <span className="date fs-13 c-grey">{challenge.date}</span>
              <h4 className="m-0">{challenge.title}</h4>
              <p className="c-grey mt-10 mb-10 fs-14">{challenge.description}</p>
              <div className="team">
                {challenge.team.map((member, index) => (
                  <a key={index} href="#!">
                    <img src={member} alt="Team Member" />
                  </a>
                ))}
              </div>
              <div className="do d-flex">
                <span className="fs-13 rad-6 bg-eee">{challenge.action}</span>
              </div>
              <button
                className="see-more d-block fs-14 bg-blue c-white w-fit btn-shape"
                onClick={() => setOpenPopupId(challenge.id)}
              >
                See More..
              </button>
              {openPopupId === challenge.id && (
                <div className="popup d-flex p-20 bg-eee">
                  <h2 className="mt-0 mb-10 p-10">Challenge Details</h2>
                  <p className="c-black mt-10 mb-10 fs-14">{challenge.description}</p>
                  <button
                    className="close d-block fs-14 bg-blue c-white w-fit btn-shape"
                    onClick={() => setOpenPopupId(null)}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
