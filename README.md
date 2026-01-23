✱ Project Overview

    The Interactive Data Manager is a single-page web application developed using HTML, CSS, and JavaScript.
It allows users to manage textual entries such as tasks, notes, reminders, or study plans.

The application provides features to add, view, edit, delete, search, filter, and update the status of entries dynamically without reloading the page.

All data is stored using browser localStorage, so the information remains available even after refreshing the browser.


✱ Features

● Add new entry (title, description, message)

● One-word title validation

● Display entries dynamically in table format

● Edit existing entries

● Delete entries with confirmation

● Search entries (case-insensitive)

● Filter entries by status (Active / Completed)

● Status toggle (Active ↔ Completed)

● Light / Dark mode

● Responsive mobile navigation

● Single Page Application behavior (no page reload)


✱ JavaScript Methods Used

🔹 Array Methods

push() – add new entries to array

filter() – search and filter data

find() – get a specific entry

findIndex() – locate entry for edit/delete

splice() – remove entry from array

forEach() – loop through data

🔹 String Methods

trim() – remove extra spaces from input

toLowerCase() – enable case-insensitive search

includes() – search keyword matching

🔹 Other Methods & APIs

localStorage.getItem() – retrieve stored data

localStorage.setItem() – save data

JSON.parse() – convert string to object

JSON.stringify() – convert object to string

Date.now() – generate unique ID

addEventListener() – handle user events

classList.toggle() – toggle UI classes


✱ JavaScript Concepts Applied (Week 2)

The following Week-2 JavaScript concepts are implemented in this project:

🔹 Variables & Scope

Used let and const appropriately

Global and function-level scope maintained

🔹 Data Types

Primitive types: string, number, boolean

Non-primitive types: objects and arrays

🔹 Objects

Each entry stored as an object
{
  id,
  title,
  description,
  message,
  status,
  date
}

🔹 Arrays

All entries stored inside an array

Array methods used for CRUD operations

🔹 Conditional Statements

Used if, else, and ternary operator

Status toggle logic (active / completed)

🔹 Functions

Modular functions for:

add

edit

delete

search

filter

render table

🔹 DOM Manipulation

Dynamic table creation using JavaScript

Showing and hiding sections

Updating content without page reload

🔹 Events

click events for buttons

submit event for form

load event for page initialization

🔹 Execution Flow

Data validation before submission

Logical flow control using conditions

State handling using variables

✱ Storage

Browser localStorage is used to persist data

Data remains saved even after page refresh
