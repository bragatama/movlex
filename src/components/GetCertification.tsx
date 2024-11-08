import { useEffect, useState } from "react";
import { Certification } from "../types/types";
import { getCertification } from "../services/Api";

const GetCertification = ({
    type,
    id,
    isOn,
}: {
    type: string;
    id: number;
    isOn: boolean;
}) => {
    const [certificate, setCertificate] = useState<Certification>();
    const [tvCertificate, setTvCertificate] = useState<Certification>([]);
    useEffect(() => {
        getCertification(type, id)
            .then((res) => {
                const region = res.find(
                    (region: string) => region.iso_3166_1 === "US"
                );
                if (type === "movie") {
                    setCertificate(region);
                } else {
                    setTvCertificate(region);
                }
            })
            .catch((err) => {
                console.log(err, "err");
            });
    }, [type, id]);

    if (type === "movie") {
        for (let i = 0; i < certificate?.release_dates.length; i++) {
            if (!certificate?.release_dates[i].certification) {
                continue;
            } else {
                return (
                    <>
                        {/* {certificate.iso_3166_1}:{" "} */}
                        {isOn ? `${certificate.iso_3166_1}:${" "}` : ""}
                        {certificate.release_dates[i]?.certification}
                    </>
                );
            }
        }
    } else {
        return (
            <>
                {isOn && tvCertificate
                    ? `${tvCertificate.iso_3166_1}:${" "}`
                    : ""}
                {tvCertificate && tvCertificate?.rating}
            </>
        );
    }
};

export default GetCertification;
