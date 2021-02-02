import React from "react";
import { Dialog } from "@material-ui/core";
import { DisappearedLoading } from "react-loadingg";

const ModalLoading = ({ loading = false }) => {
  return (
    <Dialog open={loading} disableBackdropClick={true}>
      <div style={{ width: 100, height: 60 }}>
        <DisappearedLoading size="large" speed={1} color="#df4793" />
      </div>
    </Dialog>
  );
};
export default ModalLoading;
