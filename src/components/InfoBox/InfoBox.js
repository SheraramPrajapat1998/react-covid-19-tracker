import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import "./InfoBox.css";

const useStyle = makeStyles({
  custom_purple: {
    backgroundColor: "#473F97",
    color: "white",
  },
});

function InfoBox({ active, isRed, title, cases, total, ...props }) {
  const classes = useStyle();
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && "infoBox--selected"} ${
        isRed && "infoBox--red"
      }`}
    >
      <CardContent className={classes.custom_purple}>
        {/* Title i.e. Corona cases */}
        <Typography className="infoBox__title">{title}</Typography>
        {/* No. of cases */}
        <h2 className={`"infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
          {cases}
        </h2>
        
        {/* Total cases */}
        <Typography className="infoBox__total">{total} Total</Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
