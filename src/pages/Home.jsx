import { LocationOn, Work } from "@mui/icons-material";
import {
  AppBar,
  Button,
  Card,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import HeaderComponent from "components/HeaderComponent";
import ListJob from "components/ListJob";
import LoadingComponent from "components/LoadingComponent";
import React, { useEffect, useState } from "react";
import { getJobList, getJobListByParams } from "services/apiServices";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [jobList, setJobList] = useState([]);
  const [changeJobDesc, setChangeJobDesc] = useState("");
  const [changeLocation, setChangeLocation] = useState("");
  const [changeCheckBox, setChangeCheckBox] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [jobListSearchLength, setJobListSearchLength] = useState(0);

  const fetchJobList = async () => {
    setLoading(true);
    const job = await getJobList();
    setLoading(false);
    setJobList(job);
  };

  useEffect(() => {
    setIsSearch(false);
    fetchJobList();
  }, []);

  const searchJobs = async () => {
    setLoading(true);
    setChangeCheckBox(false);
    setChangeLocation("");
    setChangeJobDesc("");
    const getJobsByParams = await getJobListByParams(
      changeCheckBox,
      changeJobDesc,
      changeLocation
    );
    const arrNotEmpy = countNonEmpty(getJobsByParams);
    setJobListSearchLength(arrNotEmpy);
    setIsSearch(true);
    setLoading(false);
    setJobList(getJobsByParams);
  };
  function countNonEmpty(array) {
    return array.filter(Boolean).length;
  }

  return (
    <>
      {/* AppBar */}
      <HeaderComponent />

      {/* Body */}

      <Box component="main" sx={{ p: 3 }}>
        {/* Search Content */}
        <Grid container spacing={2} sx={{ color: "black" }}>
          <Grid item xs={4}>
            <Typography fontWeight="bold">Job Description</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography fontWeight="bold">Location</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} marginTop={0.5}>
          <Grid item xs={4}>
            <TextField
              sx={{ height: "100px" }}
              fullWidth
              placeholder="Filter by title, benefits, companies, expertise"
              onChange={(e) => setChangeJobDesc(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Work />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              sx={{ height: "100px" }}
              fullWidth
              placeholder="Filter by city, state, zip code or country"
              onChange={(e) => setChangeLocation(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOn />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={2} marginTop={1}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={changeCheckBox}
                  onChange={(e) => setChangeCheckBox(e.target.checked)}
                />
              }
              label="Full Time Only"
            />
          </Grid>
          <Grid item xs={2} marginTop={1}>
            <Button
              onClick={searchJobs}
              variant="contained"
              sx={{ backgroundColor: "grey" }}
            >
              <Typography
                variant="p"
                fontWeight="bold"
                textTransform="capitalize"
              >
                Search
              </Typography>
            </Button>
          </Grid>
        </Grid>
        {/* List Content */}
        {loading ? (
          <LoadingComponent />
        ) : (
          <Box
            sx={{
              boxShadow: "1px 1px 10px 5px grey",
              padding: 2.5,
            }}
          >
            <Typography variant="h5" fontWeight="bold">
              {isSearch && jobList[0] !== null
                ? `Showing ${jobListSearchLength} jobs`
                : "Job List"}
            </Typography>
            <hr />
            <ListJob jobData={jobList} />
            {isSearch ? null : (
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
          </Box>
        )}
      </Box>
    </>
  );
};

export default Home;
