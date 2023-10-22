import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import GoogleFit, {Scopes, DataType, BucketUnit} from 'react-native-google-fit';

const Countstep = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [stepCount, setStepCount] = useState(0);
  const [a, seta] = useState();
  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const authorized = await GoogleFit.checkIsAuthorized();
        console.log('Is Authorized:', authorized);

        if (!authorized) {
          const options = {
            scopes: [
              Scopes.FITNESS_ACTIVITY_READ,
              Scopes.FITNESS_ACTIVITY_WRITE,
              Scopes.FITNESS_BODY_READ,
              Scopes.FITNESS_BODY_WRITE,
              Scopes.FITNESS_LOCATION_WRITE,
              Scopes.FITNESS_LOCATION_READ,
            ],
          };
          const authResult = await GoogleFit.authorize(options);

          if (authResult.success) {
            console.log('Authorization successful');
          } else {
            console.log('Authorization denied:', authResult.message);
          }
        }
      } catch (error) {
        console.log('Authorization error:', error);
      }
    };

    checkAuthorization();
  }, []);

  //   const opt = {
  //     startDate: props.curr, //toISOString()   required ISO8601Timestamp
  //     endDate: new Date().toISOString(), // required ISO8601Timestamp
  //     bucketUnit: BucketUnit.HOUR, // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
  //     bucketInterval: 1, // optional - default 1.
  //   };
 

  function debounce(func, delay) {
    console.log('first');
    let timeoutid;
    return function () {
      clearTimeout(timeoutid);
      timeoutid = setTimeout(() => {
       // console.log('Value of a:', a);
        func();
       // abc();
        console.log('123');
      }, delay);
    };
  }
  function abc(timestamp) {
    let newtime = new Date().toISOString();
    console.log('intervel start timestamp',timestamp);
    GoogleFit.getDailyStepCountSamples({
      startDate:timestamp,
      endDate: newtime,
      bucketUnit: BucketUnit.MINUTE,
      bucketInterval: 60,
    })
      .then(res => {
        console.log('res[2].steps', res[2].steps);
        // console.log("res[2].rawSteps",JSON.stringify(res[2].rawSteps))
        if (res && res[2].steps.length) {
          const latestStepData = res[2].steps[0].value; // Assuming the latest step data is at index 0
          console.log('lateststep', latestStepData);
          setStepCount(latestStepData);
        }
      })
      .catch(err => {
        console.warn(err);
      });
  }

  let intervalId;
  const startTracking = (timestamp) => {
    setIsTracking(true);
    //seta(new Date('2023-10-21T06:00:00').toISOString());
    console.log('Start tracking...');
    // let p=new Date('2023-10-21T06:00:00').toISOString();
    //var p=new Date().toISOString();

    const xyz = debounce(abc, 2000);
    //console.log(xyz)
    intervalId = setInterval(()=>{abc(timestamp)}, 200);
  };

  const stopTracking = () => {
    setIsTracking(false);
    clearInterval(intervalId);
    if (intervalId) {
      const nativeCallbackId = intervalId;
      requestIdleCallback(() => {
        clearTimeout(nativeCallbackId);
      });
    }
  };

  return (
    <View>
      <Text>Current Step Count: {stepCount}</Text>
      <Button
        title="Start Tracking"
        onPress={()=>{startTracking(new Date().toISOString())}}
        disabled={isTracking}
      />
      <Button
        title="Stop Tracking"
        onPress={stopTracking}
        disabled={!isTracking}
      />
    </View>
  );
};

export default Countstep;
