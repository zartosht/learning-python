---
title: Basics of Python
permalink: 002-Basics-of-Python
---

# Basics of Python

## Overview
This lesson provides an introduction to the basics of Python programming, including its syntax, data types, variables, basic operations, and control structures. Python is known for its readability and simplicity, making it an excellent choice for beginners and experienced developers alike.

## Introduction

Python is a high-level, interpreted programming language with dynamic typing and garbage collection. It supports multiple programming paradigms, including procedural, object-oriented, and functional programming.

### Python Syntax

- **Indentation**: Python uses indentation to define blocks of code. The amount of indentation (spaces or tabs) must be consistent throughout that block.
  
```python
if True:
    print("This is an indented block of code.")
```

### Variables and Data Types

- **Variables**: Variables in Python are created by assigning a value to a name. Python is dynamically typed, so you don't need to declare the type of the variable.

```python
x = 10  # Integer
y = 3.14  # Float
name = "John"  # String
is_valid = True  # Boolean
```

### Basic Operations

- **Arithmetic Operators**: Addition (+), Subtraction (-), Multiplication (*), Division (/), Modulus (%), Exponentiation (**), and Floor Division (//).

- **Comparison Operators**: Equal to (==), Not equal to (!=), Greater than (>), Less than (<), Greater than or equal to (>=), Less than or equal to (<=).

- **Logical Operators**: and, or, not.

### Control Structures

- **If Statements**: Used for decision-making operations.

```python
if condition:
    # code block
elif condition:
    # code block
else:
    # code block
```

- **Loops**: Python supports for and while loops for iterating over a sequence or executing a block of code multiple times.

```python
for i in range(5):
    print(i)

while condition:
    # block of code
```

### Functions

- **Defining Functions**: Functions are defined using the `def` keyword.

```python
def greet(name):
    print(f"Hello, {name}!")
```

### Modules and Packages

- **Modules**: A module is a Python file containing Python definitions and statements. Modules can be imported using the `import` statement.

- **Packages**: Packages are a way of structuring Python’s module namespace by using “dotted module names”. A package is essentially a directory with Python files and a file named `__init__.py`.

## Conclusion

The basics of Python cover a wide range of fundamental concepts essential for programming in Python. By understanding these basics, you are well on your way to creating more complex and efficient Python programs.