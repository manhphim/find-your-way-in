import React from 'react';
import { useAuth } from 'contexts/AuthContext';
import { db } from 'firebase_config';
import {
    doc,
    setDoc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    getDoc,
} from 'firebase/firestore';

export const ContactDetails = ({ phoneNumber, email, id }: any) => {
    const { user } = useAuth();
    const addToFavorites = async () => {
        if (user) {
            // The "userRef" is a reference to the user document in the database
            const userRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(userRef);
            if (docSnap.exists()) {
                await updateDoc(userRef, {
                    favorite_locations: arrayUnion(id),
                });
                // defaultly user objects have an empty object in their favorites.
                //Below line deletes the initial object.
                await updateDoc(userRef, {
                    favorite_locations: arrayRemove(''),
                });
                console.log('new location added to the users favorites!');
            } else {
                await setDoc(doc(db, 'users', user.uid), {
                    favorite_locations: [id],
                    favorite_events: [],
                });
            }
        } else {
            // this else block is for testing purposes. Will delete later.
            console.log('error in adding to favorites!');
        }
    };

    return (
        <div className="w-full pl-2 text-left">
            <h2 className="font-bold text-center underline underline-offset-8">
                Contact details
            </h2>
            <p>{phoneNumber ? phoneNumber : 'No phone number provided'}</p>
            <p>{email ? email : "No email provided"}</p>
            <button
                className="border-2 border-blue-800"
                onClick={addToFavorites}
            >
                Add to favourites
            </button>
        </div>
    );
};

export default ContactDetails;
