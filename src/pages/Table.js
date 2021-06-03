import React, { useState, useEffect } from "react";
import {
  getPeople,
  createPerson,
  getPerson,
  updatePerson,
  deletePerson,
} from "../services/People";

export default function Table() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [people, setPeople] = useState([]);
  const [person, setPerson] = useState({});
  const [modalView, setModalView] = useState(false);

  let create = (e) => {
    e.preventDefault();
    person.avatar = "https://www.mecallapi.com/users/cat.png";
    createPerson(person).then(
      (result) => {
        readAll();
        console.log(result);
      },
      (error) => {
        setError(error);
      }
    );
  };

  let readAll = () => {
    getPeople().then(
      (result) => {
        setIsLoaded(true);
        setPeople(result);
        console.log(result);
        document.getElementById("closeButton").click();
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    );
  };

  let readOne = (id) => {
    setModalView(true);
    getPerson(id).then(
      (result) => {
        console.log(result);
        setPerson(result.user);
      },
      (error) => {
        setError(error);
      }
    );
  };

  let update = () => {
    updatePerson(person).then(
      (result) => {
        readAll();
        console.log(result);
      },
      (error) => {
        setError(error);
      }
    );
  };

  let deletef = (id) => {
    console.log(id);
    deletePerson(id).then(
      (result) => {
        readAll();
        console.log(result);
      },
      (error) => {
        setError(error);
      }
    );
  };

  let clearForm = () => {
    person.fname = "";
    person.lname = "";
    person.username = "";
    person.email = "";
    setPerson(person);
  };

  useEffect(() => {
    readAll();
  }, []);

  let handleChange = (e) => {
    const { name, value } = e.target;
    setPerson({ ...person, [name]: value });
    console.log(person);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <table className="table table-striped table-hover">
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
              <tr
                key={person.id}
                onClick={() => readOne(person.id)}
                style={{ cursor: "pointer" }}
                data-bs-toggle="modal"
                data-bs-target="#ModalForm"
              >
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
        </table>

        <div className="text-center">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setModalView(false);
              clearForm();
            }}
            data-bs-toggle="modal"
            data-bs-target="#ModalForm"
          >
            Show Form
          </button>
        </div>

        <div
          className="modal fade"
          id="ModalForm"
          aria-labelledby="ModalFormLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="ModalFormLabel">
                  {modalView ? "View" : "Create"}
                </h5>
                <button
                  id="closeButton"
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body text-center">
                {(() => {
                  if (modalView) {
                    return (
                      <img
                        src={person.avatar}
                        alt="avatar"
                        style={{ width: "30px" }}
                      />
                    );
                  } else {
                    return "";
                  }
                })()}

                <form onSubmit={create}>
                  <div className="form-group">
                    <label htmlFor="fname">First name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="fname"
                      name="fname"
                      onChange={handleChange}
                      required
                      value={person.fname}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lname">Last name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lname"
                      name="lname"
                      onChange={handleChange}
                      required
                      value={person.lname}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      onChange={handleChange}
                      required
                      value={person.username}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      onChange={handleChange}
                      required
                      value={person.email}
                    />
                  </div>
                  <br />
                  {(() => {
                    if (modalView) {
                      return "";
                    } else {
                      return (
                        <button type="submit" className="btn btn-primary">
                          Create
                        </button>
                      );
                    }
                  })()}
                </form>
              </div>

              {(() => {
                if (modalView) {
                  return (
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => update(person)}
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => deletef(person.id)}
                      >
                        Delete
                      </button>
                    </div>
                  );
                } else {
                  return "";
                }
              })()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
