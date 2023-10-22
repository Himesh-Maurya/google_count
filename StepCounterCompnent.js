
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import {
  accelerometer,
  SensorTypes,
  setUpdateIntervalForType,
} from 'react-native-sensors';

setUpdateIntervalForType(SensorTypes.accelerometer, 40);

const StepCounterComponent = () => {
  const [xAcceleration, setXAcceleration] = useState(0);

  const [yAcceleration, setYAcceleration] = useState(0);

  const [zAcceleration, setZAcceleration] = useState(0);

  const [magnitudePrevious, setMagnitudePrevious] = useState(0);

  const [steps, setSteps] = useState(0);

  useEffect(() => {
    const subscription = accelerometer

      .pipe(data => data)

      .subscribe(speed => {
        setXAcceleration(speed.x);

        setYAcceleration(speed.y);

        setZAcceleration(speed.z);
      });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const magnitude = Math.sqrt(
      Math.pow(xAcceleration, 2) +
        Math.pow(yAcceleration, 2) +
        Math.pow(zAcceleration, 2),
    );

    const magnitudeDelta = magnitude - magnitudePrevious;

    setMagnitudePrevious(() => magnitude);

    // I tried magnitudeDelta > 6, magnitudeDelta > 4,

    // magnitudeDelta > 2, magnitudeDelta > 10 but didn't work properly

    if (magnitudeDelta > 4) setSteps(prevSteps => prevSteps + 1);
  }, [xAcceleration, yAcceleration, zAcceleration]);

  return (
    <View>
      <Text>{steps}</Text>
    </View>
  );
};
export default StepCounterComponent;
