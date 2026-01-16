import FeatureCard from "./ui/FeatureCard";

interface Feature {
    selectedRegion: string;
    setSelectedFeatures: (feature: string, value: { name: string; image: string }) => void;
}

export default function FeaturesMenu ({selectedRegion, setSelectedFeatures}: Feature) {

    const features = {
  "Whole": {
    "Shape": [
      {
        "name": "upright-perching_water-like",
        "image": "/images/whole/shape/upright-perching-water-like.jpg"
      },
      {
        "name": "long-legged-like",
        "image": "/images/whole/shape/long-legged-like.png"
      },
      {
        "name": "duck-like",
        "image": "/images/whole/shape/duck-like.jpg"
      },
      {
        "name": "owl-like",
        "image": "/images/whole/shape/owl-like.png"
      },
      {
        "name": "gull-like",
        "image": "/images/whole/shape/gull-like.jpg"
      },
      {
        "name": "hummingbird-like",
        "image": "/images/whole/shape/hummingbird-like.jpg"
      },
      {
        "name": "pigeon-like",
        "image": "/images/whole/shape/pigeon-like.jpg"
      },
      {
        "name": "tree-clinging-like",
        "image": "/images/whole/shape/tree-clinging-like.jpg"
      },
      {
        "name": "hawk-like",
        "image": "/images/whole/shape/hawk-like.jpg"
      },
      {
        "name": "sandpiper-like",
        "image": "/images/whole/shape/sandpiper-like.jpg"
      },
      {
        "name": "upland-ground-like",
        "image": "/images/whole/shape/upland-ground-like.jpg"
      },
      {
        "name": "swallow-like",
        "image": "/images/whole/shape/swallow-like.jpg"
      },
      {
        "name": "perching-like",
        "image": "/images/whole/shape/perching-like.jpg"
      }
    ],
    "Size": [
      {
        "name": "very_small_(3_-_5_in)",
        "image": "/images/whole/size/very-small-3---5-in.png"
      },
      {
        "name": "small_(5_-_9_in)",
        "image": "/images/whole/size/small-5---9-in.png"
      },
      {
        "name": "medium_(9_-_16_in)",
        "image": "/images/whole/size/medium-9---16-in.png"
      },
      {
        "name": "large_(16_-_32_in)",
        "image": "/images/whole/size/large-16---32-in.png"
      },
      {
        "name": "very_large_(32_-_72_in)",
        "image": "/images/whole/size/very-large-32---72-in.png"
      }
    ],
    "Primary Color": [
      {
        "name": "blue",
        "image": "/images/whole/primary-color/blue.png"
      },
      {
        "name": "brown",
        "image": "/images/whole/primary-color/brown.png"
      },
      {
        "name": "iridescent",
        "image": "/images/whole/primary-color/iridescent.png"
      },
      {
        "name": "purple",
        "image": "/images/whole/primary-color/purple.png"
      },
      {
        "name": "rufous",
        "image": "/images/whole/primary-color/rufous.png"
      },
      {
        "name": "grey",
        "image": "/images/whole/primary-color/grey.png"
      },
      {
        "name": "yellow",
        "image": "/images/whole/primary-color/yellow.png"
      },
      {
        "name": "olive",
        "image": "/images/whole/primary-color/olive.png"
      },
      {
        "name": "green",
        "image": "/images/whole/primary-color/green.png"
      },
      {
        "name": "pink",
        "image": "/images/whole/primary-color/pink.png"
      },
      {
        "name": "orange",
        "image": "/images/whole/primary-color/orange.png"
      },
      {
        "name": "black",
        "image": "/images/whole/primary-color/black.png"
      },
      {
        "name": "white",
        "image": "/images/whole/primary-color/white.png"
      },
      {
        "name": "red",
        "image": "/images/whole/primary-color/red.png"
      },
      {
        "name": "buff",
        "image": "/images/whole/primary-color/buff.png"
      }
    ],
    "Upperparts Color": [
      {
        "name": "blue",
        "image": "/images/whole/upperparts-color/blue.png"
      },
      {
        "name": "brown",
        "image": "/images/whole/upperparts-color/brown.png"
      },
      {
        "name": "iridescent",
        "image": "/images/whole/upperparts-color/iridescent.png"
      },
      {
        "name": "purple",
        "image": "/images/whole/upperparts-color/purple.png"
      },
      {
        "name": "rufous",
        "image": "/images/whole/upperparts-color/rufous.png"
      },
      {
        "name": "grey",
        "image": "/images/whole/upperparts-color/grey.png"
      },
      {
        "name": "yellow",
        "image": "/images/whole/upperparts-color/yellow.png"
      },
      {
        "name": "olive",
        "image": "/images/whole/upperparts-color/olive.png"
      },
      {
        "name": "green",
        "image": "/images/whole/upperparts-color/green.png"
      },
      {
        "name": "pink",
        "image": "/images/whole/upperparts-color/pink.png"
      },
      {
        "name": "orange",
        "image": "/images/whole/upperparts-color/orange.png"
      },
      {
        "name": "black",
        "image": "/images/whole/upperparts-color/black.png"
      },
      {
        "name": "white",
        "image": "/images/whole/upperparts-color/white.png"
      },
      {
        "name": "red",
        "image": "/images/whole/upperparts-color/red.png"
      },
      {
        "name": "buff",
        "image": "/images/whole/upperparts-color/buff.png"
      }
    ],
    "Underparts Color": [
      {
        "name": "blue",
        "image": "/images/whole/underparts-color/blue.png"
      },
      {
        "name": "brown",
        "image": "/images/whole/underparts-color/brown.png"
      },
      {
        "name": "iridescent",
        "image": "/images/whole/underparts-color/iridescent.png"
      },
      {
        "name": "purple",
        "image": "/images/whole/underparts-color/purple.png"
      },
      {
        "name": "rufous",
        "image": "/images/whole/underparts-color/rufous.png"
      },
      {
        "name": "grey",
        "image": "/images/whole/underparts-color/grey.png"
      },
      {
        "name": "yellow",
        "image": "/images/whole/underparts-color/yellow.png"
      },
      {
        "name": "olive",
        "image": "/images/whole/underparts-color/olive.png"
      },
      {
        "name": "green",
        "image": "/images/whole/underparts-color/green.png"
      },
      {
        "name": "pink",
        "image": "/images/whole/underparts-color/pink.png"
      },
      {
        "name": "orange",
        "image": "/images/whole/underparts-color/orange.png"
      },
      {
        "name": "black",
        "image": "/images/whole/underparts-color/black.png"
      },
      {
        "name": "white",
        "image": "/images/whole/underparts-color/white.png"
      },
      {
        "name": "red",
        "image": "/images/whole/underparts-color/red.png"
      },
      {
        "name": "buff",
        "image": "/images/whole/underparts-color/buff.png"
      }
    ]
  },
  "Beak": {
    "Bill Shape": [
      {
        "name": "curved_(up_or_down)",
        "image": "/images/beak/bill-shape/curved-up-or-down.png"
      },
      {
        "name": "dagger",
        "image": "/images/beak/bill-shape/dagger.png"
      },
      {
        "name": "hooked",
        "image": "/images/beak/bill-shape/hooked.png"
      },
      {
        "name": "needle",
        "image": "/images/beak/bill-shape/needle.png"
      },
      {
        "name": "hooked_seabird",
        "image": "/images/beak/bill-shape/hooked-seabird.png"
      },
      {
        "name": "spatulate",
        "image": "/images/beak/bill-shape/spatulate.png"
      },
      {
        "name": "all-purpose",
        "image": "/images/beak/bill-shape/all-purpose.png"
      },
      {
        "name": "cone",
        "image": "/images/beak/bill-shape/cone.png"
      },
      {
        "name": "specialized",
        "image": "/images/beak/bill-shape/specialized.png"
      }
    ],
    "Bill Length": [
      {
        "name": "about_the_same_as_head",
        "image": "/images/beak/bill-length/about-the-same-as-head.png"
      },
      {
        "name": "longer_than_head",
        "image": "/images/beak/bill-length/longer-than-head.png"
      },
      {
        "name": "shorter_than_head",
        "image": "/images/beak/bill-length/shorter-than-head.png"
      }
    ],
    "Bill Color": [
      {
        "name": "blue",
        "image": "/images/beak/bill-color/blue.png"
      },
      {
        "name": "brown",
        "image": "/images/beak/bill-color/brown.png"
      },
      {
        "name": "iridescent",
        "image": "/images/beak/bill-color/iridescent.png"
      },
      {
        "name": "purple",
        "image": "/images/beak/bill-color/purple.png"
      },
      {
        "name": "rufous",
        "image": "/images/beak/bill-color/rufous.png"
      },
      {
        "name": "grey",
        "image": "/images/beak/bill-color/grey.png"
      },
      {
        "name": "yellow",
        "image": "/images/beak/bill-color/yellow.png"
      },
      {
        "name": "olive",
        "image": "/images/beak/bill-color/olive.png"
      },
      {
        "name": "green",
        "image": "/images/beak/bill-color/green.png"
      },
      {
        "name": "pink",
        "image": "/images/beak/bill-color/pink.png"
      },
      {
        "name": "orange",
        "image": "/images/beak/bill-color/orange.png"
      },
      {
        "name": "black",
        "image": "/images/beak/bill-color/black.png"
      },
      {
        "name": "white",
        "image": "/images/beak/bill-color/white.png"
      },
      {
        "name": "red",
        "image": "/images/beak/bill-color/red.png"
      },
      {
        "name": "buff",
        "image": "/images/beak/bill-color/buff.png"
      }
    ]
  },
  "Head": {
    "Head Pattern": [
      {
        "name": "spotted",
        "image": "/images/head/head-pattern/spotted.png"
      },
      {
        "name": "malar",
        "image": "/images/head/head-pattern/malar.png"
      },
      {
        "name": "crested",
        "image": "/images/head/head-pattern/crested.png"
      },
      {
        "name": "masked",
        "image": "/images/head/head-pattern/masked.png"
      },
      {
        "name": "unique_pattern",
        "image": "/images/head/head-pattern/unique-pattern.png"
      },
      {
        "name": "eyebrow",
        "image": "/images/head/head-pattern/eyebrow.png"
      },
      {
        "name": "eyering",
        "image": "/images/head/head-pattern/eyering.png"
      },
      {
        "name": "plain",
        "image": "/images/head/head-pattern/plain.png"
      },
      {
        "name": "eyeline",
        "image": "/images/head/head-pattern/eyeline.png"
      },
      {
        "name": "striped",
        "image": "/images/head/head-pattern/striped.png"
      },
      {
        "name": "capped",
        "image": "/images/head/head-pattern/capped.png"
      }
    ],
    "Eye Color": [
      {
        "name": "blue",
        "image": "/images/head/eye-color/blue.png"
      },
      {
        "name": "brown",
        "image": "/images/head/eye-color/brown.png"
      },
      {
        "name": "purple",
        "image": "/images/head/eye-color/purple.png"
      },
      {
        "name": "rufous",
        "image": "/images/head/eye-color/rufous.png"
      },
      {
        "name": "grey",
        "image": "/images/head/eye-color/grey.png"
      },
      {
        "name": "yellow",
        "image": "/images/head/eye-color/yellow.png"
      },
      {
        "name": "olive",
        "image": "/images/head/eye-color/olive.png"
      },
      {
        "name": "green",
        "image": "/images/head/eye-color/green.png"
      },
      {
        "name": "pink",
        "image": "/images/head/eye-color/pink.png"
      },
      {
        "name": "orange",
        "image": "/images/head/eye-color/orange.png"
      },
      {
        "name": "black",
        "image": "/images/head/eye-color/black.png"
      },
      {
        "name": "white",
        "image": "/images/head/eye-color/white.png"
      },
      {
        "name": "red",
        "image": "/images/head/eye-color/red.png"
      },
      {
        "name": "buff",
        "image": "/images/head/eye-color/buff.png"
      }
    ],
    "Forehead Color": [
      {
        "name": "blue",
        "image": "/images/head/forehead-color/blue.png"
      },
      {
        "name": "brown",
        "image": "/images/head/forehead-color/brown.png"
      },
      {
        "name": "iridescent",
        "image": "/images/head/forehead-color/iridescent.png"
      },
      {
        "name": "purple",
        "image": "/images/head/forehead-color/purple.png"
      },
      {
        "name": "rufous",
        "image": "/images/head/forehead-color/rufous.png"
      },
      {
        "name": "grey",
        "image": "/images/head/forehead-color/grey.png"
      },
      {
        "name": "yellow",
        "image": "/images/head/forehead-color/yellow.png"
      },
      {
        "name": "olive",
        "image": "/images/head/forehead-color/olive.png"
      },
      {
        "name": "green",
        "image": "/images/head/forehead-color/green.png"
      },
      {
        "name": "pink",
        "image": "/images/head/forehead-color/pink.png"
      },
      {
        "name": "orange",
        "image": "/images/head/forehead-color/orange.png"
      },
      {
        "name": "black",
        "image": "/images/head/forehead-color/black.png"
      },
      {
        "name": "white",
        "image": "/images/head/forehead-color/white.png"
      },
      {
        "name": "red",
        "image": "/images/head/forehead-color/red.png"
      },
      {
        "name": "buff",
        "image": "/images/head/forehead-color/buff.png"
      }
    ],
    "Nape Color": [
      {
        "name": "blue",
        "image": "/images/head/nape-color/blue.png"
      },
      {
        "name": "brown",
        "image": "/images/head/nape-color/brown.png"
      },
      {
        "name": "iridescent",
        "image": "/images/head/nape-color/iridescent.png"
      },
      {
        "name": "purple",
        "image": "/images/head/nape-color/purple.png"
      },
      {
        "name": "rufous",
        "image": "/images/head/nape-color/rufous.png"
      },
      {
        "name": "grey",
        "image": "/images/head/nape-color/grey.png"
      },
      {
        "name": "yellow",
        "image": "/images/head/nape-color/yellow.png"
      },
      {
        "name": "olive",
        "image": "/images/head/nape-color/olive.png"
      },
      {
        "name": "green",
        "image": "/images/head/nape-color/green.png"
      },
      {
        "name": "pink",
        "image": "/images/head/nape-color/pink.png"
      },
      {
        "name": "orange",
        "image": "/images/head/nape-color/orange.png"
      },
      {
        "name": "black",
        "image": "/images/head/nape-color/black.png"
      },
      {
        "name": "white",
        "image": "/images/head/nape-color/white.png"
      },
      {
        "name": "red",
        "image": "/images/head/nape-color/red.png"
      },
      {
        "name": "buff",
        "image": "/images/head/nape-color/buff.png"
      }
    ],
    "Crown Color": [
      {
        "name": "blue",
        "image": "/images/head/crown-color/blue.png"
      },
      {
        "name": "brown",
        "image": "/images/head/crown-color/brown.png"
      },
      {
        "name": "iridescent",
        "image": "/images/head/crown-color/iridescent.png"
      },
      {
        "name": "purple",
        "image": "/images/head/crown-color/purple.png"
      },
      {
        "name": "rufous",
        "image": "/images/head/crown-color/rufous.png"
      },
      {
        "name": "grey",
        "image": "/images/head/crown-color/grey.png"
      },
      {
        "name": "yellow",
        "image": "/images/head/crown-color/yellow.png"
      },
      {
        "name": "olive",
        "image": "/images/head/crown-color/olive.png"
      },
      {
        "name": "green",
        "image": "/images/head/crown-color/green.png"
      },
      {
        "name": "pink",
        "image": "/images/head/crown-color/pink.png"
      },
      {
        "name": "orange",
        "image": "/images/head/crown-color/orange.png"
      },
      {
        "name": "black",
        "image": "/images/head/crown-color/black.png"
      },
      {
        "name": "white",
        "image": "/images/head/crown-color/white.png"
      },
      {
        "name": "red",
        "image": "/images/head/crown-color/red.png"
      },
      {
        "name": "buff",
        "image": "/images/head/crown-color/buff.png"
      }
    ],
    "Throat Color": [
      {
        "name": "blue",
        "image": "/images/head/throat-color/blue.png"
      },
      {
        "name": "brown",
        "image": "/images/head/throat-color/brown.png"
      },
      {
        "name": "iridescent",
        "image": "/images/head/throat-color/iridescent.png"
      },
      {
        "name": "purple",
        "image": "/images/head/throat-color/purple.png"
      },
      {
        "name": "rufous",
        "image": "/images/head/throat-color/rufous.png"
      },
      {
        "name": "grey",
        "image": "/images/head/throat-color/grey.png"
      },
      {
        "name": "yellow",
        "image": "/images/head/throat-color/yellow.png"
      },
      {
        "name": "olive",
        "image": "/images/head/throat-color/olive.png"
      },
      {
        "name": "green",
        "image": "/images/head/throat-color/green.png"
      },
      {
        "name": "pink",
        "image": "/images/head/throat-color/pink.png"
      },
      {
        "name": "orange",
        "image": "/images/head/throat-color/orange.png"
      },
      {
        "name": "black",
        "image": "/images/head/throat-color/black.png"
      },
      {
        "name": "white",
        "image": "/images/head/throat-color/white.png"
      },
      {
        "name": "red",
        "image": "/images/head/throat-color/red.png"
      },
      {
        "name": "buff",
        "image": "/images/head/throat-color/buff.png"
      }
    ]
  },
  "Wings": {
    "Wing Shape": [
      {
        "name": "rounded-wings",
        "image": "/images/wings/wing-shape/rounded-wings.png"
      },
      {
        "name": "pointed-wings",
        "image": "/images/wings/wing-shape/pointed-wings.png"
      },
      {
        "name": "broad-wings",
        "image": "/images/wings/wing-shape/broad-wings.png"
      },
      {
        "name": "tapered-wings",
        "image": "/images/wings/wing-shape/tapered-wings.png"
      },
      {
        "name": "long-wings",
        "image": "/images/wings/wing-shape/long-wings.png"
      }
    ],
    "Wing Pattern": [
      {
        "name": "solid",
        "image": "/images/wings/wing-pattern/solid.png"
      },
      {
        "name": "spotted",
        "image": "/images/wings/wing-pattern/spotted.png"
      },
      {
        "name": "striped",
        "image": "/images/wings/wing-pattern/striped.png"
      },
      {
        "name": "multi-colored",
        "image": "/images/wings/wing-pattern/multi-colored.png"
      }
    ],
    "Wing Color": [
      {
        "name": "blue",
        "image": "/images/wings/wing-color/blue.png"
      },
      {
        "name": "brown",
        "image": "/images/wings/wing-color/brown.png"
      },
      {
        "name": "iridescent",
        "image": "/images/wings/wing-color/iridescent.png"
      },
      {
        "name": "purple",
        "image": "/images/wings/wing-color/purple.png"
      },
      {
        "name": "rufous",
        "image": "/images/wings/wing-color/rufous.png"
      },
      {
        "name": "grey",
        "image": "/images/wings/wing-color/grey.png"
      },
      {
        "name": "yellow",
        "image": "/images/wings/wing-color/yellow.png"
      },
      {
        "name": "olive",
        "image": "/images/wings/wing-color/olive.png"
      },
      {
        "name": "green",
        "image": "/images/wings/wing-color/green.png"
      },
      {
        "name": "pink",
        "image": "/images/wings/wing-color/pink.png"
      },
      {
        "name": "orange",
        "image": "/images/wings/wing-color/orange.png"
      },
      {
        "name": "black",
        "image": "/images/wings/wing-color/black.png"
      },
      {
        "name": "white",
        "image": "/images/wings/wing-color/white.png"
      },
      {
        "name": "red",
        "image": "/images/wings/wing-color/red.png"
      },
      {
        "name": "buff",
        "image": "/images/wings/wing-color/buff.png"
      }
    ]
  },
  "Breast": {
    "Breast Pattern": [
      {
        "name": "solid",
        "image": "/images/breast/breast-pattern/solid.png"
      },
      {
        "name": "spotted",
        "image": "/images/breast/breast-pattern/spotted.png"
      },
      {
        "name": "striped",
        "image": "/images/breast/breast-pattern/striped.png"
      },
      {
        "name": "multi-colored",
        "image": "/images/breast/breast-pattern/multi-colored.png"
      }
    ],
    "Breast Color": [
      {
        "name": "blue",
        "image": "/images/breast/breast-color/blue.png"
      },
      {
        "name": "brown",
        "image": "/images/breast/breast-color/brown.png"
      },
      {
        "name": "iridescent",
        "image": "/images/breast/breast-color/iridescent.png"
      },
      {
        "name": "purple",
        "image": "/images/breast/breast-color/purple.png"
      },
      {
        "name": "rufous",
        "image": "/images/breast/breast-color/rufous.png"
      },
      {
        "name": "grey",
        "image": "/images/breast/breast-color/grey.png"
      },
      {
        "name": "yellow",
        "image": "/images/breast/breast-color/yellow.png"
      },
      {
        "name": "olive",
        "image": "/images/breast/breast-color/olive.png"
      },
      {
        "name": "green",
        "image": "/images/breast/breast-color/green.png"
      },
      {
        "name": "pink",
        "image": "/images/breast/breast-color/pink.png"
      },
      {
        "name": "orange",
        "image": "/images/breast/breast-color/orange.png"
      },
      {
        "name": "black",
        "image": "/images/breast/breast-color/black.png"
      },
      {
        "name": "white",
        "image": "/images/breast/breast-color/white.png"
      },
      {
        "name": "red",
        "image": "/images/breast/breast-color/red.png"
      },
      {
        "name": "buff",
        "image": "/images/breast/breast-color/buff.png"
      }
    ]
  },
  "Belly": {
    "Belly Pattern": [
      {
        "name": "solid",
        "image": "/images/belly/belly-pattern/solid.png"
      },
      {
        "name": "spotted",
        "image": "/images/belly/belly-pattern/spotted.png"
      },
      {
        "name": "striped",
        "image": "/images/belly/belly-pattern/striped.png"
      },
      {
        "name": "multi-colored",
        "image": "/images/belly/belly-pattern/multi-colored.png"
      }
    ],
    "Belly Color": [
      {
        "name": "blue",
        "image": "/images/belly/belly-color/blue.png"
      },
      {
        "name": "brown",
        "image": "/images/belly/belly-color/brown.png"
      },
      {
        "name": "iridescent",
        "image": "/images/belly/belly-color/iridescent.png"
      },
      {
        "name": "purple",
        "image": "/images/belly/belly-color/purple.png"
      },
      {
        "name": "rufous",
        "image": "/images/belly/belly-color/rufous.png"
      },
      {
        "name": "grey",
        "image": "/images/belly/belly-color/grey.png"
      },
      {
        "name": "yellow",
        "image": "/images/belly/belly-color/yellow.png"
      },
      {
        "name": "olive",
        "image": "/images/belly/belly-color/olive.png"
      },
      {
        "name": "green",
        "image": "/images/belly/belly-color/green.png"
      },
      {
        "name": "pink",
        "image": "/images/belly/belly-color/pink.png"
      },
      {
        "name": "orange",
        "image": "/images/belly/belly-color/orange.png"
      },
      {
        "name": "black",
        "image": "/images/belly/belly-color/black.png"
      },
      {
        "name": "white",
        "image": "/images/belly/belly-color/white.png"
      },
      {
        "name": "red",
        "image": "/images/belly/belly-color/red.png"
      },
      {
        "name": "buff",
        "image": "/images/belly/belly-color/buff.png"
      }
    ]
  },
  "Back": {
    "Back Pattern": [
      {
        "name": "solid",
        "image": "/images/back/back-pattern/solid.png"
      },
      {
        "name": "spotted",
        "image": "/images/back/back-pattern/spotted.png"
      },
      {
        "name": "striped",
        "image": "/images/back/back-pattern/striped.png"
      },
      {
        "name": "multi-colored",
        "image": "/images/back/back-pattern/multi-colored.png"
      }
    ],
    "Back Color": [
      {
        "name": "blue",
        "image": "/images/back/back-color/blue.png"
      },
      {
        "name": "brown",
        "image": "/images/back/back-color/brown.png"
      },
      {
        "name": "iridescent",
        "image": "/images/back/back-color/iridescent.png"
      },
      {
        "name": "purple",
        "image": "/images/back/back-color/purple.png"
      },
      {
        "name": "rufous",
        "image": "/images/back/back-color/rufous.png"
      },
      {
        "name": "grey",
        "image": "/images/back/back-color/grey.png"
      },
      {
        "name": "yellow",
        "image": "/images/back/back-color/yellow.png"
      },
      {
        "name": "olive",
        "image": "/images/back/back-color/olive.png"
      },
      {
        "name": "green",
        "image": "/images/back/back-color/green.png"
      },
      {
        "name": "pink",
        "image": "/images/back/back-color/pink.png"
      },
      {
        "name": "orange",
        "image": "/images/back/back-color/orange.png"
      },
      {
        "name": "black",
        "image": "/images/back/back-color/black.png"
      },
      {
        "name": "white",
        "image": "/images/back/back-color/white.png"
      },
      {
        "name": "red",
        "image": "/images/back/back-color/red.png"
      },
      {
        "name": "buff",
        "image": "/images/back/back-color/buff.png"
      }
    ]
  },
  "Feet": {
    "Leg Color": [
      {
        "name": "blue",
        "image": "/images/feet/leg-color/blue.png"
      },
      {
        "name": "brown",
        "image": "/images/feet/leg-color/brown.png"
      },
      {
        "name": "iridescent",
        "image": "/images/feet/leg-color/iridescent.png"
      },
      {
        "name": "purple",
        "image": "/images/feet/leg-color/purple.png"
      },
      {
        "name": "rufous",
        "image": "/images/feet/leg-color/rufous.png"
      },
      {
        "name": "grey",
        "image": "/images/feet/leg-color/grey.png"
      },
      {
        "name": "yellow",
        "image": "/images/feet/leg-color/yellow.png"
      },
      {
        "name": "olive",
        "image": "/images/feet/leg-color/olive.png"
      },
      {
        "name": "green",
        "image": "/images/feet/leg-color/green.png"
      },
      {
        "name": "pink",
        "image": "/images/feet/leg-color/pink.png"
      },
      {
        "name": "orange",
        "image": "/images/feet/leg-color/orange.png"
      },
      {
        "name": "black",
        "image": "/images/feet/leg-color/black.png"
      },
      {
        "name": "white",
        "image": "/images/feet/leg-color/white.png"
      },
      {
        "name": "red",
        "image": "/images/feet/leg-color/red.png"
      },
      {
        "name": "buff",
        "image": "/images/feet/leg-color/buff.png"
      }
    ]
  },
  "Tail": {
    "Tail Shape": [
      {
        "name": "forked_tail",
        "image": "/images/tail/tail-shape/forked-tail.png"
      },
      {
        "name": "rounded_tail",
        "image": "/images/tail/tail-shape/rounded-tail.png"
      },
      {
        "name": "notched_tail",
        "image": "/images/tail/tail-shape/notched-tail.png"
      },
      {
        "name": "fan-shaped_tail",
        "image": "/images/tail/tail-shape/fan-shaped-tail.png"
      },
      {
        "name": "pointed_tail",
        "image": "/images/tail/tail-shape/pointed-tail.png"
      },
      {
        "name": "squared_tail",
        "image": "/images/tail/tail-shape/squared-tail.png"
      }
    ],
    "Tail Pattern": [
      {
        "name": "solid",
        "image": "/images/tail/tail-pattern/solid.png"
      },
      {
        "name": "spotted",
        "image": "/images/tail/tail-pattern/spotted.png"
      },
      {
        "name": "striped",
        "image": "/images/tail/tail-pattern/striped.png"
      },
      {
        "name": "multi-colored",
        "image": "/images/tail/tail-pattern/multi-colored.png"
      }
    ],
    "Upper Tail Color": [
      {
        "name": "blue",
        "image": "/images/tail/upper-tail-color/blue.png"
      },
      {
        "name": "brown",
        "image": "/images/tail/upper-tail-color/brown.png"
      },
      {
        "name": "iridescent",
        "image": "/images/tail/upper-tail-color/iridescent.png"
      },
      {
        "name": "purple",
        "image": "/images/tail/upper-tail-color/purple.png"
      },
      {
        "name": "rufous",
        "image": "/images/tail/upper-tail-color/rufous.png"
      },
      {
        "name": "grey",
        "image": "/images/tail/upper-tail-color/grey.png"
      },
      {
        "name": "yellow",
        "image": "/images/tail/upper-tail-color/yellow.png"
      },
      {
        "name": "olive",
        "image": "/images/tail/upper-tail-color/olive.png"
      },
      {
        "name": "green",
        "image": "/images/tail/upper-tail-color/green.png"
      },
      {
        "name": "pink",
        "image": "/images/tail/upper-tail-color/pink.png"
      },
      {
        "name": "orange",
        "image": "/images/tail/upper-tail-color/orange.png"
      },
      {
        "name": "black",
        "image": "/images/tail/upper-tail-color/black.png"
      },
      {
        "name": "white",
        "image": "/images/tail/upper-tail-color/white.png"
      },
      {
        "name": "red",
        "image": "/images/tail/upper-tail-color/red.png"
      },
      {
        "name": "buff",
        "image": "/images/tail/upper-tail-color/buff.png"
      }
    ],
    "Under Tail Color": [
      {
        "name": "blue",
        "image": "/images/tail/under-tail-color/blue.png"
      },
      {
        "name": "brown",
        "image": "/images/tail/under-tail-color/brown.png"
      },
      {
        "name": "iridescent",
        "image": "/images/tail/under-tail-color/iridescent.png"
      },
      {
        "name": "purple",
        "image": "/images/tail/under-tail-color/purple.png"
      },
      {
        "name": "rufous",
        "image": "/images/tail/under-tail-color/rufous.png"
      },
      {
        "name": "grey",
        "image": "/images/tail/under-tail-color/grey.png"
      },
      {
        "name": "yellow",
        "image": "/images/tail/under-tail-color/yellow.png"
      },
      {
        "name": "olive",
        "image": "/images/tail/under-tail-color/olive.png"
      },
      {
        "name": "green",
        "image": "/images/tail/under-tail-color/green.png"
      },
      {
        "name": "pink",
        "image": "/images/tail/under-tail-color/pink.png"
      },
      {
        "name": "orange",
        "image": "/images/tail/under-tail-color/orange.png"
      },
      {
        "name": "black",
        "image": "/images/tail/under-tail-color/black.png"
      },
      {
        "name": "white",
        "image": "/images/tail/under-tail-color/white.png"
      },
      {
        "name": "red",
        "image": "/images/tail/under-tail-color/red.png"
      },
      {
        "name": "buff",
        "image": "/images/tail/under-tail-color/buff.png"
      }
    ]
  }
};

    return (
        <div>
            {selectedRegion && (
                <div>
                    {Object.entries(features[selectedRegion as keyof typeof features] || {}).map(([feature, values]) => (
                        <div key={feature}>
                            <h1 className="feature-title">{feature}</h1>
                            <div className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto py-2 scroll-container"> 
                                {values.map((value) => (
                                    <FeatureCard
                                        key={value.name}
                                        onClick={() => setSelectedFeatures(feature, value)}
                                        name={value.name}
                                        image={value.image}
                                    />

                                ))}

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}