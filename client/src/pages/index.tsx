// client/src/pages/index.tsx
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import axios from 'axios';

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      console.log("before fetch user")
      const { data } = await axios.get('http://localhost:3003/user');
      console.log(data)
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`/api/user/${id}`);
    setUsers(users.filter((user) => user.id !== id));
  };

  // 여기에 추가, 수정 로직도 포함해야 함...

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>이름</TableCell>
            <TableCell>닉네임</TableCell>
            <TableCell>핸드폰번호</TableCell>
            <TableCell>소속</TableCell>
            {/* ... 다른 필드 */}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.aliasName}</TableCell>
              <TableCell>{user.phoneNum}</TableCell>
              <TableCell>{user.affiliation}</TableCell>
              {/* ... 다른 필드 */}
              <TableCell>
                <Button onClick={() => handleEdit(user)}>Edit</Button>
                <Button onClick={() => handleDelete(user.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Home;
