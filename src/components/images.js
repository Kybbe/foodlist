import kramigProsciuttopasta from "../assets/kramigProsciuttopasta.jpg";
import asiatiskFlaskwok from "../assets/asiatiskFlaskwok.avif";
import pannstektMedelhavskyckling from "../assets/pannstektMedelhavskyckling.avif";
import sweetChiliFlaskkott from "../assets/sweetChiliFlaskkott.avif";
import kottbullarPotatismosLok from "../assets/KottbullarPotatismosLok.jpeg";

const images = {
  kramigProsciuttopasta,
  asiatiskFlaskwok,
  pannstektMedelhavskyckling,
  sweetChiliFlaskkott,
  kottbullarPotatismosLok,
};

export default function Images() {
  const getImageByName = (name) => {
    return images[name] || null;
  };

  return {
    getImageByName,
    images,
  };
}