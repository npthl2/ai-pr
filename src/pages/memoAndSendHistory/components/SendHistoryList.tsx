import { Box, Typography, TableHead, TablePagination } from '@mui/material';
import TableCell from '@components/Table/TableCell';
import TableRow from '@components/Table/TableRow';
import TableBody from '@components/Table/TableBody';
import { useReactQuery } from '@hooks/useReactQuery';
import Checkbox from '@components/Checkbox';
import Tooltip from '@components/Tooltip';
import {
  SendHistoryBox,
  SendHistoryTableContainer,
  SendHistoryTable,
  StyledAscIcon,
  HeaderCellWrapper,
  SortIconButton,
  ToggleContainer,
  StyledSwitch,
  HeaderWrapper,
  CheckboxContainer,
  FilterContainer,
} from './SendHistoryList.styled';
import { useState, useEffect } from 'react';
import useCustomerStore from '@stores/CustomerStore';
import sendHistoryService from '@api/services/sendHistoryService';
import { MessageType } from '@model/SendHistory';

interface SendHistoryItem {
  messageType: MessageType;
  requestTime: string;
  sentTime: string;
  message: string;
  successYn: string;
}

interface SendHistoryResponse {
  sendHistories: SendHistoryItem[];
  totalCount: number;
}

type SortOrder = 'asc' | 'desc' | null;
type SortField = 'messageType' | 'requestDate' | 'sendDate' | 'success';
const DEFAULT_ROWS_PER_PAGE = 8;

