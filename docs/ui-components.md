# UI Components - shadcn/ui

## Overview

All UI components in this application use **shadcn/ui** exclusively. Do not create custom UI components.

## Key Rules

### Component Usage

- **Always use shadcn/ui components** for all UI elements
- **Never create custom components** for standard UI patterns (buttons, inputs, cards, dialogs, etc.)
- Import components from `@/components/ui/`
- Follow shadcn/ui's composition patterns

### Installation

When a shadcn/ui component is needed but not yet installed:

```bash
npx shadcn@latest add [component-name]
```

### Common Components

- **Button** - All buttons, links styled as buttons
- **Card** - Content containers, panels
- **Input** - Text inputs, search fields
- **Form** - Form handling with react-hook-form
- **Dialog** - Modals, popups
- **Dropdown Menu** - Menus, action lists
- **Table** - Data tables
- **Badge** - Status indicators, tags
- **Alert** - Notifications, messages
- **Separator** - Dividers
- **Skeleton** - Loading states

### Best Practices

1. **Use Existing Components**
   - Check available shadcn/ui components before implementing UI
   - Browse [shadcn/ui components](https://ui.shadcn.com/docs/components)

2. **Composition Over Creation**
   - Combine shadcn/ui components to build complex UI
   - Extend components using className props with Tailwind

3. **Consistency**
   - Use the same component variants throughout the app
   - Follow established patterns in existing code

4. **Styling**
   - Use Tailwind CSS classes for customization
   - Leverage shadcn/ui's built-in variants
   - Maintain consistent spacing and sizing

### Installation Command

```bash
# Add a specific component
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add dialog
```

### Example Usage

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="Enter text..." />
        <Button>Submit</Button>
      </CardContent>
    </Card>
  );
}
```

## Reference

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [shadcn/ui Components](https://ui.shadcn.com/docs/components)
