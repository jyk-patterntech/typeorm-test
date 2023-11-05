import axios from 'axios';

// 사용자 목록을 가져오는 함수
export async function getUsers() {
  try {
    const response = await axios.get('/api/users');
    return response.data; // 응답 데이터를 반환합니다.
  } catch (error) {
    // 에러 핸들링
    console.error('Error fetching users:', error);
    // 에러 객체나 메시지를 그대로 반환하거나, 커스텀 에러 메시지를 반환할 수 있습니다.
    throw error;
  }
}