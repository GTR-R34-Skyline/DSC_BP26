"use client";

import { useState, useEffect } from "react";

export function useActiveSection(sectionIds: string[]) {
    const [activeSection, setActiveSection] = useState<string>("");

    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        sectionIds.forEach((id) => {
            const element = document.getElementById(id);
            if (element) {
                const observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                                setActiveSection(id);
                            }
                        });
                    },
                    {
                        root: null,
                        rootMargin: "0px",
                        threshold: 0.5, // Trigger when 50% of the section is visible
                    }
                );
                observer.observe(element);
                observers.push(observer);
            }
        });

        return () => {
            observers.forEach((observer) => observer.disconnect());
        };
    }, [sectionIds]);

    return activeSection;
}
