"user strict"

const express = require('express');
const app = express();
const path = require('path');

const bodyParse = require('body-parser');
const admin = require('firebase-admin');
const permission = require("./secret.json");
const { response } = require('express');
app.set('port', process.env.port || 8080) 

admin.initializeApp({

    credential: admin.credential.cert(permission)
})

const firestore = admin.firestore();
const auth = admin.auth();

app.use(bodyParse.json());


app.get('/', (req, res, next) =>{

})
app.get('/user', (req, res, next) =>{
    res.send(users)
})


 app.get('/user/:id', (req, res, next) =>{
    const id = req.params.id;
    if(!id){
      res.status(500).send("user is not defined" )
    }else{
      firestore.collection('newUsers').doc(id).get().then(user =>{
        res.status(200).send({
          id: user.id,
          ...user.data()
        })
      })
    }
  })

/////Edit the Object

app.put('/user/:id', (req, res, next) =>{
    const id = req.params.id;
    if(!id && !user){
      res.status(500).send("user is not defined")
    }else{
      firestore.collection('newUsers').doc(id).update(users).then(response =>{
        res.status(200).send('user has been updated')
      })
    }
  })

   //getting new users//
app.post("/register", (req, res, next) => {
  const user = req.body;
  auth.createUser(user).then((userdata) => {
    firestore
      .collection("newUsers")
      .doc("" + userdata.uid)
      .set({
        name: user.name,
        displayName: user.username,
        email: user.email,
        surname: user.surname,
        age: user.age,
        gender: user.gender,
        password: user.password,
      })
      .then(() => {
        res.status(200).send(user);
      })
      .catch((error) => res.status(500).send(error.message));
  });
});


  ////Delete one user
 app.delete('/user/:id', (req, res, next) =>{
    const id = req.params.id;
    if(!id){
      res.status(500).send("User is not defined")
    }else{
      firestore.collection('newUsers').doc(id).delete().then(user =>{
        res.status(200).send('User has been deleted')
      })
    }
  })
  
  admin
  .auth()
  .deleteUser(uid)
  .then(() => {
    console.log('Successfully deleted user');
  })
  .catch((error) => {
    console.log('Error deleting user:', error);
  });


app.listen(app.get('port'), server =>{
    console.info(`Server listen on port ${app.get('port')}`);
})


/*var user = firestore.auth().getUser(uid);
user.delete().then(function() {
  
  var ref = firestore.database().ref(
     "users/".concat(user.uid, "/")
  );
  ref.remove();
});
firestore.auth().currentUser.delete()*/









