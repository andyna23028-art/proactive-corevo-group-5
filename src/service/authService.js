import api from "../api/api";

export const authService = {
    //sign up
    signup: async (userData) => {
        try {
            const response = await api.post('/auth/signup', userData);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: error.message };
        }
    },

    //sign in
    signin: async (Credential) => {
        try {
            const response = await api.post('/auth/signin', Credential);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.token));
            }
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: error.message };
        }
    },

    //logout
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    // mengambil data user lagi
    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
};