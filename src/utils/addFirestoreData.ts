import { db } from "@config/firebase";
import { doc, setDoc } from "firebase/firestore";

import type { AstroObjectCategory } from "@/store/Firestore/models";
import { AstroObject } from "@/store/Firestore/models";

import { astroObjectConverter } from "../store/Firestore/converters";

const objects = [
  {
    id: 1,
    name: "Pluto",
    category: "dwarf planet",
    description:
      "Pluto is a dwarf planet in the Kuiper belt, a ring of bodies beyond the orbit of Neptune. It is the ninth-largest and tenth-most-massive known object to directly orbit the Sun. It is the largest known trans-Neptunian object by volume by a small margin, but is less massive than Eris. Like other Kuiper belt objects, Pluto is made primarily of ice and rock.",
    imagePath: "/images/pluto.png",
    imageDetailPath: "/images/pluto-detail.png",
    info: {
      Mass: "1.31 x 1022 kg",
      Orbit: "5.9 billion km",
      Moons: "5",
      Diameter: "2,376.6±1.6 km",
      Temperature: "-223,15 °C",
    },
  },
  {
    id: 2,
    name: "Neptune",
    category: "planet",
    description:
      "Pluto is a dwarf planet in the Kuiper belt, a ring of bodies beyond the orbit of Neptune.",
    imagePath: "/images/neptune.png",
    imageDetailPath: "/images/pluto-detail.png",
    info: {
      Mass: "1.31 x 1022 kg",
      Orbit: "5.9 billion km",
      Moons: "5",
      Diameter: "2,376.6±1.6 km",
      Temperature: "-223,15 °C",
    },
  },
  {
    id: 3,
    name: "The Sun",
    category: "star",
    description:
      "Pluto is a dwarf planet in the Kuiper belt, a ring of bodies beyond the orbit of Neptune.",
    imagePath: "/images/sun.png",
    imageDetailPath: "/images/pluto-detail.png",
    info: {
      Mass: "1.31 x 1022 kg",
      Orbit: "5.9 billion km",
      Moons: "5",
      Diameter: "2,376.6±1.6 km",
      Temperature: "-223,15 °C",
    },
  },
  {
    id: 4,
    name: "Saturn",
    category: "planet",
    description:
      "Saturn is the sixth planet from the Sun and the second largest in the Solar System, after Jupiter. It is a gas giant, with an average radius of about 9 times that of Earth.",
    imagePath: "/images/saturn.png",
    imageDetailPath: "/images/pluto-detail.png",
    info: {
      Mass: "1.31 x 1022 kg",
      Orbit: "5.9 billion km",
      Moons: "5",
      Diameter: "2,376.6±1.6 km",
      Temperature: "-223,15 °C",
    },
  },
  {
    id: 5,
    name: "Venus",
    category: "planet",
    description: `Venus is the second planet from the Sun. It is often called Earth's "twin" or "sister" among the planets of the Solar System for its orbit being the closest to Earth's, both being rocky planets and having the most similar and nearly equal size and mass, and they also have a similar surface gravity: on Venus, gravity is 90% of Earth gravity, slightly lighter than on Earth.`,
    imagePath: "/images/venus.png",
    imageDetailPath: "/images/pluto-detail.png",
    info: {
      Mass: "1.31 x 1022 kg",
      Orbit: "5.9 billion km",
      Moons: "5",
      Diameter: "2,376.6±1.6 km",
      Temperature: "-223,15 °C",
    },
  },
];

export async function saveAstroObjects(): Promise<void> {
  for (const object of objects) {
    const newObject = new AstroObject(
      object.name,
      object.category as AstroObjectCategory,
      object.description,
      object.imagePath,
      object.imageDetailPath,
      object.info
    );
    const objectRef = doc(db, "objects", newObject.name).withConverter(astroObjectConverter);
    await setDoc(objectRef, newObject);
  }
}
