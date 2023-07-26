import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getFirestore,
    collection,
    addDoc,
    getDocs,
    query,
    where,
    doc,
    getDoc,
    updateDoc,
    deleteDoc } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

class SongDB {

  constructor() {
    this.appName = "iMusic";
    this.db = null;
    this.isAvailable = false;
    console.log('Song db initialized!');
  }

  open() {

    return new Promise((resolve, reject) => {
        try{
            const firebaseConfig = {
                apiKey: "AIzaSyBg6pL6dHcgYamZsQyQ-r9z3f6_y_HXnJ8",
                authDomain: "info6128-1121367.firebaseapp.com",
                projectId: "info6128-1121367",
                storageBucket: "info6128-1121367.appspot.com",
                messagingSenderId: "395245287293",
                appId: "1:395245287293:web:06a622a9e5fb64b6ca7e14",
                measurementId: "G-SHHPLJ22DG"
            };
            
              // Initialize Firebase
              const app = initializeApp(firebaseConfig);
        
              this.db = getFirestore(app);
              if(this.db){
                this.isAvailable = true;
                resolve();
              } else{
                reject('Database not available!!')
              }
            //   console.log('song db opened!', this.db);
        }
        catch(error){
            reject(error.message);
        }
    })

  }

  // addData(title, artist, likes) {

  //   return new Promise((resolve, reject) => {

  //       if(!this.isAvailable){
  //           console.log('Database is not available');
  //       } else{
  //           const dbCol = collection(this.db, this.appName);
             
  //           addDoc(dbCol, {
  //               Title: title,
  //               Artist: artist, 
  //               Likes: likes,
  //           })
  //           .then((docRef) => {
  //               console.log("Success! ", docRef.id);
  //               resolve();
  //           })
  //           .catch((error) => {
  //               reject("Error: ", error);
  //           })
  //       }
  //   });
  // }

  add(title, artist) {

    // Creates the song object to be added.
    const song = {
      title: title,
      artist: artist,
      //likes: likes
    };

    return new Promise((resolve, reject) => {
      if (!this.isAvailable) {
        reject('The database is not available.');
        return;
      }

      try {
        // Connects to the Firebase collection.
        const dbCollection = collection(this.db, this.appName);

        // Includes the new object to the collection.
        addDoc(dbCollection, song)
          .then(() => {
            resolve(song);
          })
          .catch((error) => {
            reject(error);
          });
      }
      catch (error) {
        reject(error.message);
      }
    });
  }

/**
  * Retrieves a specific song.
  */
 get(id) {
  return new Promise((resolve, reject) => {
    if (!this.isAvailable) {
      reject('The database is not available.');
      return;
    }

    try {

      // Get the document reference.
      const docRef = doc(this.db, this.storeName, id);

      // Retrives the document.
      getDoc(docRef)
        .then((docSnap) => {
          const data = docSnap.data();
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    }
    catch (error) {
      reject(error.message);
    }
  });
}


  // get() {
  //   console.log('get song!');
  // }

  getAllData() {

    
    return new Promise((resolve, reject) => {

        if (!this.isAvailable) {
          reject('The database is not available.');
          return;
        } 
            const dbColl = collection(this.db, this.appName);
  
          // Gets the date form the collection.
            getDocs(dbColl)
            .then((querySnapshot) => {
              const result = [];
              querySnapshot.forEach((doc) => {
                const data = doc.data();

                console.log(doc.data());
                result.push({
                  ...data,
                  id: doc.id
                });
              });

              resolve(result);
            })
            .catch((error) => {
              reject(error);
            });
          
      });
  }

  update() {
    console.log('update song!');
  }

  delete(songID) {
    return new Promise((resolve, reject) => {
        if (!this.isAvailable) {
          reject('The database is not available.');
          return;
        }
  
        try {
  
          // Get the document reference.
          const docRef = doc(this.db, this.appName, songID);
  
          // Deletes the document.
          deleteDoc(docRef)
            .then(() => {
              resolve();
            })
            .catch((error) => {
              reject(error);
            });
        }
        catch (error) {
          reject(error.message);
        }
      });
  }
}

export default new SongDB();