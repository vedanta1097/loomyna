"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";

export type ColorChoice = { value: string; label: string; hex: string };

export function ColorPicker({
  id,
  label,
  placeholder,
  value,
  onChange,
  options,
  disabled = false,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  options: ColorChoice[];
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<"above" | "below">("below");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const openedByKeyboard = useRef(false);
  const typeahead = useRef({ text: "", at: 0 });
  const selected = disabled ? undefined : options.find((option) => option.value === value);
  const selectedIndex = Math.max(0, options.findIndex((option) => option.value === value));

  useEffect(() => {
    if (open && openedByKeyboard.current) optionRefs.current[selectedIndex]?.focus();
  }, [open, selectedIndex]);

  useEffect(() => {
    if (!open) return;
    function closeOnOutsideClick(event: PointerEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, [open]);

  function closeAndFocusTrigger() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  function openPicker(keyboard: boolean) {
    const bounds = triggerRef.current?.getBoundingClientRect();
    if (bounds) {
      const viewportBottom = window.visualViewport
        ? window.visualViewport.offsetTop + window.visualViewport.height
        : window.innerHeight;
      const spaceBelow = viewportBottom - bounds.bottom;
      setPlacement(spaceBelow < 300 && bounds.top > spaceBelow ? "above" : "below");
    }
    openedByKeyboard.current = keyboard;
    setOpen(true);
  }

  function choose(option: ColorChoice, restoreFocus: boolean) {
    onChange(option.value);
    setOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  }

  function focusOption(index: number) {
    optionRefs.current[index]?.focus();
  }

  function handleOptionKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      focusOption((index + 1) % options.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      focusOption((index - 1 + options.length) % options.length);
    } else if (event.key === "Home") {
      event.preventDefault();
      focusOption(0);
    } else if (event.key === "End") {
      event.preventDefault();
      focusOption(options.length - 1);
    } else if (event.key.length === 1 && event.key !== " " && !event.altKey && !event.ctrlKey && !event.metaKey) {
      const now = event.timeStamp;
      const previous = typeahead.current;
      const text = `${now - previous.at > 700 ? "" : previous.text}${event.key}`.toLocaleLowerCase();
      typeahead.current = { text, at: now };
      const match = options.findIndex((option) => option.label.toLocaleLowerCase().startsWith(text));
      if (match >= 0) focusOption(match);
    }
  }

  return (
    <div
      className="color-picker"
      ref={wrapperRef}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.preventDefault();
          closeAndFocusTrigger();
        }
      }}
    >
      <span className="custom-color-label" id={`${id}-label`}>{label}</span>
      <button
        id={id}
        ref={triggerRef}
        className="color-picker-trigger"
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? `${id}-listbox` : undefined}
        aria-labelledby={`${id}-label ${id}-value`}
        disabled={disabled}
        onClick={(event) => {
          if (open) setOpen(false);
          else openPicker(event.detail === 0);
        }}
        onKeyDown={(event) => {
          if (!open && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
            event.preventDefault();
            openPicker(true);
          }
        }}
      >
        {selected ? <span className="color-picker-swatch" style={{ backgroundColor: selected.hex }} aria-hidden="true" /> : null}
        <span id={`${id}-value`}>{selected?.label ?? placeholder}</span>
        <span className="color-picker-chevron" aria-hidden="true">⌄</span>
      </button>
      {open ? (
        <div className="color-picker-panel" data-placement={placement}>
          <div id={`${id}-listbox`} className="color-picker-listbox" role="listbox" aria-labelledby={`${id}-label`}>
            {options.map((option, index) => (
              <button
                key={option.value}
                ref={(node) => { optionRefs.current[index] = node; }}
                type="button"
                role="option"
                aria-selected={option.value === value}
                tabIndex={index === selectedIndex ? 0 : -1}
                className="color-picker-option"
                onClick={(event) => choose(option, event.detail === 0)}
                onKeyDown={(event) => handleOptionKeyDown(event, index)}
              >
                <span className="color-picker-swatch" style={{ backgroundColor: option.hex }} aria-hidden="true" />
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
