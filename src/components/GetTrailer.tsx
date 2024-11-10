const GetTrailer = ({ id }: { id: string }) => {
    return (
        <iframe
            src={`https://www.youtube.com/embed/${id}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            frameBorder={0}
            style={{ borderRadius: "var(--mantine-radius-md)",
                height:'100%'
             }}
            allowFullScreen
        ></iframe>
    );
};

export default GetTrailer;
