export const blogPosts = [
  {
    id: 1,
    title: "Getting Started with React",
    excerpt: "Learn the fundamentals of React and how to build your first component.",
    content: `React is a powerful JavaScript library for building user interfaces. In this post, we'll explore the basics of React and create our first component.

## What is React?

React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components".

## Creating Your First Component

Here's a simple example of a React component:

\`\`\`jsx
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}
\`\`\`

This component accepts a single "props" object argument with data and returns a React element.

## Key Concepts

- **Components**: The building blocks of React applications
- **JSX**: A syntax extension for JavaScript
- **Props**: How data flows between components
- **State**: How components manage their own data

React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.`,
    author: "John Doe",
    date: "2024-01-15",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&h=300&fit=crop"
  },
  {
    id: 2,
    title: "Modern JavaScript Features",
    excerpt: "Explore ES6+ features that make JavaScript development more efficient and enjoyable.",
    content: `JavaScript has evolved significantly over the years. Let's explore some modern features that can make your code cleaner and more efficient.

## Arrow Functions

Arrow functions provide a more concise way to write functions:

\`\`\`javascript
// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;
\`\`\`

## Destructuring

Destructuring allows you to extract values from arrays or objects:

\`\`\`javascript
const person = { name: 'Alice', age: 30 };
const { name, age } = person;

const numbers = [1, 2, 3];
const [first, second] = numbers;
\`\`\`

## Template Literals

Template literals make string interpolation easier:

\`\`\`javascript
const name = 'World';
const greeting = \`Hello, \${name}!\`;
\`\`\`

## Async/Await

Async/await makes working with promises more readable:

\`\`\`javascript
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
\`\`\`

These features help write more maintainable and readable code.`,
    author: "Jane Smith",
    date: "2024-01-10",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=500&h=300&fit=crop"
  },
  {
    id: 3,
    title: "Building Responsive Web Design",
    excerpt: "Learn how to create websites that look great on all devices using CSS Grid and Flexbox.",
    content: `Responsive web design is essential in today's multi-device world. Let's explore how to create layouts that adapt to different screen sizes.

## CSS Grid

CSS Grid is perfect for two-dimensional layouts:

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}
\`\`\`

## Flexbox

Flexbox excels at one-dimensional layouts:

\`\`\`css
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
\`\`\`

## Media Queries

Use media queries to apply different styles at different screen sizes:

\`\`\`css
@media (max-width: 768px) {
  .container {
    padding: 10px;
  }
}
\`\`\`

## Mobile-First Approach

Start with mobile styles and progressively enhance for larger screens:

\`\`\`css
/* Mobile styles */
.container {
  padding: 10px;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    padding: 20px;
  }
}
\`\`\`

Remember to always test your designs on real devices to ensure the best user experience.`,
    author: "Mike Johnson",
    date: "2024-01-05",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=500&h=300&fit=crop"
  }
];