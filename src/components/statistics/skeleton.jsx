import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Grid } from "@mui/material";

export function SkeletonQuiz() {
  return (
    <Grid container spacing={2} padding={4} paddingLeft={"10%"}>
      <Grid item>
        <Skeleton variant="rectangular" width={220} height={234} />
      </Grid>
      <Grid item xs={12} sm container>
        <Stack spacing={1} direction="column">
          <Skeleton variant="text" width={300} height={33} />
          <Skeleton variant="text" width={300} height={33} />
          <Skeleton variant="text" width={300} height={33} />
          <Skeleton variant="text" width={300} height={33} />
          <Skeleton variant="text" width={300} height={33} />
          <Skeleton variant="text" width={300} height={33} />
        </Stack>
      </Grid>
    </Grid>
  );
}
