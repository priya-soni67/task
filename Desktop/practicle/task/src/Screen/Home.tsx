import React, { useState } from "react";
import styles from "../styles/Home.module.css"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LocationList from "../component/LocationList";
import CustomTabPanel from "../component/CustomTabPanel";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import AddLocationModal from "../component/AddLocationModal";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Home = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div className={styles.container}>
      <div className={styles.mainClass}>
        <div className={styles.text}>Inventory</div>
        <Box sx={{
          borderBottom: 1, borderColor: 'divider',
          width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center"
        }}>
          <Tabs value={value} TabIndicatorProps={{
            style: {
              backgroundColor: "purple"
            }

          }} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Location" {...a11yProps(0)} />
            <Tab label="Comapnies" {...a11yProps(1)} />
            <Tab label="User" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <ControlPointIcon sx={{ position: 'relative', left: "88%", top: '2%', cursor: "pointer" }} onClick={handleOpen} fontSize="large" />
        <CustomTabPanel value={value} index={0}>
          <LocationList />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Item Two
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel>
        <AddLocationModal open={open} handleClose={handleClose} />
      </div>
    </div>
  )
}

export default Home;
