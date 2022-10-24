import React, { useCallback, useMemo, useRef, useState } from 'react';
import './App.css';
import CreateUser from './components/CreateUser';
import UserList from './components/UserList';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

function App() {
  const[inputs, setInputs] = useState({
    username: '',
    email: ''
  });
  const { username, email } = inputs;
  const onChange = useCallback(e => {
    const { name, value } = e.target;
    setInputs(inputs => ({
      ...inputs,
      [name]: value
    }));
  }, []);

  const [users, setUsers] = useState([
    {
        id: 1,
        username: 'velopert',
        email: 'public.velopert@gmail.com',
        active: true
    },
    {
        id: 2,
        username: 'yellowtail',
        email: 'public.yellowtail@gmail.com',
        active: false
    },
    {
        id: 3,
        username: 'tester',
        email: 'tester@example.com',
        active: false
    }
  ]);
  
  const nextId = useRef(4);
  const onCreate = useCallback(() => {
    const user = {
      id:nextId.current,
      username,
      email
    };
    // spread(...) 연산자 : 불변성을 유지해야하므로 users 뒤에 user을 붙혀준다.
    // setUsers([...users, user]);
    // concat 함수 : 기존 배열에 마지막에 배열 추가
    setUsers(users => users.concat(user));


    // 입력창 초기화
    setInputs({
      username: '',
      email: ''
    });
    nextId.current += 1;
  }, [username, email]);

  const onRemove = useCallback(
    id => {
    // user.id가 파라미터로 일치하지 않는 원소만 추출하여 새로운 배열을 만든다.
    // == user.id 인것을 제거함
      setUsers(users => users.filter(user => user.id !== id));
    }, []
    );

  const onToggle = useCallback(

    id => {
    setUsers(
      users => users.map(user =>
        user.id === id? {...user, active: !user.active}: user
        )
    );
  }, []);

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle}/> 
      <div>활성사용자 수 : {count}</div>
    </>
  );
}

export default App;
