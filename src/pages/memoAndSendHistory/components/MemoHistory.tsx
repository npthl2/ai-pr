import React, { useState, useEffect, useRef } from 'react';
import { Table, TableHead, TableBody, Box, Grid, Typography } from '@mui/material';
import TableCell from '@components/Table/TableCell';
import TableRow from '@components/Table/TableRow';
import Button from '@components/Button';
import Tooltip from '@components/Tooltip';
import useToastStore from '@stores/ToastStore';
import { useMemosQuery } from '@api/queries/memo/useMemosQuery';
import { useMemosMutation } from '@api/queries/memo/useMemosMutation';
import { MemoType } from '@model/Memo';
import { useQueryClient } from '@tanstack/react-query';
import {
  HighlightedTypography,
  MemoHistoryBox,
  MemoContentTypography,
  MemoEditorBox,
  MemoEditorTextarea,
  MemoHistoryTableContainer,
} from './MemoHistory.styled';
import useCustomerStore from '@stores/CustomerStore';
import { Memo } from '@model/Memo';

const MemoHistory: React.FC = () => {
  const activeCustomerId = useCustomerStore((state) => state.selectedCustomerId) || '';
  const [memoContent, setMemoContent] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const openToast = useToastStore((state) => state.openToast);
  const queryClient = useQueryClient();
  const memoEditorRef = useRef<HTMLTextAreaElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { data: memos, refetch } = useMemosQuery(activeCustomerId, page);
  const [totalMemos, setTotalMemos] = useState<Memo[]>([]);
  const saveMemoMutation = useMemosMutation();

  useEffect(() => {
    if (memos) {
      if (page === 1) {
        setTotalMemos(memos);
      } else {
        setTotalMemos((prevMemos) => [...prevMemos, ...memos]);
      }
    }
  }, [memos]);

  useEffect(() => {
    // 진입시 Textarea 포커스
    if (memoEditorRef.current) {
      memoEditorRef.current.focus();
    }
    // setTotalMemos(memos);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setLoading(true);
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 },
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [loading]);

  useEffect(() => {
    if (memos) {
      setLoading(false);
    }
  }, [memos]);

  const handleSaveMemo = async () => {
    try {
      const result = await saveMemoMutation.mutateAsync({
        customerId: activeCustomerId,
        memoType: MemoType.MEMBER,
        content: memoContent,
        // To-Do: 로그인 후 사용자 이름 가져오기
        authorName: '체리체리',
      });

      // BusinessException시 실패 메세지 출력
      if (typeof result.data === 'string') {
        openToast('저장에 실패했습니다. 다시 시도해 주세요.');
        return;
      }
      setMemoContent('');
      setPage(1);
      openToast('저장되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['memos', activeCustomerId] });
      refetch();
    } catch (error) {
      console.error(error);
      openToast('저장에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <MemoHistoryBox>
      {/* 메모이력 섹션 */}
      <Box>
        <Typography variant='h3' gutterBottom>
          메모이력
        </Typography>

        <MemoHistoryTableContainer>
          <Table style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
            <TableHead style={{ position: 'sticky', top: 0 }}>
              <TableRow variant='head'>
                <TableCell sx={{ width: '18%' }}>
                  <Typography>작성일시</Typography>
                </TableCell>
                <TableCell sx={{ width: '13%' }}>
                  <Typography>작성자</Typography>
                </TableCell>
                <TableCell>
                  <Typography>메모내용</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ height: memos && memos.length === 0 ? '180px' : 'auto' }}>
              {totalMemos && totalMemos.length > 0 ? (
                totalMemos.map((memo, index) => (
                  <TableRow key={memo.memoId + index} disableEffect={true}>
                    <TableCell sx={{ minWidth: '180px' }}>
                      <Typography>{memo.firstCreateDatetime}</Typography>
                    </TableCell>
                    <TableCell sx={{ minWidth: '100px' }}>
                      <Typography>{memo.authorName}</Typography>
                    </TableCell>
                    <TableCell>
                      <Tooltip title={memo.content} placement='bottom' arrow>
                        <MemoContentTypography>{memo.content}</MemoContentTypography>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow data-testid='memoEmptyTableRow' disableEffect sx={{ height: '180px' }}>
                  <TableCell colSpan={3} align='center' hideborder={true}>
                    <Typography>메모가 없습니다.</Typography>
                  </TableCell>
                </TableRow>
              )}
              <div ref={loadMoreRef} style={{ height: '0px' }} />
            </TableBody>
          </Table>
        </MemoHistoryTableContainer>
      </Box>

      {/* 메모작성 섹션 */}
      <MemoEditorBox>
        <Box sx={{ display: 'flex' }}>
          <Typography
            variant='body1'
            sx={{
              fontWeight: 600,
              fontSize: '14px',
              lineHeight: '21px',
            }}
          >
            메모작성 (최대 500자)
          </Typography>
          <HighlightedTypography>*</HighlightedTypography>
        </Box>
        <MemoEditorTextarea
          data-testid='memoTextarea'
          ref={memoEditorRef}
          placeholder='표시할 데이터가 없습니다'
          minRows={4}
          maxRows={4}
          maxLength={500}
          value={memoContent}
          onChange={(e) => setMemoContent(e.target.value)}
        />
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            data-testid='memoSaveButton'
            variant='contained'
            size='medium'
            onClick={handleSaveMemo}
            disabled={memoContent.length === 0}
          >
            저장
          </Button>
        </Grid>
      </MemoEditorBox>
    </MemoHistoryBox>
  );
};

export default MemoHistory;
