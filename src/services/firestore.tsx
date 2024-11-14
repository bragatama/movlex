import { notifications } from "@mantine/notifications";
import { db } from "../services/firebase";
import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    setDoc,
} from "firebase/firestore";
import { useCallback } from "react";

export const useFirestore = () => {
    const addToWatchlist = async (
        userId: string,
        dataId: string,
        data: { title: string }
    ) => {
        try {
            if (await checkWatchlist(userId, dataId)) {
                notifications.show({
                    message: "This item is already in your watchlist",
                    autoClose: 5000,
                    color: "red",
                    style: { backgroundColor: "rgba(50,0,0,1)" },
                });
                return false;
            }
            await setDoc(doc(db, "users", userId, "watchlist", dataId), data);
            notifications.show({
                title: "Successully add to Watchlist",
                message: `${data.title} has been added to watchlist`,
                autoClose: 5000,
                color: "green",
            });
        } catch (error) {
            console.log(error, "Error adding to watchlist");
            notifications.show({
                message: "Error while adding to Watchlist",
                autoClose: 5000,
                color: "red",
                style: { backgroundColor: "rgba(50,0,0,1)" },
            });
        }
    };
    const checkWatchlist = async (userId: string, dataId: string) => {
        const docRef = doc(
            db,
            "users",
            userId.toString(),
            "watchlist",
            dataId.toString()
        );
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return true;
        } else {
            return false;
        }
    };

    const removeFromWatchlist = async (userId: string, dataId: string) => {
        try {
            await deleteDoc(
                doc(
                    db,
                    "users",
                    userId.toString(),
                    "watchlist",
                    dataId.toString()
                )
            );
            notifications.show({
                message: "Successully removed from Watchlist",
                color: "green",
                autoClose: 5000,
            });
        } catch (error) {
            console.log(error, "error while deleting watchlist");
            notifications.show({
                message: "Error while removing from Watchlist",
                autoClose: 5000,
                color: "red",
                style: { backgroundColor: "rgba(50,0,0,1)" },
            });
        }
    };

    const getWatchlist = useCallback(async (userId: string) => {
        const querySnapshot = await getDocs(
            collection(db, "users", userId, "watchlist")
        );
        const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
        }));
        return data;
    }, []);
    return {
        addToWatchlist,
        checkWatchlist,
        removeFromWatchlist,
        getWatchlist,
    };
};
