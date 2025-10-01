"use client";

import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function getGsap() {
  if (!registered) {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
    }
    registered = true;
  }
  return gsap;
}

export { ScrollToPlugin, ScrollTrigger };


