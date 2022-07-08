import React from "react";
import Tree from "react-d3-tree";
import { useCenteredTree } from "./helpers";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Images from "../../common/images/index";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const containerStyles = {
  width: "100vw",
  height: "100vh",
  //   background: "#eee",
};

const useStyles = makeStyles(
  createStyles({
    button: {
      //   display: "flex",
      //   justifyContent: "center",
      //   alignItems: "center",
      boxShadow: "none",
      border: "1px solid gainsboro",
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
      //   marginTop: "2rem",
      fontSize: "0.6rem",
      fontWeight: "bolder",
      color: "navy",
      fontFamily: "Montserrat",
      //   display: "box",
      //   lineClamp: 1,
      //   boxOrient: "vertical",

      //   WebkitLineClamp: "1",
      //   WebkitTextOrientation: "vertical",
    },
    position: {
      //   marginTop: "2rem",
      fontSize: "0.5rem",
      color: "gray",
      fontFamily: "Montserrat",
      //   marginBottom: "1rem",
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

// Here we're using `renderCustomNodeElement` render a component that uses
// both SVG and HTML tags side-by-side.
// This is made possible by `foreignObject`, which wraps the HTML tags to
// allow for them to be injected into the SVG namespace.
const renderForeignObjectNode = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps,
  classes,
}) => (
  <>
    {/* `foreignObject` requires width & height to be explicitly set. */}
    {/* {console.log(nodeDatum)} */}
    <foreignObject {...foreignObjectProps}>
      <Button
        className={classes.button}
        variant="contained"
        onClick={toggleNode}
      >
        <img
          src={nodeDatum.photo ? nodeDatum.photo : Images.noImg}
          className={classes.photo}
          alt="..."
        />
        <div className={classes.departament}>departament</div>
        {/* <div className={classes.name}>{nodeDatum.name}</div> */}
        <div className={classes.name}>
          {nodeDatum.firstName.split(" ")[0] +
            " " +
            nodeDatum.lastName.split(" ")[0]}
        </div>
        <div className={classes.position}>{nodeDatum.position}</div>
        {/* 
        {nodeDatum.children && nodeDatum.__rd3t.collapsed ? (
          <div className={classes.arrow}>
            {" "}
            <i className="md md-Keyboard-arrow-down" />
            <MdKeyboardArrowDown
              className="emDirectory-se"
              size="2em"
              color="darkcyan"
            />
          </div>
        ) : null} */}

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

        {/* <div >Age: {nodeDatum.attributes.age}</div> */}

        {/*  <IconButton className={classes.edit} aria-label="edit">
          <Edit />
        </IconButton>
        <div className={classes.attributes}>
          <AttachMoney style={{ color: "#459C7F" }} />
          <Accessible style={{ color: "#459C7F" }} />
        </div> */}
        {/* <button className={classes.perfil}>Ir al Perfil</button> */}
      </Button>
    </foreignObject>
  </>
);

export default function TreeForm({ persons }) {
  const classes = useStyles();
  const [translate, containerRef] = useCenteredTree();
  const nodeSize = { x: 300, y: 240 };
  const separation = { siblings: 1, nonSiblings: 2 };
  const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y, x: -80 };
  //   console.log(persons);

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
