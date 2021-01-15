---
category: TypeScript
date: 2021-01-15
title: TypeScript Decorator 직접 만들어보자
slug: /typescript-decorators
tags:
  - TypeScript
  - Decorators
  - Metadata
---

TypeScript로 만들어진 library를 보면 decorator를 여기저기서 많이 사용하는 것을 볼 수 있다. Decorator가 무엇이며 어떻게 만드는지 궁금해서 공식 documentation 및 여러 글을 살펴보았다. 이번 글은 decorator에 대해 A-to-Z를 설명하진 않지만 간단한 코드 예시를 통해 decorator가 무엇이며 어떻게 만들 수 있는지 살펴보자.

## Decorators 기능 활성화

Decorators를 활성화하려면 `tsconfig.json`에서 `experimentDecorators` compiler options를 **true**로 설정해야 한다.

```json:title=tsconfig.json
{
  "compilerOptions": {
    "target": "ES5",
    "experimentalDecorators": true // highlight-line
  }
}
```

## Example

[express](https://expressjs.com/)나 [koa](https://koajs.com/)로 server를 구현해본 사람이면 다음과 같은 코드가 익숙할 것이다.

```ts:clipboard=false
const router = new Router()

router.get("/api/users", getAllUsers)
router.get("/api/users/:id", getUser)
router.post("/api/users", createUser)
```

그리고 [NestJS](https://docs.nestjs.com/controllers)나 [routing-controllers](https://www.npmjs.com/package/routing-controllers)를 사용해본 사람이면 다음과 같은 코드를 봤을 것이다.

```ts:clipboard=false
@Controller("api")
export class UsersController {
  @Get("users")
  getAllUsers(): User[] {
    // code
  }

  @Get("users/:id")
  getUser(@Param("id") id: string): User {
    // code
  }

  @Post("users")
  createUser(@Body() body: CreateUserInput): User {
    // code
  }
}
```

두 코드다 결과는 같다. 하지만 decorator가 어떤 일을 하길래 두 코드가 같은 결과를 내는지 궁금해서 찾아봤다.

---

## Decorators

현재 decorator는 class 및 class 내부에서만 사용할 수 있다. 즉, decorator는 `class`, class 내부의 `property`, `accessor`, `method`, 그리고 `parameter`에 사용할 수 있는 것이다.

이해한 바로 decorator의 특징은 다음과 같다:

- decorator는 `class의 다양한 property 및 method의 정의를 수정 및 교체하는 function`이다
- decorator는 `runtime에 호출`된다 (즉, class instance를 생성하지 않아도 호출됨)

다음과 같은 class에 decorator를 적용해보자.

```ts:clipboard=false
// 1. class
class A {
  // 2. property
  b: string = "Hello"

  // 3. accessor
  get c(): string {
    return `${this.b} World!`
  }

  // 4. method
  d(/* 5. parameter */ e: string): void {
    console.log(e)
  }
}
```

---

### `class decorator`

class decorator는 클래스의 생성자를 유일한 인수로 호출한다.

A에 class decorator를 적용한 뒤 출력 결과를 살펴보자.

```ts:clipboard=false
@ClassDecorator // highlight-line
class A {
  b: string = "Hello"

  get c(): string {
    return `${this.b} World!`
  }

  d(e: string): void {
    console.log(e)
  }
}

function ClassDecorator(constructor: typeof A) {
  console.log(constructor)
  console.log(constructor.prototype)
}
```

출력 결과는 아래와 같다.

```console:clipboard=false
[Function: A]
{ c: [Getter], d: [Function (anonymous)] }
```

출력 결과를 보면 class의 생성자 `A`, accessor `c`, 그리고 method `d`에 접근이 가능하다. 하지만 property `b`는 instance 생성 전에 호출되기 때문에 직접 access를 할 수 없다.

method `d`의 정의를 한 번 바꿔보자. 우선 현재 상태에서 `d`를 호출하면 출력 결과는 다음과 같을 것이다.

```ts:clipboard=false
new A().d("안녕!")
```

```console:clipboard=false
안녕!
```

`ClassDecorator`를 다음과 같이 바꿔서 method `d`의 정의를 수정해보자.

```ts:clipboard=false
function ClassDecorator(constructor: typeof A) {
  const method = constructor.prototype.d // 기존의 method
  // 기존의 method를 재정의 한다.
  constructor.prototype.d = function (e: string) {
    method(e) // 기존의 method를 호출하고, 아래를 추가한다.
    console.log("d()를 호출하면 이것도 호출된다!")
  }
}
```

그리고 다시 `d`를 호출해보자.

```typescript:clipboard=false
new A().d("안녕!")
```

```console:clipboard=false
안녕!
d()를 호출하면 이것도 호출된다!
```

이런식으로 `ClassDecorator`를 통해 class 내부의 method뿐만 아니라 접근 가능한 constructor, accessor, 그리고 method 모두 가지고 놀 수 있다.

---

### `method decorator`

method decorator는 3가지 argument를 받는다.

- 첫 번째 argument: `class의 prototype`
- 두 번째 argument: `class에서 해당 method의 key`
- 세 번째 argument: `property descriptor`

헷갈린다.. 아래 코드 예시를 통해 어떤 값을 통해 호출되는지 살펴보자.

> ⚡️ 참고: prototype은 function만이 가지는 property이다. 그리고 class는 function이다.
>
> ```ts:clipboard=false
> const obj = {}
> console.log(typeof obj) // object
> // highlight-next-line
> console.log(obj.prototype) // error
>
> const func = function () {}
> console.log(func.prototype) // ok
>
> console.log(typeof Object) // function
> console.log(Object.prototype) // ok
>
> class A {}
> console.log(typeof A) // function
> console.log(A.prototype) // ok
> ```

> ⚡️ 참고: method에서의 property descriptor
>
> | Property     | Description                                                      |
> | ------------ | ---------------------------------------------------------------- |
> | value        | 현재 값 value                                                    |
> | writable     | 수정 가능하면 true, 아니면 false                                 |
> | enumarable   | `for (i in [1, 2, 3])`과 같이 순회가 가능하면 true, 아니면 false |
> | configurable | Property definition이 수정 및 삭제가 가능하면 true, 아니면 false |

`LogError`라는 method decorator를 만들어서 argument들을 출력해보자.

```ts:clipboard=false
class A {
  b: string = "Hello"

  get c(): string {
    return `${this.b} World!`
  }

  @LogError // highlight-line
  d(e: string): void {
    console.log(e)
  }
}

function LogError(target: any, key: string, desc: PropertyDescriptor): void {
  console.log(target)
  console.log(key)
  console.log(desc)
}
```

```console:clipboard=false
{ c: [Getter], d: [Function (anonymous)] }
d
{
  value: [Function (anonymous)],
  writable: true,
  enumerable: true,
  configurable: true
}
```

출력 결과를 보면 알겠지만 `@LogError` decorator가 실제로는 다음과 같이 호출한 것이다.

```ts:clipboard=false
LogError(A.prototype, "d", Object.getOwnPropertyDescriptor(A.prototype, "d")!)
```

이제 `LogError` decorator를 좀 쓸만하게 바꿔보자. 우선은 method `d`가 error를 던졌을 때 그것을 error handling을 할 수 있도록 decorator를 가지고 `d`를 바꿔보자.

```ts:clipboard=false
function LogError(target: any, key: string, desc: PropertyDescriptor): void {
  const method = desc.value // 기존의 method

  // 기존의 method가 error를 던졋을 때 error handling 할 수 있도록 재정의
  desc.value = function () {
    try {
      method()
    } catch (err) {
      console.log("여기에 error handling logic 추가")
    }
  }
}
```

수정한 코드를 반영해서 실행해보자.

```ts:clipboard=false
class A {
  b: string = "Hello"

  get c(): string {
    return `${this.b} World!`
  }

  @LogError
  d(e: string): void {
    console.log(e)
    throw new Error() // highlight-line
  }
}

function LogError(target: any, key: string, desc: PropertyDescriptor): void {
  const method = desc.value

  desc.value = function (e: string) {
    try {
      method(e)
    } catch (err) {
      console.log("여기에 error handling logic 추가하면 됨!")
    }
  }
}

new A().d("안녕!")
```

```console:clipboard=false
안녕!
여기에 error handling logic 추가하면 됨!
```

조금 더 응용해서 `LogError`에 custom error message를 넣을 수 있게 만들어보자. 기존에 `@LogError` 대신에 `@LogError(errorMessage)`과 같은 방식으로 사용할 수 있도록 `Higher Order Function`으로 만들어보자.

```ts:clipboard=false
function LogError(errorMessage: string) {
  return function (target: any, key: string, desc: PropertyDescriptor): void {
    const method = desc.value

    desc.value = function (e: string) {
      try {
        method(e)
      } catch (err) {
        console.log(errorMessage)
      }
    }
  }
}
```

그리고 다음 코드를 실행해보자.

```ts:clipboard=false
class A {
  b: string = "Hello"

  get c(): string {
    return `${this.b} World!`
  }

  @LogError("🥳") // highlight-line
  d(e: string): void {
    console.log(e)
    throw new Error()
  }
}

function LogError(errorMessage: string) {
  return function (target: any, key: string, desc: PropertyDescriptor): void {
    const method = desc.value

    desc.value = function (e: string) {
      try {
        method(e)
      } catch (err) {
        console.log(errorMessage)
      }
    }
  }
}

new A().d("안녕!")
```

```console:clipboard=false
안녕!
🥳
```

출력 결과를 보면 `@LogError('🥳')`에 넘긴 값이 출력되는 것을 볼 수 있다. 신기히다..

이런식으로 method를 재정의할 수 있다고 한다. Parameter로 error message 대신에 function을 넘겼다면 해당 function을 호출하도록 만들 수도 있을 것이다.

---

### `parameter decorator`

parameter decorator도 3가지 argument를 받는다. 첫 번째와 두 번째 argument는 method decorator와 같지만 `마지막 argument는 해당 parameter의 index 번호`이다.

이번엔 그냥 코드 예시를 통해 살펴보자.

```ts:clipboard=false
class A {
  b: string = "Hello"

  get c(): string {
    return `${this.b} World!`
  }

  d(
    @ParameterDecorator e: string,
    @ParameterDecorator f: string,
    @ParameterDecorator g: string
  ): void {
    console.log(e, f, g)
  }
}

function ParameterDecorator(target: any, key: string, index: number) {
  console.log(target)
  console.log(key)
  console.log(index)
}
```

```console:clipboard=false
{ c: [Getter], d: [Function (anonymous)] }
d
2
{ c: [Getter], d: [Function (anonymous)] }
d
1
{ c: [Getter], d: [Function (anonymous)] }
d
0
```

나머지 `property decorator`와 `accessor decorator`도 모두 이와 유사하다.

사실 이렇게만 봐서는 정확히 이것을 어떻게 써야 위에 NestJS example code 처럼 짤 수 있는지는 감이 안잡힐 것이다. 실제 그러한 코드를 짜기 위해서는 `reflect-metadata`라는 라이브러리를 사용해야 한다.

그러면 `reflect-metadata`가 무엇인지 간단히 살펴보자.

---

## Metadata

우선 특정 타입에 대한 metadata를 내보낼 수 있도록 `tsconfig.json` 파일에 `emitDecoratorMetadata` compiler options를 추가하자.

```json
{
  "compilerOptions": {
    "target": "ES5",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true // highlight-line
  }
}
```

`reflect-metadata`를 가지고 우리는 각종 타입에 대한 metadata를 정의할 수 있다. 아래 예시를 통해 살펴보자.

```ts:clipboard=false
import "reflect-metadata" // 'Reflect'라는 global object를 생성한다.

const user = {
  firstName: "정민",
}

// 'user'에 `phone: '010-1234-5678'`이라는 metadata property를 추가한다.
Reflect.defineMetadata("phone", "010-1234-5678", user)
console.log(user)

// 'user.firstName'에 `lastName: '박'`이라는 metadata property를 추가한다.
Reflect.defineMetadata("lastName", "박", user, "firstName")
console.log(user)

// 'user'에서 'phone'을 key로 가지는 metadata value를 가져온다.
const number = Reflect.getMetadata("phone", user)
console.log(number)

// 'user.firstName'에서 'lastName'을 key로 가지는 metadata value를 가져온다.
const lastName = Reflect.getMetadata("lastName", user, "firstName")
console.log(lastName)
```

```console:clipboard=false
{ firstName: '정민' }
{ firstName: '정민' }
010-1234-5678
박
```

`user` object에 metadata property를 정의했지만 `user`를 출력했을 때 나타나지 않고, `Reflect.getMetadata`를 통해 가져와야만 읽어들일 수 있는 것을 확인할 수 있다. 이렇듯, metadata는 명시적으로 접근해야 한다.

이제 이것을 가지고 아래와 같이 NestJS에서 사용할 수 있는 코드를 흉내내보자.

```ts:clipboard=false
@Controller("api")
export class UsersController {
  @Get("users")
  getAllUsers(): User[] {
    // code
  }

  @Get("users/:id")
  getUser(@Param("id") id: string): User {
    // code
  }

  @Post("users")
  createUser(@Body() body: CreateUserInput): User {
    // code
  }
}
```

---

## Decorator 만들어보기

`express`와 `reflect-metadata`를 가지고 구현해보자.

```ts:title=custom-decorator.ts
import "reflect-metadata"
import { RequestHandler, Router } from "express"

enum MetadataKeys {
  path = "path",
  method = "method",
}

enum Method {
  get = "get",
  post = "post",
  patch = "patch",
  del = "delete",
  put = "put",
}

// class decorator
function Controller(routePrefix: string) {
  return function (target: Function) {
    const router = Router()

    Object.keys(target.prototype).forEach(key => {
      const routeHandler = target.prototype[key]
      const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, key)
      const method: Method = Reflect.getMetadata(
        MetadataKeys.method,
        target.prototype,
        key
      )

      // highlight-start
      // 출력해서 확인해보자!
      console.log(routeHandler)
      console.log(path)
      console.log(method)
      // highlight-end

      if (path) {
        // Route handler를 구성한다.
        router[method](`${routePrefix}${path}`, routeHandler)
      }
    })
  }
}

interface RouteHandlerDescriptor extends PropertyDescriptor {
  handler?: RequestHandler
}

// 각 method에 대한 decorator를 돌려주는 higher order function
function _routeBinder(method: Method) {
  // method decorator
  return function (path: string) {
    return function (target: any, key: string, desc: RouteHandlerDescriptor) {
      Reflect.defineMetadata(MetadataKeys.method, method, target, key)
      Reflect.defineMetadata(MetadataKeys.path, path, target, key)
    }
  }
}

const Get = _routeBinder(Method.get)
const Post = _routeBinder(Method.post)
const Put = _routeBinder(Method.put)
const Patch = _routeBinder(Method.patch)
const Delete = _routeBinder(Method.del)

// 위에 정의한 decorator 적용
@Controller("/api")
class UserController {
  @Get("/users")
  getAllUsers() {}

  @Get("/users/:id")
  getUser() {}

  @Post("/users")
  createUser() {}
}
```

위 코드를 실행해서 metadata를 출력해보면 다음과 같다.

```console:clipboard=false
[Function (anonymous)]
/users
get
[Function (anonymous)]
/users/:id
get
[Function (anonymous)]
/users
post
```

각각의 method decorator에서 설장한 `method`와 `path` metadata를 `class decorator`에서 접근해 각각의 `route handler`를 만든 것을 확인할 수 있다.

이것을 응용하면 **여러 middleware를 설정해주는 method decorator**와 **request body를 validate해주는 method decorator**등과 같은 custom decorator를 만들 수 있다.

---

decorator와 metadata를 가지고 이것 저것 해보니 decorator를 많이 사용하는 `TypeOrm`과 `NestJS`가 어떠한 방식으로 구현되었는지 약간은 알 것 같다.
