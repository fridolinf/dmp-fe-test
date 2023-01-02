import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment/moment";
import React from "react";
import { useNavigate } from "react-router-dom";

const ListJob = ({ jobData }) => {
  console.log(jobData, "JOBSDATA");
  const navigate = useNavigate();
  return (
    <>
      {/* job title & location */}
      {jobData.length > 0 && jobData[0] !== null ? (
        jobData.map((data) => (
          <div key={data.id}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid onClick={() => navigate(`/detail/${data.id}`)}>
                <Typography color="primary" fontWeight="bold">
                  {data.title ?? ""}
                </Typography>
              </Grid>
              <Grid>
                <Typography color="gray">{data.location ?? ""}</Typography>
              </Grid>
            </Grid>
            {/* company , type job & times */}
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid>
                <Typography color="gray">
                  {data.company ?? ""} -{" "}
                  <Typography variant="span" color="green" fontWeight="bold">
                    {data.type ?? ""}
                  </Typography>
                </Typography>
              </Grid>
              <Grid>
                <Typography color="gray">
                  {moment(data.created_at).fromNow() ?? ""}
                </Typography>
              </Grid>
            </Grid>
            <hr />
          </div>
        ))
      ) : (
        <div>NO DATA</div>
      )}
    </>
  );
};

export default ListJob;
