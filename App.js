import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Countstep from './Countstep'
import StepCounterComponent from './StepCounterCompnent'
import StepCounterComponent2 from './StepCounterComponent2'
// import Anot from './Anot'
const App = () => {
const [curr,setcurr]=useState(new Date().toISOString())
  return (
    <View>
    {/* <StepCounterComponent/> */}
    {/* <Anot/> */}
     <Countstep />
    </View>
  )
}

export default App



// import React, { useEffect, useState } from 'react';
// import { View, Text, Button } from 'react-native';
// import GoogleFit, { Scopes, DataType, BucketUnit } from 'react-native-google-fit';

// const App = () => {
//   const [isTracking, setIsTracking] = useState(false);
//   const [stepCount, setStepCount] = useState(0);
// const[start,setstart]=useState()
//   useEffect(() => {
//     const checkAuthorization = async () => {
//       try {
//         const authorized = await GoogleFit.checkIsAuthorized();
//         console.log('Is Authorized:', authorized);

//         if (!authorized) {
//           const options = {
//             scopes: [
//               Scopes.FITNESS_ACTIVITY_READ,
//               Scopes.FITNESS_ACTIVITY_WRITE,
//               Scopes.FITNESS_BODY_READ,
//               Scopes.FITNESS_BODY_WRITE,
//               Scopes.FITNESS_LOCATION_WRITE,
//               Scopes.FITNESS_LOCATION_READ
//             ],
//           };
//           const authResult = await GoogleFit.authorize(options);

//           if (authResult.success) {
//             console.log('Authorization successful');
//           } else {
//             console.log('Authorization denied:', authResult.message);
//           }
//         }
//       } catch (error) {
//         console.log('Authorization error:', error);
//       }
//     };

//     checkAuthorization();
//   }, []);
//   const opt = {
//     startDate: new Date('2023-10-20 13:00:00').toISOString(), //toISOString()   required ISO8601Timestamp
//     endDate: new Date().toISOString(), // required ISO8601Timestamp
//      bucketUnit: BucketUnit.HOUR, // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
//      bucketInterval: 1, // optional - default 1. 
//   };
  
//   // or with async/await syntax
//   //console.log(BucketUnit)
//   async function startTracking() {
//     // console.log(new Date('2023-10-20 13:00:00').toLocaleString())
//     // GoogleFit.startRecording((callback) => {
//     //   // Process data from Google Fit Recording API (no google fit app needed)
//     // console.log("callback",callback)
//     // });
//     setIsTracking(true);
//     console.log("hj")
//     GoogleFit.getDailyStepCountSamples(opt)
//     .then((res) => {
//       //console.log(JSON.stringify(res))
//         console.log('Daily steps >>> ', res)
//         console.log(res[2].steps[0].value)
//     })
//     .catch((err) => {console.warn(err)});
   
   
   
//   }


//   const stopTracking = () => {
//     setIsTracking(false);

//     // Stop recording step data
//     GoogleFit.stopRecording();
//   };

//   return (
//     <View>
//       <Text>Current Step Count: {stepCount}</Text>
//       <Button title="Start Tracking" onPress={startTracking} disabled={isTracking} />
//       <Button title="Stop Tracking" onPress={stopTracking} disabled={!isTracking} />
//     </View>
//   );
// };

// export default App;
