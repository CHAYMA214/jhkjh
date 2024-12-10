import React, { useState, useEffect } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "../fireba/firebase";

const Calendrier = () => {
  const [month, setMonth] = useState([]);
  const [newMonth, setNewMonth] = useState({ target: "" });
  const [error, setError] = useState("");
  const { currentUser } = useAuth();

  useEffect(() => {
    async function loadMonthData() {
      try {
        const monthRef = doc(db, "month", currentUser.uid);
        const monthSnap = await getDoc(monthRef);

        if (monthSnap.exists()) {
          setMonth(monthSnap.data().month || []);
        }
      } catch (err) {
        console.error("Erreur lors du chargement des données :", err);
        setError("Impossible de charger les données.");
      }
    }
    loadMonthData();
  }, [currentUser.uid]);

  const handleAddMonth = async () => {
    if (!newMonth.target) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    const updatedMonth = [
      ...month,
      { id: month.length + 1, target: newMonth.target, done: false },
    ];
    setMonth(updatedMonth);
    setNewMonth({ target: "" });

    try {
      const monthRef = doc(db, "month", currentUser.uid);
      await setDoc(monthRef, { month: updatedMonth });
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
      setError("Une erreur s'est produite lors de l'enregistrement.");
    }
  };

  const handleDeleteMonth = async (monthId) => {
    const updatedMonth = month.filter((mounth) => mounth.id !== monthId);
    setMonth(updatedMonth);

    try {
      const monthRef = doc(db, "month", currentUser.uid);
      await updateDoc(monthRef, { month: updatedMonth });
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      setError("Une erreur s'est produite lors de la suppression.");
    }
  };

  return (
    <div className="quick-draft p-20 bg-white rad-10">
      <h2>Monthly Targets List</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="input-section">
        <input
          type="text"
          placeholder="📑 Add your new monthly target here.."
          className="input w-full max-w-xs"
          value={newMonth.target}
          onChange={(e) => setNewMonth({ target: e.target.value })}
        />
        <button onClick={handleAddMonth} className="btn btn-add">
        ADD
        </button>
      </div>

      <ul className="todos-list">
        {month.map((mounth) => (
          <li key={mounth.id} className={`todo-item ${mounth.done ? "done" : ""}`}>
            <span>{mounth.target}</span>
            <button onClick={() => handleDeleteMonth(mounth.id)} className="btn btn-delete">
              Supprimer
            </button>
          </li>
        ))}
      </ul>

      <div className="summary">
        <p>
          Objectifs terminés :{" "}
          <span>
            {month.filter((goal) => goal.done).length} / {month.length}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Calendrier;
