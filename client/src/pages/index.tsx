// client/src/pages/index.tsx
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
         Paper, Button, TextField, Box, Typography } from '@mui/material';
import axios from 'axios';
import { CreateUserDto } from "./dto/create-user.dto";

const Home = () => {
  const [users, setUsers] = useState<CreateUserDto[]>([]);
  const [newUser, setNewUser] = useState({
    id: -1,
    name: '',
    email: '',
    aliasName: '',
    phoneNum: '',
    affiliation: ''
  });

  // const [editingUser, setEditingUser] = useState(null);
  const [editingUser, setEditingUser] = useState<CreateUserDto | null>(null);

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      console.log("before fetch user")
      const { data } = await axios.get('http://localhost:3003/user');
      console.log(data)
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    console.log("handleDelete is called with id:", id)
    await axios.delete(`http://localhost:3003/user/${id}`);
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleAdd = async () => {
    console.log("handleAdded is called")
    console.log("new user info: ", newUser)
    console.log("type of newUser: ",(typeof newUser))
    await axios.post('http://localhost:3003/user', newUser)
                .then(response=> {console.log(response.data)})
                .catch(error=>{
                  if (error.response) {
                    // 요청이 이루어졌으나 서버가 2xx 범위가 아닌 상태 코드로 응답
                    console.error(error.response.data);
                    console.error(error.response.status);
                    console.error(error.response.headers);
                  } else if (error.request) {
                    // 요청이 이루어 졌으나 응답을 받지 못함
                    console.error(error.request);
                  } else {
                    // 요청을 만드는 중에 문제가 발생
                    console.error('Error', error.message);
                  }
                });
    console.log("axios call done successfully, result data: \n")
    // console.log(data)
    setUsers([...users, newUser]);
    // 폼 초기화
    setNewUser({ id: -1, name: '', email: '', aliasName: '', phoneNum: '', affiliation: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target; // e.target에서 name과 value를 추출합니다.
    console.log("handleChange is called, name/ value:", name, "/", value)
    setNewUser({ ...newUser, [name]: value }); // 기존의 newUser 상태에 변경 사항을 반영합니다.
    console.log("updated newUser: \n");
    console.log(newUser)
  };
  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };
  const handleEditUserChange = (e) => {
    if (editingUser) {
      const { name, value } = e.target;
      setEditingUser({ ...editingUser, [name]: value });
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleSave = async () => {
    if (editingUser) {
      // 서버에 변경사항을 저장하는 로직을 추가
      await axios.put(`http://localhost:3003/user/${editingUser.id}`, editingUser);
      // UI를 업데이트
      setUsers(users.map((user) => (user.id === editingUser.id ? editingUser : user)));
      // 편집 모드 종료
      setEditingUser(null);
    }
  };


return (
  <>
      <Box margin={2} sx={{backgroundColor: 'black',
          borderRadius: '4px',
          boxShadow: 1,
          padding: 2}}>
      <Typography variant="h6">새 사용자 추가</Typography>
      <Box display="flex" gap={2} marginBottom={2}>
        {/* TextField에 handleNewUserChange를 연결합니다. */}
        <TextField label="이름" name="name" value={newUser.name} onChange={handleNewUserChange} />
        <TextField label="메일" name="email" value={newUser.email} onChange={handleNewUserChange} />
        <TextField label="닉네임" name="aliasName" value={newUser.aliasName} onChange={handleNewUserChange} />
        <TextField label="핸드폰번호" name="phoneNum" value={newUser.phoneNum} onChange={handleNewUserChange} />
        <TextField label="소속" name="affiliation" value={newUser.affiliation} onChange={handleNewUserChange} />
        {/* ... 나머지 TextField 컴포넌트도 동일하게 변경 ... */}
        <Button variant="contained" color="primary" onClick={handleAdd}>
          추가
        </Button>
      </Box>
    </Box>
    {/* 사용자 목록 테이블 */}
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>이름</TableCell>
            <TableCell>닉네임</TableCell>
            <TableCell>메일</TableCell>
            <TableCell>핸드폰번호</TableCell>
            <TableCell>소속</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
               {editingUser && user.id === editingUser.id ? (
                // 편집 가능한 입력 필드
                <>
                  <TableCell>
                    <TextField
                      value={editingUser.name}
                      onChange={handleEditUserChange}
                      name="name"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={editingUser.aliasName}
                      onChange={handleEditUserChange}
                      name="aliasName"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={editingUser.email}
                      onChange={handleEditUserChange}
                      name="email"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={editingUser.phoneNum}
                      onChange={handleEditUserChange}
                      name="phoneNum"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={editingUser.affiliation}
                      onChange={handleEditUserChange}
                      name="affiliation"
                    />
                  </TableCell>
                  <TableCell>
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={() => setEditingUser(null)}>Cancel</Button>
                  </TableCell>
                </>
              ) : (
                // 읽기 전용 텍스트
                <>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.aliasName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phoneNum}</TableCell>
                  <TableCell>{user.affiliation}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(user)}>Edit</Button>
                    <Button onClick={() => handleDelete(user.id)}>Delete</Button>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
);
};

export default Home;
