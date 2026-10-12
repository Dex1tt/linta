"use client";

import { useCallback, useEffect, useRef, useState, type RefCallback } from "react";

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export function useFocusTrap<T extends HTMLElement>(
  onClose: () => void,
  active = true,
): RefCallback<T> {
  const [container, setContainer] = useState<T | null>(null);
  const [initiallyFocused] = useState<HTMLElement | null>(() =>
    active && typeof document !== "undefined" && document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null,
  );
  const closeRef = useRef(onClose);
  const previouslyFocusedRef = useRef<HTMLElement | null>(initiallyFocused);
  const wasActiveRef = useRef(active);
  const containerRef = useCallback((node: T | null) => {
    setContainer(node);
  }, []);

  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (active && !wasActiveRef.current) {
      previouslyFocusedRef.current = document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    }
    wasActiveRef.current = active;
  }, [active]);

  useEffect(() => {
    if (!active) return;

    if (!container) return;

    const getFocusableElements = () =>
      Array.from(container.querySelectorAll<HTMLElement>(focusableSelector)).filter(
        (element) => !element.hasAttribute("disabled") && element.getAttribute("aria-hidden") !== "true",
      );

    const focusFrame = window.requestAnimationFrame(() => {
      (getFocusableElements()[0] ?? container).focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeRef.current();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) {
        event.preventDefault();
        container.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);
      const focusIsInside = container.contains(document.activeElement);

      if (!focusIsInside) {
        event.preventDefault();
        (event.shiftKey ? lastElement : firstElement)?.focus();
        return;
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedRef.current?.focus();
    };
  }, [active, container]);

  return containerRef;
}
