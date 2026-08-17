
export async function loginApi(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'admin' && password === '12345') {
        const mockData = {
          token: 'fake-jwt-token-123456789',
          username: username
        };
        resolve(mockData);
      } else {
        reject(new Error('İstifadəçi adı və ya şifrə səhvdir!'));
      }
    }, 1000);
  });
}