import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router";

// import RoutesCollapse from "./components/RoutesCollapse";
import { routes } from "./data";

// import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { ListItemIcon, ListItem, Divider, Toolbar, ListItemText } from "@mui/material";

export type ChildrenType = {
    fatherIndex: number;
    selectedChildIndex: number;
    isOpen: boolean;
};

const ListRoutes = () => {
    const itemSelected = sessionStorage.getItem("itemSelected");
    const navigate = useNavigate();
    const [openChildren, setOpenChildren] = useState<ChildrenType>(
        itemSelected == null
            ? {
                  fatherIndex: -1,
                  selectedChildIndex: -1,
                  isOpen: false,
              }
            : JSON.parse(itemSelected)
    );

    useEffect(() => {
        sessionStorage.setItem("itemSelected", JSON.stringify(openChildren));
    }, [openChildren]);
    const handleListItemClick = (
        index: number,
        path: string | undefined,
        hasChildren: boolean,
        fatherIndex: number
    ) => {
        if (path) {
            navigate(path);
        }
        if (hasChildren) {
            setOpenChildren((prev) => {
                return {
                    ...prev,
                    fatherIndex: fatherIndex,
                    selectedChildIndex: index,
                    isOpen: prev.fatherIndex != fatherIndex ? true : !prev.isOpen,
                };
            });
        } else {
            setOpenChildren((prev) => {
                return {
                    ...prev,
                    selectedChildIndex: index,
                    fatherIndex: fatherIndex,
                    isOpen: true,
                };
            });
        }
    };

    return (
        <React.Fragment>
            <Toolbar />
            <Divider />
            {routes.map((item) => (
                <React.Fragment key={item.name}>
                    <ListItem
                        button
                        key={item.name}
                        onClick={() =>
                            // handleListItemClick(item.id, item.path, Boolean(item.children), item.id)
                            handleListItemClick(item.id, item.path, Boolean(), item.id)
                        }
                        selected={openChildren.fatherIndex === item.id}
                    >
                        <ListItemIcon>
                            <img src={item.icon} width="30px" height="auto" alt="icon" />
                        </ListItemIcon>
                        <ListItemText primary={item.name} />
                        {/* {item?.children ? (
                            openChildren.fatherIndex == item.id && openChildren.isOpen ? (
                                <ExpandLess />
                            ) : (
                                <ExpandMore />
                            )
                        ) : null} */}
                    </ListItem>
                    {/* {item?.children ? (
                        <RoutesCollapse
                            item={item?.children}
                            fatherId={item?.id}
                            handleListItemClick={handleListItemClick}
                            openChildren={openChildren}
                        />
                    ) : null} */}
                </React.Fragment>
            ))}
            {/* <List>
                {routesControlApp.map((item) => (
                    <ListItem
                        button
                        key={item.name}
                        selected={openChildren.fatherIndex === item.id}
                        onClick={() =>
                            handleListItemClick(item.id, item.path, Boolean(item.children), item.id)
                        }
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.name} />
                    </ListItem>
                ))}
            </List> */}
        </React.Fragment>
    );
};

export default ListRoutes;
