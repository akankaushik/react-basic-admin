// import logo from './logo.svg';
import './App.css';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react';
import { useEffect, useState } from "react"

function App() {



  const handleClick = (value) => {


    for (let i = 0; i < document.getElementsByClassName("data-row").length; i++) {
      const element = document.getElementsByClassName("data-row")[i];
      element.classList.remove('active');

    }

    const element2 = document.getElementById(value.id);
    element2.classList.toggle('active')

    setDisp("block")


    setName(value.firstName + " " + value.lastName)
    setDescrip(value.description)
    setAddress(value.address.streetAddress)
    setCity(value.address.city)
    setState(value.address.state)
    zipSet(value.address.zip)
    console.log(value)
  }

  


  const [data, setData] = useState([]);

  // const [query, setQuery] = useState("")
  // const [active, setActive] = React.useState(false);

  const [disp, setDisp] = useState("none")
  const [name, setName] = useState("")
  const [descrip, setDescrip] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [zip, zipSet] = useState("")

  useEffect(() => {
    fetch("http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D")
      .then(response => response.json())
      .then(json => setData(json))
  }, []);

  const slicedItems = data.slice(0, 5)

  const handleChange = (value) => {
    console.log(value);
    const filteredData = slicedItems.filter((post) => {
      
        return post.firstName.toLowerCase().indexOf(value.toLowerCase()) !== -1 || post.firstName.toLowerCase().indexOf(value.toLowerCase()) !== -1 || post.email.toLowerCase().indexOf(value.toLowerCase()) !== -1 ;

    })
    setData(filteredData)  
  }




  return (
    <div className="App">
      {
        <div id='main'>
          <div id="table-section">

            <form action="/">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <input type="text" placeholder="Enter something" name="search-box" id="search-box" onChange={event => handleChange(event.target.value)} />
            </form>


            <div id="table-wrapper">

              <div id="table-headers">
                <table>
                  <thead>
                    <tr>
                      <th className="column1">Id</th>
                      <th className="column2">FirstName</th>
                      <th className="column3">LastName</th>
                      <th className="column4">Email</th>
                      <th className="column5">Phone</th>
                    </tr>
                  </thead>
                </table>
              </div>

              <div id="table-data">
                <table>
                  <tbody>


                    {slicedItems.slice(0, 5).map((user, index) => (
                      <tr className="data-row" id={user.id} onClick={() => handleClick(user)}  >
                        <td className="column1">{user.id}</td>
                        <td className="column2">{user.firstName}</td>
                        <td className="column3">{user.lastName}</td>
                        <td className="column4">{user.email}</td>
                        <td className="column5">{user.phone}</td>
                      </tr>

                    ))}

                  </tbody>
                </table>
              </div>

            </div>

          </div>


          <div id="info-wrapper">
            <h1>Details</h1>
            <p>Click on a table item to get detailed information</p>

            <div id="info-content" style={{ display: disp }}>
              <div><b>User selected:</b> {name}</div>
              <div>
                <p>Description: </p>
                <textarea cols="50" rows="5" readonly value={descrip} />

              </div>
              <div><b>Address:</b>{address}</div>
              <div><b>City:</b>{city}</div>
              <div><b>State:</b>{state}</div>
              <div><b>Zip:</b>{zip}</div>
            </div>
          </div>
        </div>

      }
    </div>
  );
}

export default App;
// setVisible(!visible)
// style={{ display: visible ? 'block' : 'none' }}