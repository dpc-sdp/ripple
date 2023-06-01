---
title: Motion
description: 'Motion gradually changes an element from one state to another. It can also indicate an interaction.'
layout: page
label: Core
---

Use motion with a purpose in mind. This could be to draw attention to important elements or to provide feedback to users.

## Usage

Each animation needs at least these four parts:

- Trigger — what causes the animation to happen (gestures, time, etc.)
- Duration — how long should the transition take
- Easing — how an element transitions
- Property — the characteristic of the element transitioning (position, opacity, scale, etc.)

## Duration (speed)

The duration of motion should be consistent throughout. Use:

- shorter durations for more subtle motions
- longer durations for more significant or complex motions.

A general rule of thumb is:

- 0.06-0.2s for simple interface movements
- up to 0.5s for more complex or larger movements.

| Time  | Value | CSS Variable |
|-------------|-------|--------------|
| 60 milliseconds   | 60ms  | rpl-motion-speed-1  | 
| 80 milliseconds   | 80ms  | rpl-motion-speed-2  | 
| 120 milliseconds   | 120ms  | rpl-motion-speed-3  | 
| 160 milliseconds   | 160ms  | rpl-motion-speed-4  | 
| 200 milliseconds   | 200ms  | rpl-motion-speed-5  | 
| 240 milliseconds   | 240ms  | rpl-motion-speed-6  | 
| 300 milliseconds   | 300ms  | rpl-motion-speed-7  | 
| 360 milliseconds   | 360ms  | rpl-motion-speed-8  | 
| 420 milliseconds   | 420ms  | rpl-motion-speed-9  | 
| 500 milliseconds   | 500ms  | rpl-motion-speed-10  | 

## Easing

Easing is the rate the motion accelerates or decelerates. It can range from linear to highly exaggerated. The chosen easing should match the desired tone and feeling of the motion.

Currently, Ripple uses default easing values. We use the default names for this reason to reduce clutter in the code.

Definitions:

- ease-in: slow at the beginning, fast/abrupt at the end
- ease-out: fast/abrupt at the beginning, slow at the end

When to use:

- ease-in: when things are moving *out.*
- ease-out: when things are moving *in.*
