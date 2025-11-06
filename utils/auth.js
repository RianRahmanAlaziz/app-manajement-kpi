export async function refreshToken() {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const res = await fetch('http://127.0.0.1:8000/api/auth/refresh', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) throw new Error('Token refresh failed');

        const data = await res.json();
        localStorage.setItem('token', data.access_token); // simpan token baru
        return data.access_token;
    } catch (error) {
        console.error('Error refreshing token:', error);
        localStorage.removeItem('token');
        return null;
    }
}
