import { useEffect, useState } from "react";
import { Certification } from "../types/types";
import { getCertification } from "../services/Api";

const GetCertification = ({
    type,
    id,
    isOn,
}: {
    type: string | undefined;
    id: number | string | undefined;
    isOn: boolean;
}) => {
    const [certificate, setCertificate] = useState<Certification>();
    const [tvCertificate, setTvCertificate] = useState<Certification>();
    useEffect(() => {
        getCertification(type, id)
            .then((res) => {
                const region = res.find(
                    (region: { iso_3166_1: string }) =>
                        region.iso_3166_1 === "US"
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
    

    if (type === "movie" && certificate !== undefined) {
        for (let i = 0; i < certificate?.release_dates.length; i++) {
            if (!certificate?.release_dates[i].certification) {
                continue;
            } else {
                return (
                    <>
                        {isOn ? `${certificate.iso_3166_1}:${" "}` : ""}
                        {certificate.release_dates[i].certification}
                    </>
                );
            }
        }
    } else if (type === "tv" && tvCertificate !== undefined) {
        return (
            <>
                {isOn && tvCertificate
                    ? `${tvCertificate.iso_3166_1}:${" "}`
                    : ""}
                {tvCertificate && tvCertificate?.rating}
            </>
        );
    } else {
        return "NR";
    }
};

export default GetCertification;
