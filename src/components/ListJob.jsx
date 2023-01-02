import { Card, Grid, Typography } from "@mui/material";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import { getJobList, pages } from "services/apiServices";
import LoadingComponent from "./LoadingComponent";

const ListJob = ({ jobData, isSearchJob }) => {
  const [page, setPage] = useState(1);
  const [newJobList, setNewJobList] = useState(jobData);
  const navigate = useNavigate();

  const fetchJobList = async () => {
    const job = await getJobList(page);
    setNewJobList([...newJobList, ...job]);
  };

  const scrollDown = () => {
    setPage(page + 1);
    setTimeout(() => {
      fetchJobList();
    }, 1000);
  };

  return (
    <>
      <div id="scrollableDiv" style={{ height: 500, overflow: "auto" }}>
        {/* job title & location */}
        <InfiniteScroll
          dataLength={newJobList.length}
          next={() => scrollDown()}
          hasMore={page === 2 ? false : true}
          loader={<LoadingComponent />}
          scrollableTarget="scrollableDiv"
        >
          {newJobList.length > 0 && newJobList[0] !== null ? (
            newJobList.map((data, index) => (
              <div key={index}>
                {data !== null ? (
                  <>
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
                        <Typography color="gray">
                          {data.location ?? ""}
                        </Typography>
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
                          <Typography
                            variant="span"
                            color="green"
                            fontWeight="bold"
                          >
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
                  </>
                ) : null}
              </div>
            ))
          ) : (
            <div>NO DATA</div>
          )}
        </InfiniteScroll>
      </div>

      {isSearchJob || page === 2 ? null : (
        <Card
          sx={{
            margin: "5px 0",
            backgroundColor: "#1976d2",
            width: "100%",
            textAlign: "center",
            color: "white",
          }}
        >
          <Typography padding={1} fontWeight="bold">
            More Jobs
          </Typography>
        </Card>
      )}
    </>
  );
};

export default ListJob;
