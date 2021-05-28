import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TableBootstrap from "react-bootstrap/Table";

export default function Table() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [people, setItems] = useState([]);

  useEffect(() => {
    fetch("https://www.mecallapi.com/api/users")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          console.log(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <TableBootstrap striped bordered hover>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Username</th>
            <th scope="col">Avatar</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person) => (
            <tr key={person.id}>
              <th scope="row">{person.id}</th>
              <td>
                {person.fname} {person.lname}
              </td>
              <td>{person.username}</td>
              <td>
                <img
                  src={person.avatar}
                  alt="avatar"
                  style={{ width: "30px" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </TableBootstrap>
    );
  }
}
