import type { LucideIcon } from "lucide-react";
import {
  Bird,
  Feather,
  Palette,
  Eye,
  Smile,
  Waves,
  Triangle,
  Circle,
  CircleDot,
  Sparkles,
  Footprints,
  MoveUpRight,
  Wind,
  Crown,
  ScanEye,
} from "lucide-react";

export type FeatureValue = {
  name: string;
  prompt: string;
  icon: LucideIcon;
  color?: string;
};

export type FeaturesData = Record<string, Record<string, FeatureValue[]>>;

export const FEATURES: FeaturesData = {
  Whole: {
    Shape: [
      {
        name: "Perching bird",
        prompt: "upright perching bird body",
        icon: Bird,
      },
      {
        name: "Duck-like",
        prompt: "duck-like waterbird body with rounded chest",
        icon: Waves,
      },
      {
        name: "Gull-like",
        prompt: "gull-like seabird body with long wings",
        icon: Wind,
      },
      {
        name: "Hawk-like",
        prompt: "raptor-like body with strong chest and alert posture",
        icon: MoveUpRight,
      },
      {
        name: "Owl-like",
        prompt: "owl-like rounded body with broad head",
        icon: CircleDot,
      },
      {
        name: "Hummingbird-like",
        prompt: "tiny hummingbird-like body with slim beak",
        icon: Sparkles,
      },
      {
        name: "Long-legged",
        prompt: "long-legged wading bird body",
        icon: Footprints,
      },
    ],

    Size: [
      { name: "Very small", prompt: "very small bird", icon: Circle },
      { name: "Small", prompt: "small bird", icon: Circle },
      { name: "Medium", prompt: "medium-sized bird", icon: Circle },
      { name: "Large", prompt: "large bird", icon: Circle },
      { name: "Very large", prompt: "very large bird", icon: Circle },
    ],

    "Primary Color": [
      { name: "Grey", prompt: "mainly grey plumage", icon: Palette, color: "#9ca3af" },
      { name: "Brown", prompt: "mainly brown plumage", icon: Palette, color: "#8b5a2b" },
      { name: "Black", prompt: "mainly black plumage", icon: Palette, color: "#111827" },
      { name: "White", prompt: "mainly white plumage", icon: Palette, color: "#f8fafc" },
      { name: "Yellow", prompt: "yellow plumage accents", icon: Palette, color: "#facc15" },
      { name: "Red", prompt: "red plumage accents", icon: Palette, color: "#ef4444" },
      { name: "Green", prompt: "green plumage", icon: Palette, color: "#22c55e" },
      { name: "Blue", prompt: "blue plumage", icon: Palette, color: "#3b82f6" },
      { name: "Orange", prompt: "orange plumage accents", icon: Palette, color: "#fb923c" },
      { name: "Buff", prompt: "buff-colored plumage", icon: Palette, color: "#d6b98c" },
    ],

    "Upperparts Color": [
      { name: "Grey upperparts", prompt: "grey back and upper wings", icon: Feather, color: "#9ca3af" },
      { name: "Brown upperparts", prompt: "brown back and upper wings", icon: Feather, color: "#8b5a2b" },
      { name: "Black upperparts", prompt: "black back and upper wings", icon: Feather, color: "#111827" },
      { name: "Green upperparts", prompt: "green back and upper wings", icon: Feather, color: "#22c55e" },
      { name: "Blue upperparts", prompt: "blue back and upper wings", icon: Feather, color: "#3b82f6" },
    ],

    "Underparts Color": [
      { name: "White underparts", prompt: "white breast and belly", icon: Feather, color: "#f8fafc" },
      { name: "Buff underparts", prompt: "buff breast and belly", icon: Feather, color: "#d6b98c" },
      { name: "Grey underparts", prompt: "grey breast and belly", icon: Feather, color: "#9ca3af" },
      { name: "Yellow underparts", prompt: "yellow breast and belly", icon: Feather, color: "#facc15" },
      { name: "Orange underparts", prompt: "orange breast and belly", icon: Feather, color: "#fb923c" },
    ],
  },

  Beak: {
    "Bill Shape": [
      { name: "Short cone", prompt: "short cone-shaped seed-eating beak", icon: Triangle },
      { name: "Thin needle", prompt: "thin needle-like beak", icon: MoveUpRight },
      { name: "Long dagger", prompt: "long straight dagger-like beak", icon: MoveUpRight },
      { name: "Hooked", prompt: "strong hooked beak", icon: Smile },
      { name: "Flat spatulate", prompt: "wide flat spatulate duck-like bill", icon: Waves },
      { name: "All-purpose", prompt: "medium all-purpose beak", icon: Bird },
    ],

    "Bill Length": [
      { name: "Short", prompt: "short beak", icon: MoveUpRight },
      { name: "Medium", prompt: "medium-length beak", icon: MoveUpRight },
      { name: "Long", prompt: "long beak", icon: MoveUpRight },
    ],

    "Bill Color": [
      { name: "Black bill", prompt: "black beak", icon: Palette, color: "#111827" },
      { name: "Grey bill", prompt: "grey beak", icon: Palette, color: "#9ca3af" },
      { name: "Yellow bill", prompt: "yellow beak", icon: Palette, color: "#facc15" },
      { name: "Orange bill", prompt: "orange beak", icon: Palette, color: "#fb923c" },
      { name: "Red bill", prompt: "red beak", icon: Palette, color: "#ef4444" },
    ],
  },

  Head: {
    "Head Pattern": [
      { name: "Plain", prompt: "plain head", icon: Circle },
      { name: "Crested", prompt: "visible head crest", icon: Crown },
      { name: "Masked", prompt: "dark facial mask", icon: ScanEye },
      { name: "Eyering", prompt: "clear eye ring", icon: Eye },
      { name: "Striped", prompt: "striped head pattern", icon: Feather },
      { name: "Spotted", prompt: "spotted head pattern", icon: CircleDot },
    ],

    "Eye Color": [
      { name: "Black eyes", prompt: "black eyes", icon: Eye, color: "#111827" },
      { name: "Brown eyes", prompt: "brown eyes", icon: Eye, color: "#8b5a2b" },
      { name: "Red eyes", prompt: "red eyes", icon: Eye, color: "#ef4444" },
      { name: "Yellow eyes", prompt: "yellow eyes", icon: Eye, color: "#facc15" },
    ],

    "Crown Color": [
      { name: "Black crown", prompt: "black crown", icon: Crown, color: "#111827" },
      { name: "White crown", prompt: "white crown", icon: Crown, color: "#f8fafc" },
      { name: "Red crown", prompt: "red crown", icon: Crown, color: "#ef4444" },
      { name: "Yellow crown", prompt: "yellow crown", icon: Crown, color: "#facc15" },
    ],

    "Throat Color": [
      { name: "White throat", prompt: "white throat", icon: Feather, color: "#f8fafc" },
      { name: "Black throat", prompt: "black throat", icon: Feather, color: "#111827" },
      { name: "Yellow throat", prompt: "yellow throat", icon: Feather, color: "#facc15" },
      { name: "Red throat", prompt: "red throat", icon: Feather, color: "#ef4444" },
    ],
  },

  Wings: {
    "Wing Shape": [
      { name: "Rounded wings", prompt: "rounded wings", icon: Feather },
      { name: "Pointed wings", prompt: "pointed wings", icon: MoveUpRight },
      { name: "Broad wings", prompt: "broad wings", icon: Wind },
      { name: "Long wings", prompt: "long wings", icon: Wind },
    ],

    "Wing Pattern": [
      { name: "Solid", prompt: "solid wing color", icon: Feather },
      { name: "Striped", prompt: "striped wing pattern", icon: Feather },
      { name: "Spotted", prompt: "spotted wing pattern", icon: CircleDot },
      { name: "Wing bars", prompt: "clear wing bars", icon: Feather },
    ],

    "Wing Color": [
      { name: "Grey wings", prompt: "grey wings", icon: Palette, color: "#9ca3af" },
      { name: "Brown wings", prompt: "brown wings", icon: Palette, color: "#8b5a2b" },
      { name: "Black wings", prompt: "black wings", icon: Palette, color: "#111827" },
      { name: "White wings", prompt: "white wings", icon: Palette, color: "#f8fafc" },
      { name: "Blue wings", prompt: "blue wings", icon: Palette, color: "#3b82f6" },
    ],
  },

  Breast: {
    "Breast Pattern": [
      { name: "Plain breast", prompt: "plain breast", icon: Feather },
      { name: "Spotted breast", prompt: "spotted breast", icon: CircleDot },
      { name: "Streaked breast", prompt: "streaked breast", icon: Feather },
      { name: "Barred breast", prompt: "barred breast", icon: Feather },
    ],

    "Breast Color": [
      { name: "White breast", prompt: "white breast", icon: Palette, color: "#f8fafc" },
      { name: "Grey breast", prompt: "grey breast", icon: Palette, color: "#9ca3af" },
      { name: "Buff breast", prompt: "buff breast", icon: Palette, color: "#d6b98c" },
      { name: "Yellow breast", prompt: "yellow breast", icon: Palette, color: "#facc15" },
      { name: "Orange breast", prompt: "orange breast", icon: Palette, color: "#fb923c" },
    ],
  },

  Belly: {
    "Belly Pattern": [
      { name: "Plain belly", prompt: "plain belly", icon: Feather },
      { name: "Spotted belly", prompt: "spotted belly", icon: CircleDot },
      { name: "Streaked belly", prompt: "streaked belly", icon: Feather },
    ],

    "Belly Color": [
      { name: "White belly", prompt: "white belly", icon: Palette, color: "#f8fafc" },
      { name: "Grey belly", prompt: "grey belly", icon: Palette, color: "#9ca3af" },
      { name: "Buff belly", prompt: "buff belly", icon: Palette, color: "#d6b98c" },
      { name: "Yellow belly", prompt: "yellow belly", icon: Palette, color: "#facc15" },
    ],
  },

  Back: {
    "Back Pattern": [
      { name: "Plain back", prompt: "plain back", icon: Feather },
      { name: "Spotted back", prompt: "spotted back", icon: CircleDot },
      { name: "Striped back", prompt: "striped back", icon: Feather },
      { name: "Scaled back", prompt: "scaled feather pattern on back", icon: Feather },
    ],

    "Back Color": [
      { name: "Brown back", prompt: "brown back", icon: Palette, color: "#8b5a2b" },
      { name: "Grey back", prompt: "grey back", icon: Palette, color: "#9ca3af" },
      { name: "Black back", prompt: "black back", icon: Palette, color: "#111827" },
      { name: "Green back", prompt: "green back", icon: Palette, color: "#22c55e" },
    ],
  },

  Feet: {
    "Leg Color": [
      { name: "Black legs", prompt: "black legs and feet", icon: Footprints, color: "#111827" },
      { name: "Grey legs", prompt: "grey legs and feet", icon: Footprints, color: "#9ca3af" },
      { name: "Yellow legs", prompt: "yellow legs and feet", icon: Footprints, color: "#facc15" },
      { name: "Orange legs", prompt: "orange legs and feet", icon: Footprints, color: "#fb923c" },
      { name: "Red legs", prompt: "red legs and feet", icon: Footprints, color: "#ef4444" },
    ],
  },

  Tail: {
    "Tail Shape": [
      { name: "Rounded tail", prompt: "rounded tail", icon: Feather },
      { name: "Squared tail", prompt: "squared tail", icon: Feather },
      { name: "Forked tail", prompt: "forked tail", icon: Feather },
      { name: "Fan-shaped tail", prompt: "fan-shaped tail", icon: Feather },
      { name: "Pointed tail", prompt: "pointed tail", icon: MoveUpRight },
    ],

    "Tail Pattern": [
      { name: "Solid tail", prompt: "solid tail color", icon: Feather },
      { name: "Striped tail", prompt: "striped tail pattern", icon: Feather },
      { name: "Spotted tail", prompt: "spotted tail pattern", icon: CircleDot },
      { name: "White tail edges", prompt: "white tail edges", icon: Feather },
    ],

    "Tail Color": [
      { name: "Black tail", prompt: "black tail", icon: Palette, color: "#111827" },
      { name: "Brown tail", prompt: "brown tail", icon: Palette, color: "#8b5a2b" },
      { name: "Grey tail", prompt: "grey tail", icon: Palette, color: "#9ca3af" },
      { name: "White tail", prompt: "white tail", icon: Palette, color: "#f8fafc" },
    ],
  },
};