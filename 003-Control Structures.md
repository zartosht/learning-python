---
title: Control Structures in Python
comments: true
permalink: 003-Control-Structures
---

# Control Structures in Python

## Overview
This lesson delves into the control structures in Python, which are crucial for directing the flow of a program. By the end of this lesson, you'll understand the different types of control structures including conditional statements, loops, and branching mechanisms that Python uses to execute code conditionally, repeatedly, or iteratively.

## Introduction

Control structures are fundamental programming constructs that allow for more dynamic execution paths based on conditions or by iterating over collections of data. Python provides several control structures, making it versatile for a wide range of tasks.

### Conditional Statements (`if`, `elif`, `else`)

- **Purpose**: Execute different blocks of code based on certain conditions.
- **Syntax**:

```python
if condition:
    # code to execute if condition is true
elif another_condition:
    # code to execute if the another_condition is true
else:
    # code to execute if none of the above conditions are true
```

- **Example**:

```python
age = 18
if age >= 18:
    print("You are an adult.")
elif age < 18 and age > 0:
    print("You are a minor.")
else:
    print("Invalid age.")
```

### Loops(`for`, `while`)

- **For Loop**: Iterates over a sequence (such as a list, tuple, dictionary, set, or string).

```python
for element in sequence:
  # code to execute for each element in the sequence
```

- **While Loop**: Repeats as long as a certain boolean condition is met.

```python
while condition:
  # code to execute as long as the condition is true
```

- **Example**:

```python
# For Loop Example
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
  print(fruit)

# While Loop Example
count = 5
while count > 0:
  print(count)
  count -= 1
```

### Loop Control Statements(`break`, `continue`, `pass`)

- **Break**: Exits the loop prematurely.

- **Continue**: Skips the current iteration and continues with the next one.

- **Pass**: Does nothing and is used as a placeholder when a statement is required syntactically but no code needs to be executed.

### Nested Control Structures

Control structures can be nested within each other, allowing for complex logic and flow control.

- **Example**:

```python
for i in range(1, 11):
    if i % 2 == 0:
        print(f"{i} is even")
    else:
        print(f"{i} is odd")
```

## Conclusion

Control structures in Python are powerful tools that enable developers to execute code based on conditions, iterate over data structures, and control the flow of execution in complex ways. Mastering these constructs is essential for writing efficient, readable, and maintainable Python code.