import React from "react";
import styled from "@emotion/styled";
import { Tree, TreeNode } from "react-organizational-chart";

const StyledNode = styled.div`
  padding: 5px;
  border-radius: 8px;
  display: inline-block;
  border: 1px solid red;
  min-width: 6rem;
  max-width: 6rem;
  height: 8rem;
  //   display: none;
`;

const treeData = {
  component: <StyledNode>Root</StyledNode>,
  childrens: [
    {
      component: <StyledNode>Child 1</StyledNode>,
      childrens: [
        {
          component: (
            <StyledNode>
              <p>Grand Child</p>
              <span>Custom Tag</span>
            </StyledNode>
          ),
        },
        {
          component: <StyledNode>Grand Child 1</StyledNode>,
        },
      ],
    },
    {
      component: <StyledNode>Child 2</StyledNode>,
      childrens: [
        {
          component: <StyledNode>Grand Child 2</StyledNode>,
        },
        {
          component: <StyledNode>Grand Child 3</StyledNode>,
        },
      ],
    },
  ],
};
const EmployeeTreeForm = ({ persons }) => {
  const renderChildNodes = (children) => {
    if (!children) {
      return null;
    }
    return (
      <>
        {children.map((x) => (
          <TreeNode
            key={x.personId}
            label={<StyledNode>{x.fullName}</StyledNode>}
          >
            {renderChildNodes(x.children)}
          </TreeNode>
        ))}
      </>
    );
  };

  //   console.log(persons);
  return (
    <Tree
      lineWidth={"2px"}
      lineColor={"green"}
      lineBorderRadius={"10px"}
      label={persons ? <StyledNode>{persons.fullName}</StyledNode> : null}
      key={persons?.personId}
    >
      {persons && renderChildNodes(persons.children)}
    </Tree>
  );
};

export default EmployeeTreeForm;
