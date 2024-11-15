import { useEffect, useState } from "react";
import { getLogo, imageOriginalUrl } from "../services/Api";
import { Image } from "@mantine/core";
const FetchLogo = ({
    id,
    type,
    style,
    className,
    miw,
    maw,
    mih,
    mah,
}: {
    id: number | string | undefined;
    type: string | undefined;
    style?: object;
    className?: string;
    miw?: object;
    maw?: object;
    mih?: object;
    mah?: object;
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
        <>
            {logo ? (
                <Image
                    style={style}
                    src={`${imageOriginalUrl}/${logo}`}
                    alt="logo"
                    mih={mih}
                    mah={mah}
                    maw={maw}
                    miw={miw}
                    loading="lazy"
                    className={className}
                />
            ) : (
                ""
            )}
        </>
    );
};

export default FetchLogo;
