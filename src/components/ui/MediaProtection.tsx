"use client";

import { useEffect } from "react";

const mediaSelector = "img, svg";

export function MediaProtection() {
  useEffect(() => {
    const protectMedia = (root: ParentNode) => {
      root.querySelectorAll(mediaSelector).forEach((element) => {
        element.setAttribute("draggable", "false");
      });
    };

    const handleContextMenu = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest(mediaSelector)) {
        event.preventDefault();
      }
    };

    const handleDragStart = (event: DragEvent) => {
      if (event.target instanceof Element && event.target.closest(mediaSelector)) {
        event.preventDefault();
      }
    };

    protectMedia(document);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) {
            if (node.matches(mediaSelector)) {
              node.setAttribute("draggable", "false");
            }
            protectMedia(node);
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    document.addEventListener("contextmenu", handleContextMenu, true);
    document.addEventListener("dragstart", handleDragStart, true);

    return () => {
      observer.disconnect();
      document.removeEventListener("contextmenu", handleContextMenu, true);
      document.removeEventListener("dragstart", handleDragStart, true);
    };
  }, []);

  return null;
}
