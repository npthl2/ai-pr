export const mockMemberStore = (initialState = {}) => {
  const defaultState = {
    isAuthenticated: true,
    accessToken: 'mock-token',
    memberInfo: {
      memberId: 'user1',
      memberName: 'user1',
      authorities: ['ROLE_SEARCH_TEL_NO', 'ROLE_UNMASKING'],
    },
  };

  const state = { ...defaultState, ...initialState };

  cy.window().then((win) => {
    // AuthStore 초기 상태 설정
    win.localStorage.setItem(
      'member-storage',
      JSON.stringify({
        state: {
          isAuthenticated: state.isAuthenticated,
          accessToken: state.accessToken,
          memberInfo: state.memberInfo,
        },
      }),
    );
  });
};
