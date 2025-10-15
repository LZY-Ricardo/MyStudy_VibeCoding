import { photos } from "../../data";

export default function PhotoPage({ params: { id } }) {
    const photo = photos.find((p) => p.id === id);
    return <img className="block w-1/4 mx-auto mt-10" src={photo.src} />;
}