const SendHistoryList = () => {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const [showSuccessOnly, setShowSuccessOnly] = useState(false);
  const [smsChecked, setSmsChecked] = useState(true);
  const [emailChecked, setEmailChecked] = useState(true);
  const customerId = useCustomerStore((state) => state.selectedCustomerId) || '';

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : prev === 'desc' ? null : 'asc'));
      if (sortOrder === 'desc') {
        setSortField(null);
      }
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const getSortIconStyle = (field: SortField) => {
    if (sortField !== field) return { opacity: 0.3 };
    if (sortOrder === null) return { opacity: 0.3 };
    return { transform: sortOrder === 'desc' ? 'rotate(180deg)' : 'none' };
  };

  const columns = [
    {
      key: 'messageType',
      label: '구분',
      render: (item: SendHistoryItem) => <Typography>{item.messageType}</Typography>,
    },
    {
      key: 'requestDate',
      label: '요청일시',
      render: (item: SendHistoryItem) => <Typography>{item.requestTime}</Typography>,
    },
    {
      key: 'sendDate',
      label: '발송일시',
      render: (item: SendHistoryItem) => <Typography>{item.sentTime}</Typography>,
    },
    {
      key: 'message',
      label: '메시지',
      render: (item: SendHistoryItem) => (
        <Tooltip sx={{ zIndex: 10000 }} title={item.message} placement='bottom' arrow>
          <Box sx={{ maxWidth: '100%' }}>
            <Typography
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {item.message}
            </Typography>
          </Box>
        </Tooltip>
      ),
    },
    {
      key: 'success',
      label: '성공여부',
      render: (item: SendHistoryItem) => <Typography>{item.successYn}</Typography>,
    },
  ];

  const getMessageType = () => {
    if (smsChecked && emailChecked) return MessageType.BOTH;
    if (smsChecked) return MessageType.SMS;
    if (emailChecked) return MessageType.EMAIL;
    return MessageType.BOTH;
  };

  const fetchSendHistory = async () => {
    const response = await sendHistoryService.sendHistory({
      customerId,
      messageType: getMessageType(),
      includeOnlySuccessYN: showSuccessOnly ? 'Y' : 'N',
      page: page + 1,
      size: rowsPerPage,
    });

    if (response?.data && typeof response.data === 'object' && 'sendHistories' in response.data) {
      const data = response.data as SendHistoryResponse;
      let histories = data.sendHistories.map((item: SendHistoryItem) => ({
        messageType: item.messageType,
        requestTime: item.requestTime,
        sentTime: item.sentTime,
        message: item.message,
        successYn: item.successYn,
      }));

      // Apply sorting if needed
      if (sortField && sortOrder) {
        histories = [...histories].sort((a, b) => {
          let compareA: string;
          let compareB: string;

          switch (sortField) {
            case 'messageType':
              compareA = a.messageType;
              compareB = b.messageType;
              break;
            case 'requestDate':
              compareA = a.requestTime;
              compareB = b.requestTime;
              break;
            case 'sendDate':
              compareA = a.sentTime;
              compareB = b.sentTime;
              break;
            case 'success':
              compareA = a.successYn;
              compareB = b.successYn;
              break;
            default:
              return 0;
          }

          const result = compareA.localeCompare(compareB);
          return sortOrder === 'asc' ? result : -result;
        });
      }

      return histories;
    }
    return [];
  };

  const { data: totalCount = 0 } = useReactQuery({
    queryKey: [
      'sendHistory',
      customerId,
      getMessageType(),
      showSuccessOnly ? 'Y' : 'N',
      page,
      rowsPerPage,
      sortField || '',
      sortOrder || '',
    ],
    queryFn: async () => {
      const response = await sendHistoryService.sendHistory({
        customerId,
        messageType: getMessageType(),
        includeOnlySuccessYN: showSuccessOnly ? 'Y' : 'N',
        page: page + 1,
        size: rowsPerPage,
      });
      return typeof response.data === 'object' &&
        response.data !== null &&
        'totalCount' in response.data
        ? response.data.totalCount
        : 0;
    },
  });

  useEffect(() => {
    setPage(0);
  }, [showSuccessOnly]);

  useEffect(() => {
    setPage(0);
  }, [smsChecked, emailChecked, rowsPerPage]);

  return (
    <SendHistoryBox>
      <Box>
        <HeaderWrapper>
          <Typography variant='h3' sx={{ marginRight: '36px' }}>
            발송이력
          </Typography>
          <FilterContainer>
            <CheckboxContainer>
              <Checkbox
                checked={smsChecked}
                onChange={(checked) => {
                  setSmsChecked(checked);
                  if (!checked && !emailChecked) {
                    setSmsChecked(true);
                  }
                }}
                label='SMS'
              />
              <Checkbox
                checked={emailChecked}
                onChange={(checked) => {
                  setEmailChecked(checked);
                  if (!checked && !smsChecked) {
                    setEmailChecked(true);
                  }
                }}
                label='E-Mail'
              />
            </CheckboxContainer>
            <ToggleContainer>
              <StyledSwitch
                checked={showSuccessOnly}
                onChange={(e) => setShowSuccessOnly(e.target.checked)}
              />
              <Typography>성공 건만 보기</Typography>
            </ToggleContainer>
          </FilterContainer>
        </HeaderWrapper>

        <SendHistoryTableContainer>
          <SendHistoryTable>
            <TableHead style={{ position: 'sticky', top: 0 }}>
              <TableRow variant='head'>
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    sx={{
                      width:
                        column.key === 'messageType'
                          ? '85px'
                          : column.key === 'requestDate' || column.key === 'sendDate'
                            ? '180px'
                            : column.key === 'success'
                              ? '110px'
                              : 'auto',
                    }}
                  >
                    <HeaderCellWrapper>
                      <Typography>{column.label}</Typography>
                      {column.key !== 'message' && (
                        <SortIconButton onClick={() => handleSort(column.key as SortField)}>
                          <StyledAscIcon style={getSortIconStyle(column.key as SortField)} />
                        </SortIconButton>
                      )}
                    </HeaderCellWrapper>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody<SendHistoryItem>
              queryKey={[
                'sendHistory',
                customerId,
                getMessageType(),
                showSuccessOnly ? 'Y' : 'N',
                page.toString(),
                rowsPerPage.toString(),
                sortField || '',
                sortOrder || '',
              ]}
              queryFn={fetchSendHistory}
              columns={columns}
              emptyMessage='발송이력이 없습니다.'
            />
          </SendHistoryTable>
        </SendHistoryTableContainer>
        <TablePagination
          rowsPerPageOptions={[0, DEFAULT_ROWS_PER_PAGE]}
          component='div'
          page={page}
          count={totalCount}
          rowsPerPage={rowsPerPage}
          onPageChange={(__, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value));
            setPage(0);
          }}
          sx={{}}
        />
      </Box>
    </SendHistoryBox>
  );
};

export default SendHistoryList;
