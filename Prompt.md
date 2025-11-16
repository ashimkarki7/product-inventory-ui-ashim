# AI Collaboration Challenge - Bulk Operations Feature

## Feature Request
Add a bulk operations feature that allows users to select multiple products and perform batch actions (price updates, category changes, deletion) with confirmation dialogs and undo functionality.

## 1. AI Tool Selection

**Which AI tool would you choose and why?**

I would use GitHub Copilot Chat (or an equivalent context-aware pair programmer) inside VS Code. It keeps the full repo within reach, lets me paste relevant files or run `/tests` commands, and it is optimized for incremental, code-level guidance. Because the feature spans UI, API utilities, and state management, the tight feedback loop Copilot Chat provides inside the editor is the most productive option.

## 2. Comprehensive Prompt

**Write your complete prompt including context about the codebase architecture and any constraints:**

You are helping me implement bulk operations in a Next.js 14 / React 18 app that lives in `/src`. The relevant pieces today are:
- Product listing page: `src/app/page.tsx` renders `ProductFilters` and `ProductCard` for each product.
- Shared components: `src/components/ProductCard.tsx`, `src/components/ProductFilters.tsx`, and UI primitives under `src/components/ui/`.
- Data/API layer: `src/lib/api.ts` exposes CRUD helpers backed by `src/data/mockProducts.ts`.
- Types: `src/types/product.ts`.

Feature goals:
1. Allow selecting multiple products from the main list (shift-click/checkbox style is fine) with clear keyboard and screen-reader affordances.
2. Show a sticky bulk-action toolbar once ≥1 product is selected. Actions: update price by a percentage, change category, delete items. Toolbar must show counts, disable inappropriate actions, and offer “clear selection”.
3. Each action triggers confirmation. Deletion needs a typed confirmation (“DELETE”), while edits just need a modal summary.
4. After an action, show a toast with an undo option that reverts to the previous state for 10 seconds. Undo should be resilient even if another action occurs (queue the states).
5. All state management should stay client-side (mock API). Update `getProducts`/`updateProduct`/`deleteProduct` helpers if needed.
6. Keep accessibility high: semantic controls, focus trapping in modals, ESC to close, ARIA live region for toasts.
7. Follow existing Tailwind utility conventions; place new shared UI in `src/components/ui/` when reusable. Write unit tests for reducers/helpers in `__tests__` using Jest + Testing Library.

Constraints/expectations:
- No external state libraries; stick to React state/hooks or Context.
- Avoid prop drilling by introducing a `BulkSelectionProvider` if necessary.
- Keep bundle size reasonable; do not add large deps.
- Include graceful empty states and loading indicators for bulk actions.

Deliverables:
1. Updated UI with selectable cards + toolbar.
2. Modals + undoable toast system.
3. Tests covering selection reducer logic and undo queue.
4. Brief docs in README’s “Bulk operations” section covering UX and accessibility.

Please propose an implementation plan (components/hooks to touch, new files) before writing code. After I approve, generate the code in focused chunks (e.g., selection context, toolbar, modal, tests) so we can review iteratively.

## 3. Collaboration Approach

**How would you iterate and collaborate with the AI tool to implement this feature?**

1. Share the plan request above and wait for the AI to outline components/hooks/data changes. Review for feasibility and adjust.
2. Ask the AI to scaffold the selection context + reducer (state shape, actions, provider, hooks). Integrate locally, run tests, and manually verify selection UI skeleton.
3. Next, request the toolbar and checkbox affordances on `ProductCard`, ensuring accessible focus/labeling. Test keyboard navigation.
4. Have the AI help build confirmation modals and the undoable toast queue, reviewing each chunk to keep responsibilities clear.
5. Request updates to API helpers/mocks if necessary, plus Jest tests for reducers and undo logic. Run `npm test` and fix failures collaboratively.
6. Finally, ask for README documentation verbiage, polish copy, and double-check for lint/type issues before submitting.
