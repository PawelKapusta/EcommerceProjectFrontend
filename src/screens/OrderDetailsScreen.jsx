import React, { useContext, useEffect, useState } from "react";
import { fetchOrderProductsByOrderId, ProductsContext } from "../context/ProductsContext";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  CardProps,
} from "@mui/material";
import { useParams } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

const OrderDetailsScreen = () => {
  const param = useParams();
  const id = param.id;
  const { orders } = useContext(ProductsContext);
  const order = orders.find(order => order.ID === Number(id));
  const [items, setItems] = useState();

  useEffect(() => {
    fetchOrderProductsByOrderId(id).then(res => {
      setItems(res?.data);
    });
  }, []);

  const colorPaid = order?.isPaid ? "#00FF00" : "#FF0000";
  const colorFinished = order?.isFinished ? "#00FF00" : "#FF0000";
  return (
    <div>
      <Card sx={{ marginBottom: 5 }}>
        <CardContent>
          <Typography variant="h6">ID: {order.ID}</Typography>
          <Typography variant="h6">
            Date:{" "}
            {`${order.CreatedAt.toString().substring(0, 10)} ${order.CreatedAt.toString().substring(
              11,
              16,
            )}`}
          </Typography>
          <Divider sx={{ marginTop: 1, marginBottom: 1 }} />

          <Grid container>
            <Grid item xs={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                Email:
              </Typography>
              <Typography>{order?.Email}</Typography>
              <Typography variant="subtitle1" fontWeight="bold">
                Phone:
              </Typography>
              <Typography>{order?.phone}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                Delivery address:
              </Typography>
              <Typography mt={1}>
                {order?.street} {order?.nr}
                <br />
                {order?.code} {order?.city}
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography variant="subtitle1" fontWeight="bold" style={{ color: `${colorPaid}` }}>
                Is paid: {order?.isPaid ? "true" : "false"}
              </Typography>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                style={{ color: `${colorFinished}` }}
              >
                Is finished: {order?.isFinished ? "true" : "false"}
              </Typography>
              <Typography variant="subtitle1" fontWeight="bold">
                Cost: {order?.totalprice} zł
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="subtitle1" fontWeight="bold" marginTop={5}>
            Ordered products:
          </Typography>
          <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
            {items?.map(product => {
              return (
                <ListItem style={{ width: "100vh" }}>
                  <ListItemAvatar>
                    <Avatar>
                      <img src={product?.imageUrl} alt="product_image" width="50px" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={product?.name} />
                  <ListItemText primary={`Price: ${product?.price} zł`} />
                  <ListItemText primary={`Quantity: ${product?.quantity}`} />
                  <ListItemText primary={`Total cost: ${product?.quantity * product?.price} zł`} />
                </ListItem>
              );
            })}
            <ListItem style={{ width: "100vh" }}>
              <ListItemText
                style={{ position: "absolute", right: 140, marginTop: 15 }}
                primary="+ Delivery fee: 2.2 zł"
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderDetailsScreen;
