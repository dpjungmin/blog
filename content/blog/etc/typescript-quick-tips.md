---
category: TypeScript
date: 2020-12-25
title: TypeScript Quick Tips
slug: /typescript-quick-tips
tags:
  - TypeScript
---

> **`TypeScript`** 입문자들이 참고할 수 있도록 작성했습니다.

대부분 코드 예시로만 작성했습니다.
코드 예시에서`ERROR`라고 주석을 단 것들은 TypeScript가 잡아주는 error들입니다.

---

## Basics

### Types

#### Primitive Types

`boolean`, `number`, `string`, `undefined`, `null`, `symbol`, `bigint`

```typescript:clipboard=false
let a: boolean = false
let b: number = 55.5
let c: string = "hello"
let d: undefined = undefined
let e: null = null
let f: symbol = Symbol("start")
let g: bigint = 24n
```

#### Instance Types

`RegExp`, `Array<T>`, `Set<T>`

```typescript:clipboard=false
let a: RegExp = new RegExp("ab+c")
let b: Array<number> = [1, 2, 3]
let c: Set<number> = new Set([1, 2, 3])
```

#### Arrays and Tuples

```typescript:clipboard=false
/** Arrays */
let a: number[] = [1, 2, 3]

a = [1] // ok
a = [1, 2, 3] // ok
a = ["안녕"] // ERROR
```

```typescript:clipboard=false
/** Tuples */
let a: [number, number] = [0, 0]

a = [1, 2] // ok
a = [1] // ERROR
a = [1, 2, 3] // ERROR
a = ["안녕", 1] // ERROR
```

#### Object Types

```typescript:clipboard=false
type Point = {
  x: number
  y: number
}

let p1: Point = {
  x: 0,
  y: 0,
}
```

### Functions

```typescript:clipboard=false
function add(a: number, b: number): number {
  return a + b
}
```

이것은 아래와 같습니다.

```typescript:clipboard=false
type Add = (a: number, b: number) => number

let add: Add

add = function (a: number, b: number): number {
  return a + b
}
```

### Structural Typing

```typescript:clipboard=false
type Point2D = {
  x: number
  y: number
}

type Point3D = {
  x: number
  y: number
  z: number
}

let p2d: Point2D = { x: 10, y: 20 }
let p3d: Point3D = { x: 0, y: 10, z: 20 }

p3d = p2d // ERROR (Point2D에는 z가 없기 때문)
p2d = p3d // ok (Point3D는 x와 y를 포함하기 때문)
```

### Classes

```typescript:clipboard=false
class Animal {
  protected name: string

  constructor(name: string) {
    this.name = name
  }

  public move(distance: number): void {
    console.log(`${this.name} moved ${distance}m.`)
  }
}

let dog = new Animal("dog")
dog.move(20) // ok (public)
dog.name = "cat" // ERROR (protected)
```

### Generics

```typescript:clipboard=false
class Queue<T> {
  private data: Array<T> = []

  push(item: T) {
    this.data.push(item)
  }

  pop(): T | undefined {
    return this.data.shift()
  }
}

const q = new Queue<number>()
q.push(10) // ok
q.push("안녕") // ERROR
```

### `any` and `unknown`

```typescript:clipboard=false
let a: any
let b: unknown

a = 123 // ok
a = "안녕" // ok
a.anything.you.can.imagine.works() // ok
let c: boolean = a // ok

b = 123 // ok
b = "안녕" // ok
b.trim() // ERROR

// b가 정말 string이라고 해도 trim()을 호출하려면 아래와 같이 해야합니다.
if (typeof b == "string") {
  b.trim()
}
```

> type을 모르면 가급적 **`any`** 보다는 **`unknown`**을 사용하는 것이 좋을 수 있겠죠?

### Type Assertion

```typescript:clipboard=false
let a: unknown = "      안녕~!    "

const b = a.trim() // ERROR (위에서 unknown의 behavior에 대해서 살펴봤죠)
```

a의 type이 `string`이라는 것이 확실하다면 error를 없애기 위해 2가지 방법이 있습니다.

```typescript:clipboard=false
const b = (a as string).trim() // ok
```

그리고

```typescript:clipboard=false
const b = (<string>a).trim() // ok
```

실제로 두 방법 중에선 첫 번째 방법을 더 많이 사용합니다.

### Type Casting

```typescript:clipboard=false
let a

a = "123"

const num = +a // ok;

console.log(typeof num) // number
```

---

## Intermediate

### `readonly` modifier

```typescript:clipboard=false
type Point = {
  readonly x: number
  y: number
}

const p = (Point = { x: 10, y: 20 })

p.x = 20 // ERROR
p.y = 10 // ok
```

#### Arrays and Tuples

다음 함수를 살펴보면 `input`으로 들어온 배열 또한 바뀌는 것을 볼 수 있습니다. 개발자가 의도한 것이 아니라면 문제가 될 수 있는 코드입니다.

