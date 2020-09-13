import React, { useState } from 'react';
import LocationPicker from 'react-leaflet-location-picker';

const AppMap = (props) => {
  const [location, setLocation] = useState([]);

  const updateLocation = (point) => {
    console.log(point);
    setLocation(point);
    props.setLocation(point);
  };
  const pointVals = [];
  const pointMode = {
    banner: true,
    control: {
      values: [],
      onClick: (point) => updateLocation(point),
    },
  };
  const circleMode = {
    banner: false,
  };
  return <LocationPicker pointMode={pointMode} circleMode={circleMode} />;
};

export default AppMap;
