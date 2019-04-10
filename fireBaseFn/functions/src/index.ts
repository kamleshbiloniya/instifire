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
        console.log(context)
        const newData = change.after.data()
        const prevData = change.before.data()
        console.log('context:',context)
        if(newData && prevData){
            const courseCode = newData['course']
            const college = newData['college']
            const prevNot = prevData['notification']
            const newNot = newData['notification']
            let  newN;
            for(let i = 0;i<newNot.length;i++){
                if (prevNot.indexof( newNot[i]) < 0){
                    newN = newNot[i];
                    break;
                }
            }
            const payload = {
                notification:{
                    title:`${courseCode} : New Notification`,
                    body:`${newN['subject']}`
                }
            }
            const db = admin.firestore();
            const devRef =  db.collection(`college/${college}/courses/${courseCode}/device`)
            const devices = await devRef.get();
            let tokens:[string] =[""]
            devices.forEach(res => {
                const token = res.data().token;
                tokens.push(token.toSting())
            })
            // tokens[0]
            for (let i = 0;i<tokens.length-1;i++){
                tokens[i] = tokens[i+1]
            }
            return admin.messaging().sendToDevice(tokens,payload) 
        }else{
            return null;
        }

    })