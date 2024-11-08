import { useEffect, useState } from "react";
import { getLogo, imageOriginalUrl } from "../services/Api";
import { Image } from "@mantine/core";
const FetchLogo = ({
    id,
    type,
    style,
    className,
}: {
    id: number;
    type: string;
    style: {};
    className: string;
}) => {
    const [logo, setLogo] = useState("");
    useEffect(() => {
        getLogo(id, type)
            .then((res) => {
                setLogo(res.file_path);
            })
            .catch((error) => {
                console.log(error, "error");
            });
    }, [id, type]);

    return (
        <Image
            style={style}
            src={`${imageOriginalUrl}/${logo}`}
            alt=" "
            className={className}
        />
    );
};

export default FetchLogo;
