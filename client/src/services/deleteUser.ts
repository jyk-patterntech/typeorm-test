import axios from 'axios';

// 특정 사용자를 삭제하는 함수
export async function deleteUser(id) {
  try {
    const response = await axios.delete(`/api/users/${id}`);
    return response.data; // 응답 데이터를 반환합니다.
  } catch (error) {
    // 에러 핸들링
    console.error(`Error deleting user with id ${id}:`, error);
    // 에러 객체나 메시지를 그대로 반환하거나, 커스텀 에러 메시지를 반환할 수 있습니다.
    throw error;
  }
}