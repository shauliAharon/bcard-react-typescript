import React from "react";
import Container from "@mui/material/Container";
import PageHeader from "./../components/PageHeader";
import Grid from "@mui/material/Grid";

const AboutPage = () => {
  return (
    <Container maxWidth="lg">
      <PageHeader
        title="About BusinessIL"
        subtitle="On this page you will find explanations about using the  BusinessIL website"
      />

      <Grid container spacing={2}>
        <Grid sx={{fontSize:"1.7rem"}} item xs={12} md={8} alignSelf="center">
       <p >Meet buisnessIL!<br /><br /><hr /> 
        on our platform, you can search and find all of your favorite buisnesses such as restaraunts, bars, household items, latest fashion trend etc. <br />
         also, those who register on our site can choose their favorite buisnesses. <br />
for those who choose our buisness  route can  publish, and edit the buisnesses of choice. <br /> <br /> <hr />
join us now!</p> 
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            display: { md: "flex", xs: "none" },
            justifyContent: "center",
          }}>
          <img src="/assets/images/card.jpg" alt="card" width="100%" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutPage;
