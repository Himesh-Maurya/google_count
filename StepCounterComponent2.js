import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { accelerometer, SensorTypes, setUpdateIntervalForType } from 'react-native-sensors';

setUpdateIntervalForType(SensorTypes.accelerometer, 40);

const StepCounterComponent2 = () => {
  const [steps, setSteps] = useState(0);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    const subscription = accelerometer
      .pipe(data => data)
      .subscribe(speed => {
        // Calculate acceleration magnitude
        const magnitude = Math.sqrt(speed.x ** 2 + speed.y ** 2 + speed.z ** 2);

        // You may need to adjust this threshold based on your specific phone and use case.
        const threshold = 10;

        if (magnitude > threshold && !isMoving) {
          setIsMoving(true);
        } else if (magnitude <= threshold && isMoving) {
          setIsMoving(false);
          setSteps(prevSteps => prevSteps + 1);
        }
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [isMoving]);

  return (
    <View>
      <Text>Steps: {steps}</Text>
    </View>
  );
};

export default StepCounterComponent2;
