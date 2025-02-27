export const mockAuthStore = (initialState = {}) => {
  const defaultState = {
    isAuthenticated: true,
    accessToken: 'mock-token',
    memberInfo: {
      id: 'test-id',
      username: 'testuser',
      role: ['ROLE_SEARCH_TEL_NO'] // 필요한 권한 추가
    }
  };

  const state = { ...defaultState, ...initialState };

  cy.window().then((win) => {
    // AuthStore 초기 상태 설정
    win.localStorage.setItem(
      'auth-storage',
      JSON.stringify({
        state: {
          isAuthenticated: state.isAuthenticated,
          accessToken: state.accessToken,
          memberInfo: state.memberInfo
        }
      })
    );
  });
}; 