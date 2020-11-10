---
category: algorithm
date: 2020-05-23
title: Linear structure
slug: /blog/algorithm/linear-structure
description: "Introduction to linear data structures."
tags:
  - data structure
  - array
  - dynamic array
---

# Linear structure

> Array 또는 Linked list과 같이 data를 일렬로 저장하는 자료구조입니다.

# Array vs. Dynamic array

두 자료구조의 원소들은 메모리의 연속된 위치에 저장됩니다.

| Array                             | Dynamic array                                       |
| --------------------------------- | --------------------------------------------------- |
| 선언할 때 크기를 지정해야 합니다. | 자료의 개수가 변함에 따라 크기가 동적으로 변합니다. |

## Dynamic array implementation

- 배열의 크기를 변경하는 `resize()` 연산이 필요합니다.
- 원소를 배열의 맨 끝에 추가하는 `append()` 연산이 필요합니다.

Properties

```cpp
size_t size; // Actual (logical) size of array
size_t capacity; // Total size of array
void *array; // Pointer to the array
```

Operations

```cpp
void resize(); // Reallocates extra memory when size equals capacity
void append(DataType value); // Append new data at the end of the array
```

**`resize()`** 연산은 size가 capacity와 같아질 때 용량을 늘린 새 배열을 할당 받은 뒤 기존의 자료를 복사합니다. 그리고 기존의 배열을 삭제하고 새 배열로 바꿔치기 합니다. 용량을 늘릴 때 현재 배열이 가진 원소의 개수에 비례해서 여유분을 확보합니다. 이렇게 하면 재할당 과정에 드는 시간과 전체적인 재할당 횟수를 고려했을 때 해당 연산이 선형 시간 안에 수행될 수 있습니다. 그리고 **`append()`** 연산은 `array[size++]`에 새로운 원소를 삽입합니다.

# Linked list

각 원소가 data와 다음 원소를 가라키는 포인터를 가집니다.

원소들이 메모리 공간에 흩어져 있지만 포인터를 통해 다음 원소를 알아낼 수 있습니다.

```cpp
struct ListNode {
    DataType element;
    ListNode *prev, *next; // Pointer to previous and next node
}
```

## Dynamic array vs. Linked list

| Operation | Dynamic array | Linked list |
| --------- | ------------- | ----------- |
| 원소 삽입 | _O(1)_        | _O(1)_      |
| 원소 삭제 | **_O(n)_**    | _O(1)_      |
| 원소 찾기 | _O(1)_        | **_O(n)_**  |

자료의 크기가 일정하면서 자료의 삭제가 가끔만 일어난다면 Dynamic array를 사용하는 것이 좋습니다. 반대로 자료의 크기가 자주 변하면서 자료의 삭제가 자주 일어난다면 Linked list를 사용하는 것이 좋습니다.
