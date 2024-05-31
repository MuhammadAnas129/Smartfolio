import React, { useState, useRef } from "react";
import { PortfolioInfoContext } from "./portfolioContext";
import baseUrl from "../../../url";
import { toast } from "react-toastify";
export default function PortfolioState(props) {
  const [showData, setShowData] = useState(true);
  const [currentState, setCurrentState] = useState("objective");
  const [showObjectives, setShowObjectives] = useState(true);
  const [disableDelete, setDisableDelete] = useState(false);
  const [deleteTemplatwId, setDeleteTemplatwId] = useState(0);
  const [isLoading, setIsLoading] = useState(0);
  const [userPortfolios, setUserPortfolios] = useState([]);
  const [projectIndex, setsProjectIndex] = useState(0);
  const [addMoreProject, setAddMoreProject] = useState(true);
  const [showSideCv, setShowSideCv] = useState(true);
  const [flowBarCount, setFlowBarCount] = useState(0);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [personalInformation, setPersonalInformation] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    linked: "",
  });
  const [projectInformation, setProjectInformation] = useState([]);
  const [currentProject, setCurrentProject] = useState({});
  const deletePortfolio = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setDisableDelete(true);

    await fetch(
      `${baseUrl}portfolios/delete-portfolio?portfolio_id=${deleteTemplatwId}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then(async (response) => {
        if (response.status) {
          await fetch(
            `${baseUrl}portfolios/get-user-portfolios?user_id=${localStorage.getItem(
              "user_id"
            )}`
          )
            .then((res) => res.json())
            .then((response) => {
              if (response.status) {
                setUserPortfolios(response.results);
              } else {
                setUserPortfolios([]);
              }
              toast.success("Sucessfully Deleted", {
                position: toast.POSITION.TOP_CENTER,
              });
              setShowDeleteDialog(false);
              setDisableDelete(false);

              setDisableDelete(false);
            });
        } else {
          toast.error(response.message, {
            position: toast.POSITION.TOP_CENTER,
          });
          setDisableDelete(false);
        }
      });
    setIsLoading(false);
  };
  const [objectives, setobjectives] = useState();
  const addAnotherProject = async () => {
    if (
      currentProject.title &&
      currentProject.started_from &&
      currentProject.ended_at &&
      currentProject.description &&
      currentProject.image &&
      currentProject.link
    ) {
      setProjectInformation((prevState) => {
        console.log("in state:", currentProject);
        let newState = [...prevState];
        newState.push(currentProject);
        return newState;
      });
      setCurrentProject({
        title: "",
        started_from: "",
        ended_at: "",
        description: "",
        image: "",
        link: "",
      });
      setAddMoreProject(false);
    } else {
      toast.error("All Fields are required", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  const ref = useRef(null);
  return (
    <PortfolioInfoContext.Provider
      value={{
        objectives,
        setobjectives,
        showObjectives,
        setShowObjectives,
        personalInformation,
        setPersonalInformation,
        userPortfolios,
        setUserPortfolios,
        projectInformation,
        setProjectInformation,
        projectIndex,
        setsProjectIndex,
        addMoreProject,
        setAddMoreProject,
        currentState,
        setCurrentState,
        flowBarCount,
        setFlowBarCount,
        showSideCv,
        setShowSideCv,
        showDeleteDialog,
        setShowDeleteDialog,
        deletePortfolio,
        disableDelete,
        setDisableDelete,
        deleteTemplatwId,
        setDeleteTemplatwId,
        isLoading,
        showData,
        setShowData,
        currentProject,
        setCurrentProject,
        addAnotherProject,
        ref,
      }}
    >
      {props.children}
    </PortfolioInfoContext.Provider>
  );
}
