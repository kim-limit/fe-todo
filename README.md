# FE-TODO

## 실행 방법

```
yarn install
node grade.js
```

## 기능 요구사항

    상태: todo, doing, done
    Unique id는 uuid 사용

### 명령어 입력 기능

- [x] show
  - all은 현재 모든 리스트 상태 전체 출력
  - 모든 리스트 출력 (총 개수, 각각의 name, id)
- [x] add
  - name, tag(리스트로 받을 수 있다) 입력시 todo에 추기.
  - tag는 옵션
- [x] delete
  - id 번호를 통한 삭제.
  - 만약 없는 아이디거나 입력 안할시 예외 처리.
- [x] update
  - id, status 두가지 입력받아서 상태를 변경
  - 만약 없는 id나 없는 status(todo, doing, done) 인경우 예외 처리
- [x] exit
  - 종료

### 출력 기능

- [x] 현재 상태 출력
  - `ex) 현재상태 :  todo: n개, doing: m개, done: k개`
- [x] show$todo 인 경우
  - `ex) todo리스트 :  총 n건 : '{name}, {uuid}번' , '{name}, {uuid}번', '{name}, {uuid}번'`
- [x] add
  - `ex) {name} 1개가 추가됐습니다.(id : {uuid})`
- [x] delete
  - `ex) {name} todo가 목록에서 삭제됐습니다`
- [x] update
  - `ex) {name}가 {status}으로 상태가 변경됐습니다`