```typescript:clipboard=false
function reverseSorted(input: number[]): number[] {
  return input.sort().reverse()
}

const a = [1, 2, 3, 4, 5]
const b = reverseSorted(a)

console.log(a) // [5, 4, 3, 2, 1];
console.log(b) // [5, 4, 3, 2, 1];
```

`input: number[]`를 `input: readonly number[]`로 바꿔주면 error가 발생하여 이러한 문제를 방지할 수 있습니다.

따라서 수정하면 다음과 비슷하겠죠.

```typescript:clipboard=false
function reverseSorted(input: readonly number[]): number[] {
  return input.slice().sort().reverse()
}

const a = [1, 2, 3, 4, 5]
const b = reverseSorted(a)

console.log(a) // [1, 2, 3, 4, 5];
console.log(b) // [5, 4, 3, 2, 1];
```

### `const` Assertion

```typescript:clipboard=false
const user = {
  name: "정민",
  email: "a@b.com",
  posts: [Object, Object],
} as const

user.name = "윤주" // ERROR
user.email = "c@d.com" // ERROR
user.posts.unshift(Object) // ERROR
```

```typescript:clipboard=false
const user {
  name: '정민' as const,
  email: 'a@b.com'
}

user.name = '윤주'; // ERROR
user.email = 'c@d.com'; // ok
```

### Union Types (`|`)

```typescript:clipboard=false
type User = {
  username: string
  email: string
}

let user: User | null | false // 3가지 type
```

### Literal Types

```typescript:clipboard=false
type Direction = "North" | "South" | "East" | "West"

let dir: Direction

dir = "North" // ok
dir = "north" // ERROR
```

```typescript:clipboard=false
type DiceValue = 1 | 2 | 3 | 4 | 5 | 6

function rollDice() {
  return (Math.floor(Math.random() * 6) + 1) as DiceValue
}

// ERROR
if (rollDice() === 7) {
}
```

### Intersection Types (`&`)

```typescript:clipboard=false
type Point2D = {
  x: number
  y: number
}

type Point3D = Point2D & {
  z: number
}
```

```typescript:clipboard=false
type Person = {
  firstName: string
  lastName: string
}

type Email = {
  email: string
}

type Phone = {
  phone: string
}

type UserDetails = Person & Email & Phone
```

### Optional Modifier (`?`)

```typescript:clipboard=false
type User = {
  username: string
  email: string
  phone?: string
}
```

이것은 아래와 같습니다.

```typescript:clipboard=false
type User = {
  username: string
  email: string
  phone: string | undefined // null은 포함되지 않음
}
```

### Assertion Operator (`!`)

```typescript:clipboard=false
type User = {
  username: string
  email: string
}

let user: User

function initializeUser() {
  user = { username: "정민", email: "a@b.com" }
}

initializeUser()

console.log(user.username, user.email) // ERROR
```

분명히 `initializeUser()`에서 값을 초기화 했지만 TypeScript는 이것을 감지하지 못합니다.

따라서 개발자가 해당 값이 존재한다고 확신하면 다음과 같이 error를 없앨 수 있습니다.

```typescript:clipboard=false
console.log(user!.username, user!.email) // ok
```

### Interfaces

```typescript:clipboard=false
interface Point2D {
  x: number
  y: number
}

interface Point3D extends Point2D {
  x: number
}

const p: Point3D = { x: 10, y: 20, z: 30 }
```

#### Interface Declaration Merging

```typescript:clipboard=false
interface User {
  username: string
}

interface User {
  email: string
}

// username, email 둘 다 가능
const user: User = { username: "정민", email: "a@b.com" }
```

### `never` type

다음과 같은 함수가 `never` type입니다.

```typescript:clipboard=false
const sing = function () {
  while (true) {}
}
```

저도 이것을 실제 사용한 적은 없지만 예시를 살펴보니 특정 코드가 도달 가능한지 확인하기 위해 사용한다고 합니다.

예를 들어,

```typescript:clipboard=false
type Square = {
  kind: "square"
  size: number
}

type Rectangle = {
  kind: "rectangle"
  width: number
  height: number
}

type Shape = Square | Rectangle

function getArea(s: Shape) {
  if (s.kind === "square") {
    return s.size * s.size
  }

  if (s.kind === "rectangle") {
    return s.width * s.height
  }

  const _ensureAllCasedHandled: never = s
}
```

만약 `getArea()`에서 `const _ensureAllCasedHandled: never = s;`에 도달 가능하면 TypeScript는 error를 발생시킬 것입니다.

## Advanced

### Type Guards

