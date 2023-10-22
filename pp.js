import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import GoogleFit, { Scopes, DataType, BucketUnit } from 'react-native-google-fit';

const Countstep = (props) => {
  
  const [isTracking, setIsTracking] = useState(false);
  const [stepCount, setStepCount] = useState(0);
const [step,setstep]=useState(0)
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
              Scopes.FITNESS_LOCATION_READ
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
  useEffect(()=>{

  },[])
  const opt = {
    startDate: props.curr, //toISOString()   required ISO8601Timestamp
    endDate: new Date().toISOString(), // required ISO8601Timestamp
     bucketUnit: BucketUnit.HOUR, // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
     bucketInterval: 1, // optional - default 1. 
  };
 function myFunction(){
    GoogleFit.getDailyStepCountSamples(opt)
    .then((res) => {
        console.log('Daily steps >>> ', res)
        console.log(res[2].steps[0].value)
    })
    .catch((err) => {console.warn(err)});
  }
  

  // or with async/await syntax
  //console.log(BucketUnit)
  async function startTracking() {
    setIsTracking(true);
    console.log("hj")
    setInterval(myFunction, 200)
    // GoogleFit.getDailyStepCountSamples(opt)
    // .then((res) => {
    //   //console.log(JSON.stringify(res))
    //     console.log('Daily steps >>> ', res)
    //     console.log(res[2].steps[0].value)
    // })
    // .catch((err) => {console.warn(err)});
   
   
   
  }


  const stopTracking = () => {
    setIsTracking(false);
    clearInterval(intervalId)
    // Stop recording step data
    GoogleFit.stopRecording();
  };

  return (
    <View>
      <Text>Current Step Count: {stepCount}</Text>
      <Button title="Start Tracking" onPress={startTracking} disabled={isTracking} />
      <Button title="Stop Tracking" onPress={stopTracking} disabled={!isTracking} />
    </View>
  );
};

export default Countstep
