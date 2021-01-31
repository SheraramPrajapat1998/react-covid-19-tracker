import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import "./InfoBox.css";

function InfoBox({ active, isRed, title, cases, total, ...props }) {
  return (
    <Card
      // style={{ backgroundColor: "#473F97" }}
      onClick={props.onClick}
      className={`infoBox ${active && "infoBox--selected"} ${
        isRed && "infoBox--red"
      }`}
    >
      <CardContent>
        {/* Title i.e. Corona cases */}
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>
        {/* No. of cases */}
        <h2 className={`"infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
          {cases}
        </h2>

        {/* Total cases */}
        <Typography className="infoBox__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
