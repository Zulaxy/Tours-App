import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";

const url = "https://course-api.com/react-tours-project";

function App(props) {
  const [loading, setLoading] = useState(false);
  const [tours, setTours] = useState([]);

  const removeTourHandler = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  const fetchTours = async () => {
    setLoading(true);

    try {
      const response = await fetch(url);
      const tours = await response.json();
      setLoading(false);
      setTours(tours);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>No Tours Left</h2>
          <button onClick={fetchTours} className="btn">
            Get Tours
          </button>
        </div>
      </main>
    );
  }

  return (
    <main>
      {!loading && <Tours tours={tours} removeTour={removeTourHandler} />}
      {loading && <Loading />}
    </main>
  );
}

export default App;
