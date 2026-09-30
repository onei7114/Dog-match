# Tasks: Dog Match

**Input**: Design documents from `/specs/001-dog-match/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md

**Organization**: Tasks are grouped by user story to reflect the current web app’s implementation and validation work.

## Phase 1: Setup and validation

**Purpose**: Confirm the project structure and the implementation scope for the Dog Match experience.

- [x] T001 Confirm repository structure and product scope for the Dog Match landing page in the current project.
- [x] T002 Review the existing UX flow in [index.html](../../index.html), [styles.css](../../styles.css), and [script.js](../../script.js) against the accepted specification.
- [x] T003 Check the app’s core interaction states: upload, result display, saved favorite, and popular-breed browsing.

---

## Phase 2: Foundational UI and interaction behaviors

**Purpose**: Deliver the base experience that makes the upload-and-match flow work reliably.

- [x] T004 Create the landing-page hero and upload card layout defined in [index.html](../../index.html) and [styles.css](../../styles.css).
- [x] T005 Implement file validation for supported image types and 10 MB upload limits in [script.js](../../script.js).
- [x] T006 Build drag-and-drop and browse-file upload behavior with feedback messaging and a result view update.
- [x] T007 Ensure the result panel clearly communicates breed confidence and trait tendencies without implying certainty.

**Checkpoint**: The core upload-to-result flow is functional and matches the expected product promise.

---

## Phase 3: User Story 1 - Upload and breed match flow (Priority: P1) 🎯 MVP

**Goal**: Users can upload a dog image and see a likely breed match with honest confidence messaging.

**Independent Test**: A user can choose or drop a valid dog photo and immediately see a breed result with supporting explanation.

### Implementation for User Story 1

- [x] T010 [P] [US1] Create the upload card, result section, and supporting copy in [index.html](../../index.html).
- [x] T011 [P] [US1] Add responsive styling for the hero, upload card, and result details in [styles.css](../../styles.css).
- [x] T012 [US1] Implement upload validation, preview handling, and result updates in [script.js](../../script.js).
- [x] T013 [US1] Add inline user feedback via toast notifications for accepted uploads and invalid files.
- [x] T014 [US1] Ensure the experience remains usable on mobile and desktop viewports with responsive layout rules.

**Checkpoint**: User Story 1 is fully functional and independently testable.

---

## Phase 4: User Story 2 - Trait understanding and sincerity (Priority: P1)

**Goal**: Users can understand the result as a likely breed match with trait tendencies and no false certainty.

**Independent Test**: A user can inspect the result card and understand that ratings describe breed tendencies rather than guarantees.

### Implementation for User Story 2

- [x] T020 [P] [US2] Add result metadata for confidence, location, and trait summaries in [index.html](../../index.html).
- [x] T021 [US2] Render the energy, child-friendliness, and grooming indicators in [styles.css](../../styles.css).
- [x] T022 [US2] Ensure wording and UI state emphasize uncertainty and general tendencies instead of certainty in [script.js](../../script.js).

**Checkpoint**: User Story 2 is complete and the interface stays honest to the product promise.

---

## Phase 5: User Story 3 - Popular-breed exploration and favorites (Priority: P2)

**Goal**: Users can explore alternative breeds and save favorite matches for quick comparison.

**Independent Test**: A user can click a popular breed card, see the result update, and toggle a favorite state.

### Implementation for User Story 3

- [x] T030 [P] [US3] Add the popular-breeds grid and the product inspiration section in [index.html](../../index.html).
- [x] T031 [US3] Style the breed cards and hover states in [styles.css](../../styles.css).
- [x] T032 [US3] Implement breed-card click behavior and heart-favorite toggling in [script.js](../../script.js).
- [x] T033 [US3] Verify the flow does not break the upload or result experience while browsing popular breeds.

**Checkpoint**: All user stories are complete and the product feels cohesive.

---

## Phase 6: Final validation and polish

**Purpose**: Confirm the app meets the intended user journey and constitutional principles.

- [x] T040 Validate the page loads cleanly in the browser and the main interactive states are visible.
- [x] T041 Confirm keyboard focus and accessible labels are present for upload and browse actions.
- [x] T042 Check that the design remains readable and functional on narrow mobile viewports.
- [x] T043 Confirm the product language stays honest about likely match quality and breed tendencies.

---

## Notes

- The implementation already exists in the repository; this task list reflects the current completed state of the Dog Match experience.
- If additional production-grade work is needed later, the next logical step would be integrating a validated breed-identification service and adding automated browser tests around upload, low-confidence, and error states.
