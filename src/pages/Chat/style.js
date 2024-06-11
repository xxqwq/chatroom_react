import styled from 'styled-components';

export const MemberListWrapper = styled.div`
  min-width: 150px;
  border-left: 1px solid #e8e8e8;
`;

export const MemberItemWrapper = styled.div`
  width: 100%;
  padding: 8px;
  &:hover {
    background: #f0f0f0;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: 'left';
  font-size: 1.5rem;
  &:hover {
    cursor: pointer;
    color: #1890ff;
  }
`;
