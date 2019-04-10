import * as functions from 'firebase-functions';
import * as admin  from 'firebase-admin';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
admin.initializeApp(functions.config().firebase);

exports.newCourseNotification= functions.firestore
    .document('college/{collegeId}/courses/{courseId}')
    .onUpdate(async (change, context) => {

        const newData = change.after.data()
        const prevData = change.before.data()
        console.log('context:',context)
        try{
            const courseCode = newData['course']
            const college = newData['college']
            const prevNot = prevData['notification']
            const newNot = newData['notification']
            const newN =  newNot.filter(item => prevNot.indexOf(item)<0);
            const payload = {
                notification:{
                    title:`${courseCode} : New Notification`,
                    body:`${newN[0]['subject']}`
                }
            }
            const db = admin.firestore();
            const devRef = db.collection(`college/${college}/courses/${courseCode}/device`)
            const devices = await devRef.get();
            const tokens = []
            devices.forEach(res => {
                const token = res.data().token;
                tokens.push(token)
            })
            return admin.messaging().sendToDevice(tokens,payload) 
        }
        catch(e){

        }

    })