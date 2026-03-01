# HelpingHand - Technical Specification

## Component Inventory

### shadcn/ui Components
- Button (primary, secondary, ghost variants)
- Card (for service categories, testimonials, team)
- Input (contact form)
- Textarea (contact form)
- Navigation Menu (header)
- Sheet (mobile menu)
- Dropdown Menu (services dropdown)

### Custom Components
- HeroSection
- ServicesList
- ServiceCategories
- CTABoxes
- TeamSection
- TestimonialsSection
- ContactSection
- Footer
- ScrollReveal (animation wrapper)

### Third-party Components
- None required

---

## Animation Implementation Table

| Animation | Library | Implementation Approach | Complexity |
|-----------|---------|------------------------|------------|
| Page load fade-in | Framer Motion | AnimatePresence + initial/animate states | Low |
| Hero stagger reveal | Framer Motion | staggerChildren in parent variants | Medium |
| Scroll-triggered reveals | Framer Motion | useInView hook + motion components | Medium |
| Card hover lift | CSS/Tailwind | hover:translate-y + transition | Low |
| Button hover scale | CSS/Tailwind | hover:scale + transition | Low |
| Nav dropdown | Framer Motion | AnimatePresence + height animation | Medium |
| Mobile menu slide | Framer Motion | Sheet component + slide animation | Low |
| Glassmorphism effect | CSS | backdrop-blur + bg-opacity | Low |
| Link arrow movement | CSS/Tailwind | group-hover:translate-x | Low |

---

## Animation Library Choices

**Primary: Framer Motion**
- React-native integration
- Declarative API
- Built-in useInView for scroll triggers
- AnimatePresence for mount/unmount animations
- Stagger support for sequential reveals

**Secondary: CSS/Tailwind**
- Simple hover effects
- Transitions
- Transform animations

---

## Project File Structure

```
app/
├── public/
│   └── images/
│       └── hero-bg.jpg
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ScrollReveal.tsx
│   │   └── MobileMenu.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── ServicesList.tsx
│   │   ├── ServiceCategories.tsx
│   │   ├── CTABoxes.tsx
│   │   ├── TeamSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── ContactSection.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── VarPersonal.tsx
│   │   ├── JobbaHosOss.tsx
│   │   └── Kontakt.tsx
│   ├── hooks/
│   │   └── useScrollReveal.ts
│   ├── lib/
│   │   └── utils.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

---

## Dependencies

### Core
- react
- react-dom
- react-router-dom

### UI
- @radix-ui/* (via shadcn)
- lucide-react
- class-variance-authority
- clsx
- tailwind-merge

### Animation
- framer-motion

### Fonts
- @fontsource/playfair-display
- @fontsource/inter

---

## Routing Structure

| Route | Component | Description |
|-------|-----------|-------------|
| / | Home | Landing page with all sections |
| /var-personal | VarPersonal | Full team page |
| /jobba-hos-oss | JobbaHosOss | Job application page |
| /kontakt | Kontakt | Full contact page |
| /anlita-oss | AnlitaOss | Services detail page |

---

## Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

---

## Performance Considerations

1. Use `will-change: transform, opacity` on animated elements
2. Lazy load images below the fold
3. Use CSS transforms instead of layout properties
4. Implement `prefers-reduced-motion` support
5. Optimize images for web
