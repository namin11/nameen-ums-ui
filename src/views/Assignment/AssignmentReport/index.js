import React from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
// import Toolbar from './Toolbar';
import ProductCard from './ProductCard';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
}));

const ProductList = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Products"
    >
      <Container maxWidth={false}>
        {/* <Toolbar /> */}
        <Box mt={3}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={12}
              md={12}
              xs={12}
            >
              <ProductCard
                className={classes.productCard}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Page>
  );
};

export default ProductList;
