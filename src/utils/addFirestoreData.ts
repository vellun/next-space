import { db } from "@config/firebase";
import { doc, setDoc } from "firebase/firestore";

import type { AstroObjectCategory } from "@/store/Firestore/models";
import { AstroObject } from "@/store/Firestore/models";

import { astroObjectConverter } from "../store/Firestore/converters";

const objects = [
  {
    slug: "the-sun",
    name: "The Sun",
    category: "star",
    description:
      `The Sun is the star at the centre of the Solar System. 
      It is a massive, nearly perfect sphere of hot plasma, 
      heated to incandescence by nuclear fusion reactions in its core, 
      radiating the energy from its surface mainly as visible light and infrared 
      radiation with 10% at ultraviolet energies. It is by far the most important source of energy for life on Earth. The Sun has been an object of veneration in many cultures and a central subject for astronomical research since antiquity.`,
    imagePath: "/images/0-sun-main.png",
    imageDetailPath: "/images/0-sun-detail.png",
    info: {
      Mass: "1.31 x 1022 kg",
      Orbit: "5.9 billion km",
      Diameter: "2,376.6±1.6 km",
      Temperature: "15 million°C",
    },
  },
  {
    slug: "alpha-centauri",
    name: "Alpha Centauri",
    category: "star",
    description:
      "Alpha Centauri is a star system in the southern constellation of Centaurus. It consists of three stars: Rigil Kentaurus (α Centauri A), Toliman (α Centauri B), and Proxima Centauri (α Centauri C).[14] Proxima Centauri is the closest star to the Sun at 4.2465 light-years (ly), which is 1.3020 parsecs (pc), while Alpha Centauri A and B are the nearest stars visible to the naked eye.",
    imagePath: "/images/0-alpha-centauri-main.png",
    imageDetailPath: "/images/0-alpha-centauri-detail.png",
    info: {
      Mass: "1.31 x 1022 kg",
      Orbit: "5.9 billion km",
      Diameter: "2,376.6±1.6 km",
      Temperature: "15 million°C",
    },
  },
  {
    slug: "mercury",
    name: "Mercury",
    category: "planet",
    description: `Mercury is the first planet from the Sun and the smallest in the Solar System. It is a rocky planet with a trace atmosphere and a surface gravity slightly higher than that of Mars. The surface of Mercury is similar to Earth's Moon, being heavily cratered, with an expansive rupes system generated from thrust faults, and bright ray systems, formed by ejecta. Its largest crater, Caloris Planitia, has a diameter of 1,550 km, which is about one-third the diameter of the planet.`,
    imagePath: "/images/mercury.png",
    imageDetailPath: "/images/1-mercury-detail.png",
    info: {
      Mass: "1.31 x 1022 kg",
      Orbit: "5.9 billion km",
      Moons: "5",
      Diameter: "2,376.6±1.6 km",
      Temperature: "-223,15 °C",
    },
  },
  {
    slug: "venus",
    name: "Venus",
    category: "planet",
    description: `Venus is the second planet from the Sun. It is often called Earth's "twin" or "sister" among the planets of the Solar System for its orbit being the closest to Earth's, both being rocky planets and having the most similar and nearly equal size and mass, and they also have a similar surface gravity: on Venus, gravity is 90% of Earth gravity, slightly lighter than on Earth.`,
    imagePath: "/images/venus.png",
    imageDetailPath: "/images/2-venus-detail.png",
    info: {
      Mass: "1.31 x 1022 kg",
      Orbit: "5.9 billion km",
      Moons: "5",
      Diameter: "2,376.6±1.6 km",
      Temperature: "-223,15 °C",
    },
  },
  {
    slug: "earth",
    name: "Earth",
    category: "planet",
    description: `Earth is the third planet from the Sun and the only astronomical object known to harbor life. This is enabled by Earth being an ocean world, the only one in the Solar System sustaining liquid surface water. Almost all of Earth's water is contained in its global ocean, covering 70.8% of Earth's crust. The remaining 29.2% of Earth's crust is land, most of which is located in the form of continental landmasses within Earth's land hemisphere.`,
    imagePath: "/images/earth.png",
    imageDetailPath: "/images/3-earth-detail.png",
    info: {
      Mass: "1.31 x 1022 kg",
      Orbit: "5.9 billion km",
      Moons: "5",
      Diameter: "2,376.6±1.6 km",
      Temperature: "-223,15 °C",
    },
  },
  {
    slug: "moon",
    name: "Moon",
    category: "moon",
    description: `The Moon is Earth's only natural satellite. It orbits around Earth at an average distance of 384,399 kilometres (238,854 mi), about 30 times Earth's diameter, and completes an orbit (lunar month) every 29.5 days. This is the same length it takes the Moon to complete a rotation (lunar day). The rotation period is synchronized with the orbital period by Earth's gravity forcing the Moon to face Earth always with the same side, making it tidally locked.`,
    imagePath: "/images/earth.png",
    imageDetailPath: "/images/3-earth-1-moon-detail.png",
    info: {
      Mass: "1.31 x 1022 kg",
      Orbit: "5.9 billion km",
      Moons: "5",
      Diameter: "2,376.6±1.6 km",
      Temperature: "-223,15 °C",
    },
  },
  {
    slug: "mars",
    name: "Mars",
    category: "planet",
    description: `Mars is the fourth planet from the Sun. It is also known as the "Red Planet", because of its orange-red appearance. Mars is a desert-like rocky planet with a tenuous atmosphere that is primarily carbon dioxide (CO2). At the average surface level the atmospheric pressure is a few thousandths of Earth’s, atmospheric temperature ranges from −153 to 20 °C (−243 to 68 °F)[24] and cosmic radiation is high. Mars retains some water, in the ground as well as thinly in the atmosphere, forming cirrus clouds, fog, frost, larger polar regions of permafrost and ice caps (with seasonal CO2 snow), but no bodies of liquid surface water.`,
    imagePath: "/images/uranus.png",
    imageDetailPath: "/images/4-mars-detail.png",
    info: {
      Mass: "1.31 x 1022 kg",
      Orbit: "5.9 billion km",
      Moons: "5",
      Diameter: "2,376.6±1.6 km",
      Temperature: "-223,15 °C",
    },
  },
  {
    slug: "phobos",
    name: "Phobos",
    category: "moon",
    description: `Phobos is the innermost and larger of the two natural satellites of Mars, the other being Deimos. The two moons were discovered in 1877 by American astronomer Asaph Hall. Phobos is named after the Greek god of fear and panic, who is the son of Ares (Mars) and twin brother of Deimos.
              Phobos is a small, irregularly shaped object with a mean radius of 11 km (7 mi). It orbits 6,000 km (3,700 mi) from the Martian surface, closer to its primary body than any other known natural satellite to a planet.`,
    imagePath: "/images/4-mars-1-phobos-main.png",
    imageDetailPath: "/images/4-mars-1-phobos-detail.png",
    info: {
      Mass: "1.31 x 1022 kg",
      Orbit: "5.9 billion km",
      Moons: "5",
      Diameter: "2,376.6±1.6 km",
      Temperature: "-223,15 °C",
    },
  },
  {
    slug: "deimos",
    name: "Deimos",
    category: "moon",
    description: `Deimos is the smaller and outer of the two natural satellites of Mars, the other being Phobos. Deimos has a mean radius of 6.2 km (3.9 mi) and takes 30.3 hours to orbit Mars.[5] Deimos is 23,460 km (14,580 mi) from Mars, much farther than Mars's other moon, Phobos. It is named after Deimos, the Ancient Greek god and personification of dread and terror.`,
    imagePath: "/images/4-mars-2-deimos-main.png",
    imageDetailPath: "/images/4-mars-2-deimos-detail.png",
    info: {
      Mass: "1.31 x 1022 kg",
      Orbit: "5.9 billion km",
      Moons: "5",
      Diameter: "2,376.6±1.6 km",
      Temperature: "-223,15 °C",
    },
  },
  {
    slug: "jupiter",
    name: "Jupiter",
    category: "planet",
    description: `Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass nearly 2.5 times that of all the other planets in the Solar System combined and slightly less than one-thousandth the mass of the Sun. Its diameter is 11 times that of Earth and a tenth that of the Sun. Jupiter orbits the Sun at a distance of 5.20 AU (778.5 Gm), with an orbital period of 11.86 years. It is the third-brightest natural object in the Earth's night sky, after the Moon and Venus, and has been observed since prehistoric times.`,
    imagePath: "/images/uranus.png",
    imageDetailPath: "/images/5-jupiter-detail.png",
    info: {
      Mass: "1.31 x 1022 kg",
      Orbit: "5.9 billion km",
      Moons: "5",
      Diameter: "2,376.6±1.6 km",
      Temperature: "-223,15 °C",
    },
  },
  {
    slug: "saturn",
    name: "Saturn",
    category: "planet",
    description:
      "Saturn is the sixth planet from the Sun and the second largest in the Solar System, after Jupiter. It is a gas giant, with an average radius of about 9 times that of Earth.",
    imagePath: "/images/saturn.png",
    imageDetailPath: "/images/6-saturn-detail.png",
    info: {
      Mass: "1.31 x 1022 kg",
      Orbit: "5.9 billion km",
      Moons: "5",
      Diameter: "2,376.6±1.6 km",
      Temperature: "-223,15 °C",
    },
  },
  {
    slug: "uranus",
    name: "Uranus",
    category: "planet",
    description: `Uranus is the seventh planet from the Sun. It is a gaseous cyan-coloured ice giant. Most of the planet is made of water, ammonia, and methane in a supercritical phase of matter, which astronomy calls "ice" or volatiles. The planet's atmosphere has a complex layered cloud structure and has the lowest minimum temperature (49 K (−224 °C; −371 °F)) of all the Solar System's planets. It has a marked axial tilt of 82.23° with a retrograde rotation period of 17 hours and 14 minutes. This means that in an 84-Earth-year orbital period around the Sun, its poles get around 42 years of continuous sunlight, followed by 42 years of continuous darkness.`,
    imagePath: "/images/uranus.png",
    imageDetailPath: "/images/7-uranus-detail.png",
    info: {
      Mass: "1.31 x 1022 kg",
      Orbit: "5.9 billion km",
      Moons: "5",
      Diameter: "2,376.6±1.6 km",
      Temperature: "-223,15 °C",
    },
  },
  {
    slug: "neptune",
    name: "Neptune",
    category: "planet",
    description:
      "Neptune is the eighth and farthest known planet orbiting the Sun. It is the fourth-largest planet in the Solar System by diameter, the third-most-massive planet, and the densest giant planet. It is 17 times the mass of Earth. Compared to Uranus, its neighbouring ice giant, Neptune is slightly smaller, but more massive and denser. Being composed primarily of gases and liquids, it has no well-defined solid surface. Neptune orbits the Sun once every 164.8 years at an orbital distance of 30.1 astronomical units.",
    imagePath: "/images/neptune.png",
    imageDetailPath: "/images/8-neptune-pale-detail.png",
    info: {
      Mass: "1.02409 × 1026 kg",
      Orbit: "4.5 billion km",
      Moons: "16",
      Diameter: "24,622 ± 19 km",
      Temperature: "-200 °C",
    },
  },
  {
    slug: "pluto",
    name: "Pluto",
    category: "dwarf planet",
    description:
      "Pluto is a dwarf planet in the Kuiper belt, a ring of bodies beyond the orbit of Neptune. It is the ninth-largest and tenth-most-massive known object to directly orbit the Sun. It is the largest known trans-Neptunian object by volume by a small margin, but is less massive than Eris. Like other Kuiper belt objects, Pluto is made primarily of ice and rock.",
    imagePath: "/images/9-pluto-main.png",
    imageDetailPath: "/images/9-pluto-detail.png",
    info: {
      Mass: "1.31 x 1022 kg",
      Orbit: "5.9 billion km",
      Moons: "5",
      Diameter: "2,376.6 ± 1.6 km",
      Temperature: "-223,15 °C",
    },
  },
];

export async function saveAstroObjects(): Promise<void> {
  for (const object of objects) {
    const newObject = new AstroObject(
      object.name,
      object.slug,
      object.category as AstroObjectCategory,
      object.description,
      object.imagePath,
      object.imageDetailPath,
      object.info,
      object.slug.split('').reverse().join(''),
    );
    const objectRef = doc(db, "objects", newObject.slug).withConverter(astroObjectConverter);
    await setDoc(objectRef, newObject);
  }
}
