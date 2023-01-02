import { ChevronLeft } from "@mui/icons-material";
import { Button, Card, CardMedia, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import HeaderComponent from "components/HeaderComponent";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailJob } from "services/apiServices";

const DetailJob = () => {
  const paramsUri = useParams();
  const [loading, setLoading] = useState(false);
  const [detailJobData, setDetailJobData] = useState({});
  const navigate = useNavigate();

  const fetchDetailJob = async () => {
    setLoading(true);
    const detailJob = await getDetailJob(paramsUri.id);
    console.log(detailJob, "detailjbo");
    setLoading(false);
    setDetailJobData(detailJob);
  };

  useEffect(() => {
    fetchDetailJob();
  }, []);

  return (
    <div>
      <HeaderComponent />
      <Box component="main" sx={{ p: 3 }}>
        <Grid container display="flex" alignItems="center">
          <ChevronLeft fontSize="large" onClick={() => navigate(-1)} />
          <Typography sx={{ fontSize: 30 }} color="primary" fontWeight="bold">
            Back
          </Typography>
        </Grid>
        <Box
          sx={{
            boxShadow: "1px 1px 10px 5px grey",
            height: "100vh",
            padding: 2.5,
            marginTop: 5,
          }}
        >
          <Typography color="gray">
            {detailJobData.type ?? "Full Time"} /{" "}
            {detailJobData.location ?? "Indonesia"}
          </Typography>
          <Typography color="primary" fontSize={24} fontWeight="bold">
            {detailJobData.title ?? "Title"}
          </Typography>
          <br />
          <hr />
          <Grid container spacing={3}>
            <Grid item xs={7}>
              <Typography
                dangerouslySetInnerHTML={{
                  __html: `${
                    detailJobData.description ?? "<p>description</p>"
                  }`,
                }}
              ></Typography>
            </Grid>
            <Grid marginTop={3} item xs={5}>
              <Card sx={{ p: 2, boxShadow: "1px 1px 4px 3px grey" }}>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item xs>
                    <Typography fontWeight="bold">
                      {detailJobData.company ?? "company"}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="inherit">
                      <Typography
                        color="primary"
                        textTransform="lowercase"
                        fontWeight="bold"
                      >
                        1 other job
                      </Typography>
                    </Button>
                  </Grid>
                  <hr />
                </Grid>
                <CardMedia
                  sx={{ marginTop: 2 }}
                  component="img"
                  height="194"
                  image={
                    detailJobData.company_logo ?? "https://picsum.photos/200"
                  }
                  alt={detailJobData.company}
                  onError={(e) =>
                    (e.target.onerror = null)(
                      (e.target.src = "https://picsum.photos/200")
                    )
                  }
                />
                <Typography marginTop={2} color="primary">
                  {detailJobData.company_url ?? "https://google.com"}
                </Typography>
              </Card>
              <Card sx={{ p: 2, backgroundColor: "wheat", marginTop: 3 }}>
                <Typography fontWeight="bold">How to apply</Typography>
                <hr />
                <Typography
                  dangerouslySetInnerHTML={{
                    __html: `${
                      detailJobData.how_to_apply ?? "<p>How to apply</p>"
                    }`,
                  }}
                ></Typography>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default DetailJob;
