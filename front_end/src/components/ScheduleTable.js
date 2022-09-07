import { Checkbox } from "@mui/material";
import React from "react";
import styled from "styled-components";

const ScheduleTable = () => {
  return (
    <ScheduleTableStyle>
      <table id="table">
        <tr>
          <th>
            <Checkbox color="success" />
          </th>
          <th>Contact</th>
          <th>Country</th>
        </tr>
        {Array(10)
          .fill(2)
          .map((v, i) => (
            <tr key={i}>
              <td>
                <Checkbox color="success" />
              </td>
              <td>Maria Anders</td>
              <td>Germany</td>
            </tr>
          ))}
        {/* <tr>
          <td>Alfreds Futterkiste</td>
          <td>Maria Anders</td>
          <td>Germany</td>
        </tr>
        <tr>
          <td>Berglunds snabbköp</td>
          <td>Christina Berglund</td>
          <td>Sweden</td>
        </tr>
        <tr>
          <td>Centro comercial Moctezuma</td>
          <td>Francisco Chang</td>
          <td>Mexico</td>
        </tr>
        <tr>
          <td>Ernst Handel</td>
          <td>Roland Mendel</td>
          <td>Austria</td>
        </tr>
        <tr>
          <td>Island Trading</td>
          <td>Helen Bennett</td>
          <td>UK</td>
        </tr>
        <tr>
          <td>Königlich Essen</td>
          <td>Philip Cramer</td>
          <td>Germany</td>
        </tr>
        <tr>
          <td>Laughing Bacchus Winecellars</td>
          <td>Yoshi Tannamuri</td>
          <td>Canada</td>
        </tr>
        <tr>
          <td>Magazzini Alimentari Riuniti</td>
          <td>Giovanni Rovelli</td>
          <td>Italy</td>
        </tr>
        <tr>
          <td>North/South</td>
          <td>Simon Crowther</td>
          <td>UK</td>
        </tr>
        <tr>
          <td>Paris spécialités</td>
          <td>Marie Bertrand</td>
          <td>France</td>
        </tr> */}
      </table>
    </ScheduleTableStyle>
  );
};

const ScheduleTableStyle = styled.div`
  #table {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    border: none;
    width: 100%;
  }

  #table td,
  #table th {
    border-bottom: 1px solid #ddd;
    padding: 12px 8px;
  }

  #table tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  #table tr:hover {
    background-color: #ddd;
  }

  #table th {
    padding-top: 17px;
    padding-bottom: 17px;
    text-align: left;
    background-color: #006a66;
    color: white;
  }
`;

export default ScheduleTable;
