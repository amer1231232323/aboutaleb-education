const universities = [
  {
    id: "u1",
    name: "جامعة رقم 1",
    logo: "/images/universities/u1.png",
  },
  {
    id: "u2",
    name: "جامعة رقم 2",
    logo: "/images/universities/u2.png",
  },
  {
    id: "u3",
    name: "جامعة رقم 3",
    logo: "/images/universities/default.png",
  },
];

// توليد لحد 41 جامعة
for (let i = 4; i <= 41; i++) {
  universities.push({
    id: `u${i}`,
    name: `جامعة رقم ${i}`,
    logo: "/images/universities/default.png",
  });
}

export default universities;