import './App.css';
import { useEffect, useState } from "react";
import axios from 'axios';

function App() {

  const [ state, setState ] = useState([]);

  useEffect(()=>{
    getInitialData();
  },[]);

  async function getInitialData(){
    const options = {
      method: 'GET',
      url: 'https://exercisedb.p.rapidapi.com/exercises',
      params: {limit: '10'},
      headers: {
        'X-RapidAPI-Key': '416989c663msh15a2d1c56ea3abep191e1fjsn8e1bd9673eaa',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);
      setState(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  async function btnSearch(){
    const val = document.getElementById("input").value;
    if(val != ""){
      const options = {
        method: 'GET',
        url: `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${val}`,
        params: {limit: '10'},
        headers: {
          'X-RapidAPI-Key': '416989c663msh15a2d1c56ea3abep191e1fjsn8e1bd9673eaa',
          'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
      };
  
      try {
        const response = await axios.request(options);
        // console.log(response.data);
        setState(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    else{
      console.error("Please give some input !");
    }
  }

  return (
    <div>
      <div id="navbar">
        <h1>Fit-Beat</h1>
      </div>
      <div id="search-container">
        <h3>Search Exercises :</h3>
        <input type="text" id='input' placeholder="back, cardio, neck, lower legs, shoulders, etc" />
        <button id="search" onClick={()=>{btnSearch()}}>Search</button>
      </div>
      <div id='card-main'>
        {
          state.map((item,id)=>{
            return(
              <div id="card" key={id}>
                <div id="left-section">
                  <img src={item.gifUrl} />
                </div>
                <div id="right-section">
                  
                  {/* Row 1 */}
                  <div id="row1">
                    <div id="col1">
                      <h3>BodyPart : </h3>&nbsp;
                      <p>{item.bodyPart}</p>
                    </div>
                    <div id="col2">
                      <h3>Equipment : </h3>&nbsp;
                      <p>{item.equipment}</p>
                    </div>
                    <div id="col3">
                      <h3>Exercise : </h3>&nbsp;
                      <p>{item.name}</p>
                    </div>
                  </div>

                  <hr></hr>
                  {/* Row 2 */}
                  <div id="row2">
                    <h3>Secondary Muscles : </h3>
                    {
                      item.secondaryMuscles.map((key,index)=>{
                        return(
                          <p id="sec-mus" key={index}>{index+1}) {key}</p>
                        )
                      })
                    }
                  </div>

                  <hr></hr>

                  {/* Row 3 */}
                  <div id="row3">
                    <h3>Instructions :</h3>
                    {
                      item.instructions.map((instructItem,instructId)=>{
                        return(
                          <p id="instruct" key={instructId}>{instructId+1}) {instructItem}</p>
                        )
                      })
                    }
                  </div>
                </div>
              </div> 
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
