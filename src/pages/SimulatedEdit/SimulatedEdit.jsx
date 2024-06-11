import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./SimulatedEdit.css";
import NavBar from "../../components/NavBar/NavBar";
import { getAllSimulated } from "../../config/config";
import { Pagination } from "react-bootstrap";

export default function SimulatedEdit() {
  const [simulateds, setSimulateds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [simulatedsPerPage] = useState(5);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [tempSearchTerm, setTempSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [editableOnly, setEditableOnly] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSimulateds() {
      const data = await getAllSimulated();
      setSimulateds(data);
      setLoading(false);
    }
    fetchSimulateds();
  }, []);

  const handleSearchClick = () => {
    setSearchTerm(tempSearchTerm);
    setIsSearchActive(true);
    setCurrentPage(1);
  };

  const handleResetClick = () => {
    setSearchTerm("");
    setTempSearchTerm("");
    setStartDate("");
    setEndDate("");
    setEditableOnly(false);
    setIsSearchActive(false);
    setCurrentPage(1);
  };

  const filteredSimulateds = simulateds.filter((simulated) => {
    const isNameMatch = simulated.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const isDateMatch =
      (!startDate || new Date(simulated.createdAt) >= new Date(startDate)) &&
      (!endDate || new Date(simulated.createdAt) <= new Date(endDate));
    const isEditableMatch = editableOnly
      ? !simulated.finished && !simulated.available
      : true;
    return isNameMatch && isDateMatch && isEditableMatch;
  });

  const indexOfLastSimulated = currentPage * simulatedsPerPage;
  const indexOfFirstSimulated = indexOfLastSimulated - simulatedsPerPage;
  const currentSimulateds = filteredSimulateds.slice(
    indexOfFirstSimulated,
    indexOfLastSimulated
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const displayedSimulateds = isSearchActive
    ? filteredSimulateds
    : currentSimulateds;

  return (
    <div>
      <NavBar />
      <div className="editPageWrapper">
        <h1 className="titleEditSim">Lista de Simulados </h1>
        <div className="actionBarSimEdit">
          <div className="search-container">
            <div className="search-bar">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input
                type="text"
                placeholder="Buscar simulados..."
                value={tempSearchTerm}
                onChange={(e) => setTempSearchTerm(e.target.value)}
              />
            </div>
            <button className="search-button1" onClick={handleSearchClick}>
              Buscar
            </button>
          </div>
        </div>
        <div className="contentWrapper">
          <div className="leftFilterWrapper">
            <div className="checkboxFilter">
              <input
                type="checkbox"
                checked={editableOnly}
                onChange={(e) => setEditableOnly(e.target.checked)}
              />
              <label>Mostrar apenas simulados editáveis</label>
            </div>
            <div className="dateFilter">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                placeholder="Data de início"
              />
              <span>à</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                placeholder="Data de fim"
              />
            </div>
            <button className="reset-button" onClick={handleResetClick}>
              Resetar filtros
            </button>
          </div>
          <div className="simulatedWrapperEdit">
            {loading ? (
              <h1 className="text-center mt-5 color-text bold-weight">
                Carregando...
              </h1>
            ) : (
              displayedSimulateds.map((simulated) => (
                <div
                  className="btnEditSimulated"
                  key={simulated._id}
                  onClick={() =>
                    navigate(`/detalhes-do-simulado/${simulated._id}`)
                  }
                >
                  <span>{simulated.name.toUpperCase()}</span>
                </div>
              ))
            )}
          </div>
        </div>
        {!isSearchActive && (
          <Pagination className="justify-content-center">
            <Pagination.Prev
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {Array.from({
              length: Math.ceil(filteredSimulateds.length / simulatedsPerPage),
            }).map((_, index) => (
              <Pagination.Item
                key={index}
                active={index + 1 === currentPage}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={
                currentPage ===
                Math.ceil(filteredSimulateds.length / simulatedsPerPage)
              }
            />
          </Pagination>
        )}
      </div>
    </div>
  );
}
