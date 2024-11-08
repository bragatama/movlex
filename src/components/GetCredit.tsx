import { useEffect, useState } from "react";
import { Credits } from "../types/types";
import { getCredit } from "../services/Api";

const GetCredit = ({ type, id }: { type: string; id: number }) => {
    const [credits, setCredits] = useState<Credits[]>([]);
    useEffect(() => {
        getCredit(type, id)
            .then((res) => {
                setCredits(res);
            })
            .catch((err) => {
                console.log(err, "error");
            });
    }, [type, id]);
    return console.log(credits);
    ;
};

export default GetCredit;
