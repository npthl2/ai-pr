module.exports = {
    extends: ['@commitlint/config-conventional'],
    parserPreset: {
        parserOpts: {
          headerPattern: /^(\w+-\d+)\s(\w+):\s(.+)$/,
          headerCorrespondence: ['ticket', 'type', 'subject'],
        },
    },
    rules: {
        'header-match-team-pattern': [2, 'always'],
        'header-max-length': [2, 'always', 100],
        'ticket-empty': [2, 'never'],
        'ticket-case': [2, 'always', 'upper-case'],
        'type-empty': [2, 'never'],
        'type-case': [2, 'always', 'lower-case'],
        'subject-empty': [2, 'never'],
        'subject-full-stop': [2, 'never', '.'],
        'scope-empty': [2, 'always'],
    },
    plugins: [
        {
          rules: {
            'header-match-team-pattern': (parsed) => {
              const { ticket, type, subject } = parsed;
              if (ticket && type && subject) {
                return [true];
              }
              return [
                false,
                '커밋 메시지가 올바른 형식이 아닙니다. 예: KAN-123 feat: 새 기능 추가',
              ];
            },
            'ticket-empty': (parsed) => {
              const { ticket } = parsed;
              if (ticket && ticket.trim().length > 0) {
                return [true];
              }
              return [false, '티켓이 비어있습니다'];
            },
            'ticket-case': (parsed) => {
              const { ticket } = parsed;
              if (!ticket) return [true]; // 값이 없는 경우 바로 위의 룰에서 걸리기 때문에 해당 룰은 패스하도록 처리했다. 
              if (ticket && ticket === ticket.toUpperCase()) {
                return [true];
              }
              return [false, '티켓 형식은 대문자여야 합니다'];
            },
            'ticket-pattern': (parsed) => {
              const { ticket } = parsed;
              const ticketPattern = /^[A-Z]+-\d+$/;
              if (ticket && ticketPattern.test(ticket)) {
                return [true];
              }
              return [
                false,
                '티켓 번호는 "프로젝트 코드-숫자" 형식이어야 합니다. 예: KAN-123',
              ];
            },
          },
        },
    ],
};