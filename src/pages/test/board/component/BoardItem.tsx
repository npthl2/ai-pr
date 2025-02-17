// src/BoardItem.tsx
import React from 'react';
import { BoardItem as BoardItemType } from '../types.ts';
import { BoardItemContainer, Title, Content, Date } from './BoardItem.styled.tsx'; // 스타일 import

interface BoardItemProps {
  item: BoardItemType;
}

const BoardItem: React.FC<BoardItemProps> = ({ item }) => {
  return (
    <BoardItemContainer data-testid='boardItem'>
      <Title>{item.title}</Title>
      <Content>{item.content}</Content>
      <Date>{item.createdAt}</Date>
    </BoardItemContainer>
  );
};

export default BoardItem;
