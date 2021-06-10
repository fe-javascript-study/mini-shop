# mini-shop

## 프로젝트 설치 및 세팅 방법

기본적으로 현재 프로젝트는 yarn을 기반으로 세팅되어있습니다. yarn이 설치되지 않았다면 설치해주세요.

[yarn 설치 공식문서](https://yarnpkg.com/getting-started/install)
```
yarn install
```
local환경 실행
```
yarn start
```

API 서버 실행
```
yarn dev
```

## Mock-Server API사용법 예제

``` javascript

[GET] products 전체 조회
instance.get('/products').then((data) => console.log(data));

[GET] 필터기능 products 남성만 조회
instance.get('/products?gender=man').then((data) => console.log(data));

[GET] products id=1 데이터 조회
instance.get('/products/1').then((data) => console.log(data));

[DELETE] products id=1 데이터 삭제
instance.delete('/products/1').then((data) => console.log(data));

[GET] products 전체 조회
instance.get('/products').then((data) => console.log(data));

```
[mock-server 공식문서 참고](https://www.npmjs.com/package/json-server)

## 기능명세

[프로젝트 프로토타입](https://ovenapp.io/project/9QXaFmIQcMSXzUuWszHXXizLlPzEAffP#v2mO7)







