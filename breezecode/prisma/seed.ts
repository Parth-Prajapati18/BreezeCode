import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {

  const courseData = {
    id: 1,
    title: "Advanced JavaScript/Node.js Concepts",
    description: "Deep dive into advanced concepts of JavaScript and Node.js. This course covers asynchronous programming, event loop, advanced ES6+ features, error handling, module systems, streams, RESTful APIs, performance optimization, testing, and integrating TypeScript with Node.js."
  };

  const chaptersData = [
    {
      id: 101,
      courseId: 1,
      title: "Asynchronous Programming in JavaScript",
      content: `Asynchronous programming in JavaScript allows you to perform operations that take time, such as fetching data from a server, without blocking the main thread. This helps keep applications responsive and enhances performance. Here’s a breakdown of the key concepts and techniques:

1. **Callbacks**:
   Callbacks are functions passed as arguments to other functions and are executed once the operation completes. While useful, they can lead to "callback hell" when nested deeply.

2. **Promises**:
   Promises represent the result of an asynchronous operation and can be in one of three states: pending, fulfilled, or rejected. Promises help avoid callback hell by allowing chaining and better error handling.

3. **Async/Await**:
   Async/await is built on top of Promises and provides a more readable and synchronous-like way to handle asynchronous operations. This simplifies the code and error handling compared to traditional callback-based approaches.

Here’s an example demonstrating these concepts:`,
      sampleCode: `
      // Callbacks
      function fetchData(callback) {
        setTimeout(() => {
          callback('Data fetched');
        }, 1000);
      }

      fetchData((data) => {
        console.log(data); // Output after 1 second: Data fetched
      });

      // Promises
      const fetchData = () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve('Data fetched');
          }, 1000);
        });
      };

      fetchData()
        .then(data => console.log(data)) // Output after 1 second: Data fetched
        .catch(error => console.error(error));
      
      // Chaining Promises
      fetchData()
        .then(data => {
          console.log(data);
          return 'More data';
        })
        .then(moreData => console.log(moreData)); // Output: More data

      // Async/Await
      const fetchData = async () => {
        try {
          const data = await fetchData();
          console.log(data); // Output after 1 second: Data fetched
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
      `
    },
    {
      id: 102,
      courseId: 1,
      title: "Event Loop and Concurrency Model",
      content: `Understanding the event loop and concurrency model is crucial for writing efficient JavaScript and Node.js applications. The event loop allows JavaScript to perform non-blocking operations by offloading tasks to the system kernel, enabling asynchronous execution. Here’s a detailed look:

1. **Event Loop**:
   The event loop is a mechanism that continuously checks the call stack and task queue. If the call stack is empty, it processes tasks from the task queue. This mechanism enables asynchronous operations.

2. **Concurrency Model**:
   Node.js uses a single-threaded event loop but handles concurrent operations through non-blocking I/O. This approach allows it to handle multiple operations simultaneously without blocking the execution of other tasks.

Example demonstrating the event loop and concurrency model:`,
      sampleCode: `
      console.log('Start');

      setTimeout(() => {
        console.log('Timeout callback');
      }, 0);

      console.log('End');

      // Output:
      // Start
      // End
      // Timeout callback
      `
    },
    {
      id: 103,
      courseId: 1,
      title: "Advanced ES6+ Features",
      content: `ES6 and later versions of JavaScript introduced several advanced features that simplify coding and improve readability. These features include destructuring, spread/rest operators, and generators. Here's an overview:

1. **Destructuring**:
   Destructuring allows you to unpack values from arrays or properties from objects into distinct variables.

2. **Spread/Rest Operators**:
   Spread operators expand elements of an array or object, while rest operators collect multiple elements into an array.

3. **Generators**:
   Generators are functions that can be paused and resumed. They provide an easy way to work with asynchronous data streams.

Example demonstrating destructuring and spread/rest operators:`,
      sampleCode: `
      // Destructuring
      const person = { name: 'Alice', age: 25 };
      const { name, age } = person;
      console.log(name, age); // Output: Alice 25

      // Spread Operator
      const arr1 = [1, 2, 3];
      const arr2 = [...arr1, 4, 5];
      console.log(arr2); // Output: [1, 2, 3, 4, 5]

      // Rest Operator
      function sum(...numbers) {
        return numbers.reduce((acc, num) => acc + num, 0);
      }
      console.log(sum(1, 2, 3)); // Output: 6

      // Generators
      function* generator() {
        yield 'Hello';
        yield 'World';
      }

      const gen = generator();
      console.log(gen.next().value); // Output: Hello
      console.log(gen.next().value); // Output: World
      `
    },
    {
      id: 104,
      courseId: 1,
      title: "Error Handling and Debugging",
      content: `Effective error handling and debugging are essential for building robust applications. JavaScript and Node.js provide several mechanisms for error management and debugging:

1. **Error Handling**:
   Use try/catch blocks to handle synchronous errors and .catch() for promises. Proper error handling ensures that errors are managed gracefully.

2. **Debugging**:
   Employ tools like console.log, debugger statements, and built-in Node.js debugging features to troubleshoot and resolve issues in your code.

Example demonstrating error handling and debugging techniques:`,
      sampleCode: `
      // Error Handling
      try {
        throw new Error('Something went wrong');
      } catch (error) {
        console.error(error.message); // Output: Something went wrong
      }

      // Promises Error Handling
      new Promise((_, reject) => reject('Promise rejected'))
        .catch(error => console.error(error)); // Output: Promise rejected

      // Debugging
      const x = 10;
      console.log(x); // Output: 10

      debugger;

      // Run with: node --inspect-brk yourfile.js
      `
    },
    {
      id: 105,
      courseId: 1,
      title: "Modules and Dependency Management",
      content: `Modules and dependency management are crucial for structuring and maintaining large applications. JavaScript supports different module systems and package managers for managing dependencies:

1. **CommonJS Modules**:
   CommonJS is the default module system in Node.js, allowing you to export and import modules using require and module.exports.

2. **ES Modules**:
   ES Modules are a standardized module system introduced in ES6, using import and export syntax.

3. **Dependency Management**:
   Manage project dependencies using package managers like npm or yarn.

Example demonstrating CommonJS and ES Modules:`,
      sampleCode: `
      // CommonJS Modules
      // add.js
      module.exports = (a, b) => a + b;

      // main.js
      const add = require('./add');
      console.log(add(2, 3)); // Output: 5

      // ES Modules
      // add.mjs
      export const add = (a, b) => a + b;

      // main.mjs
      import { add } from './add.mjs';
      console.log(add(2, 3)); // Output: 5

      // Dependency Management
      // Run these commands in your terminal
      // Install dependencies using npm
      npm install express

      // Install dependencies using yarn
      yarn add express
      `
    },
    {
      id: 106,
      courseId: 1,
      title: "Streams and Buffers",
      content: `Streams and buffers are essential for handling large amounts of data efficiently. They allow you to process data in chunks, reducing memory usage and improving performance:

1. **Streams**:
   Streams enable you to read or write data piece by piece, without loading the entire dataset into memory. Node.js provides several stream types: readable, writable, duplex, and transform.

2. **Buffers**:
   Buffers are used to handle binary data directly. They are especially useful for dealing with streams of data from files or network operations.

Example demonstrating streams and buffers in Node.js:`,
      sampleCode: `
      const fs = require('fs');
      const path = require('path');

      // Readable Stream
      const readableStream = fs.createReadStream(path.join(__dirname, 'file.txt'));
      readableStream.on('data', (chunk) => {
        console.log(\`Received \${chunk.length} bytes of data.\`);
      });

      // Writable Stream
      const writableStream = fs.createWriteStream(path.join(__dirname, 'output.txt'));
      writableStream.write('Writing some data to the file.');

      // Buffers
      const buffer = Buffer.from('Hello, World!');
      console.log(buffer.toString()); // Output: Hello, World!
      `
    },
    {
      id: 107,
      courseId: 1,
      title: "Building RESTful APIs with Express",
      content: `Express is a minimal and flexible Node.js web application framework that provides a robust set of features to develop web and mobile applications. This chapter covers:

1. **Setting Up Express**:
   Install and configure Express to handle HTTP requests for CRUD operations (Create, Read, Update, Delete).

Example demonstrating setting up a simple RESTful API with Express:`,
      sampleCode: `
      const express = require('express');
      const app = express();
      const port = 3000;

      app.use(express.json());

      // In-memory data store
      let items = [];

      // Create
      app.post('/items', (req, res) => {
        const item = req.body;
        items.push(item);
        res.status(201).json(item);
      });

      // Read
      app.get('/items', (req, res) => {
        res.json(items);
      });

      // Update
      app.put('/items/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const updatedItem = req.body;
        items = items.map(item => item.id === id ? updatedItem : item);
        res.json(updatedItem);
      });

      // Delete
      app.delete('/items/:id', (req, res) => {
        const id = parseInt(req.params.id);
        items = items.filter(item => item.id !== id);
        res.status(204).end();
      });

      app.listen(port, () => {
        console.log(\`Server running on http://localhost:\${port}\`);
      });
      `
    },
    {
      id: 108,
      courseId: 1,
      title: "Performance Optimization",
      content: `Optimizing the performance of Node.js applications involves various techniques to ensure efficient execution and resource management. Key areas include:

1. **Profiling and Benchmarking**:
   Use tools like Node.js built-in profiler and third-party tools to measure and analyze performance.

2. **Caching**:
   Implement caching mechanisms to store frequently used data and reduce latency.

3. **Code Optimization**:
   Write efficient code and utilize best practices for performance improvement.

Example demonstrating caching in Node.js:`,
      sampleCode: `
      // Caching Example
      const cache = new Map();

      function getCachedData(key, fetchData) {
        if (cache.has(key)) {
          return Promise.resolve(cache.get(key));
        }
        return fetchData().then(data => {
          cache.set(key, data);
          return data;
        });
      }

      // Usage
      function fetchData() {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve('Fetched data');
          }, 1000);
        });
      }

      getCachedData('dataKey', fetchData)
        .then(data => console.log(data)) // Output after 1 second: Fetched data
        .then(() => getCachedData('dataKey', fetchData))
        .then(data => console.log(data)); // Output instantly: Fetched data
      `
    },
    {
      id: 109,
      courseId: 1,
      title: "Testing and Test-Driven Development (TDD)",
      content: `Testing and Test-Driven Development (TDD) are essential for building reliable and maintainable applications. This chapter covers:

1. **Unit Testing**:
   Unit testing involves testing individual components or functions to ensure they work as expected.

2. **Test-Driven Development (TDD)**:
   TDD is a development approach where you write tests before implementing the functionality. This helps ensure code quality and coverage.

Example demonstrating unit testing and TDD with Mocha and Chai:`,
      sampleCode: `
      // Unit Testing Example with Mocha and Chai
      const assert = require('chai').assert;

      describe('Math operations', () => {
        it('should add numbers correctly', () => {
          assert.equal(2 + 2, 4);
        });
      });

      // TDD Example
      // math.js
      function add(a, b) {
        return a + b;
      }
      module.exports = { add };

      // test.js
      const assert = require('chai').assert;
      const { add } = require('./math');

      describe('Addition', () => {
        it('should add two numbers correctly', () => {
          assert.equal(add(2, 3), 5);
        });
      });
      `
    },
    {
      id: 110,
      courseId: 1,
      title: "Integrating TypeScript with Node.js",
      content: `Integrating TypeScript with Node.js can enhance the development experience by providing static type checking and better tooling support. Here’s how you can integrate TypeScript into your Node.js project:

1. **Setting Up TypeScript**:
   Install TypeScript and configure it for your project.

2. **Using TypeScript in Node.js**:
   Write and compile TypeScript code to JavaScript.

Example demonstrating a basic setup for TypeScript in Node.js:`,
      sampleCode: `
      // TypeScript Setup Example
      // Install TypeScript and types
      // Run these commands:
      // npm install typescript @types/node --save-dev
      // npx tsc --init

      // index.ts
      const message: string = 'Hello, TypeScript!';
      console.log(message);

      // Compile TypeScript to JavaScript
      // Run this command:
      // npx tsc
      `
    }
  ];

  await prisma.course.create({ data: courseData });

  for (const chapter of chaptersData) {
    await prisma.chapter.create({ data: chapter });
  }

  console.log('Seeding completed');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
