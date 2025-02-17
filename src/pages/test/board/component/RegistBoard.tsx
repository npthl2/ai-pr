import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormContainer, InputField, TextAreaField, SubmitButton } from './RegistBoard.styled';
import BoardService from '../BoardService';

const RegistBoard: React.FC = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 history 객체

  const [title, setTitle] = useState<string>(''); // 제목 state
  const [content, setContent] = useState<string>(''); // 내용 state

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await BoardService.registBoard({ title: title, content: content });

    navigate('/test/board', { replace: true });
  };

  return (
    <FormContainer>
      <h2>게시글 등록</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>제목</label>
          <InputField
            type='text'
            value={title}
            onChange={handleTitleChange}
            placeholder='제목을 입력하세요'
            required
            data-testid='boardTitle'
          />
        </div>
        <div>
          <label>내용</label>
          <TextAreaField
            value={content}
            onChange={handleContentChange}
            placeholder='내용을 입력하세요'
            required
            data-testid='boardContent'
          />
        </div>
        <SubmitButton data-testid='boardRegistConfirm' type='submit'>
          등록
        </SubmitButton>
      </form>
    </FormContainer>
  );
};

export default RegistBoard;
