import React, { useState } from 'react';
import './App.css';

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

function json(response) {
  return response.json()
}

const getFoodDetail = (foodId) => {

  return fetch(
    "http://localhost:8080/api/v1/foods?id=" + foodId, 
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    }
  )
  .then(status)
  .then(json)
  .then(res => (new Promise((resolve, reject) => resolve(res.data))))
  .catch(err => {
    alert("err: ", err);
    return undefined;
  })
};

function App() {

  const [foodId, setFoodId]  = useState(0);
  const [dataFood, setDataFood] = useState("");

  return (
    <div className="App">
      <header className="App-header">
        <h3 color="while">App tìm món ăn theo id</h3>
        <div>
          <input className="input" name="id" placehodler="Nhập id" onChange={(e) => setFoodId(e.target.value)}/>
          <button 
            className="btnSearch"
            onClick={() => {
              getFoodDetail(foodId).then(data => setDataFood(data))
            }}
          >
            Tìm kiếm
          </button>
          <p style={{textAlign: "left"}}>Kết quả: {dataFood}</p>
        </div>
      </header>
    </div>
  );
}

export default App;