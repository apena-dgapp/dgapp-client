import React from "react";
import Tree from "react-d3-tree";
import { useCenteredTree } from "./helpers";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Images from "../../common/images/index";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useHistory } from "react-router-dom";

const containerStyles = {
  width: "130vw",
  height: "130rem",
  // background: "#eee",
};

var history;

const employeeProfile = (e) => {
  const employeeId = e.currentTarget.id;
  history.push({
    pathname: "./employee",
    state: employeeId,
  });
};

const useStyles = makeStyles(
  createStyles({
    button: {
      boxShadow: "none",
      border: "1px solid darkcyan",
      borderRadius: "0.2rem",
      position: "relative",
      maxWidth: "10rem",
      minWidth: "10rem",
      maxHeight: "13rem",
      minHeight: "13rem",
      background: "white",
      color: "black",
      "& > span": {
        flexFlow: "column",
      },
      "&:hover": {
        background: "white",
      },
    },
    departament: {
      marginTop: "2rem",
      fontSize: "0.5rem",
      fontWeight: "bolder",
      color: "gray",
      fontFamily: "Montserrat",
    },
    name: {
      fontSize: "0.6rem",
      fontWeight: "bolder",
      color: "navy",
      fontFamily: "Montserrat",
    },
    position: {
      fontSize: "0.5rem",
      color: "gray",
      fontFamily: "Montserrat",
    },
    photo: {
      width: "5rem",
      height: "5rem",
      borderRadius: "2.5rem",
      objectFit: "cover",
      border: "3px solid darkcyan",
      top: "0",
      position: "absolute",
      marginTop: "0.5rem",
    },
    perfil: {
      width: "10rem",
      height: "1.5rem",
      border: "none",
      backgroundColor: "rgb(56, 69, 83)",
      color: "white",
      position: "absolute",
      bottom: "0",
    },
    arrow: {
      position: "absolute",
      bottom: 0,
    },
  })
);

const renderForeignObjectNode = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps,
  classes,
}) => (
  <>
    <foreignObject {...foreignObjectProps}>
      <Button
        className={classes.button}
        variant="contained"
        onClick={toggleNode}
      >
        <img
          onClick={employeeProfile}
          id={nodeDatum.personId}
          src={nodeDatum.photo ? nodeDatum.photo : Images.noImg}
          className={classes.photo}
          alt="..."
        />
        {!nodeDatum.Departament ? (
          <div className={classes.departament}>No Definido</div>
        ) : (
          <div className={classes.departament}>
            {nodeDatum.Departament.name}
          </div>
        )}
        <div className={classes.name}>
          {nodeDatum.firstName.split(" ")[0] +
            " " +
            nodeDatum.lastName.split(" ")[0]}
        </div>
        <div className={classes.position}>{nodeDatum.position}</div>
        {nodeDatum.children ? (
          nodeDatum.__rd3t.collapsed ? (
            <div className={classes.arrow}>
              {" "}
              <i className="md md-Keyboard-arrow-down" />
              <MdKeyboardArrowDown
                className="emDirectory-se"
                size="2em"
                color="darkcyan"
              />
            </div>
          ) : (
            <div className={classes.arrow}>
              {" "}
              <i className="md md-Keyboard-arrow-up" />
              <MdKeyboardArrowUp
                className="emDirectory-se"
                size="2em"
                color="gray"
              />
            </div>
          )
        ) : null}
      </Button>
    </foreignObject>
  </>
);

export default function TreeForm({ persons }) {
  const classes = useStyles();
  const [translate, containerRef] = useCenteredTree();
  const nodeSize = { x: 300, y: 240 };
  const separation = { siblings: 1, nonSiblings: 1 };
  const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y, x: -80 };

  history = useHistory();
  return (
    <div style={containerStyles} ref={containerRef}>
      <Tree
        data={persons}
        translate={translate}
        nodeSize={nodeSize}
        separation={separation}
        transitionDuration="1000"
        pathFunc="step"
        rootNodeClassName="node__root"
        branchNodeClassName="node__branch"
        leafNodeClassName="node__leaf"
        renderCustomNodeElement={(rd3tProps) =>
          renderForeignObjectNode({ ...rd3tProps, foreignObjectProps, classes })
        }
        orientation="vertical"
      />
    </div>
  );
}
