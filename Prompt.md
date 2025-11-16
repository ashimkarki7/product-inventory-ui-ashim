# AI Collaboration Challenge - Bulk Operations Feature

## Feature Request
Add a bulk operations feature that allows users to select multiple products and perform batch actions (price updates, category changes, deletion) with confirmation dialogs and undo functionality.

## 1. AI Tool Selection

**Which AI tool would you choose and why?**

I would choose ChatGPT because it can connect directly to existing GitHub repo's or IDEs (VS Code), with its Codex capabilities, it can deeply analyze the repository, perform research, and provide code reviews.

## 2. Comprehensive Prompt

**Write your complete prompt including context about the codebase architecture and any constraints:**

You are a senior level React,Next.js and typescript engineer with expertise in performance optimization, best coding  practices, Ui/Ux principles and security principles
The existing codebase is a product inventory UI built using React v18.3.0, Next.js v15.4.6, and TypeScript v5.7.2. The project follows a component driven architecture, uses functional components with hooks,
and currently implements client side state using React hooks . Styling is handled through lightweight custom components Tailwind Css and a global css.
Your task is to help me design and implement a robust, secure, and scalable bulk-operations feature within this architecture. The codebase has the following constraints:
a.Selection
- Users must be able to select multiple products from the product list.
- Provide a checkbox per product row/card.
- Provide a “Select all on this page” option.
- Selected items should be clearly indicated visually and accessible to screen readers.

b.Bulk Actions
- Create Reusable Button and Other Components as Required to accept dynamic Props from feature
- Bulk price update 
- User can increase or decrease price by a fixed amount or percentage 
- Validate input (e.g., non-negative numbers, numbers only).
- Bulk category change,User can assign a new category to all selected products at once.
- Use any existing category field/type from `product.ts` if present.
- Bulk delete ,User can delete multiple products at once.
- Require a confirmation dialog on each call to actions.

c. Confirm Dialog and Undo Feature
- Before any action being process add a modal that calls the action or api , if yes proceeds with a yes and make the button wait until action is completed to reduce api calls , use memo hooks to functions
- After the completation of action or failure at a toast message, create a toast message component that can be imported in any other component dynamicall passing props such as message , close , show ,hide
- For Undo Keep the last 5 batch of action in front end state either using 
redux along with timestamps if no backend support and onclicking undo 
dispatch last action stored comparing time stamp and undo the actions.

- If there's backend Support call api and dispatch the previous data

- d. Api Layer , Error Handling and Testing  
- Reuse / extend `src/lib/api.ts`
- If a bulk endpoint exists, use it else create a dynamic function that uses api url
passed as props to communicate with the backend.
-Keep API types in `src/types/api.ts`
- Handle API errors gracefully
- Add or update tests to cover ,Selecting and deselecting products,“Select all on page” behavior,Enabling/disabling bulk action controls based on selection
-Avoid unnecessary re-renders, use hooks like memo and use callback where necessary
- Do not introduce server components for this feature unless they already exist
- Keep the design consistent with existing Tailwind utility classes and custom components

## 3. Collaboration Approach

**How would you iterate and collaborate with the AI tool to implement this feature?**

Start by asking the AI to **scan and summarize** the existing repo where product listing flow (how data is fetched, filtered, and rendered).
- Confirm with the AI where it suggests putting:
    - Selection state.
    - Bulk action UI.
    - API calls.
    - Optimizations.
    - Security Standards
    - Generate ts types
    - create mocks
    - generate schema
- Adjust its proposal if it conflicts with my own understanding or any constraints from the challenge.
- Check the Accessible Font Size Colors, Add Interactions
- Generate Schemas for Input using zod.
- Iteratively Check the pr made by Ai or add it to codebase and Test the Feature one by one
-  Which components to introduce or modify
- Refine Accessibility and UX 
- Testing and  edge cases that might occur.
- Final review & cleanup