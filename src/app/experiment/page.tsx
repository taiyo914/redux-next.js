import React from "react";
import CustomSlider from "./CustomSlider";
import DndKit from "./DndKit";
// import DND from './react-beautiful-dnd'
import Exercise from "./Exercise";
import TaskManager from "./TaskManager";
import ReviewSettingsModal from "./review/ReviewSettingsModal";

export default function page() {
  return (
    <>
      {/* <CustomSlider/> */}
      {/* <DND/> */}
      <DndKit />
      {/* <Exercise/> */}
      <TaskManager />
      {/* <ReviewSettingsModal/> */}
    </>
  );
}
