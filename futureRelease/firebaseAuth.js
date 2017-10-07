
const auth = firebase.auth();

//sign in an existing user and return to you a promise where
//you can resolve that existing user
auth.signInWithEmailAndPassword(email, pass);

//if you don't have user then you can create user w/ email and password
//this will not only create the user, but it will also sign them in.
//like the signIn method, this returns a promise that allows you to asynchronously resolve the users data

auth.createUserWithEmailAndPassword(email, pass);

//since the above is a promise, the code can only resolve for the user one time
//so if you want to monitor authentication state, you can use 
//the following method whish takes a call-back (firebaseUser => {}) that fires off every time the 
//state changes (via onAuthStateChanged). So whether a user logs in or logs out,
//that will trigger the call-back function.

//So if a user logs in, the firebaseUser parameter in the call-back will be populated with the 
//current user's information. But if the user logs out the firebaseUser parameter will be null.

auth.onAuthStateChange(firebaseUser => {});

//so the main three methods that you need to know for working with 
//user email and password authentication:
//auth.signInWithEmailAndPassword(email, pass);
//auth.createUserWithEmailAndPassword(email, pass);
//auth.onAuthStateChange(firebaseUser => {});