```typescript:clipboard=false
type Square = {
  kind: "square"
  size: number
}

type Rectangle = {
  kind: "rectangle"
  width: number
  height: number
}

type Shape = Square | Rectangle

function isSquare(s: Shape): s is Square {
  return "size" in s
}

function isRectangle(s: Shape): s is Rectangle {
  return "width" in s
}

function getArea(s: Shape) {
  if (isSquare(s)) {
    return s.size * s.size
  }

  if (isRectangle(s)) {
    return s.width * s.height
  }

  const _ensure: never = s
  return _ensure
}
```

### Function Overloading

다음과 같은 함수가 있다고 합시다.

```typescript:clipboard=false
function makeDate(timestampOrYear: number, month?: number, day?: number): Date {
  if (month != null && day != null) {
    return new Date(timestampOrYear, month - 1, day)
  }

  return new Date(timestampOrYear)
}
```

우리는 이 함수가 파라미터로 `timestampOrYear`만 받거나 3개 모두 받기를 원합니다.

2개의 파라미터만 넘기는 것을 방지하기 위해서는 아래와 같이 하면 됩니다.

```typescript:clipboard=false
function makeDate(timestamp: number): Date
function makeDate(year: number, month: number, day: number): Date
function makeDate(timestampOrYear: number, month?: number, day?: number): Date {
  if (month != null && day != null) {
    return new Date(timestampOrYear, month - 1, day)
  }

  return new Date(timestampOrYear)
}

makeDate(1993, 3, 22) // ok
makeDate(0) // ok

makeDate(1993, 3) // ERROR
```

### Generic Constraints

```typescript:clipboard=false
type Name = {
  firstName = string;
  lastName = string;
}

function addFullNameToObject<T extends Name>(obj: T): T & { fullName: string} {
  return {
    ...obj,
    fullName
  };
}

const me = addFullNameToObject({
  email: 'a@b.com'm,
  firstName: 'John',
  lastName: 'Doe',
});

console.log(me.fullName); // John Doe
```

### `typeof` operator

```typescript:clipboard=false
const p1 = { x: 10, y: 20, z: 30 }

const p2: typeof p1 = { x: 0, y: 0, z: 0 }
```

```typescript:clipboard=false
const userResponse = {
  username: "dpjungmin",
  email: "a@b.com",
}

type UserResponse = typeof userResponse

function printUserResponse(res: UserResponse) {
  console.log(res.username, res.email) // ok;
}
```

### `keyof` operator

`keyof`이 필요한 경우를 살펴봅시다.

```typescript:clipboard=false
type Person = {
  name: string
  age: number
}

function getValue(obj: any, key: string) {
  return obj[key]
}

const john: Person = {
  name: "John",
  age: 45,
}

const age = getValue(john, "age") // ok
const email = getValue(john, "email") // error를 감지하지 못함
```

john Object의 key에는 `name`과 `age`만 있습니다. 그리고 마지막 줄에서 `email` 정보를 가져오려고 합니다. 이러한 문제를 해결하기 위해 `keyof`를 사용합니다.

```typescript:clipboard=false
type Person = {
  name: string
  age: number
}

function getValue<Obj, Key extends keyof Obj>(obj: Obj, key: Key) {
  return obj[key]
}

const john: Person = {
  name: "John",
  age: 28,
}

const age = getValue(john, "age") // ok
const email = getValue(john, "email") // ERROR
```

TypeScript가 error를 돌려줘서 이제는 아까와 같은 버그는 피할 수 있겠죠?

### Lookup Types

```typescript:clipboard=false
interface Response {
  data: {
    id: string
    book: {
      id: string
      name: string
      price: number
    }
  }
}

function getBook(res: Response): Response["data"]["book"] {
  return res.data.book
}
```

### Mapped Types

```typescript:clipboard=false
type Point = {
  x: number
  y: number
}

type ReadonlyPoint = {
  readonly [Item in keyof Point]: Point[Item]
}

const p: ReadonlyPoint = { x: 0, y: 0 }

p.x = 10 // ERROR
```

```typescript:clipboard=false
type Point = {
  x: number
  y: number
}

type Readonly<T> = {
  readonly [Item in keyof T]: T[key]
}

// 실제 TypeScript에 내장된 type
const p: Readonly<Point> = { x: 0, y: 0 }

p.x = 10 // ERROR
```

### Mapped Type Modifiers

```typescript:clipboard=false
type Point = {
  readonly x: number
  y?: number
}

// 모든 값을 readonly로 바꾸고 (+readonly)
// Conditional Operator가 있으면 없앤다. (-?)
type MappedType<T> = {
  +readonly [P in keyof T]-?: T[P]
}

let a: MappedType<Point>

a = { x: 10 } // ERROR (y가 없음)
a = { x: 10, y: 20 } // ok

a.x = 30 // ERROR (readonly)
a.y = 30 // ERROR (readonly)
```

---

기억에 남은 것들만 적어보았습니다.
이외에도 많은 내용이 있으니 궁금하신 분들은 https://www.typescriptlang.org/docs 를 참고해주세요.
