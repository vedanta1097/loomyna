"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";

export type ColorChoice = { value: string; label: string; hex: string };

export function ColorPicker({
  id,
  label,
  placeholder,
  searchLabel,
  noMatches,
  value,
  onChange,
  options,
  disabled = false,
}: {
  id: string;
  label: string;
  placeholder: string;
  searchLabel: string;
  noMatches: string;
  value: string;
  onChange: (value: string) => void;
  options: ColorChoice[];
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const selected = disabled ? undefined : options.find((option) => option.value === value);
  const filtered = options.filter((option) =>
    option.label.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
  );

  useEffect(() => {
    if (open) searchRef.current?.focus();
  }, [open]);

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
    setQuery("");
    triggerRef.current?.focus();
  }

  function choose(option: ColorChoice) {
    onChange(option.value);
    closeAndFocusTrigger();
  }

  function focusOption(index: number) {
    optionRefs.current[index]?.focus();
  }

  function handleOptionKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      focusOption((index + 1) % filtered.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      focusOption((index - 1 + filtered.length) % filtered.length);
    } else if (event.key === "Home") {
      event.preventDefault();
      focusOption(0);
    } else if (event.key === "End") {
      event.preventDefault();
      focusOption(filtered.length - 1);
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
        onClick={() => {
          setQuery("");
          setOpen((current) => !current);
        }}
      >
        {selected ? <span className="color-picker-swatch" style={{ backgroundColor: selected.hex }} aria-hidden="true" /> : null}
        <span id={`${id}-value`}>{selected?.label ?? placeholder}</span>
        <span className="color-picker-chevron" aria-hidden="true">⌄</span>
      </button>
      {open ? (
        <div className="color-picker-panel">
          <input
            ref={searchRef}
            className="color-picker-search"
            type="search"
            aria-label={searchLabel}
            placeholder={searchLabel}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown" && filtered.length) {
                event.preventDefault();
                focusOption(0);
              } else if (event.key === "Enter" && filtered.length) {
                event.preventDefault();
                choose(filtered[0]);
              }
            }}
          />
          <div id={`${id}-listbox`} className="color-picker-listbox" role="listbox" aria-labelledby={`${id}-label`}>
            {filtered.map((option, index) => (
              <button
                key={option.value}
                ref={(node) => { optionRefs.current[index] = node; }}
                type="button"
                role="option"
                aria-selected={option.value === value}
                tabIndex={index === 0 ? 0 : -1}
                className="color-picker-option"
                onClick={() => choose(option)}
                onKeyDown={(event) => handleOptionKeyDown(event, index)}
              >
                <span className="color-picker-swatch" style={{ backgroundColor: option.hex }} aria-hidden="true" />
                <span>{option.label}</span>
              </button>
            ))}
            {!filtered.length ? <p className="color-picker-empty">{noMatches}</p> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
