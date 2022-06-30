import React, { useEffect, useContext } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { fetchOrderOfUSer, ProductsContext } from "../context/ProductsContext";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HighlightAltIcon from "@mui/icons-material/HighlightAlt";

const ListOrders = () => {
  const { orders, setOrders } = useContext(ProductsContext);
  const navigate = useNavigate();
  useEffect(() => {
    fetchOrderOfUSer(localStorage.getItem("ID")).then(res => setOrders(res?.data));
  }, []);

  const onClickItem = id => {
    navigate(`/order/${id}`);
  };

  return (
    <div>
      <Typography
        component="div"
        fontSize={20}
        gutterBottom
        marginBottom={1}
        marginTop={3}
        marginLeft="12%"
      >
        {orders.length > 0 ? " Orders:" : "You do not have orders"}
      </Typography>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <List sx={{ bgcolor: "background.paper", width: "100vh" }} aria-label="contacts">
          {orders
            ? orders.map(order => {
                const colorPaid = order?.isPaid ? "#00FF00" : "#FF0000";
                const colorFinished = order?.isFinished ? "#00FF00" : "#FF0000";
                return (
                  <ListItem style={{ border: "1px solid black" }}>
                    <ListItemButton onClick={() => onClickItem(order.ID)}>
                      <ListItemIcon>
                        <HighlightAltIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={`Date: ${order.CreatedAt.toString().substring(
                          0,
                          10,
                        )} ${order.CreatedAt.toString().substring(11, 16)} Cost: ${
                          order.totalprice
                        } `}
                        secondary={
                          <Typography
                            type="body2"
                            style={{ color: `${colorFinished}` }}
                          >{`isFinished: ${order.isFinished} `}</Typography>
                        }
                      />
                      <ListItemText
                        primary={` Cost: ${order.totalprice} `}
                        secondary={
                          <Typography
                            type="body2"
                            style={{ color: `${colorPaid}` }}
                          >{` isPaid: ${order.isPaid}`}</Typography>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })
            : ""}
        </List>
      </div>
    </div>
  );
};

export default ListOrders;
