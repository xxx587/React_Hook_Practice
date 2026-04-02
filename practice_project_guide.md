# 실습 프로젝트: "나만의 스마트 할 일 관리자 (Smart Task Manager)"

지금까지 배운 모든 리액트 훅(`useState`, `useEffect`, `useRef`, `useReducer`, `useCallback`, `useMemo`, Custom Hook)을 한꺼번에 활용해보는 실습 과제입니다. 아래 가이드라인을 따라 직접 코딩해보세요!

---

## 🎯 목표 기능

1.  **할 일 목록 관리**: 추가, 삭제, 완료 상태 전환 (비즈니스 로직 분리)
2.  **필터링 및 검색**: 전체/완료/미완료 필터 및 제목 검색 (최적화 포함)
3.  **데이터 저장**: 로컬 스토리지 또는 가상 API와 연동 (부수 효과 처리)
4.  **사용자 경험**: 입력창 자동 포커스, 핸들러 최적화

---

## 🛠️ 훅 활용 가이드 (미션)

### 1단계: 할 일 목록 관리 (`useState`)

- 할 일 목록(`tasks`)의 상태를 `useState<Task[]>([])`로 선언하세요.
- 추가, 삭제, 토글 기능을 `setTasks`와 자바스크립트 배열 메서드(`filter`, `map`, spread 연산자)를 사용하여 구현하세요.

### 2단계: 효율적인 데이터 처리 (`useMemo`)

- 검색어나 필터 조건이 바뀔 때만 목록을 다시 필터링하도록 `useMemo`를 사용하세요.
- 예: `const filteredTasks = useMemo(() => ... , [tasks, filter, search])`

### 3단계: 성능 최적화 (`useCallback` & `React.memo`)

- 개의 개별 할 일 아이템을 보여주는 `TaskItem` 컴포넌트를 만들고 `React.memo`로 감싸세요.
- 부모에서 자식으로 넘겨주는 `onDelete`, `onToggle` 함수를 `useCallback`으로 고정하세요.

### 4단계: 직접 제어 (`useRef`)

- 할 일을 추가한 직후, 또는 페이지가 처음 로드되었을 때 입력창에 자동으로 포커스가 가도록 `useRef`를 활용하세요.

### 5단계: 로직 재사용 (Custom Hook)

- 입력창의 상태를 관리하는 `useInput` 훅을 만들어 적용하세요.
- (선택) 데이터를 로컬 스토리지에 저장하고 불러오는 `useLocalStorage` 훅을 만들어 보세요.

### 6단계: 외부 연동 (`useEffect`)

- 컴포넌트가 처음 마운트될 때 기존 데이터를 불러오거나, `tasks`가 바뀔 때마다 저장하는 로직을 `useEffect`로 처리하세요.

---

## 🚀 상세 구현 로드맵 (Step-by-Step)

### Step 0: 기본 구조 잡기

- `TaskManager.tsx` 파일을 만들고 기본적인 레이아웃(입력창, 버튼, 리스트 영역 등)을 그려보세요.
- 할 일 아이템의 타입을 정의하세요. (예: `interface Task { id: number; text: string; completed: boolean }`)

### Step 1: 비즈니스 로직 설계 (`useState`)

- 할 일을 추가(`addTask`), 삭제(`deleteTask`), 토글(`toggleTask`)하는 함수들을 만드세요.
- **💡 팁**: 불변성을 유지하기 위해 `setTasks([...tasks, newTask])`나 `tasks.map(...)`을 사용해야 합니다.
- **🤔 왜 useState인가요?**: 앱 규모가 아주 크지 않다면 `useReducer`보다 `useState`를 쓰는 것이 코드가 훨씬 직관적이고 작성하기 편합니다.

### Step 2: 입력값 관리 (`useInput` 커스텀 훅)

- 전에 배운 `useInput.ts`를 활용하여 할 일 입력 기능을 연결하세요.
- `Enter` 키를 눌렀을 때 `addTask(text)`가 호출되게 만드세요.

### Step 3: 초기 데이터 및 자동 저장 (`useEffect`)

- 첫 마운트 시 `localStorage.getItem('tasks')`로 데이터를 불러와 `setTasks(JSON.parse(data))`로 상태를 초기화하세요.
- `tasks` 상태가 바뀔 때마다 `localStorage.setItem`을 실행하여 데이터를 저장하세요.

### Step 4: 검색 및 필터링 최적화 (`useMemo`)

- 현재 선택된 필터(전체/완료/미완료)와 검색어(`searchQuery`)를 기반으로 필터링된 목록을 계산하세요.
- `useMemo`를 사용하여 목록이 정말 클 때도 버벅이지 않게 만드세요.

### Step 5: 핸들러 및 자식 컴포넌트 최적화 (`useCallback` & `React.memo`)

- `TaskItem` 컴포넌트를 분리하고 `React.memo`로 감싸세요.
- 부모에서 `onDelete`, `onToggle` 함수를 `useCallback`으로 감싸서 자식에게 넘겨주세요.
- (확인) 입력창에 텍스트를 입력할 때, 기존 리스트의 아이템들이 리렌더링되지 않는지 콘솔 로그로 확인하세요!

### Step 6: UX 디테일 살리기 (`useRef`)

- 할 일을 추가한 뒤 입력창을 자동으로 비우고, 다시 포커스를 주세요.
- (심화) 할 일 목록을 맨 위로 스크롤하거나, 특정 타이머를 관리할 때 `useRef`를 써보세요.

### Step 7: 간단한 UI 상태 제어 (`useState`)

- 필터 영역을 접었다 폈다 하는 '토글' 기능이나, 현재 선택된 필터 카테고리(`all`, `active`, `completed`)를 저장할 때 `useState`를 사용하세요.
- **💡 팁**: 복잡한 객체 상태는 아니지만, 하나의 컴포넌트에서 모든 상태를 관리할 때 `useState`를 여러 번 써서 역할을 나누는 연습을 하기에 아주 좋습니다.

---

## 📂 추천 파일 구조

- `src/hooks/useTasks.ts` (할 일 관리 전용 커스텀 훅)
- `src/components/TaskManager.tsx` (메인 컴포넌트)
- `src/components/TaskItem.tsx` (개별 아이템 컴포넌트)
- `src/components/TaskFilter.tsx` (검색 및 필터 UI)

---

## 💡 힌트 (막힐 때 보세요!)

> [!TIP]
>
> 1. 할 일 목록을 업데이트할 때 항상 **새로운 배열**을 만들어 전달하는 것을 잊지 마세요.
> 2. `tasks.length`가 아주 작을 때는 `useMemo`의 성능 차이가 미미하지만, 연습을 위해 반드시 적용해 보세요!
> 3. `useEffect` 안에서 데이터를 불러올 때 `setTasks(data)`를 활용하세요.

---

**준비가 되셨나요?** 위 가이드라인을 바탕으로 `src/components/TaskManager.tsx` 파일을 새로 만들어 시작해 보세요! 중간에 궁금한 점이나 막히는 부분이 있다면 언제든 질문해 주세요. 행운을 빕니다! 🚀
