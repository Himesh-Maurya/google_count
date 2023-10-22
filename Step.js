import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native'; // Import Button component for UI interaction
import GoogleFit, { Scopes, BucketUnit } from 'react-native-google-fit';

const App = () => {
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

  const fetchData = async () => {
    const opt = {
      startDate: new Date('2023-01-01').toISOString(), // required ISO8601Timestamp
      endDate: new Date().toISOString(), // required ISO8601Timestamp
      bucketUnit: BucketUnit.DAY, // optional - default "DAY".
    };
console.log("object")
    try {
      const res = await GoogleFit.getDailyStepCountSamples(opt);
      console.log('Daily step count samples:', res);
    } catch (error) {
      console.log('Error fetching step count samples:', error);
    }
  };

  return (
    <View>
      <Text onPress={fetchData}>Fetch Step Count</Text>
    </View>
  );
};

export default App;
