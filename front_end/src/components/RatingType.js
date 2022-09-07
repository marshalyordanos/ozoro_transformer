import React from "react";
import styled from "styled-components";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import { IconButton } from "@mui/material";
const RatingType = ({ datas, setRatingDatas }) => {
  const deleteHandler = (id) => {
    setRatingDatas(datas.filter((v, i) => id !== i));
  };
  return (
    <RatingTypeStyle className="rating_display w-[40vw]  h-[200px] border-[2px] border-[#006A66] rounded-lg">
      <table>
        <tbody>
          <tr>
            <th>Type</th>
            <th>Value</th>
          </tr>
          {datas.map((data, i) => (
            <tr key={i}>
              <td>{data.type}</td>
              <td>
                {data.value}
                {data.unit}
              </td>
              <td>
                <IconButton onClick={() => deleteHandler(i)}>
                  <RemoveCircleOutlineOutlinedIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </RatingTypeStyle>
  );
};

const RatingTypeStyle = styled.div`
  overflow-y: auto;
  display: flex;
  justify-content: center;
  table {
    border-collapse: collapse;
    width: 90%;
  }
  th {
    padding: 8px;
    color: #006a66;
    text-align: left;
  }
  td {
    padding: 8px;
    text-align: left;
    color: #006a66;
    border-bottom: 1px solid #ddd;
  }
  @media screen and (max-width: 700px) {
    .rating_display {
      width: 90vw;
    }
  }
`;
export default RatingType;
