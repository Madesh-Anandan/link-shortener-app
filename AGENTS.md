# Agent Instructions - Link Shortener Project

## ⚠️ CRITICAL: READ DOCUMENTATION FIRST ⚠️

> **🚨 INCREDIBLY IMPORTANT 🚨**
>
> **BEFORE generating ANY code, you MUST:**
>
> 1. **READ** the relevant documentation files in the `/docs` directory
> 2. **UNDERSTAND** the specific guidelines and requirements
> 3. **FOLLOW** all standards and patterns defined in those files
>
> **The `/docs` directory contains mandatory coding standards that MUST be followed:**
>
> - **[UI Components](./docs/ui-components.md)** - ALL UI elements MUST use shadcn/ui components (NEVER create custom buttons, inputs, etc.)
> - **[Clerk Authentication](./docs/clerk-auth.md)** - Authentication implementation rules and patterns
>
> **Failure to read and follow these guidelines will result in incorrect code that violates project standards!**
>
> ❌ **DO NOT** generate code without consulting the relevant documentation first  
> ✅ **DO** read the documentation, understand the requirements, then implement accordingly

---

> **📚 Documentation Index**: This project uses a modular documentation system. All detailed coding standards and guidelines are organized in separate files in the `/docs` directory.

## 📋 Project Overview

This is a **Link Shortener** application built with modern web technologies.

### Tech Stack

- **Next.js 16** (App Router)
- **TypeScript 5** (Strict mode enabled)
- **React 19**
- **Clerk** (Authentication)
- **Drizzle ORM** (Database ORM)
- **Neon Database** (PostgreSQL)
- **Tailwind CSS 4** (Styling)

## 📖 Documentation

**🚨 MANDATORY: Read the relevant documentation files in `/docs` BEFORE writing any code! 🚨**

All coding standards, patterns, and best practices are documented in the `/docs` directory.
These are NOT optional guidelines - they are REQUIRED standards that MUST be followed:

- **[UI Components](./docs/ui-components.md)** - **CRITICAL**: ALL UI elements MUST use shadcn/ui components. NEVER create custom UI components for standard patterns (buttons, inputs, cards, etc.). Read this file before implementing ANY user interface!
- **[Clerk Authentication](./docs/clerk-auth.md)** - Authentication rules, protected routes, and Clerk implementation guidelines. Read this before implementing any authentication-related features!

**Remember:** The documentation in `/docs` is the source of truth. Always check there first!

## 🎯 Quick Reference

### Key Principles

1. **TypeScript First** - Use strict TypeScript, avoid `any`
2. **Server by Default** - Prefer Server Components, use `'use client'` sparingly
3. **Type Safety** - Leverage Drizzle ORM and Zod for runtime validation
4. **Security** - Always verify authentication server-side
5. **Performance** - Optimize with Server Components and proper caching
6. **Consistency** - Follow established patterns and conventions

### Essential Commands

```bash
# Development
npm run dev

# Linting
npm run lint

# Database
npx drizzle-kit generate  # Generate migrations
npx drizzle-kit push      # Push schema changes
```

## 🔒 Security Checklist

- ✅ Store secrets in `.env.local`
- ✅ Verify authentication server-side
- ✅ Validate user ownership for mutations
- ✅ Sanitize and validate all user inputs
- ✅ Use Zod for request validation
- ✅ Implement proper error handling

## � Project Structure Overview

```
linkshortenerproject/
├── app/                  # Next.js App Router (routes, layouts, pages)
├── components/           # React components (ui/, features/)
├── db/                   # Database (schema, connection)
├── lib/                  # Utilities and helpers
├── docs/                 # Documentation (you are here!)
├── public/               # Static assets
└── types/                # TypeScript type definitions
```

## ⚠️ Important Reminders for LLM Agents

### 🚨 STEP ZERO: READ THE DOCUMENTATION! 🚨

**BEFORE doing ANYTHING else:**

1. **📖 Check the `/docs` directory** for relevant documentation files
2. **📚 Read the specific guidelines** that apply to your task
3. **✅ Verify you understand** the requirements and standards
4. **🎯 Only then proceed** with planning and implementation

**Common mistakes to avoid:**

- ❌ Writing code without reading the documentation first
- ❌ Creating custom UI components instead of using shadcn/ui (see `/docs/ui-components.md`)
- ❌ Ignoring authentication patterns defined in `/docs/clerk-auth.md`
- ❌ Assuming you know the standards without checking

### Before Making Changes

1. **Read relevant documentation** in `/docs` directory - **THIS IS MANDATORY, NOT OPTIONAL!**
2. **Check existing code** for patterns and conventions
3. **Understand the context** - Don't make assumptions
4. **Test your changes** - Verify code compiles and runs
5. **Preserve functionality** - Don't break existing features

### When Writing Code

1. **Use TypeScript strictly** - No `any` unless absolutely necessary
2. **Follow App Router patterns** - Server Components by default
3. **Validate all inputs** - Use Zod schemas
4. **Handle errors properly** - Try/catch with meaningful messages
5. **Write self-documenting code** - Clear names, JSDoc for complex logic
6. **Maintain consistency** - Follow existing codebase style

### Code Quality

1. **Run ESLint** before committing
2. **Use proper TypeScript types** from schema inference
3. **Implement proper loading/error states**
4. **Add appropriate ARIA labels** for accessibility
5. **Optimize for performance** - Server Components, proper caching

## 🔄 Development Workflow

1. **📖 READ DOCUMENTATION FIRST** - Check `/docs` directory for relevant guidelines (UI components, authentication, etc.)
2. **🔍 Read documentation again** - Make sure you didn't miss anything critical
3. **✅ Confirm understanding** - Verify you know what standards to follow
4. **🔎 Explore existing code** for similar patterns
5. **💻 Write code** following established conventions from documentation
6. **🧪 Test thoroughly** - Manual and automated tests
7. **🔍 Lint and validate** - Run `npm run lint`
8. **👀 Review changes** - Ensure nothing breaks and documentation is followed

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Last Updated:** February 20, 2026  
**Project Version:** 0.1.0  
**Maintained by:** Development Team

> **💡 Critical Reminder**: When working on ANY feature, ALWAYS START by reading the relevant documentation in `/docs` for detailed guidelines and examples. This is not optional - it's a mandatory first step!

> **🚨 For AI Agents**: The `/docs` directory contains the single source of truth for all coding standards. Generating code without consulting these files will result in incorrect implementations that violate project requirements!
