import React, { Component, useEffect, useState } from 'react';

export default function App() {
    const [legends, setLegends] = useState([]);

    useEffect(() => {
        (async () => {
            const url = "https://localhost:7150/get-all-legends";
            fetch(url, {
                method: 'GET'
            })
                .then(Response => Response.json())
                .then(legendsFromServer => {
                    console.log(legendsFromServer);
                    setLegends(legendsFromServer);
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
                    {legends.length > 0 && renderLegendsTable()}
                </div>
            </div>
        </div>
    );

    function renderLegendsTable() {
        return (
            <div className="table-responsive mt-5">
                <table className="table table-bordered border-dark">
                    <thead>
                        <tr>
                            <th scope="col"> Icon </th>
                            <th scope="col"> Name </th>
                            <th scope="col"> Species </th>
                            <th scope="col"> Level </th>
                        </tr>
                    </thead>
                    <tbody>
                        {legends.map((legend) => (
                            <tr key={legend.legendId}>
                                <td><img src={legend.imgPath} width={75} height={50}/></td>
                                <td> {legend.name} </td>
                                <td> {legend.species} </td>
                                <td> Level {legend.level} </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}
