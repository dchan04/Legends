import React, { Component, useEffect, useState } from 'react';
import './App.css'

export default function App() {
    const [species, setspecies] = useState([]);

    useEffect(() => {
        (async () => {
            const url = "https://localhost:7150/get-all-species";
            fetch(url, {
                method: 'GET'
            })
                .then(Response => Response.json())
                .then(speciesFromServer => {
                    console.log(speciesFromServer);
                    setspecies(speciesFromServer);
                })
                .catch((error) => {
                    console.log(error);
                    alert(error);
                });
        })();
    }, []);

    return (
        <div className="container" >
            <div className="row min-vh-100">
                <div className="col d-flex flex-column justify-content-center align-items-center">
                    <h1>Hello this is a test</h1>
                    {species.length > 0 && renderspeciesTable()}
                </div>
            </div>
        </div>
    );

    function renderspeciesTable() {
        return (
            <div className="table-responsive mt-5">
                <table className="table table-bordered border-dark">
                    <thead>
                        <tr>
                            <th scope="col"> Icon </th>
                            <th scope="col"> Name </th>
                            <th scope="col"> Species </th>
                        </tr>
                    </thead>
                    <tbody>
                        {species.map((species) => (
                            <tr key={species.id}>
                                <td><img src={species.defaultImg} width={75} height={50}/></td>
                                <td> {species.speciesName} </td>
                                <td> {species.speciesId} </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}
