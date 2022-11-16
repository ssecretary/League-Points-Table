import { Button, Card, Form, Input } from "antd";
import React, { useEffect, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

function LeaguePage() {
  const [team1, setTeam1] = useState("");
  const [point1, setPoint1] = useState("");
  const [team2, setTeam2] = useState("");
  const [point2, setPoint2] = useState("");
  const [rowData, setRowData] = useState([]);
  const [showGrid, setShowGrid] = useState(false);
  const columnDefs = [
    {
      headerName: "Team",
      field: "team",
      sortable: true,
      filter: true,
      type: "text",
    },
    {
      headerName: "Points",
      field: "points",
      sortable: true,
      filter: true,
      type: "integer",
    },
  ];

  const defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };
  useEffect(() => {}, []);

  const onChnageTeamName = (e) => {
    if (e.target.name === "team1") {
      setTeam1(e.target.value);
    } else {
      setTeam2(e.target.value);
    }
  };

  const onChnageTeamPoints = (e) => {
    console.log(e.target.name, e.target.value);
    if (e.target.name === "point1") {
      setPoint1(e.target.value);
    } else {
      setPoint2(e.target.value);
    }
  };

  const onSubmitData = () => {
    var data = [
      { team: team1, points: point1 },
      { team: team2, points: point2 },
    ];
    console.log(data);
    const url = "http://localhost:5000/api/league/add-team";
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: data }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((val) => {
          console.log(val);
          onClickAllTeams();
        });
      } else {
        res.json().then((err) => {
          console.log(err);
        });
      }
    });
  };

  const onClickAllTeams = () => {
    const url = "http://localhost:5000/api/league/get-all-teams";
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((val) => {
          console.log(val);
          setRowData(val);
          setShowGrid(true);
        });
      } else {
        res.json().then((err) => {
          console.log(err);
        });
      }
    });
  };

  return (
    <div
      className="row"
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Card
        title="Enter Details"
        style={{ width: "80%", justifyContent: "center", textAlign: "center" }}
      >
        <br />
        <div className="col-md-12 col-lg-12">
          <Form.Item
            name="team1"
            label="Team 1"
            rules={[
              {
                required: true,

                message: "Enter Team 1 Data",
              },
            ]}
          >
            <Input type="text" onChange={onChnageTeamName} name="team1" />
          </Form.Item>
        </div>
        <br />
        <div className="col-md-12 col-lg-12">
          <Form.Item
            name="point1"
            label="Team 1 Point"
            rules={[
              {
                required: true,

                message: "Enter Team 1 Points",
              },
            ]}
          >
            <Input type="number" onChange={onChnageTeamPoints} name="point1" />
          </Form.Item>
        </div>
        <br />
        <div className="col-md-12 col-lg-12">
          <Form.Item
            name="team1"
            label="Team 2"
            rules={[
              {
                required: true,

                message: "Enter Team 2 Data",
              },
            ]}
          >
            <Input type="text" onChange={onChnageTeamName} name="team2" />
          </Form.Item>
        </div>
        <br />
        <div className="col-md-12 col-lg-12">
          <Form.Item
            name="point2"
            label="Team 2 Point"
            rules={[
              {
                required: true,

                message: "Enter Team 2 Points",
              },
            ]}
          >
            <Input type="number" onChange={onChnageTeamPoints} name="point2" />
          </Form.Item>
        </div>
        <br />
        <Button onClick={onSubmitData} type="primary">
          Submit Data
        </Button>
        <br />
        <br />
        <Button onClick={onClickAllTeams} type="primary">
          Get All Teams
        </Button>
        <br />
        <br />
        {showGrid && (
          <div
            style={{ height: 400 }}
            id="grid"
            className="table-responsive table-bordered
       table table-hover table-bordered results
       ag-theme-balham gridViewDisplay"
          >
            <AgGridReact columnDefs={columnDefs} rowData={rowData} />
          </div>
        )}
      </Card>
    </div>
  );
}

export default LeaguePage;
