import "./BoardPage.css";

export default function BoardPage() {
  return (
    <div className="board-body">
      <div className="board-container">
        <h1 className="board-titre">MES INFORMATIONS</h1>
        <div className="card-infos">
          <img
            src="../../../public/images/city (3).png"
            alt="avatar"
            className="img-avatar"
          />
          <div className="infos-user">
            <div className="nom-email">
              <p> Lois Lane</p>
              <p>lane@dailyplanet.com</p>
            </div>
            <div className="pass-password">
              <p>65616516516</p>
              <p>**********</p>
            </div>
          </div>

          <button type="submit" className="modifier-btn">
            MODIFIER
          </button>
        </div>
        <h1 className="board-titre">MES SIGNALEMENTS</h1>
        <div className="card-signalement">
          <img
            className="img-incident"
            src="../../../public/images/lantern-3803270_640.jpg"
            alt="incident"
          />
          <div className="infos-incident">
            <p> Lampadaire cassé</p>
            <p>24 rue des chercherus d´alternance</p>
            <p>01/06/2024</p>
          </div>

          <div className="status">⚪ ENVOYÉ 🟡 EN COURS ⚪ RÉSOLU</div>
        </div>
      </div>
      <navLink type="submit" className="signalement-btn">
        AJOUTER UN SIGNALEMENT
      </navLink>
    </div>
  );
}
