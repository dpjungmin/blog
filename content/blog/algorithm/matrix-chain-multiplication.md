---
category: algorithm
date: 2020-05-30
title: Matrix chain multiplication
slug: /blog/algorithm/matrix-chain-multiplication
description: ???!
tags:
  - algorithm
  - matrix chain multiplication
  - dynamic programming
---

# Matrix chain multiplication

n개의 행렬 A1, A2, ···, An이 주어진 상태에서 이들의 곱 A1A2···An을 계산하려고 할 때 행렬 곱셉의 시간을 최소화 시키는 문제가 matrix chain multiplication입니다 (행렬 곱셈 시간을 최소화 시키기 위해서는 곱셈의 횟수를 최소화 시키면 됩니다).

# Matrix multiplication

> **두 행렬의 곱을 계산하는데 필요한 곱셉의 횟수**
>
> A, B 행렬 각각 p x q, q x r 행렬이라고 한다면, AB를 계산하는데 pqr번의 곱셉이 일어납니다.

행렬 A, B, C의 곱 ABC는 (AB)C = A(BC)가 성립합니다 (행렬의 결합법칙). 즉, 행렬을 어떤 순서로 2개씩 짝지어 계산해도 계산 결과는 동일하지만, 곱셈의 수는 다를 수 있습니다.

예를 들어, 행렬 A, B, C가 각각 2 × 5, 5 × 3, 3 × 4 행렬이라고 합시다. (AB)C는 `(2 × 5 × 3) + (2 × 3 × 4) = 30 + 24 = 54`의 곱셉이 필요합니다. 반면에 A(BC)는 `(5 × 3 × 4) + (2 × 5 × 4) = 60 + 40 = 100`의 곱셈이 필요합니다. 이렇듯, 행렬을 곱할 때 순서에 따라 시간이 많이 차이날 수 있습니다.

# Approach

이 문제는 Brute-force 및 Dynamic programming 알고리즘으로 해결할 수 있습니다.

Brute-force 방식으로 풀기 위해서는 가능한 모든 묶음의 방법으로 곱셈의 수의 최소값을 구하면 됩니다. 하지만, 괄호를 묶는 경우의 수가 적어도 2의 n제곱이기 때문에 시간이 너무 많이 걸립니다.

Dynammic programming으로 풀기 위해서는 문제가 최적 부분 구조 (optimal substructure)를 가지는지 확인해야 합니다.

먼저 행렬 A1, A2, ···, An이 각각 r1 × c1, r2 × c2, ···, rn × cn 행렬이라고 합시다.

| 행렬 | 크기    |
| ---- | ------- |
| A1   | r1 × c1 |
| A2   | r2 × c2 |
| ···  | ···     |
| An   | rn × cn |

즉, 행렬 Ai는 ri × ci 행렬입니다.

A1A2···An을 괄호치는 방법은 다음과 같이 n - 1가지로 나뉠 수 있습니다.

| 괄호치기            |
| ------------------- |
| A1(A2···An)         |
| (A1A2)(A3···An)     |
| (A1A2A3)(A4···An)   |
| ···                 |
| (A1···An-2)(An-1An) |
| (A1···An-1)An       |

즉, A1A2···An = (A1···Ai)(Ai+1···An)이며, A1···Ai문제와 Ai+1···An문제를 포함하고 있기 때문에 최적 부분 구조를 가진다는 것을 알 수 있습니다.

> 행렬 A1A2···An의 최소 비용은 (A1···Ai)(Ai+1···An)가 되는데, 이것은 **`(A1···Ai)의 곱셈 비용 + (Ai+1···An)의 곱셈 비용 + (r1 × ci × cn)`**의 최솟값입니다 (1 ≤ i ≤ n).

# Implementation

Memoization을 구현하기 위한 배열 `c[n][n]`이 필요합니다. 여기서 n은 행렬의 최대 개수 - 1 입니다. `c[i][j]`는 행렬 Ai···Aj의 곱을 계산하는 최소 비용입니다. 그리고 최적 부분 구조를 코드로 다음과 같이 표현할 수 있습니다.

```cpp
// c[i][j] is initialized to INT_MAX
for (int k = i; k <= j - 1; k++)
{
    if (i == j)
    {
        c[i][j] = 0;
    }
    else
    {
        c[i][j] = min(c[i][j], c[i][k] + c[k + 1][j] + (ri * ck * cj));
    }
}

```

이러한 방법으로 bottom-up 방식을 사용해 구현한다면 다음과 같습니다.

```cpp
int p[n + 1][2]; // Matrix i's size is p[i][0] * p[i][1]
int c[n + 1][n + 1]; // All values are initialized to zero

int matrix_chain(int n)
{
    for (int r = 1; r < n; r++) // r + 1 is the size of the problem
    {
        for (int i = 1; i <= n - r; i++)
        {
            int j = i + r;
            c[i][j] = INT_MAX;

            // highlight-start
            for (int k = i; k <= j - 1; k++)
            {
                int cost = c[i][k] + c[k + 1][j] + p[i][0] * p[k][1] * p[j][1];
                c[i][j] = min(c[i][j], cost);
            }
            // highlight-end
        }
    }

    return c[1][n];
}

```

> 관련 문제로 [백준 11049번]이 있습니다.
>
> 제 풀이를 확인하고 싶으신 분은 [링크]를 확인해주세요.

[백준 11049번]: https://www.acmicpc.net/problem/11049
[링크]: http://boj.kr/fd9afcdaa3854586a6f99468147e3bd4
